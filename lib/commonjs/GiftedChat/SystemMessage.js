"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemMessage = SystemMessage;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("./Color"));
var _styles = _interopRequireDefault(require("./styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = _reactNative.StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 10
  },
  text: {
    backgroundColor: _Color.default.backgroundTransparent,
    color: _Color.default.defaultColor,
    fontSize: 12,
    fontWeight: '300'
  }
});
function SystemMessage({
  currentMessage,
  containerStyle,
  wrapperStyle,
  textStyle,
  children
}) {
  if (currentMessage == null || currentMessage.system === false) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.default.fill, _styles.default.centerItems, styles.container, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: wrapperStyle
  }, !!currentMessage.text && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.text, textStyle]
  }, currentMessage.text), children));
}
//# sourceMappingURL=SystemMessage.js.map