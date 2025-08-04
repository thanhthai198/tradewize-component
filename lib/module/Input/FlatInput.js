function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef } from 'react';
import { InputBase } from '../InputBase';
export const FlatInput = /*#__PURE__*/forwardRef(({
  backgroundColor = 'transparent',
  borderColor = 'transparent',
  focusBorderColor = '#007AFF',
  errorBorderColor = '#ff3b30',
  borderRadius = 0,
  style,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(InputBase, _extends({
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