"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraModal = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _CameraComponent = require("./CameraComponent");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CameraModal = ({
  visible,
  onClose,
  modalProps,
  ...cameraProps
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, _extends({
    visible: visible,
    animationType: "slide",
    presentationStyle: "fullScreen"
  }, modalProps), /*#__PURE__*/_react.default.createElement(_CameraComponent.CameraComponent, _extends({}, cameraProps, {
    onClose: onClose
  })));
};
exports.CameraModal = CameraModal;
//# sourceMappingURL=CommonCameraModal.js.map