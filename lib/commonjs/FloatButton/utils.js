"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDirection = void 0;
var _utils = require("../utils");
const getDirection = location => {
  let locationDirection = {
    horizontal: 'right',
    vertical: 'bottom'
  };
  if (location.x < (0, _utils.getScreenWidth)() / 2) {
    locationDirection.horizontal = 'left';
  }
  if (location.y < (0, _utils.getScreenHeight)() / 2) {
    locationDirection.vertical = 'top';
  }
  return locationDirection;
};
exports.getDirection = getDirection;
//# sourceMappingURL=utils.js.map