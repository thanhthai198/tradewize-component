import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import type { ViewStyle } from 'react-native';

export interface ButtonSwitchToggleProps {
  // Basic props
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  loading?: boolean;

  // Styling props
  size?: 'small' | 'medium' | 'large';
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'warning';

  // Custom colors
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  thumbColor?: string;
  activeThumbColor?: string;
  inactiveThumbColor?: string;

  // Layout props
  width?: number;
  height?: number;
  thumbSize?: number;

  // Custom styles
  style?: ViewStyle;
  containerStyle?: ViewStyle;

  // Animation props
  animationDuration?: number;
  useSpringAnimation?: boolean;
  springConfig?: {
    tension?: number;
    friction?: number;
  };

  // Shadow props
  shadow?: boolean;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;

  // Accessibility props
  accessibilityLabel?: string;
  accessibilityHint?: string;

  // Haptic feedback
  hapticFeedback?: boolean;
  hapticType?: 'light' | 'medium' | 'heavy';

  // Custom components
  customTrack?: React.ReactNode;
  customThumb?: React.ReactNode;
}

// Custom hook for switch logic
const useSwitchToggle = (
  value: boolean,
  onValueChange?: (value: boolean) => void,
  disabled = false,
  loading = false,
  hapticFeedback = false,
  hapticType: 'light' | 'medium' | 'heavy' = 'light'
) => {
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
    onValueChange?.(newValue);
  }, [currentValue, disabled, loading, value, onValueChange, triggerHaptic]);

  return {
    currentValue,
    handleToggle,
  };
};

// Custom hook for switch dimensions
const useSwitchDimensions = (
  size: string,
  width?: number,
  height?: number,
  thumbSize?: number
) => {
  return useMemo(() => {
    const sizes = {
      small: { width: 44, height: 24, thumbSize: 20 },
      medium: { width: 52, height: 28, thumbSize: 24 },
      large: { width: 60, height: 32, thumbSize: 28 },
    };

    const dimensions = {
      width:
        width || sizes[size as keyof typeof sizes]?.width || sizes.medium.width,
      height:
        height ||
        sizes[size as keyof typeof sizes]?.height ||
        sizes.medium.height,
      thumbSize:
        thumbSize ||
        sizes[size as keyof typeof sizes]?.thumbSize ||
        sizes.medium.thumbSize,
    };

    return {
      ...dimensions,
      maxTranslateX: dimensions.width - dimensions.thumbSize,
    };
  }, [size, width, height, thumbSize]);
};

// Custom hook for switch colors
const useSwitchColors = (
  variant: string,
  currentValue: boolean,
  activeBackgroundColor?: string,
  inactiveBackgroundColor?: string,
  thumbColor?: string,
  activeThumbColor?: string,
  inactiveThumbColor?: string
) => {
  return useMemo(() => {
    const variantColors = {
      primary: { active: '#007bff', inactive: '#e9ecef' },
      secondary: { active: '#6c757d', inactive: '#e9ecef' },
      outline: { active: '#007bff', inactive: '#e9ecef' },
      ghost: { active: '#007bff', inactive: '#e9ecef' },
      danger: { active: '#dc3545', inactive: '#e9ecef' },
      success: { active: '#28a745', inactive: '#e9ecef' },
      warning: { active: '#ffc107', inactive: '#e9ecef' },
    };

    const variantColor =
      variantColors[variant as keyof typeof variantColors] ||
      variantColors.primary;

    return {
      backgroundColor: currentValue
        ? activeBackgroundColor || variantColor.active
        : inactiveBackgroundColor || variantColor.inactive,
      thumbColor: currentValue
        ? activeThumbColor || thumbColor || '#ffffff'
        : inactiveThumbColor || thumbColor || '#ffffff',
    };
  }, [
    variant,
    currentValue,
    activeBackgroundColor,
    inactiveBackgroundColor,
    thumbColor,
    activeThumbColor,
    inactiveThumbColor,
  ]);
};

const ButtonSwitchToggle: React.FC<ButtonSwitchToggleProps> = ({
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
  springConfig = { tension: 100, friction: 8 },

  // Shadow props
  shadow = false,
  shadowColor = '#000',
  shadowOffset = { width: 0, height: 2 },
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
  customThumb,
}) => {
  // Custom hooks
  const { currentValue, handleToggle } = useSwitchToggle(
    value,
    onValueChange,
    disabled,
    loading,
    hapticFeedback,
    hapticType
  );

  const {
    width: switchWidth,
    height: switchHeight,
    thumbSize: thumbDiameter,
    maxTranslateX,
  } = useSwitchDimensions(size, width, height, thumbSize);

  const { backgroundColor, thumbColor: currentThumbColor } = useSwitchColors(
    variant,
    currentValue,
    activeBackgroundColor,
    inactiveBackgroundColor,
    thumbColor,
    activeThumbColor,
    inactiveThumbColor
  );

  // Initialize translateX after maxTranslateX is calculated
  const translateX = useRef(
    new Animated.Value(currentValue ? maxTranslateX : 0)
  ).current;

  // Animate to position with improved animation
  const animateToPosition = useCallback(
    (toValue: number, callback?: () => void) => {
      if (useSpringAnimation) {
        Animated.spring(translateX, {
          toValue,
          useNativeDriver: true,
          ...springConfig,
        }).start(callback);
      } else {
        Animated.timing(translateX, {
          toValue,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(callback);
      }
    },
    [translateX, animationDuration, useSpringAnimation, springConfig]
  );

  // Update animation when value changes externally
  useEffect(() => {
    const newTranslateX = currentValue ? maxTranslateX : 0;
    animateToPosition(newTranslateX);
  }, [currentValue, maxTranslateX, animateToPosition]);

  // Memoized styles for better performance
  const switchStyle = useMemo(
    (): ViewStyle[] => [
      styles.switch,
      {
        width: switchWidth,
        height: switchHeight,
        backgroundColor,
        borderRadius: switchHeight / 2,
        ...(shadow && {
          shadowColor,
          shadowOffset,
          shadowOpacity,
          shadowRadius,
          elevation: shadowRadius,
        }),
      },
      ...(style ? [style] : []),
    ],
    [
      switchWidth,
      switchHeight,
      backgroundColor,
      shadow,
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
      style,
    ]
  );

  const thumbStyle = useMemo(
    (): ViewStyle[] => [
      styles.thumb,
      {
        width: thumbDiameter,
        height: thumbDiameter,
        borderRadius: thumbDiameter / 2,
        backgroundColor: currentThumbColor,
        transform: [
          {
            translateX: translateX.interpolate({
              inputRange: [0, maxTranslateX],
              outputRange: [0, maxTranslateX],
            }),
          },
        ],
      },
    ],
    [thumbDiameter, currentThumbColor, translateX, maxTranslateX]
  );

  // Accessibility props
  const accessibilityProps = useMemo(
    () => ({
      accessibilityLabel:
        accessibilityLabel || `${currentValue ? 'ON' : 'OFF'} toggle switch`,
      accessibilityHint:
        accessibilityHint ||
        `Double tap to ${currentValue ? 'turn off' : 'turn on'}`,
      accessibilityRole: 'switch' as const,
      accessibilityState: { checked: currentValue },
      accessibilityActions: [
        { name: 'activate', label: currentValue ? 'Turn off' : 'Turn on' },
      ],
    }),
    [accessibilityLabel, accessibilityHint, currentValue]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={handleToggle}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={switchStyle}
        {...accessibilityProps}
      >
        {customTrack || (
          <Animated.View style={thumbStyle}>{customThumb}</Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch: {
    position: 'relative',
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ButtonSwitchToggle;
