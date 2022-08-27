# mini-webpack

init -> 首先从最基础的依赖关系入手，建立一个简单的依赖关系 main.js -->引用 foo.js
然后通过 babel 的 parser 转化为 ast（抽象语法树）->在通过 babel 的 traverse 对语法树上的 ImportDeclaration 节点设置回调并读取对应的值，获取到相关依赖关系并生成一个新的对象

 

createGraph -> 根据init生成的入口文件对象，对对象的deps引用进行循环递归，并调用init生成依赖的文件对象，然后塞到一个数组内，最终返回到这个数组就是文件对象之间依赖关系组成图

build -> 拿到了文件对象的依赖关系后，通过ejs这个库，根据特定的模版ejs文件，将图进行循环，然后打包到一起，可以通过配置模版让es规范的文件变成commonjs规范的一个大文件bundle.js

 > loader

  在init的最开始读取文件的时候，可以通过loader对非js文件进行加载并转化为js对象
 
 ------------

 > plugin

基于webpack底层tapable库，创建hooks，在特定位置调用hooks将事件暴露给外部，
用户通过编写一个原型链含有apply方法的函数，在apply内可以拿到整个hooks，并在期望的hook处注入回调方法，在打包运行到对应位置时可以触发注册的回调函数，并拿到当前的特定上下文对象，通过对对象的操作可以在一定程度上改变打包的结果