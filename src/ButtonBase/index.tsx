import React, { useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import type { ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import { debounce } from 'lodash';

// Enhanced type definitions
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonShape = 'rounded' | 'pill' | 'square';

interface ButtonBaseProps extends TouchableOpacityProps {
  // Basic props
  title?: string;
  children?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  disableColorChange?: boolean;

  // Styling props
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: number;

  // Custom state colors
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  disabledBorderColor?: string;
  loadingBackgroundColor?: string;
  loadingTextColor?: string;
  loadingBorderColor?: string;

  // Layout props
  fullWidth?: boolean;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';

  // Custom styles
  style?: ViewStyle;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;

  // Functionality props
  debounceTime?: number;
  activeOpacity?: number;

  // Content props
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconSpacing?: number;
  customLoadingComponent?: React.ReactNode;

  // Accessibility props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'link' | 'none' | 'checkbox';

  // Animation props
  pressable?: boolean;

  // Shadow props
  shadow?: boolean;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;

  // Border props
  borderWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
}

export const ButtonBase: React.FC<ButtonBaseProps> = ({
  // Basic props
  title,
  children,
  onPress,
  disabled = false,
  loading = false,
  disableColorChange = false,

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
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 0.25,
  shadowRadius = 3.84,

  // Border props
  borderWidth = 0,
  borderStyle = 'solid',

  // Spread all remaining TouchableOpacity props
  ...touchableProps
}) => {
  const debouncedOnPress = useMemo(
    () =>
      debounce(onPress || (() => {}), debounceTime, {
        leading: true,
        trailing: false,
      }),
    [onPress, debounceTime]
  );

  // Get variant styles - only if variant is provided
  const getVariantStyles = (): {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  } => {
    if (!variant) return {};

    const variants = {
      primary: { backgroundColor: '#007bff', textColor: '#ffffff' },
      secondary: { backgroundColor: '#6c757d', textColor: '#ffffff' },
      outline: {
        backgroundColor: 'transparent',
        textColor: '#007bff',
        borderColor: '#007bff',
      },
      ghost: { backgroundColor: 'transparent', textColor: '#007bff' },
      danger: { backgroundColor: '#dc3545', textColor: '#ffffff' },
      success: { backgroundColor: '#28a745', textColor: '#ffffff' },
      warning: { backgroundColor: '#ffc107', textColor: '#212529' },
    };
    return variants[variant] || {};
  };

  // Get size styles - only if size is provided
  const getSizeStyles = (): {
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontSize?: number;
  } => {
    if (!size) return {};

    const sizes = {
      small: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 12 },
      medium: { paddingVertical: 12, paddingHorizontal: 16, fontSize: 16 },
      large: { paddingVertical: 16, paddingHorizontal: 24, fontSize: 18 },
      xlarge: { paddingVertical: 20, paddingHorizontal: 32, fontSize: 20 },
    };
    return sizes[size] || {};
  };

  // Get shape styles - only if shape is provided
  const getShapeStyles = (): { borderRadius?: number } => {
    if (!shape) return {};

    const shapes = {
      rounded: { borderRadius: 8 },
      pill: { borderRadius: 50 },
      square: { borderRadius: 0 },
    };
    return shapes[shape] || {};
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const shapeStyles = getShapeStyles();

  const buttonStyle: ViewStyle[] = [
    styles.button,
    {
      backgroundColor: (() => {
        if (loading && loadingBackgroundColor) {
          return loadingBackgroundColor;
        }
        if (disabled && !disableColorChange) {
          return (
            disabledBackgroundColor || styles.disabledButton.backgroundColor
          );
        }
        return backgroundColor || variantStyles.backgroundColor;
      })(),
      borderRadius: borderRadius || shapeStyles.borderRadius,
      ...(sizeStyles.paddingVertical && {
        paddingVertical: sizeStyles.paddingVertical,
      }),
      ...(sizeStyles.paddingHorizontal && {
        paddingHorizontal: sizeStyles.paddingHorizontal,
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
        return (
          borderColor ||
          variantStyles.borderColor ||
          variantStyles.backgroundColor
        );
      })(),
      borderStyle,
    },
    ...(fullWidth ? [styles.fullWidth] : []),
    ...(shadow
      ? [
          {
            shadowColor,
            shadowOffset,
            shadowOpacity,
            shadowRadius,
            elevation: shadowRadius,
          },
        ]
      : []),
    ...(style ? [style] : []),
  ];

  const textStyleCombined: TextStyle[] = [
    styles.text,
    {
      color: (() => {
        if (loading && loadingTextColor) {
          return loadingTextColor;
        }
        if (disabled && !disableColorChange && disabledTextColor) {
          return disabledTextColor;
        }
        return textColor || variantStyles.textColor;
      })(),
      ...(sizeStyles.fontSize && { fontSize: sizeStyles.fontSize }),
    },
    ...(textStyle ? [textStyle] : []),
  ];

  const renderContent = () => {
    // If children are provided, render them directly
    if (children) {
      return children;
    }

    // Always use the same content container structure to maintain button size
    return (
      <View style={[styles.contentContainer, { gap: iconSpacing }]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        {loading
          ? customLoadingComponent || (
              <ActivityIndicator
                color={(() => {
                  if (loadingTextColor) {
                    return loadingTextColor;
                  }
                  if (disabled && !disableColorChange && disabledTextColor) {
                    return disabledTextColor;
                  }
                  return textColor || variantStyles.textColor;
                })()}
              />
            )
          : title && <Text style={textStyleCombined}>{title}</Text>}
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={debouncedOnPress}
        disabled={disabled || loading || !pressable}
        style={buttonStyle}
        activeOpacity={activeOpacity}
        accessibilityLabel={accessibilityLabel || title}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: disabled || loading }}
        {...touchableProps}
      >
        {renderContent()}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  loadingButton: {
    opacity: 0.7,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
