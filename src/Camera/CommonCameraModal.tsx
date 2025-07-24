import React from 'react';
import { Modal } from 'react-native';
import type { ModalProps } from 'react-native';
import { CameraComponent } from './CameraComponent';
import type { CameraProps } from './CameraComponent';

export interface CameraModalProps extends Omit<CameraProps, 'onClose'> {
  visible: boolean;
  onClose: () => void;
  modalProps?: Partial<ModalProps>;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  visible,
  onClose,
  modalProps,
  ...cameraProps
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      {...modalProps}
    >
      <CameraComponent {...cameraProps} onClose={onClose} />
    </Modal>
  );
};
