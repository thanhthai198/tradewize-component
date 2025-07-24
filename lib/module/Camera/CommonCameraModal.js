function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Modal } from 'react-native';
import { CameraComponent } from './CameraComponent';
export const CameraModal = ({
  visible,
  onClose,
  modalProps,
  ...cameraProps
}) => {
  return /*#__PURE__*/React.createElement(Modal, _extends({
    visible: visible,
    animationType: "slide",
    presentationStyle: "fullScreen"
  }, modalProps), /*#__PURE__*/React.createElement(CameraComponent, _extends({}, cameraProps, {
    onClose: onClose
  })));
};
//# sourceMappingURL=CommonCameraModal.js.map