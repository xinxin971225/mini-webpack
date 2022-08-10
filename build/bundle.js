!(function (modules) {
  function require(id) {
    // 需要一个路径与方法的对应关系

    const [fn, mappin] = modules[id];
    const module = {
      exports: {},
    };
    function localRequire(filePath) {
      const id = mappin[filePath];
      return require(id);
    }
    fn(localRequire, module, module.exports);
    return module.exports;
  }

  require(0);
})({
  /**
   * 目标通过类似cjs的形式去将图的模块关系打包到一起
   */
  0: [
    function (require, module, exports) {
      const { foo } = require("./foo.js");
      foo();
      function main() {
        console.log("main");
      }
      main();
    },
    {
      "./foo.js": 1,
    },
  ],
  1: function (require, module, exports) {
    function foo() {
      console.log(".foo");
    }

    module.exports = {
      foo,
    };
  },
});
