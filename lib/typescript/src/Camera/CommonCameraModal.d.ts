import React from 'react';
import type { CameraProps } from './CameraComponent';
import { type ModalProps } from 'react-native-modal';
export interface CameraModalProps extends Omit<CameraProps, 'onClose'> {
    visible: boolean;
    onClose: () => void;
    modalProps?: Partial<ModalProps>;
}
export declare const CameraModal: React.FC<CameraModalProps>;
