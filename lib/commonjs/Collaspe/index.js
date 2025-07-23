"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collapse = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ButtonBase = require("../ButtonBase");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Enable LayoutAnimation on Android
if (_reactNative.Platform.OS === 'android' && _reactNative.UIManager.setLayoutAnimationEnabledExperimental) {
  _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Enhanced type definitions

const Collapse = ({
  // Basic props
  title,
  children,
  defaultExpanded = false,
  disabled = false,
  // Styling props
  variant = 'default',
  size,
  backgroundColor,
  titleColor,
  borderColor,
  borderRadius,
  // Custom state colors
  disabledBackgroundColor,
  disabledTitleColor,
  disabledBorderColor,
  // Layout props
  fullWidth = false,
  alignSelf = 'auto',
  // Custom styles
  style,
  titleStyle,
  contentStyle,
  containerStyle,
  // Functionality props
  onToggle,
  animated = true,
  animationDuration = 300,
  // Content props
  leftIcon,
  rightIcon,
  customExpandIcon,
  customCollapseIcon,
  iconPosition = 'right',
  iconSpacing = 8,
  customHeader,
  // Accessibility props
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
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
  // Content props
  showDivider = false,
  dividerColor = '#e0e0e0',
  dividerWidth = 1,
  // Spread all remaining props
  ...restProps
}) => {
  const [expanded, setExpanded] = (0, _react.useState)(defaultExpanded);
  const animatedHeight = (0, _react.useRef)(new _reactNative.Animated.Value(defaultExpanded ? 1 : 0)).current;
  const rotateAnimation = (0, _react.useRef)(new _reactNative.Animated.Value(defaultExpanded ? 1 : 0)).current;

  // Get variant styles
  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: '#ffffff',
        borderWidth: 0
      },
      bordered: {
        backgroundColor: '#ffffff',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8
      },
      elevated: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 8
      },
      flat: {
        backgroundColor: '#f8f9fa',
        borderWidth: 0
      }
    };
    return variants[variant] || {};
  };

  // Get size styles
  const getSizeStyles = () => {
    if (!size) return {};
    const sizes = {
      small: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        minHeight: 40
      },
      medium: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        minHeight: 48
      },
      large: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 18,
        minHeight: 56
      }
    };
    return sizes[size] || {};
  };
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle === null || onToggle === void 0 || onToggle(newExpanded);
    if (animated) {
      // Animate height
      _reactNative.Animated.timing(animatedHeight, {
        toValue: newExpanded ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: false
      }).start();

      // Animate rotation
      _reactNative.Animated.timing(rotateAnimation, {
        toValue: newExpanded ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true
      }).start();

      // Layout animation for smooth transition
      _reactNative.LayoutAnimation.configureNext(_reactNative.LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  // Animated icon
  const animatedIcon = /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.icon, {
      transform: [{
        rotate: rotateAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg']
        })
      }]
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.iconText
  }, "\u25BC"));
  const collapseStyle = [styles.collapse, {
    backgroundColor: (() => {
      if (disabled && disabledBackgroundColor) {
        return disabledBackgroundColor;
      }
      return backgroundColor || variantStyles.backgroundColor;
    })(),
    borderRadius: borderRadius || variantStyles.borderRadius,
    ...(sizeStyles.paddingVertical && {
      paddingVertical: sizeStyles.paddingVertical
    }),
    ...(sizeStyles.paddingHorizontal && {
      paddingHorizontal: sizeStyles.paddingHorizontal
    }),
    ...(sizeStyles.minHeight && {
      minHeight: sizeStyles.minHeight
    }),
    alignSelf,
    borderWidth: borderWidth || variantStyles.borderWidth || 0,
    borderColor: (() => {
      if (disabled && disabledBorderColor) {
        return disabledBorderColor;
      }
      return borderColor || variantStyles.borderColor;
    })(),
    borderStyle
  }, ...(fullWidth ? [styles.fullWidth] : []), ...(shadow ? [{
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation: shadowRadius
  }] : []), ...(style ? [style] : [])];
  const titleStyleCombined = [styles.title, {
    color: (() => {
      if (disabled && disabledTitleColor) {
        return disabledTitleColor;
      }
      return titleColor || '#333333';
    })(),
    ...(sizeStyles.fontSize && {
      fontSize: sizeStyles.fontSize
    })
  }, ...(titleStyle ? [titleStyle] : [])];
  const renderHeader = () => {
    // If custom header is provided, use it
    if (customHeader) {
      return /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, _extends({
        onPress: handleToggle,
        disabled: disabled,
        style: styles.header,
        activeOpacity: 0.7,
        accessibilityLabel: accessibilityLabel || title,
        accessibilityHint: accessibilityHint,
        accessibilityRole: accessibilityRole,
        accessibilityState: {
          expanded,
          disabled
        }
      }, restProps), customHeader);
    }

    // Default header
    const iconToShow = customExpandIcon && customCollapseIcon ? expanded ? customCollapseIcon : customExpandIcon : animatedIcon;
    const headerContent = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.headerContent, {
        gap: iconSpacing
      }]
    }, iconPosition === 'left' && iconToShow, leftIcon && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.iconContainer
    }, leftIcon), title && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: titleStyleCombined
    }, title), rightIcon && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.iconContainer
    }, rightIcon), iconPosition === 'right' && iconToShow);
    return /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, _extends({
      onPress: handleToggle,
      disabled: disabled,
      style: styles.header,
      activeOpacity: 0.7,
      accessibilityLabel: accessibilityLabel || title,
      accessibilityHint: accessibilityHint,
      accessibilityRole: accessibilityRole,
      accessibilityState: {
        expanded,
        disabled
      }
    }, restProps), headerContent);
  };
  const renderContent = () => {
    if (!children) return null;
    const contentContainerStyle = [styles.content, {
      paddingHorizontal: sizeStyles.paddingHorizontal || 0,
      paddingBottom: sizeStyles.paddingVertical || 0
    }, ...(contentStyle ? [contentStyle] : [])];
    if (animated) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: [contentContainerStyle, {
          opacity: animatedHeight,
          maxHeight: animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1000] // Large enough to accommodate content
          })
        }]
      }, children);
    }
    return expanded ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: contentContainerStyle
    }, children) : null;
  };
  const renderDivider = () => {
    if (!showDivider || !expanded) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.divider, {
        backgroundColor: dividerColor,
        height: dividerWidth
      }]
    });
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: collapseStyle
  }, renderHeader(), renderDivider(), renderContent()));
};
exports.Collapse = Collapse;
const styles = _reactNative.StyleSheet.create({
  collapse: {
    overflow: 'hidden'
  },
  fullWidth: {
    width: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontWeight: '500'
  },
  content: {
    overflow: 'hidden'
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20
  },
  iconText: {
    fontSize: 12,
    color: '#666666'
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    marginHorizontal: 16,
    marginVertical: 8
  }
});

// Export types
//# sourceMappingURL=index.js.map