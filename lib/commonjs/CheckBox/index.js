"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _lodash = require("lodash");
var _ButtonBase = require("../ButtonBase");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Enhanced type definitions

const CheckBox = ({
  // Basic props
  label,
  children,
  checked = false,
  onPress,
  onValueChange,
  disabled = false,
  disableColorChange = false,
  // Styling props
  variant,
  size,
  shape,
  backgroundColor,
  checkedBackgroundColor,
  textColor,
  borderColor,
  checkedBorderColor,
  borderRadius,
  width,
  height,
  // Custom state colors
  disabledBackgroundColor,
  disabledTextColor,
  disabledBorderColor,
  disabledCheckedBackgroundColor,
  disabledCheckedBorderColor,
  // Active/Checked state UI props
  activeTextStyle,
  activeContainerStyle,
  activeCheckboxStyle,
  activeBackgroundColor,
  activeTextColor,
  activeBorderColor,
  activeBorderRadius,
  activeBorderWidth,
  activeShadow,
  activeShadowColor,
  activeShadowOffset,
  activeShadowOpacity,
  activeShadowRadius,
  // Layout props
  fullWidth = false,
  alignSelf = 'auto',
  labelPosition = 'right',
  // Custom styles
  textStyle,
  containerStyle,
  checkboxStyle,
  // Functionality props
  debounceTime = 500,
  activeOpacity = 0.7,
  // Content props
  customCheckIcon,
  labelSpacing = 12,
  checkIconText,
  checkIconSize,
  checkIconColor,
  checkIconStyle,
  // Accessibility props
  accessibilityLabel,
  accessibilityHint,
  // Animation props
  pressable = true,
  // Shadow props
  shadow = false,
  shadowColor = '#000',
  shadowOffset = {
    width: 0,
    height: 2
  },
  shadowOpacity = 0.25,
  shadowRadius = 3.84,
  // Border props
  borderWidth = 2,
  borderStyle = 'solid',
  // Checkbox specific props
  indeterminate = false,
  customIndeterminateIcon,
  // Spread all remaining TouchableOpacity props
  ...touchableProps
}) => {
  const debouncedOnPress = (0, _react.useMemo)(() => (0, _lodash.debounce)(event => {
    if (onPress) {
      onPress(event);
    }
    if (onValueChange) {
      onValueChange(!checked);
    }
  }, debounceTime, {
    leading: true,
    trailing: false
  }), [onPress, onValueChange, checked, debounceTime]);

  // Get variant styles - only if variant is provided
  const getVariantStyles = () => {
    if (!variant) return {};
    const variants = {
      primary: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#007bff',
        textColor: '#333333',
        borderColor: '#007bff',
        checkedBorderColor: '#007bff'
      },
      secondary: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#6c757d',
        textColor: '#333333',
        borderColor: '#6c757d',
        checkedBorderColor: '#6c757d'
      },
      success: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#28a745',
        textColor: '#333333',
        borderColor: '#28a745',
        checkedBorderColor: '#28a745'
      },
      warning: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#ffc107',
        textColor: '#333333',
        borderColor: '#ffc107',
        checkedBorderColor: '#ffc107'
      },
      danger: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#dc3545',
        textColor: '#333333',
        borderColor: '#dc3545',
        checkedBorderColor: '#dc3545'
      },
      info: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#17a2b8',
        textColor: '#333333',
        borderColor: '#17a2b8',
        checkedBorderColor: '#17a2b8'
      }
    };
    return variants[variant] || {};
  };

  // Get size styles - only if size is provided
  const getSizeStyles = () => {
    if (!size) return {};
    const sizes = {
      small: {
        checkboxSize: 16,
        fontSize: 12
      },
      medium: {
        checkboxSize: 20,
        fontSize: 14
      },
      large: {
        checkboxSize: 24,
        fontSize: 16
      }
    };
    return sizes[size] || {};
  };

  // Get shape styles - only if shape is provided
  const getShapeStyles = () => {
    if (!shape) return {};
    const shapes = {
      rounded: {
        borderRadius: 4
      },
      square: {
        borderRadius: 0
      },
      circle: {
        borderRadius: 50
      }
    };
    return shapes[shape] || {};
  };
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const shapeStyles = getShapeStyles();
  const checkboxStyleCombined = {
    ...styles.checkbox,
    width: Math.max(width || sizeStyles.checkboxSize || 24, 24),
    height: Math.max(height || sizeStyles.checkboxSize || 24, 24),
    backgroundColor: (() => {
      if (disabled && !disableColorChange) {
        if (checked || indeterminate) {
          return disabledCheckedBackgroundColor || '#cccccc';
        }
        return disabledBackgroundColor || '#f5f5f5';
      }
      if (checked || indeterminate) {
        return activeBackgroundColor || checkedBackgroundColor || variantStyles.checkedBackgroundColor || '#007bff';
      }
      return backgroundColor || variantStyles.backgroundColor || '#ffffff';
    })(),
    borderRadius: (() => {
      if (checked || indeterminate) {
        return activeBorderRadius || borderRadius || shapeStyles.borderRadius || 4;
      }
      return borderRadius || shapeStyles.borderRadius || 4;
    })(),
    borderWidth: (() => {
      if (checked || indeterminate) {
        return activeBorderWidth || borderWidth || 2;
      }
      return borderWidth || 2;
    })(),
    borderColor: (() => {
      if (disabled && !disableColorChange) {
        if (checked || indeterminate) {
          return disabledCheckedBorderColor || '#cccccc';
        }
        return disabledBorderColor || '#cccccc';
      }
      if (checked || indeterminate) {
        return activeBorderColor || checkedBorderColor || variantStyles.checkedBorderColor || '#007bff';
      }
      return borderColor || variantStyles.borderColor || '#007bff';
    })(),
    borderStyle,
    alignSelf: 'flex-start',
    ...(shadow && {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
      elevation: shadowRadius
    }),
    ...((checked || indeterminate) && activeShadow && {
      shadowColor: activeShadowColor || shadowColor || '#000',
      shadowOffset: activeShadowOffset || shadowOffset || {
        width: 0,
        height: 2
      },
      shadowOpacity: activeShadowOpacity || shadowOpacity || 0.25,
      shadowRadius: activeShadowRadius || shadowRadius || 3.84,
      elevation: activeShadowRadius || shadowRadius || 3.84
    }),
    ...(checkboxStyle || {}),
    ...((checked || indeterminate) && activeCheckboxStyle ? activeCheckboxStyle : {})
  };
  const textStyleCombined = {
    ...styles.text,
    color: (() => {
      if (disabled && !disableColorChange && disabledTextColor) {
        return disabledTextColor;
      }
      if (checked || indeterminate) {
        return activeTextColor || textColor || variantStyles.textColor || '#333333';
      }
      return textColor || variantStyles.textColor || '#333333';
    })(),
    ...(sizeStyles.fontSize && {
      fontSize: sizeStyles.fontSize
    }),
    ...(textStyle || {}),
    ...((checked || indeterminate) && activeTextStyle ? activeTextStyle : {})
  };
  const containerStyleCombined = {
    ...styles.container,
    flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: labelSpacing,
    alignSelf,
    ...(fullWidth ? styles.fullWidth : {}),
    ...(containerStyle || {}),
    ...((checked || indeterminate) && activeContainerStyle ? activeContainerStyle : {})
  };
  const renderCheckIcon = () => {
    const checkboxSize = Math.max(width || height || sizeStyles.checkboxSize || 24, 24);
    const autoIconSize = Math.max(checkboxSize * 0.6, 12); // 60% of checkbox size, minimum 12

    if (indeterminate) {
      return customIndeterminateIcon || /*#__PURE__*/_react.default.createElement(_reactNative.View
      // eslint-disable-next-line react-native/no-inline-styles
      , {
        style: [styles.indeterminateIcon, {
          width: `${60}%`,
          height: 2
        }]
      });
    }
    if (checked) {
      return customCheckIcon || /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: [styles.checkIconText, {
          fontSize: checkIconSize || autoIconSize,
          color: checkIconColor || '#ffffff',
          lineHeight: autoIconSize * 1.2
        }, checkIconStyle]
      }, checkIconText || '✓');
    }
    return null;
  };
  const renderLabel = () => {
    if (children) {
      return children;
    }
    if (label) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: textStyleCombined
      }, label);
    }
    return null;
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyleCombined
  }, /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, _extends({
    onPress: debouncedOnPress,
    disabled: disabled || !pressable,
    style: checkboxStyleCombined,
    activeOpacity: activeOpacity,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel || label,
    accessibilityHint: accessibilityHint,
    accessibilityState: {
      checked: checked || indeterminate,
      disabled: disabled
    }
  }, touchableProps), renderCheckIcon()), renderLabel());
};
exports.CheckBox = CheckBox;
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: '400',
    flex: 1
  },
  checkIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 18
  },
  indeterminateIcon: {
    width: '60%',
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1
  }
});
//# sourceMappingURL=index.js.map