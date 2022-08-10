!(function (modules) {
  function require(filePath) {

    const fn = modules[filePath];
    const module = {
      exports: {},
    };
    fn(require, module, module.exports);
    return module.exports;
  }

  require("./main.js");
})({
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
