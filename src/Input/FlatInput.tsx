import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { InputBase, type InputBaseProps } from '../InputBase';

export interface FlatInputProps extends Omit<InputBaseProps, 'variant'> {
  // Flat specific props
  backgroundColor?: string;
  borderColor?: string;
  focusBorderColor?: string;
  errorBorderColor?: string;
  borderRadius?: number;
}

export const FlatInput = forwardRef<TextInput, FlatInputProps>(
  (
    {
      backgroundColor = 'transparent',
      borderColor = 'transparent',
      focusBorderColor = '#007AFF',
      errorBorderColor = '#ff3b30',
      borderRadius = 0,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <InputBase
        ref={ref}
        variant="outlined"
        backgroundColor={backgroundColor}
        borderWidth={0}
        borderRadius={borderRadius}
        borderColor={borderColor}
        focusColor={focusBorderColor}
        errorColor={errorBorderColor}
        style={style}
        {...props}
      />
    );
  }
);

FlatInput.displayName = 'FlatInput';
