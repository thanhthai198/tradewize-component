"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlatInput = void 0;
var _react = require("react");
var _InputBase = require("../InputBase");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FlatInput = exports.FlatInput = /*#__PURE__*/(0, _react.forwardRef)(({
  backgroundColor = 'transparent',
  borderColor = 'transparent',
  focusBorderColor = '#007AFF',
  errorBorderColor = '#ff3b30',
  borderRadius = 0,
  style,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(_InputBase.InputBase, _extends({
    ref: ref,
    variant: "outlined",
    backgroundColor: backgroundColor,
    borderWidth: 0,
    borderRadius: borderRadius,
    borderColor: borderColor,
    focusColor: focusBorderColor,
    errorColor: errorBorderColor,
    style: style
  }, props));
});
FlatInput.displayName = 'FlatInput';
//# sourceMappingURL=FlatInput.js.map