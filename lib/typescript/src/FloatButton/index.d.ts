import React from 'react';
import type { MenuItem } from './type';
interface FloatButtonProps {
    onPress?: () => void;
    children?: React.ReactNode;
    size?: number;
    backgroundColor?: string;
    initialPosition?: {
        x: number;
        y: number;
    };
    style?: any;
    icon?: any;
    iconColor?: string;
    showPopup?: boolean;
    popupContent?: React.ReactNode;
    popupWidth?: number;
    popupHeight?: number;
    popupBackgroundColor?: string;
    popupBorderRadius?: number;
    onPopupClose?: () => void;
    showFanMenu?: boolean;
    menuItems?: MenuItem[];
    menuRadius?: number;
    menuStartAngle?: number;
    menuEndAngle?: number;
    menuItemBackgroundColor?: string;
    menuItemIconColor?: string;
    onMenuClose?: () => void;
    mainButtonSize?: number;
    mainButtonColor?: string;
    mainButtonIcon?: string;
    minEdgeDistance?: number;
    yAxisEndLimit?: number;
    yAxisStartLimit?: number;
}
export declare const FloatButton: React.FC<FloatButtonProps>;
export {};
