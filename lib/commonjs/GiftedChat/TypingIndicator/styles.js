"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("../Color"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = _reactNative.StyleSheet.create({
  container: {
    marginLeft: 8,
    width: 45,
    borderRadius: 15,
    backgroundColor: _Color.default.leftBubbleBackground
  },
  dots: {
    flexDirection: 'row'
  },
  dot: {
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 4,
    width: 8,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.38)'
  }
});
//# sourceMappingURL=styles.js.map