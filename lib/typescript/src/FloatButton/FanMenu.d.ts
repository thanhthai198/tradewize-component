import React from 'react';
import { type StyleProp, type ImageStyle } from 'react-native';
import type { MenuItem } from './type';
interface FanMenuProps {
    visible: boolean;
    onClose: () => void;
    items: MenuItem[];
    position?: {
        x: number;
        y: number;
    };
    radius?: number;
    startAngle?: number;
    endAngle?: number;
    itemBackgroundColor?: string;
    iconColor?: string;
    mainButtonSize?: number;
    minEdgeDistance: number;
    isPlusEdgeDistance?: boolean;
    stylesIcon?: StyleProp<ImageStyle>;
}
declare const FanMenu: React.FC<FanMenuProps>;
export default FanMenu;
