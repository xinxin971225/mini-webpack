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
  
  0: [function (require, module, exports) {
       "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var _foo = require("./foo.js");

(0, _foo.foo)();

function main() {
  console.log("main");
}

main();
  },{"./foo.js":1}],
  
  1: [function (require, module, exports) {
       "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = require("./bar.js");

function foo() {
  console.log(".foo");
  (0, _bar.bar)();
}
  },{"./bar.js":2}],
  
  2: [function (require, module, exports) {
       "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;

function bar() {
  console.log("bar");
}
  },{}],
  
});
