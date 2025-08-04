import React from 'react';
import { TextInput } from 'react-native';
import { type InputBaseProps } from '../InputBase';
export interface FlatInputProps extends Omit<InputBaseProps, 'variant'> {
    backgroundColor?: string;
    borderColor?: string;
    focusBorderColor?: string;
    errorBorderColor?: string;
    borderRadius?: number;
}
export declare const FlatInput: React.ForwardRefExoticComponent<FlatInputProps & React.RefAttributes<TextInput>>;
