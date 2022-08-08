import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
function createAsset() {
  // 获取数据源
  const source = fs.readFileSync("./example/main.js", {
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

console.log(createAsset());
