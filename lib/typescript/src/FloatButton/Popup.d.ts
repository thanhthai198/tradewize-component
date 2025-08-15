import React from 'react';
interface PopupProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    position?: {
        x: number;
        y: number;
    };
    width?: number;
    height?: number;
    backgroundColor?: string;
    borderRadius?: number;
    shadowColor?: string;
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
}
declare const Popup: React.FC<PopupProps>;
export default Popup;
