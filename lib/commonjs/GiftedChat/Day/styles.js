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
    marginTop: 5,
    marginBottom: 10
  },
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15
  },
  text: {
    color: _Color.default.white,
    fontSize: 12,
    fontWeight: '600'
  }
});
//# sourceMappingURL=styles.js.map