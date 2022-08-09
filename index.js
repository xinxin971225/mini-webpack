import fs from "fs";
import path from "path";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
function createAsset(filePath) {
  // 获取数据源
  const source = fs.readFileSync(filePath, {
    encoding: "utf-8",
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
  return {
    source,
    deps,
  };
}

// 创建图关系
function createGraph() {
  const mainAsset = createAsset("./example/main.js");
  const queue = [mainAsset];
  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      const child = createAsset(path.resolve("./example", relativePath));
      queue.push(child);
    });
  }
  return queue;
}

console.log(createGraph());
