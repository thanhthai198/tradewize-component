import React from 'react';
import { CameraComponent } from './CameraComponent';
import type { CameraProps } from './CameraComponent';
import Modal, { type ModalProps } from 'react-native-modal';

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
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriver={true}
      style={{ margin: 0 }}
      {...modalProps}
    >
      <CameraComponent {...cameraProps} onClose={onClose} />
    </Modal>
  );
};
