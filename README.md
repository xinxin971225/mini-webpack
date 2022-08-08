# mini-webpack

init -> 首先从最基础的依赖关系入手，建立一个简单的依赖关系 main.js -->引用 foo.js
然后通过 babel 的 parser 转化为 ast（抽象语法树）->在通过 babel 的 traverse 对语法树上的 ImportDeclaration 节点设置回调并读取对应的值，获取到相关依赖关系并生成一个新的对象
