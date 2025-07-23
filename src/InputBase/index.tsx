import React, { useState, useRef, forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import type {
  TextInputProps,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';

// Enhanced type definitions
export type InputVariant = 'outlined' | 'filled' | 'underlined';
export type InputSize = 'small' | 'medium' | 'large';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'phone'
  | 'url';

interface InputBaseProps extends Omit<TextInputProps, 'style'> {
  // Basic props
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;

  // Styling props
  variant?: InputVariant;
  size?: InputSize;
  type?: InputType;

  // Colors
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  textColor?: ColorValue;
  placeholderColor?: ColorValue;
  labelColor?: ColorValue;
  focusColor?: ColorValue;
  errorColor?: ColorValue;

  // States
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  readonly?: boolean;

  // Layout props
  fullWidth?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;

  // Custom styles
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  containerStyle?: ViewStyle;

  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;

  // Animation
  animated?: boolean;
  floatingLabel?: boolean;

  // Validation
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validator?: (value: string) => string | null;

  // Accessibility
  accessibilityLabel?: string;
  accessibilityHint?: string;

  // Border props
  borderRadius?: number;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';

  // Shadow props
  shadow?: boolean;
  shadowColor?: ColorValue;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;

  // Spacing
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  _padding?: number;
  _paddingTop?: number;
  _paddingBottom?: number;
  _paddingLeft?: number;
  _paddingRight?: number;
}

export const InputBase = forwardRef<TextInput, InputBaseProps>(
  (
    {
      // Basic props
      label,
      placeholder,
      value,
      defaultValue,
      onChangeText,
      onFocus,
      onBlur,

      // Styling props
      variant = 'outlined',
      size = 'medium',
      type = 'text',

      // Colors
      backgroundColor,
      borderColor,
      textColor,
      placeholderColor,
      labelColor,
      focusColor,
      errorColor = '#ff3b30',

      // States
      disabled = false,
      error = false,
      errorMessage,
      required = false,
      readonly = false,

      // Layout props
      fullWidth = false,
      multiline = false,
      numberOfLines = 1,
      maxLength,

      // Custom styles
      style,
      inputStyle,
      labelStyle,
      errorStyle,
      containerStyle,

      // Icons
      leftIcon,
      rightIcon,
      onRightIconPress,
      onLeftIconPress,

      // Animation
      animated = true,
      floatingLabel = false,

      // Validation
      validateOnBlur = false,
      validateOnChange = false,
      validator,

      // Accessibility
      accessibilityLabel,
      accessibilityHint,

      // Border props
      borderRadius,
      borderWidth = 1,
      borderStyle = 'solid',

      // Shadow props
      shadow = false,
      shadowColor = '#000',
      shadowOffset = { width: 0, height: 2 },
      shadowOpacity = 0.25,
      shadowRadius = 3.84,

      // Spacing
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      _padding,
      _paddingTop,
      _paddingBottom,
      _paddingLeft,
      _paddingRight,

      // Spread all remaining TextInput props
      ...textInputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [internalError, setInternalError] = useState<string | null>(null);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const inputRef = useRef<TextInput>(null);

    const currentValue = value !== undefined ? value : internalValue;
    const hasError = error || internalError;
    const errorText = errorMessage || internalError;

    // Determine placeholder text - use label as placeholder if no value and label exists
    const placeholderText = currentValue ? placeholder : label || placeholder;
    const shouldShowPlaceholder = !currentValue && !isFocused;

    // Animation for focus/blur
    React.useEffect(() => {
      if (animated) {
        Animated.timing(animatedValue, {
          toValue: isFocused ? 1 : 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }, [isFocused, animated, animatedValue]);

    // Get variant styles
    const getVariantStyles = (): {
      backgroundColor?: ColorValue;
      borderColor?: ColorValue;
      borderWidth?: number;
    } => {
      const baseBorderColor = hasError ? errorColor : borderColor;
      const focusBorderColor = focusColor || '#007AFF';

      switch (variant) {
        case 'filled':
          return {
            backgroundColor: backgroundColor || '#F2F2F7',
            borderColor: isFocused ? focusBorderColor : 'transparent',
            borderWidth: 0,
          };
        case 'underlined':
          return {
            backgroundColor: 'transparent',
            borderColor: isFocused ? focusBorderColor : baseBorderColor,
            borderWidth: 0,
          };
        case 'outlined':
        default:
          return {
            backgroundColor: backgroundColor || 'transparent',
            borderColor: isFocused ? focusBorderColor : baseBorderColor,
            borderWidth: borderWidth,
          };
      }
    };

    // Get size styles
    const getSizeStyles = (): {
      paddingVertical?: number;
      paddingHorizontal?: number;
      fontSize?: number;
      minHeight?: number;
    } => {
      switch (size) {
        case 'small':
          return {
            paddingVertical: 8,
            paddingHorizontal: 12,
            fontSize: 14,
            minHeight: 36,
          };
        case 'large':
          return {
            paddingVertical: 16,
            paddingHorizontal: 16,
            fontSize: 18,
            minHeight: 56,
          };
        case 'medium':
        default:
          return {
            paddingVertical: 12,
            paddingHorizontal: 14,
            fontSize: 16,
            minHeight: 44,
          };
      }
    };

    // Get border radius
    const getBorderRadius = (): number => {
      if (borderRadius !== undefined) return borderRadius;

      switch (variant) {
        case 'filled':
          return 8;
        case 'outlined':
          return 6;
        case 'underlined':
          return 0;
        default:
          return 6;
      }
    };

    // Handle text change
    const handleChangeText = (text: string) => {
      if (value === undefined) {
        setInternalValue(text);
      }

      if (validateOnChange && validator) {
        const validationError = validator(text);
        setInternalError(validationError);
      }

      onChangeText?.(text);
    };

    // Handle focus
    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    // Handle blur
    const handleBlur = () => {
      setIsFocused(false);

      if (validateOnBlur && validator) {
        const validationError = validator(currentValue);
        setInternalError(validationError);
      }

      onBlur?.();
    };

    // Get input props based on type
    const getInputProps = () => {
      const baseProps = {
        keyboardType: 'default' as const,
        autoCapitalize: 'sentences' as const,
        autoCorrect: true,
        secureTextEntry: false,
      };

      switch (type) {
        case 'email':
          return {
            ...baseProps,
            keyboardType: 'email-address' as const,
            autoCapitalize: 'none' as const,
            autoCorrect: false,
          };
        case 'password':
          return {
            ...baseProps,
            secureTextEntry: true,
            autoCapitalize: 'none' as const,
            autoCorrect: false,
          };
        case 'number':
          return {
            ...baseProps,
            keyboardType: 'numeric' as const,
            autoCorrect: false,
          };
        case 'phone':
          return {
            ...baseProps,
            keyboardType: 'phone-pad' as const,
            autoCorrect: false,
          };
        case 'url':
          return {
            ...baseProps,
            keyboardType: 'url' as const,
            autoCapitalize: 'none' as const,
            autoCorrect: false,
          };
        default:
          return baseProps;
      }
    };

    // Styles
    const styles = StyleSheet.create({
      container: {
        width: fullWidth ? '100%' : undefined,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        ...containerStyle,
      },
      inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: multiline ? 'flex-start' : 'center',
        ...getVariantStyles(),
        borderRadius: getBorderRadius(),
        borderStyle,
        shadowColor: shadow ? shadowColor : undefined,
        shadowOffset: shadow ? shadowOffset : undefined,
        shadowOpacity: shadow ? shadowOpacity : undefined,
        shadowRadius: shadow ? shadowRadius : undefined,
        elevation: shadow ? 3 : undefined,
        ...style,
      },
      label: {
        position: 'absolute',
        left: 14,
        top: floatingLabel ? (isFocused || currentValue ? 4 : 12) : -8,
        backgroundColor: backgroundColor || '#FFFFFF',
        paddingHorizontal: 4,
        fontSize: floatingLabel ? (isFocused || currentValue ? 12 : 16) : 12,
        color: hasError ? errorColor : labelColor || '#666',
        fontWeight: '500',
        zIndex: 1,
        ...labelStyle,
      },
      leftIconContainer: {
        paddingLeft: 12,
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      rightIconContainer: {
        paddingLeft: 8,
        paddingRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      input: {
        flex: 1,
        color: textColor || '#000',
        ...getSizeStyles(),
        paddingTop:
          floatingLabel && (isFocused || currentValue) ? 20 : undefined,
        paddingBottom:
          floatingLabel && (isFocused || currentValue) ? 8 : undefined,
        textAlignVertical: multiline ? 'top' : 'center',
        ...inputStyle,
      },
      errorText: {
        marginTop: 4,
        marginLeft: 4,
        fontSize: 12,
        color: errorColor,
        ...errorStyle,
      },
      requiredIndicator: {
        color: errorColor,
        marginLeft: 2,
      },
    });

    // Underline for underlined variant
    const underlineStyle =
      variant === 'underlined'
        ? {
            borderBottomWidth: borderWidth,
            borderBottomColor: isFocused
              ? focusColor || '#007AFF'
              : hasError
                ? errorColor
                : borderColor,
          }
        : {};

    return (
      <View style={styles.container}>
        <View style={[styles.inputContainer, underlineStyle]}>
          {leftIcon && (
            <TouchableOpacity
              style={styles.leftIconContainer}
              onPress={onLeftIconPress}
              disabled={!onLeftIconPress}
            >
              {leftIcon}
            </TouchableOpacity>
          )}

          <TextInput
            ref={ref || inputRef}
            style={styles.input}
            value={currentValue}
            placeholder={shouldShowPlaceholder ? placeholderText : undefined}
            placeholderTextColor={placeholderColor || '#999'}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled && !readonly}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            accessibilityLabel={accessibilityLabel || label}
            accessibilityHint={accessibilityHint}
            {...getInputProps()}
            {...textInputProps}
          />

          {rightIcon && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {label && (currentValue || isFocused) && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.requiredIndicator}> *</Text>}
          </Text>
        )}

        {hasError && errorText && (
          <Text style={styles.errorText}>{errorText}</Text>
        )}
      </View>
    );
  }
);

InputBase.displayName = 'InputBase';

export type { InputBaseProps };
