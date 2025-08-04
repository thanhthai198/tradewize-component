import React from 'react';
import { TextInput } from 'react-native';
import { type InputBaseProps } from '../InputBase';
export interface OutlinedInputProps extends Omit<InputBaseProps, 'variant'> {
    borderWidth?: number;
    borderRadius?: number;
    borderColor?: string;
    focusBorderColor?: string;
    errorBorderColor?: string;
}
export declare const OutlinedInput: React.ForwardRefExoticComponent<OutlinedInputProps & React.RefAttributes<TextInput>>;
