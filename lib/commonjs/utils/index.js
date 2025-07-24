"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScreenWidth = exports.getScreenHeight = void 0;
var _reactNative = require("react-native");
const getScreenWidth = () => {
  return _reactNative.Dimensions.get('window').width;
};
exports.getScreenWidth = getScreenWidth;
const getScreenHeight = () => {
  return _reactNative.Dimensions.get('window').height;
};
exports.getScreenHeight = getScreenHeight;
//# sourceMappingURL=index.js.map