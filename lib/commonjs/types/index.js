"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _lang = require("./lang");
Object.keys(_lang).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _lang[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lang[key];
    }
  });
});
//# sourceMappingURL=index.js.map