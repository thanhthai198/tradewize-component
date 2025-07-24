"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonBase = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _lodash = require("lodash");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Enhanced type definitions

const ButtonBase = ({
  // Basic props
  title,
  children,
  onPress,
  disabled = false,
  loading = false,
  disableColorChange = true,
  // Styling props
  variant,
  size,
  shape,
  backgroundColor,
  textColor,
  borderColor,
  borderRadius,
  // Custom state colors
  disabledBackgroundColor,
  disabledTextColor,
  disabledBorderColor,
  loadingBackgroundColor,
  loadingTextColor,
  loadingBorderColor,
  // Layout props
  fullWidth = false,
  alignSelf = 'auto',
  // Custom styles
  style,
  textStyle,
  containerStyle,
  // Functionality props
  debounceTime = 500,
  activeOpacity = 0.7,
  // Content props
  leftIcon,
  rightIcon,
  iconSpacing = 8,
  customLoadingComponent,
  // Accessibility props
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
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
  borderWidth = 0,
  borderStyle = 'solid',
  // Spread all remaining TouchableOpacity props
  ...touchableProps
}) => {
  const debouncedOnPress = (0, _react.useMemo)(() => (0, _lodash.debounce)(onPress || (() => {}), debounceTime, {
    leading: true,
    trailing: false
  }), [onPress, debounceTime]);

  // Get variant styles - only if variant is provided
  const getVariantStyles = () => {
    if (!variant) return {};
    const variants = {
      primary: {
        backgroundColor: '#007bff',
        textColor: '#ffffff'
      },
      secondary: {
        backgroundColor: '#6c757d',
        textColor: '#ffffff'
      },
      outline: {
        backgroundColor: 'transparent',
        textColor: '#007bff',
        borderColor: '#007bff'
      },
      ghost: {
        backgroundColor: 'transparent',
        textColor: '#007bff'
      },
      danger: {
        backgroundColor: '#dc3545',
        textColor: '#ffffff'
      },
      success: {
        backgroundColor: '#28a745',
        textColor: '#ffffff'
      },
      warning: {
        backgroundColor: '#ffc107',
        textColor: '#212529'
      }
    };
    return variants[variant] || {};
  };

  // Get size styles - only if size is provided
  const getSizeStyles = () => {
    if (!size) return {};
    const sizes = {
      small: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        fontSize: 12
      },
      medium: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16
      },
      large: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        fontSize: 18
      },
      xlarge: {
        paddingVertical: 20,
        paddingHorizontal: 32,
        fontSize: 20
      }
    };
    return sizes[size] || {};
  };

  // Get shape styles - only if shape is provided
  const getShapeStyles = () => {
    if (!shape) return {};
    const shapes = {
      rounded: {
        borderRadius: 8
      },
      pill: {
        borderRadius: 50
      },
      square: {
        borderRadius: 0
      }
    };
    return shapes[shape] || {};
  };
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const shapeStyles = getShapeStyles();
  const buttonStyle = [styles.button, {
    backgroundColor: (() => {
      if (loading && loadingBackgroundColor) {
        return loadingBackgroundColor;
      }
      if (disabled && !disableColorChange) {
        return disabledBackgroundColor || styles.disabledButton.backgroundColor;
      }
      return backgroundColor || variantStyles.backgroundColor;
    })(),
    borderRadius: borderRadius || shapeStyles.borderRadius,
    ...(sizeStyles.paddingVertical && {
      paddingVertical: sizeStyles.paddingVertical
    }),
    ...(sizeStyles.paddingHorizontal && {
      paddingHorizontal: sizeStyles.paddingHorizontal
    }),
    alignSelf,
    borderWidth: borderWidth || (variant === 'outline' ? 1 : 0),
    borderColor: (() => {
      if (loading && loadingBorderColor) {
        return loadingBorderColor;
      }
      if (disabled && !disableColorChange && disabledBorderColor) {
        return disabledBorderColor;
      }
      return borderColor || variantStyles.borderColor || variantStyles.backgroundColor;
    })(),
    borderStyle
  }, fullWidth && styles.fullWidth, shadow && {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation: shadowRadius
  }, style];
  const textStyleCombined = [styles.text, {
    color: (() => {
      if (loading && loadingTextColor) {
        return loadingTextColor;
      }
      if (disabled && !disableColorChange && disabledTextColor) {
        return disabledTextColor;
      }
      return textColor || variantStyles.textColor;
    })(),
    fontSize: sizeStyles.fontSize
  }, ...(textStyle ? Array.isArray(textStyle) ? textStyle : [textStyle] : [])];
  const renderContent = () => {
    // If children are provided, render them directly
    if (children) {
      return children;
    }

    // Always use the same content container structure to maintain button size
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.contentContainer, {
        gap: iconSpacing
      }]
    }, leftIcon && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.iconContainer
    }, leftIcon), loading ? customLoadingComponent || /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      color: (() => {
        if (loadingTextColor) {
          return loadingTextColor;
        }
        if (disabled && !disableColorChange && disabledTextColor) {
          return disabledTextColor;
        }
        return textColor || variantStyles.textColor;
      })()
    }) : title && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: textStyleCombined
    }, title), rightIcon && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.iconContainer
    }, rightIcon));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, _extends({
    onPress: debouncedOnPress,
    disabled: disabled || loading || !pressable,
    style: buttonStyle,
    activeOpacity: activeOpacity,
    accessibilityLabel: accessibilityLabel || title,
    accessibilityHint: accessibilityHint,
    accessibilityRole: accessibilityRole,
    accessibilityState: {
      disabled: disabled || loading
    }
  }, touchableProps), renderContent()));
};
exports.ButtonBase = ButtonBase;
const styles = _reactNative.StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  disabledButton: {
    backgroundColor: '#cccccc'
  },
  loadingButton: {
    opacity: 0.7
  },
  text: {
    fontWeight: '600',
    textAlign: 'center'
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=index.js.map