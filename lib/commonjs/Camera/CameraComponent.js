"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CameraComponent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeVisionCamera = require("react-native-vision-camera");
var _slider = _interopRequireDefault(require("@react-native-community/slider"));
var _CameraModeSelector = require("./CameraModeSelector");
var _tradewize = require("tradewize");
var _reactNativeFs = _interopRequireDefault(require("react-native-fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CameraComponent = ({
  onPhotoCaptured,
  onVideoRecorded,
  onError,
  onClose,
  mode = 'both',
  audio = true,
  // Mặc định bật âm thanh
  initialZoom = 1,
  // Mặc định zoom 1x
  flashMode = 'off'
}) => {
  const [hasPermission, setHasPermission] = (0, _react.useState)(false);
  const [hasAudioPermission, setHasAudioPermission] = (0, _react.useState)(false);
  const [isRequestingPermissions, setIsRequestingPermissions] = (0, _react.useState)(false);
  const [isRecording, setIsRecording] = (0, _react.useState)(false);
  const [isPaused, setIsPaused] = (0, _react.useState)(false);
  const [isCapturing, setIsCapturing] = (0, _react.useState)(false);
  const [recordingDuration, setRecordingDuration] = (0, _react.useState)(0);
  const [cameraPosition, setCameraPosition] = (0, _react.useState)('back');
  const [currentFlashMode, setCurrentFlashMode] = (0, _react.useState)(flashMode);
  const [zoom, setZoom] = (0, _react.useState)(initialZoom); // Thêm state cho zoom

  const camera = (0, _react.useRef)(null);
  const devices = (0, _reactNativeVisionCamera.useCameraDevices)();
  const device = devices.find(_device => _device.position === cameraPosition);

  // Lấy min/max zoom từ device
  const minZoom = (device === null || device === void 0 ? void 0 : device.minZoom) || 1;
  const maxZoom = (device === null || device === void 0 ? void 0 : device.maxZoom) || 10;

  // Timer for recording duration
  (0, _react.useEffect)(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);
  const requestCameraPermission = (0, _react.useCallback)(async () => {
    try {
      setIsRequestingPermissions(true);
      const status = await _reactNativeVisionCamera.Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        onError === null || onError === void 0 || onError('Camera permission is required');
      }
    } catch (error) {
      onError === null || onError === void 0 || onError('Failed to request camera permission');
    } finally {
      setIsRequestingPermissions(false);
    }
  }, [onError]);
  const requestMicrophonePermission = (0, _react.useCallback)(async () => {
    try {
      setIsRequestingPermissions(true);
      const status = await _reactNativeVisionCamera.Camera.requestMicrophonePermission();
      setHasAudioPermission(status === 'granted');
      if (status !== 'granted' && audio) {
        onError === null || onError === void 0 || onError('Microphone permission is required for video recording with audio');
      }
    } catch (error) {
      setHasAudioPermission(false);
      if (audio) {
        onError === null || onError === void 0 || onError('Failed to request microphone permission');
      }
    } finally {
      setIsRequestingPermissions(false);
    }
  }, [audio, onError]);

  // Check permissions every time component is called
  const checkPermissions = (0, _react.useCallback)(async () => {
    try {
      setIsRequestingPermissions(true);

      // Check camera permission
      const cameraStatus = await _reactNativeVisionCamera.Camera.getCameraPermissionStatus();
      setHasPermission(cameraStatus === 'granted');

      // Check microphone permission if audio is enabled
      if (audio && (mode === 'video' || mode === 'both')) {
        const microphoneStatus = await _reactNativeVisionCamera.Camera.getMicrophonePermissionStatus();
        setHasAudioPermission(microphoneStatus === 'granted');
      }

      // Request permissions if not granted
      if (cameraStatus !== 'granted') {
        await requestCameraPermission();
      }
      if (audio && (mode === 'video' || mode === 'both')) {
        const microphoneStatus = await _reactNativeVisionCamera.Camera.getMicrophonePermissionStatus();
        if (microphoneStatus !== 'granted') {
          await requestMicrophonePermission();
        }
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    } finally {
      setIsRequestingPermissions(false);
    }
  }, [audio, mode, requestCameraPermission, requestMicrophonePermission]);

  // Check and request permissions on every render
  (0, _react.useEffect)(() => {
    checkPermissions();
  }, [checkPermissions]);
  const toggleCameraPosition = (0, _react.useCallback)(() => {
    setCameraPosition(prev => prev === 'back' ? 'front' : 'back');
    // Reset zoom khi chuyển camera
    setZoom(initialZoom);
  }, [initialZoom]);
  const toggleFlashMode = (0, _react.useCallback)(() => {
    setCurrentFlashMode(prev => {
      switch (prev) {
        case 'off':
          return 'on';
        case 'on':
          return 'off';
        default:
          return 'off';
      }
    });
  }, []);
  const setZoomLevel = (0, _react.useCallback)(level => {
    setZoom(Math.max(minZoom, Math.min(level, maxZoom))); // Sử dụng min/max zoom của device
  }, [minZoom, maxZoom]);
  const capturePhoto = (0, _react.useCallback)(async () => {
    if (!camera.current || isCapturing) return;
    try {
      setIsCapturing(true);
      const photo = await camera.current.takePhoto({
        flash: currentFlashMode
      });
      const getSize = await _reactNativeFs.default.stat(photo.path);
      const img = {
        ...photo,
        size: getSize === null || getSize === void 0 ? void 0 : getSize.size
      };
      onPhotoCaptured === null || onPhotoCaptured === void 0 || onPhotoCaptured(img);
    } catch (error) {
      onError === null || onError === void 0 || onError('Failed to capture photo');
    } finally {
      setIsCapturing(false);
    }
  }, [camera, isCapturing, currentFlashMode, onPhotoCaptured, onError]);
  const startRecording = (0, _react.useCallback)(async () => {
    if (!camera.current || isRecording) return;
    try {
      setIsRecording(true);
      setIsPaused(false);
      setRecordingDuration(0);
      await camera.current.startRecording({
        onRecordingFinished: async video => {
          const path = video.path.replace('file://', '');
          const stat = await _reactNativeFs.default.stat(path);
          const videoFile = {
            ...video,
            size: stat === null || stat === void 0 ? void 0 : stat.size
          };
          onVideoRecorded === null || onVideoRecorded === void 0 || onVideoRecorded(videoFile);
          setIsRecording(false);
          setIsPaused(false);
          setRecordingDuration(0);
        },
        onRecordingError: error => {
          onError === null || onError === void 0 || onError(`Recording error: ${error.message}`);
          setIsRecording(false);
          setIsPaused(false);
          setRecordingDuration(0);
        },
        flash: currentFlashMode
      });
    } catch (error) {
      onError === null || onError === void 0 || onError('Failed to start recording');
      setIsRecording(false);
      setIsPaused(false);
      setRecordingDuration(0);
    }
  }, [camera, isRecording, currentFlashMode, onVideoRecorded, onError]);
  const stopRecording = (0, _react.useCallback)(async () => {
    if (!camera.current || !isRecording) return;
    try {
      await camera.current.stopRecording();
    } catch (error) {
      onError === null || onError === void 0 || onError('Failed to stop recording');
      setIsRecording(false);
      setIsPaused(false);
      setRecordingDuration(0);
    }
  }, [camera, isRecording, onError]);
  const pauseRecording = (0, _react.useCallback)(async () => {
    if (!camera.current || !isRecording || isPaused) return;
    try {
      await camera.current.pauseRecording();
      setIsPaused(true);
    } catch (error) {
      onError === null || onError === void 0 || onError('Failed to pause recording');
    }
  }, [camera, isRecording, isPaused, onError]);
  const resumeRecording = (0, _react.useCallback)(async () => {
    if (!camera.current || !isRecording || !isPaused) return;
    try {
      await camera.current.resumeRecording();
      setIsPaused(false);
    } catch (error) {
      onError === null || onError === void 0 || onError('Failed to resume recording');
    }
  }, [camera, isRecording, isPaused, onError]);

  // Format duration to MM:SS
  const formatDuration = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  if (!device) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.loadingContainer
    }, /*#__PURE__*/_react.default.createElement(_tradewize.ButtonBase, {
      style: styles.closeButtonNotPermission,
      onPress: onClose
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.closeButtonText
    }, "\u2715")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.itemCenter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "large",
      color: "#007AFF"
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.loadingText
    }, "Loading camera...")));
  }
  if (!hasPermission || isRequestingPermissions) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.permissionContainer
    }, /*#__PURE__*/_react.default.createElement(_tradewize.ButtonBase, {
      style: styles.closeButtonNotPermission,
      onPress: onClose
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.closeButtonText
    }, "\u2715")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.itemCenter
    }, isRequestingPermissions ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "large",
      color: "#007AFF"
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.permissionText
    }, "Requesting permissions...")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.permissionText
    }, "Camera permission is required"), /*#__PURE__*/_react.default.createElement(_tradewize.ButtonBase, {
      style: styles.permissionButton,
      onPress: requestCameraPermission
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.permissionButtonText
    }, "Grant Permission")))));
  }

  // Hiển thị cảnh báo nếu không có quyền microphone nhưng cần âm thanh
  const showAudioWarning = audio && !hasAudioPermission && (mode === 'video' || mode === 'both');
  const height = isRecording ? (0, _tradewize.getScreenHeight)() : (0, _tradewize.getScreenHeight)() * 0.8;
  const flashButtonColor = currentFlashMode === 'off' ? 'rgba(0, 0, 0, 0.5)' : '#EDE27D';
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNativeVisionCamera.Camera, {
    torch: currentFlashMode,
    ref: camera,
    style: [_reactNative.StyleSheet.absoluteFill, {
      height
    }],
    device: device,
    isActive: true,
    photo: mode === 'photo' || mode === 'both',
    video: mode === 'video' || mode === 'both',
    audio: audio && hasAudioPermission,
    zoom: zoom // Thêm prop zoom
  }), showAudioWarning && !hasAudioPermission && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.audioWarning
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.audioWarningText
  }, "\u26A0\uFE0F Video will be recorded without audio")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.topControls
  }, /*#__PURE__*/_react.default.createElement(_tradewize.ButtonBase, {
    style: styles.closeButton,
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.closeButtonText
  }, "\u2715")), /*#__PURE__*/_react.default.createElement(_tradewize.ButtonBase, {
    style: [styles.flashButton, {
      backgroundColor: flashButtonColor
    }],
    onPress: toggleFlashMode
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.flashButtonText
  }, "\u26A1"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.zoomSliderContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.zoomLevelBackground
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.zoomLevelText
  }, zoom.toFixed(1), "x")), /*#__PURE__*/_react.default.createElement(_slider.default, {
    style: styles.zoomSlider,
    minimumValue: minZoom,
    maximumValue: maxZoom,
    value: zoom,
    onValueChange: setZoomLevel,
    minimumTrackTintColor: "white",
    maximumTrackTintColor: "rgba(255, 255, 255, 0.3)",
    thumbTintColor: "white"
  })), /*#__PURE__*/_react.default.createElement(_CameraModeSelector.SnapScrollView, {
    mode: mode,
    isRecording: isRecording,
    isPaused: isPaused,
    isCapturing: isCapturing,
    capturePhoto: capturePhoto,
    toggleCameraPosition: toggleCameraPosition,
    stopRecording: stopRecording,
    startRecording: startRecording,
    pauseRecording: pauseRecording,
    resumeRecording: resumeRecording
  }), isRecording && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.recordingIndicator
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.recordingDot, isPaused && styles.recordingDotPaused]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.recordingText
  }, formatDuration(recordingDuration), " ", isPaused ? '(Paused)' : '', !hasAudioPermission && audio ? '(No Audio)' : '')));
};
exports.CameraComponent = CameraComponent;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16
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
  audioWarning: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1
  },
  audioWarningText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600'
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flashButtonText: {
    color: '#FFFFFF',
    fontSize: 18
  },
  // Zoom Slider Styles
  zoomSliderContainer: {
    position: 'absolute',
    bottom: (0, _tradewize.getScreenHeight)() * 0.2 + 8,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1
  },
  zoomSlider: {
    width: '100%',
    height: 40
  },
  zoomLevelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  zoomLevelBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  captureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  recordButtonStop: {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 4
  },
  recordingIndicator: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 8
  },
  recordingDotPaused: {
    backgroundColor: '#FFD700'
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  closeButtonNotPermission: {
    position: 'absolute',
    top: 16,
    right: 8,
    backgroundColor: 'gray',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
var _default = exports.default = CameraComponent;
//# sourceMappingURL=CameraComponent.js.map