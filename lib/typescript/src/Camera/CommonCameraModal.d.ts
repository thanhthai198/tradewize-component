import React from 'react';
import type { CameraProps } from './CameraComponent';
import { type ModalProps } from 'react-native-modal';
export interface CameraModalProps extends Omit<CameraProps, 'onClose'> {
    visible: boolean;
    onClose: () => void;
    modalProps?: Partial<ModalProps>;
    titleErrorPermission?: string;
    txtButtonPermission?: string;
    txtRequestingPermissions?: string;
    txtOpenSettings?: string;
    txtInitializingCamera?: string;
}
export declare const CameraModal: React.FC<CameraModalProps>;
