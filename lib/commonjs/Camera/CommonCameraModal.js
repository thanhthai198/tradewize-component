"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraModal = void 0;
var _react = _interopRequireDefault(require("react"));
var _CameraComponent = require("./CameraComponent");
var _reactNativeModal = _interopRequireDefault(require("react-native-modal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CameraModal = ({
  visible,
  onClose,
  modalProps,
  ...cameraProps
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, _extends({
    isVisible: visible,
    animationIn: "slideInUp",
    animationOut: "slideOutDown",
    animationInTiming: 300,
    animationOutTiming: 300,
    useNativeDriver: true,
    style: {
      margin: 0
    }
  }, modalProps), /*#__PURE__*/_react.default.createElement(_CameraComponent.CameraComponent, _extends({}, cameraProps, {
    onClose: onClose
  })));
};
exports.CameraModal = CameraModal;
//# sourceMappingURL=CommonCameraModal.js.map