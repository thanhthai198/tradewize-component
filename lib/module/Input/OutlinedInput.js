function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { forwardRef } from 'react';
import { InputBase } from '../InputBase';
export const OutlinedInput = /*#__PURE__*/forwardRef(({
  borderWidth = 1,
  borderRadius = 6,
  borderColor = '#E1E1E1',
  focusBorderColor = '#007AFF',
  errorBorderColor = '#ff3b30',
  style,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(InputBase, _extends({
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