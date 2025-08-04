import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import { InputBase, type InputBaseProps } from '../InputBase';

export interface OutlinedInputProps extends Omit<InputBaseProps, 'variant'> {
  // Outlined specific props
  borderWidth?: number;
  borderRadius?: number;
  borderColor?: string;
  focusBorderColor?: string;
  errorBorderColor?: string;
}

export const OutlinedInput = forwardRef<TextInput, OutlinedInputProps>(
  (
    {
      borderWidth = 1,
      borderRadius = 6,
      borderColor = '#E1E1E1',
      focusBorderColor = '#007AFF',
      errorBorderColor = '#ff3b30',
      style,
      ...props
    },
    ref
  ) => {
    return (
      <InputBase
        ref={ref}
        variant="outlined"
        borderWidth={borderWidth}
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

OutlinedInput.displayName = 'OutlinedInput';
