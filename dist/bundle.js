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
  "./example/main.js": function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.main = main;

    var _foo = require("./foo.js");

    (0, _foo.foo)();

    function main() {
      console.log("main");
    }
  },

  "/Users/bello/Desktop/Demo/mini-webpack/example/foo.js": function (
    require,
    module,
    exports
  ) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    exports.foo = foo;

    function foo() {
      console.log(".foo");
    }
  },
});
