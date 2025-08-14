function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { CameraComponent } from './CameraComponent';
import Modal from 'react-native-modal';
import Color from '../GiftedChat/Color';
export const CameraModal = ({
  visible,
  onClose,
  modalProps,
  ...cameraProps
}) => {
  return /*#__PURE__*/React.createElement(Modal, _extends({
    isVisible: visible,
    animationIn: "slideInUp",
    animationOut: "slideOutDown",
    animationInTiming: 300,
    animationOutTiming: 300,
    useNativeDriver: true,
    style: {
      margin: 0,
      backgroundColor: Color.black
    }
  }, modalProps), /*#__PURE__*/React.createElement(CameraComponent, _extends({}, cameraProps, {
    onClose: onClose
  })));
};
//# sourceMappingURL=CommonCameraModal.js.map