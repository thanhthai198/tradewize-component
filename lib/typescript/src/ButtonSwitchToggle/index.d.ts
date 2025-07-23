import React from 'react';
import type { ViewStyle } from 'react-native';
export interface ButtonSwitchToggleProps {
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    disabled?: boolean;
    loading?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
    activeBackgroundColor?: string;
    inactiveBackgroundColor?: string;
    thumbColor?: string;
    activeThumbColor?: string;
    inactiveThumbColor?: string;
    width?: number;
    height?: number;
    thumbSize?: number;
    style?: ViewStyle;
    containerStyle?: ViewStyle;
    animationDuration?: number;
    useSpringAnimation?: boolean;
    springConfig?: {
        tension?: number;
        friction?: number;
    };
    shadow?: boolean;
    shadowColor?: string;
    shadowOffset?: {
        width: number;
        height: number;
    };
    shadowOpacity?: number;
    shadowRadius?: number;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    hapticFeedback?: boolean;
    hapticType?: 'light' | 'medium' | 'heavy';
    customTrack?: React.ReactNode;
    customThumb?: React.ReactNode;
}
declare const ButtonSwitchToggle: React.FC<ButtonSwitchToggleProps>;
export default ButtonSwitchToggle;
