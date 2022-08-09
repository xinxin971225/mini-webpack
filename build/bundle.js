!(function (modules) {
  function require(filePath) {
    // 需要一个路径与方法的对应关系

    const fn = modules[filePath];
    const module = {
      exports: {},
    };
    fn(require, module, module.exports);
    return module.exports;
  }

  require("./main.js");
})({
  /**
   * 目标通过类似cjs的形式去将图的模块关系打包到一起
   */
  "./main.js": function (require, module, exports) {
    // import { foo } from "./foo.js";
    const { foo } = require("./foo.js");
    foo();
    function main() {
      console.log("main");
    }
    main();
  },
  "./foo.js": function (require, module, exports) {
    function foo() {
      console.log(".foo");
    }

    module.exports = {
      foo,
    };
  },
});
