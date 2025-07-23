import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { ButtonBase } from '../ButtonBase';
export const RadioButton = ({
  value,
  label,
  selected = false,
  disabled = false,
  groupValue,
  onValueChange,
  size = 'medium',
  variant = 'default',
  selectedColor = '#007bff',
  unselectedColor = '#e9ecef',
  disabledColor = '#f8f9fa',
  textColor = '#212529',
  selectedTextColor = '#007bff',
  fullWidth = false,
  alignSelf = 'auto',
  style,
  containerStyle,
  animationDuration = 200,
  animationEasing = 'ease-out',
  enableAnimation = true,
  accessibilityLabel,
  accessibilityHint
}) => {
  // Animation refs
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  // Determine if this radio button is selected based on group value or individual selected prop
  const isSelected = groupValue ? groupValue === value : selected;

  // Handle press event with animation
  const handlePress = () => {
    if (!disabled && onValueChange) {
      // Trigger press animation
      if (enableAnimation) {
        Animated.sequence([Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: false
        }), Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: false
        })]).start();
      }
      onValueChange === null || onValueChange === void 0 || onValueChange(value || '');
    }
  };

  // Animate selection state changes
  useEffect(() => {
    const getEasingFunction = easingType => {
      const easingMap = {
        linear: Easing.linear,
        ease: Easing.ease,
        bounce: Easing.bounce,
        elastic: Easing.elastic(1)
      };
      return easingMap[easingType] || Easing.ease;
    };
    if (enableAnimation) {
      // Animate inner circle opacity
      Animated.timing(opacityAnim, {
        toValue: isSelected ? 1 : 0,
        duration: animationDuration,
        easing: getEasingFunction(animationEasing),
        useNativeDriver: false
      }).start();

      // Animate border color transition
      Animated.timing(borderAnim, {
        toValue: isSelected ? 1 : 0,
        duration: animationDuration,
        easing: getEasingFunction(animationEasing),
        useNativeDriver: false
      }).start();
    } else {
      // Set values immediately without animation
      opacityAnim.setValue(isSelected ? 1 : 0);
      borderAnim.setValue(isSelected ? 1 : 0);
    }
  }, [isSelected, enableAnimation, animationDuration, animationEasing, opacityAnim, borderAnim]);

  // Get size-specific styles
  const getSizeStyles = () => {
    const sizes = {
      small: {
        radioSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        iconSize: 8
      },
      medium: {
        radioSize: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        iconSize: 10
      },
      large: {
        radioSize: 24,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 18,
        iconSize: 12
      }
    };
    return sizes[size];
  };
  const sizeStyles = getSizeStyles();

  // Create animated radio button icon
  // eslint-disable-next-line react/no-unstable-nested-components
  const RadioIcon = () => {
    const animatedBorderColor = borderAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [disabled ? disabledColor : unselectedColor, disabled ? disabledColor : selectedColor]
    });
    const animatedBackgroundColor = borderAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [disabled ? disabledColor : 'transparent', disabled ? disabledColor : selectedColor]
    });
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.radioOuter, {
        width: sizeStyles.radioSize,
        height: sizeStyles.radioSize,
        borderRadius: sizeStyles.radioSize / 2,
        borderColor: animatedBorderColor,
        backgroundColor: animatedBackgroundColor,
        transform: [{
          scale: scaleAnim
        }]
      }]
    }, /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.radioInner,
      // eslint-disable-next-line react-native/no-inline-styles
      {
        width: sizeStyles.iconSize,
        height: sizeStyles.iconSize,
        borderRadius: sizeStyles.iconSize / 2,
        backgroundColor: variant === 'filled' ? '#ffffff' : selectedColor,
        opacity: opacityAnim,
        transform: [{
          scale: opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
          })
        }]
      }]
    }));
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, containerStyle]
  }, /*#__PURE__*/React.createElement(ButtonBase, {
    onPress: handlePress,
    disabled: disabled,
    variant: "ghost",
    size: size,
    shape: "rounded",
    fullWidth: fullWidth,
    alignSelf: alignSelf,
    leftIcon: /*#__PURE__*/React.createElement(RadioIcon, null),
    iconSpacing: 12,
    title: label,
    textColor: disabled ? disabledColor : isSelected ? selectedTextColor : textColor,
    style: {
      ...styles.button,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      paddingVertical: sizeStyles.paddingVertical,
      ...style
    },
    textStyle: {
      ...styles.text,
      fontSize: sizeStyles.fontSize
    },
    accessibilityLabel: accessibilityLabel || `${label || 'Radio button'} ${isSelected ? 'selected' : 'not selected'}`,
    accessibilityHint: accessibilityHint || `Double tap to ${isSelected ? 'deselect' : 'select'} this option`,
    accessibilityState: {
      checked: isSelected,
      disabled: disabled
    }
  }));
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontWeight: '400',
    textAlign: 'left'
  },
  radioOuter: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioInner: {
    backgroundColor: '#ffffff'
  }
});
//# sourceMappingURL=index.js.map