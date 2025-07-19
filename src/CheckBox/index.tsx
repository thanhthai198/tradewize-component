import React, { useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import type { ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import { debounce } from 'lodash';
import ButtonBase from '../ButtonBase';

// Enhanced type definitions
export type CheckBoxVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type CheckBoxSize = 'small' | 'medium' | 'large';

export type CheckBoxShape = 'rounded' | 'square' | 'circle';

interface CheckBoxProps extends TouchableOpacityProps {
  // Basic props
  label?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onValueChange?: (checked: boolean) => void;
  disabled?: boolean;
  disableColorChange?: boolean;

  // Styling props
  variant?: CheckBoxVariant;
  size?: CheckBoxSize;
  shape?: CheckBoxShape;
  backgroundColor?: string;
  checkedBackgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  checkedBorderColor?: string;
  borderRadius?: number;
  width?: number;
  height?: number;

  // Custom state colors
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  disabledBorderColor?: string;
  disabledCheckedBackgroundColor?: string;
  disabledCheckedBorderColor?: string;

  // Active/Checked state UI props
  activeTextStyle?: TextStyle;
  activeContainerStyle?: ViewStyle;
  activeCheckboxStyle?: ViewStyle;
  activeBackgroundColor?: string;
  activeTextColor?: string;
  activeBorderColor?: string;
  activeBorderRadius?: number;
  activeBorderWidth?: number;
  activeShadow?: boolean;
  activeShadowColor?: string;
  activeShadowOffset?: { width: number; height: number };
  activeShadowOpacity?: number;
  activeShadowRadius?: number;

  // Layout props
  fullWidth?: boolean;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  labelPosition?: 'left' | 'right';

  // Custom styles
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;

  // Functionality props
  debounceTime?: number;
  activeOpacity?: number;

  // Content props
  customCheckIcon?: React.ReactNode;
  labelSpacing?: number;
  checkIconText?: string;
  checkIconSize?: number;
  checkIconColor?: string;
  checkIconStyle?: TextStyle;

  // Accessibility props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'checkbox' | 'button' | 'none';

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

  // Checkbox specific props
  indeterminate?: boolean;
  customIndeterminateIcon?: React.ReactNode;
}

const CheckBox: React.FC<CheckBoxProps> = ({
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
  shadowOffset = { width: 0, height: 2 },
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
  const debouncedOnPress = useMemo(
    () =>
      debounce(
        (event: GestureResponderEvent) => {
          if (onPress) {
            onPress(event);
          }
          if (onValueChange) {
            onValueChange(!checked);
          }
        },
        debounceTime,
        {
          leading: true,
          trailing: false,
        }
      ),
    [onPress, onValueChange, checked, debounceTime]
  );

  // Get variant styles - only if variant is provided
  const getVariantStyles = (): {
    backgroundColor?: string;
    checkedBackgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    checkedBorderColor?: string;
  } => {
    if (!variant) return {};

    const variants = {
      primary: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#007bff',
        textColor: '#333333',
        borderColor: '#007bff',
        checkedBorderColor: '#007bff',
      },
      secondary: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#6c757d',
        textColor: '#333333',
        borderColor: '#6c757d',
        checkedBorderColor: '#6c757d',
      },
      success: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#28a745',
        textColor: '#333333',
        borderColor: '#28a745',
        checkedBorderColor: '#28a745',
      },
      warning: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#ffc107',
        textColor: '#333333',
        borderColor: '#ffc107',
        checkedBorderColor: '#ffc107',
      },
      danger: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#dc3545',
        textColor: '#333333',
        borderColor: '#dc3545',
        checkedBorderColor: '#dc3545',
      },
      info: {
        backgroundColor: '#ffffff',
        checkedBackgroundColor: '#17a2b8',
        textColor: '#333333',
        borderColor: '#17a2b8',
        checkedBorderColor: '#17a2b8',
      },
    };
    return variants[variant] || {};
  };

  // Get size styles - only if size is provided
  const getSizeStyles = (): {
    checkboxSize?: number;
    fontSize?: number;
  } => {
    if (!size) return {};

    const sizes = {
      small: { checkboxSize: 16, fontSize: 12 },
      medium: { checkboxSize: 20, fontSize: 14 },
      large: { checkboxSize: 24, fontSize: 16 },
    };
    return sizes[size] || {};
  };

  // Get shape styles - only if shape is provided
  const getShapeStyles = (): { borderRadius?: number } => {
    if (!shape) return {};

    const shapes = {
      rounded: { borderRadius: 4 },
      square: { borderRadius: 0 },
      circle: { borderRadius: 50 },
    };
    return shapes[shape] || {};
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const shapeStyles = getShapeStyles();

  const checkboxStyleCombined: ViewStyle = {
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
        return (
          activeBackgroundColor ||
          checkedBackgroundColor ||
          variantStyles.checkedBackgroundColor ||
          '#007bff'
        );
      }
      return backgroundColor || variantStyles.backgroundColor || '#ffffff';
    })(),
    borderRadius: (() => {
      if (checked || indeterminate) {
        return (
          activeBorderRadius || borderRadius || shapeStyles.borderRadius || 4
        );
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
        return (
          activeBorderColor ||
          checkedBorderColor ||
          variantStyles.checkedBorderColor ||
          '#007bff'
        );
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
      elevation: shadowRadius,
    }),
    ...((checked || indeterminate) &&
      activeShadow && {
        shadowColor: activeShadowColor || shadowColor || '#000',
        shadowOffset: activeShadowOffset ||
          shadowOffset || { width: 0, height: 2 },
        shadowOpacity: activeShadowOpacity || shadowOpacity || 0.25,
        shadowRadius: activeShadowRadius || shadowRadius || 3.84,
        elevation: activeShadowRadius || shadowRadius || 3.84,
      }),
    ...(checkboxStyle || {}),
    ...((checked || indeterminate) && activeCheckboxStyle
      ? activeCheckboxStyle
      : {}),
  };

  const textStyleCombined: TextStyle = {
    ...styles.text,
    color: (() => {
      if (disabled && !disableColorChange && disabledTextColor) {
        return disabledTextColor;
      }
      if (checked || indeterminate) {
        return (
          activeTextColor || textColor || variantStyles.textColor || '#333333'
        );
      }
      return textColor || variantStyles.textColor || '#333333';
    })(),
    ...(sizeStyles.fontSize && { fontSize: sizeStyles.fontSize }),
    ...(textStyle || {}),
    ...((checked || indeterminate) && activeTextStyle ? activeTextStyle : {}),
  };

  const containerStyleCombined: ViewStyle = {
    ...styles.container,
    flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: labelSpacing,
    alignSelf,
    ...(fullWidth ? styles.fullWidth : {}),
    ...(containerStyle || {}),
    ...((checked || indeterminate) && activeContainerStyle
      ? activeContainerStyle
      : {}),
  };

  const renderCheckIcon = () => {
    const checkboxSize = Math.max(
      width || height || sizeStyles.checkboxSize || 24,
      24
    );
    const autoIconSize = Math.max(checkboxSize * 0.6, 12); // 60% of checkbox size, minimum 12

    if (indeterminate) {
      return (
        customIndeterminateIcon || (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.indeterminateIcon, { width: `${60}%`, height: 2 }]}
          />
        )
      );
    }

    if (checked) {
      return (
        customCheckIcon || (
          <Text
            style={[
              styles.checkIconText,
              {
                fontSize: checkIconSize || autoIconSize,
                color: checkIconColor || '#ffffff',
                lineHeight: autoIconSize * 1.2,
              },
              checkIconStyle,
            ]}
          >
            {checkIconText || '✓'}
          </Text>
        )
      );
    }

    return null;
  };

  const renderLabel = () => {
    if (children) {
      return children;
    }

    if (label) {
      return <Text style={textStyleCombined}>{label}</Text>;
    }

    return null;
  };

  return (
    <View style={containerStyleCombined}>
      <ButtonBase
        onPress={debouncedOnPress}
        disabled={disabled || !pressable}
        style={checkboxStyleCombined as any}
        activeOpacity={activeOpacity}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{
          checked: checked || indeterminate,
          disabled: disabled,
        }}
        {...touchableProps}
      >
        {renderCheckIcon()}
      </ButtonBase>
      {renderLabel()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '400',
    flex: 1,
  },
  checkIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 18,
  },
  indeterminateIcon: {
    width: '60%',
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
});

export default CheckBox;
