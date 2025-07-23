"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutlinedInput = void 0;
var _react = require("react");
var _InputBase = require("../InputBase");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const OutlinedInput = exports.OutlinedInput = /*#__PURE__*/(0, _react.forwardRef)(({
  borderWidth = 1,
  borderRadius = 6,
  borderColor = '#E1E1E1',
  focusBorderColor = '#007AFF',
  errorBorderColor = '#ff3b30',
  style,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(_InputBase.InputBase, _extends({
    ref: ref,
    variant: "outlined",
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    borderColor: borderColor,
    focusColor: focusBorderColor,
    errorColor: errorBorderColor,
    style: style
  }, props));
});
OutlinedInput.displayName = 'OutlinedInput';
//# sourceMappingURL=OutlinedInput.js.map