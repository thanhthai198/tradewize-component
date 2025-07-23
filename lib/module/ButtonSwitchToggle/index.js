function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { View, StyleSheet, Animated, Vibration } from 'react-native';
import { ButtonBase } from '../ButtonBase';
// Custom hook for switch logic
const useSwitchToggle = (value, onValueChange, disabled = false, loading = false, hapticFeedback = false, hapticType = 'light') => {
  const [internalValue, setInternalValue] = useState(value);
  const currentValue = value !== undefined ? value : internalValue;
  const triggerHaptic = useCallback(() => {
    if (hapticFeedback) {
      switch (hapticType) {
        case 'light':
          Vibration.vibrate(10);
          break;
        case 'medium':
          Vibration.vibrate(50);
          break;
        case 'heavy':
          Vibration.vibrate(100);
          break;
      }
    }
  }, [hapticFeedback, hapticType]);
  const handleToggle = useCallback(() => {
    if (disabled || loading) return;
    const newValue = !currentValue;

    // Update internal state if uncontrolled
    if (value === undefined) {
      setInternalValue(newValue);
    }

    // Trigger haptic feedback
    triggerHaptic();

    // Call external callback
    onValueChange === null || onValueChange === void 0 || onValueChange(newValue);
  }, [currentValue, disabled, loading, value, onValueChange, triggerHaptic]);
  return {
    currentValue,
    handleToggle
  };
};

// Custom hook for switch dimensions
const useSwitchDimensions = (size, width, height, thumbSize) => {
  return useMemo(() => {
    var _sizes, _sizes2, _sizes3;
    const sizes = {
      small: {
        width: 44,
        height: 24,
        thumbSize: 20
      },
      medium: {
        width: 52,
        height: 28,
        thumbSize: 24
      },
      large: {
        width: 60,
        height: 32,
        thumbSize: 28
      }
    };
    const dimensions = {
      width: width || ((_sizes = sizes[size]) === null || _sizes === void 0 ? void 0 : _sizes.width) || sizes.medium.width,
      height: height || ((_sizes2 = sizes[size]) === null || _sizes2 === void 0 ? void 0 : _sizes2.height) || sizes.medium.height,
      thumbSize: thumbSize || ((_sizes3 = sizes[size]) === null || _sizes3 === void 0 ? void 0 : _sizes3.thumbSize) || sizes.medium.thumbSize
    };
    return {
      ...dimensions,
      maxTranslateX: dimensions.width - dimensions.thumbSize
    };
  }, [size, width, height, thumbSize]);
};

// Custom hook for switch colors
const useSwitchColors = (variant, currentValue, activeBackgroundColor, inactiveBackgroundColor, thumbColor, activeThumbColor, inactiveThumbColor) => {
  return useMemo(() => {
    const variantColors = {
      primary: {
        active: '#007bff',
        inactive: '#e9ecef'
      },
      secondary: {
        active: '#6c757d',
        inactive: '#e9ecef'
      },
      outline: {
        active: '#007bff',
        inactive: '#e9ecef'
      },
      ghost: {
        active: '#007bff',
        inactive: '#e9ecef'
      },
      danger: {
        active: '#dc3545',
        inactive: '#e9ecef'
      },
      success: {
        active: '#28a745',
        inactive: '#e9ecef'
      },
      warning: {
        active: '#ffc107',
        inactive: '#e9ecef'
      }
    };
    const variantColor = variantColors[variant] || variantColors.primary;
    return {
      backgroundColor: currentValue ? activeBackgroundColor || variantColor.active : inactiveBackgroundColor || variantColor.inactive,
      thumbColor: currentValue ? activeThumbColor || thumbColor || '#ffffff' : inactiveThumbColor || thumbColor || '#ffffff'
    };
  }, [variant, currentValue, activeBackgroundColor, inactiveBackgroundColor, thumbColor, activeThumbColor, inactiveThumbColor]);
};
export const ButtonSwitchToggle = ({
  // Basic props
  value = false,
  onValueChange,
  disabled = false,
  loading = false,
  // Styling props
  size = 'medium',
  variant = 'primary',
  // Custom colors
  activeBackgroundColor,
  inactiveBackgroundColor,
  thumbColor,
  activeThumbColor,
  inactiveThumbColor,
  // Layout props
  width,
  height,
  thumbSize,
  // Custom styles
  style,
  containerStyle,
  // Animation props
  animationDuration = 300,
  useSpringAnimation = false,
  springConfig = {
    tension: 100,
    friction: 8
  },
  // Shadow props
  shadow = false,
  shadowColor = '#000',
  shadowOffset = {
    width: 0,
    height: 2
  },
  shadowOpacity = 0.25,
  shadowRadius = 3.84,
  // Accessibility props
  accessibilityLabel,
  accessibilityHint,
  // Haptic feedback
  hapticFeedback = false,
  hapticType = 'light',
  // Custom components
  customTrack,
  customThumb
}) => {
  // Custom hooks
  const {
    currentValue,
    handleToggle
  } = useSwitchToggle(value, onValueChange, disabled, loading, hapticFeedback, hapticType);
  const {
    width: switchWidth,
    height: switchHeight,
    thumbSize: thumbDiameter,
    maxTranslateX
  } = useSwitchDimensions(size, width, height, thumbSize);
  const {
    backgroundColor,
    thumbColor: currentThumbColor
  } = useSwitchColors(variant, currentValue, activeBackgroundColor, inactiveBackgroundColor, thumbColor, activeThumbColor, inactiveThumbColor);

  // Initialize translateX after maxTranslateX is calculated
  const translateX = useRef(new Animated.Value(currentValue ? maxTranslateX : 0)).current;

  // Animate to position with improved animation
  const animateToPosition = useCallback((toValue, callback) => {
    if (useSpringAnimation) {
      Animated.spring(translateX, {
        toValue,
        useNativeDriver: true,
        ...springConfig
      }).start(callback);
    } else {
      Animated.timing(translateX, {
        toValue,
        duration: animationDuration,
        useNativeDriver: true
      }).start(callback);
    }
  }, [translateX, animationDuration, useSpringAnimation, springConfig]);

  // Update animation when value changes externally
  useEffect(() => {
    const newTranslateX = currentValue ? maxTranslateX : 0;
    animateToPosition(newTranslateX);
  }, [currentValue, maxTranslateX, animateToPosition]);

  // Memoized styles for better performance
  const switchStyle = useMemo(() => ({
    ...styles.switch,
    width: switchWidth,
    height: switchHeight,
    backgroundColor,
    borderRadius: switchHeight / 2,
    ...(shadow && {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
      elevation: shadowRadius
    }),
    ...style
  }), [switchWidth, switchHeight, backgroundColor, shadow, shadowColor, shadowOffset, shadowOpacity, shadowRadius, style]);
  const thumbStyle = useMemo(() => ({
    ...styles.thumb,
    width: thumbDiameter,
    height: thumbDiameter,
    borderRadius: thumbDiameter / 2,
    backgroundColor: currentThumbColor,
    transform: [{
      translateX: translateX.interpolate({
        inputRange: [0, maxTranslateX],
        outputRange: [0, maxTranslateX]
      })
    }]
  }), [thumbDiameter, currentThumbColor, translateX, maxTranslateX]);

  // Accessibility props
  const accessibilityProps = useMemo(() => ({
    accessibilityLabel: accessibilityLabel || `${currentValue ? 'ON' : 'OFF'} toggle switch`,
    accessibilityHint: accessibilityHint || `Double tap to ${currentValue ? 'turn off' : 'turn on'}`,
    accessibilityRole: 'button'
  }), [accessibilityLabel, accessibilityHint, currentValue]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, containerStyle]
  }, /*#__PURE__*/React.createElement(ButtonBase, _extends({
    onPress: handleToggle,
    disabled: disabled || loading,
    activeOpacity: 0.8,
    style: switchStyle
  }, accessibilityProps), customTrack || /*#__PURE__*/React.createElement(Animated.View, {
    style: thumbStyle
  }, customThumb)));
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  switch: {
    position: 'relative',
    justifyContent: 'center'
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  }
});
//# sourceMappingURL=index.js.map