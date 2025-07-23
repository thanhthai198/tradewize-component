import { TextInput } from 'react-native';
import { type InputBaseProps } from '../InputBase';
export interface OutlinedInputProps extends Omit<InputBaseProps, 'variant'> {
    borderWidth?: number;
    borderRadius?: number;
    borderColor?: string;
    focusBorderColor?: string;
    errorBorderColor?: string;
}
export declare const OutlinedInput: import("react").ForwardRefExoticComponent<OutlinedInputProps & import("react").RefAttributes<TextInput>>;
