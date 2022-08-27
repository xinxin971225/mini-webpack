import fs from "fs";
import path from "path";
import ejs from "ejs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { transformFromAst } from "babel-core";
import { jsonLoader } from "./jsonLoader.js";
import { SyncHook } from "tapable";
import { ChangeOutputPath } from "./ChangeOutputPath.js";
let id = 0;

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.json$/,
        use: [jsonLoader],
      },
    ],
  },

  plugins: [new ChangeOutputPath()],
};

const hooks = {
  emitFile: new SyncHook(["context"]),
};

function createAsset(filePath) {
  // 获取数据源
  let source = fs.readFileSync(filePath, {
    encoding: "utf-8",
  });

  // initLoader

  const loaders = webpackConfig.module.rules;
  const loaderContext = {
    addDeps: (dep) => {
      console.log(dep);
    },
  };
  loaders.forEach(({ test, use }) => {
    if (test.test(filePath)) {
      if (Array.isArray(use)) {
        use.forEach((fn) => {
          source = fn.call(loaderContext, source);
        });
      }
    }
  });

  //   转化为抽象语法树
  const ast = parse(source, {
    sourceType: "module",
  });
  //   console.log("source", JSON.stringify(ast, null, 2));
  const deps = [];
  //   获取抽象语法树上对应type上的某些属性
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      //   console.log("ImportDeclaration----------", node.source.value);
      deps.push(node.source.value);
    },
  });
  // esm ->cjs
  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });
  return {
    filePath,
    code,
    deps,
    mapping: {},
    id: id++,
  };
}

// 创建图关系
function createGraph() {
  const mainAsset = createAsset("./example/main.js");
  const queue = [mainAsset];
  for (const asset of queue) {
    // 小细节，每有一个依赖queue就会变长，然后可以无限循环下去
    asset.deps.forEach((relativePath) => {
      const child = createAsset(path.resolve("./example", relativePath));
      queue.push(child);
      asset.mapping[relativePath] = child.id;
    });
  }
  return queue;
}
function initPlugins() {
  const { plugins } = webpackConfig;
  plugins.forEach((plugin) => {
    plugin.apply(hooks);
  });
}
initPlugins();
const graph = createGraph();

/**
 * 有了图就需要把他们build成cjs规范的require的样子
 * @param {*} graph
 */
function build(graph) {
  // 这里采用ejs的方式通过模版把对应的图编译成require的样子
  const template = fs.readFileSync("./bundle.ejs", { encoding: "utf-8" });
  const code = ejs.render(template, { data: graph });
  let outPath = "./dist/bundle.js";
  const context = {
    changeOutPath: (path) => {
      outPath = path;
    },
  };
  hooks.emitFile.call(context);
  fs.writeFileSync(outPath, code);
}
build(graph);
