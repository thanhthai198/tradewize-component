"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraModal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CameraComponent = require("./CameraComponent");
var _reactNativeModal = _interopRequireDefault(require("react-native-modal"));
var _reactNativeVisionCamera = require("react-native-vision-camera");
var _ButtonBase = require("../ButtonBase");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CameraModal = ({
  visible,
  onClose,
  modalProps,
  audio = true,
  mode = 'both',
  onError,
  titleErrorPermission = 'Camera permission is required',
  txtButtonPermission = 'Grant Permission',
  txtRequestingPermissions = 'Requesting permissions...',
  txtOpenSettings = 'Open Settings',
  txtInitializingCamera = 'Initializing camera...',
  ...cameraProps
}) => {
  const [hasPermission, setHasPermission] = (0, _react.useState)(false);
  const [hasAudioPermission, setHasAudioPermission] = (0, _react.useState)(false);
  const [isRequestingPermissions, setIsRequestingPermissions] = (0, _react.useState)(false);
  const [permissionDenied, setPermissionDenied] = (0, _react.useState)(false);
  const [isLoading, setIsLoading] = (0, _react.useState)(false);

  // Check and request permissions when modal becomes visible
  const checkAndRequestPermissions = (0, _react.useCallback)(async () => {
    try {
      setIsRequestingPermissions(true);

      // Check camera permission
      const cameraStatus = await _reactNativeVisionCamera.Camera.getCameraPermissionStatus();
      let cameraGranted = cameraStatus === 'granted';

      // Request camera permission if not granted
      if (!cameraGranted) {
        const newCameraStatus = await _reactNativeVisionCamera.Camera.requestCameraPermission();
        cameraGranted = newCameraStatus === 'granted';
        setHasPermission(cameraGranted);
        if (!cameraGranted) {
          // Kiểm tra xem quyền có bị từ chối vĩnh viễn không
          if (newCameraStatus === 'denied') {
            setPermissionDenied(true);
          }
          onError === null || onError === void 0 || onError('Camera permission is required');
        } else {
          setPermissionDenied(false);
        }
      } else {
        setHasPermission(cameraGranted);
        setPermissionDenied(false);
      }

      // Check microphone permission if audio is enabled
      if (audio && (mode === 'video' || mode === 'both')) {
        const microphoneStatus = await _reactNativeVisionCamera.Camera.getMicrophonePermissionStatus();
        let audioGranted = microphoneStatus === 'granted';

        // Request microphone permission if not granted
        if (!audioGranted) {
          const newMicrophoneStatus = await _reactNativeVisionCamera.Camera.requestMicrophonePermission();
          audioGranted = newMicrophoneStatus === 'granted';
          setHasAudioPermission(audioGranted);
          if (!audioGranted) {
            onError === null || onError === void 0 || onError('Microphone permission is required for video recording with audio');
          }
        } else {
          setHasAudioPermission(audioGranted);
        }
      } else {
        setHasAudioPermission(true);
      }
    } catch (error) {
      console.error('Error checking/requesting permissions:', error);
      onError === null || onError === void 0 || onError('Failed to request camera permissions');
    } finally {
      setIsLoading(false);
      setIsRequestingPermissions(false);
    }
  }, [audio, mode, onError]);

  // Check and request permissions when modal becomes visible
  (0, _react.useEffect)(() => {
    if (visible) {
      // Hiển thị loading ngay lập tức
      setIsLoading(true);

      // Delay để modal mở xong rồi mới xin quyền
      const timer = setTimeout(() => {
        checkAndRequestPermissions();
      }, 500); // Delay 500ms để loading hiển thị đủ lâu

      return () => clearTimeout(timer);
    } else {
      // Reset permissions when modal is hidden
      setHasPermission(false);
      setHasAudioPermission(false);
      setIsRequestingPermissions(false);
      setPermissionDenied(false);
      setIsLoading(false);
      return undefined;
    }
  }, [visible, checkAndRequestPermissions]);
  const openSettings = (0, _react.useCallback)(() => {
    _reactNative.Linking.openSettings();
  }, []);
  const renderLoadingScreen = () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.loadingContainer
  }, /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.closeButtonText
  }, "\u2715")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.itemCenter
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.loadingText
  }, txtInitializingCamera)));
  const renderPermissionScreen = () => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.permissionContainer
  }, /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.closeButtonText
  }, "\u2715")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.itemCenter
  }, isRequestingPermissions ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.permissionText
  }, txtRequestingPermissions)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.permissionText
  }, titleErrorPermission), permissionDenied ? /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    style: styles.permissionButton,
    onPress: openSettings
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.permissionButtonText
  }, txtOpenSettings)) : /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    style: styles.permissionButton,
    onPress: checkAndRequestPermissions
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.permissionButtonText
  }, txtButtonPermission)))));
  const renderCameraComponent = () => /*#__PURE__*/_react.default.createElement(_CameraComponent.CameraComponent, _extends({}, cameraProps, {
    onClose: onClose,
    hasPermission: hasPermission,
    hasAudioPermission: hasAudioPermission
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, _extends({
    propagateSwipe: false,
    isVisible: visible,
    animationIn: "slideInUp",
    animationOut: "slideOutDown",
    animationInTiming: 300,
    animationOutTiming: 300,
    useNativeDriver: true,
    style: {
      margin: 0,
      backgroundColor: 'black'
    }
  }, modalProps), isLoading ? renderLoadingScreen() : hasPermission ? renderCameraComponent() : renderPermissionScreen());
};
exports.CameraModal = CameraModal;
const styles = _reactNative.StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=CommonCameraModal.js.map