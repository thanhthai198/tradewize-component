import React from 'react';
import type { ViewStyle } from 'react-native';
export interface RadioButtonProps {
    value?: string;
    label?: string;
    selected?: boolean;
    disabled?: boolean;
    groupValue?: string;
    onValueChange?: (value: string) => void;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'outline' | 'filled';
    selectedColor?: string;
    unselectedColor?: string;
    disabledColor?: string;
    textColor?: string;
    selectedTextColor?: string;
    fullWidth?: boolean;
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
    style?: ViewStyle;
    containerStyle?: ViewStyle;
    animationDuration?: number;
    animationEasing?: 'linear' | 'ease' | 'bounce' | 'elastic';
    enableAnimation?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
}
declare const RadioButton: React.FC<RadioButtonProps>;
export default RadioButton;
