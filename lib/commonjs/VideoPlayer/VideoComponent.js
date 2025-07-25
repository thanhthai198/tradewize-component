"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VideoModal", {
  enumerable: true,
  get: function () {
    return _VideoModal.VideoModal;
  }
});
exports.VideoPlayer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));
var _VideoModal = require("./VideoModal");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// VideoPlayer.tsx

const VideoPlayer = ({
  source,
  height = 200,
  width = '100%',
  style,
  autoPlay = false,
  loop = false,
  muted = true,
  showControls = true,
  progressUpdateInterval,
  onError,
  onLoad,
  onEnd,
  onProgress,
  onPlayingChange
}) => {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [error, setError] = (0, _react.useState)('');
  const [isPlaying, setIsPlaying] = (0, _react.useState)(autoPlay);
  const [showPlayPauseButton, setShowPlayPauseButton] = (0, _react.useState)(false);
  const fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const showButtonWithAnimation = (0, _react.useCallback)(() => {
    setShowPlayPauseButton(true);
    _reactNative.Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [fadeAnim]);
  const hideButtonWithAnimation = (0, _react.useCallback)(() => {
    _reactNative.Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setShowPlayPauseButton(false);
    });
  }, [fadeAnim]);
  (0, _react.useEffect)(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  // Notify parent when playing state changes
  (0, _react.useEffect)(() => {
    onPlayingChange === null || onPlayingChange === void 0 || onPlayingChange(isPlaying);
  }, [isPlaying, onPlayingChange]);
  (0, _react.useEffect)(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        hideButtonWithAnimation();
      }, 200); // Hide after 500ms when playing
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [isPlaying, hideButtonWithAnimation]);
  const handleLoad = (0, _react.useCallback)(() => {
    // console.log('Video loaded successfully:', source);
    setLoading(false);
    setError('');
    setIsPlaying(autoPlay);
    onLoad === null || onLoad === void 0 || onLoad(loading);
  }, [onLoad, autoPlay, loading]);
  const handleError = (0, _react.useCallback)(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  error => {
    var _error$error, _error$error2;
    console.log('Video error:', error);
    setLoading(false);
    const errorMessage = (error === null || error === void 0 || (_error$error = error.error) === null || _error$error === void 0 ? void 0 : _error$error.errorString) || (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 || (_error$error2 = error.error) === null || _error$error2 === void 0 ? void 0 : _error$error2.localizedDescription) || 'Video playback error';
    setError(errorMessage);
    onError === null || onError === void 0 || onError(error, loading);
  }, [onError, loading]);
  const handleEnd = (0, _react.useCallback)(() => {
    // console.log('Video ended:', source);
    onEnd === null || onEnd === void 0 || onEnd();
  }, [onEnd]);
  const handleProgress = (0, _react.useCallback)(progress => {
    onProgress === null || onProgress === void 0 || onProgress(progress);
  }, [onProgress]);
  const handlePlayPause = (0, _react.useCallback)(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);
  const handleScreenTap = (0, _react.useCallback)(() => {
    if (!showControls) {
      // First perform the action
      setIsPlaying(!isPlaying);
      // Then show the button with animation
      showButtonWithAnimation();
      setTimeout(() => {
        hideButtonWithAnimation();
      }, 200); // Show for 500ms
    }
  }, [showControls, isPlaying, showButtonWithAnimation, hideButtonWithAnimation]);

  // console.log(
  //   'VideoPlayer source:',
  //   source,
  //   'isYoutube:',
  //   isYoutubeUrl(source)
  // );

  // For MP4 videos
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      height,
      width
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeVideo.default, {
    progressUpdateInterval: progressUpdateInterval,
    source: {
      uri: source
    },
    style: styles.video,
    resizeMode: "contain",
    controls: showControls,
    onLoad: handleLoad,
    onError: handleError,
    onEnd: handleEnd,
    onProgress: handleProgress,
    repeat: loop,
    muted: muted,
    paused: !isPlaying,
    bufferConfig: {
      minBufferMs: 5000,
      maxBufferMs: 10000,
      bufferForPlaybackMs: 1000,
      bufferForPlaybackAfterRebufferMs: 2000
    },
    ignoreSilentSwitch: "ignore",
    playInBackground: false,
    playWhenInactive: false
  }), !showControls && !loading && !error && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.screenTapOverlay,
    onPress: handleScreenTap,
    activeOpacity: 1
  }, showPlayPauseButton && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.playPauseOverlay,
    onPress: handlePlayPause,
    activeOpacity: 0.8
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.playPauseButton, {
      opacity: fadeAnim
    }]
  }, isPlaying ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    tintColor: "#fff",
    source: require('../assets/pause.png'),
    style: styles.playPauseIcon
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    tintColor: "#fff",
    source: require('../assets/play.png'),
    style: styles.playPauseIcon
  })))), loading && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.loadingOverlay
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    size: "large",
    color: "#007AFF"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.loadingText
  }, "Loading video...")), error && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.errorOverlay
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.errorText
  }, error)));
};
exports.VideoPlayer = VideoPlayer;
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#000'
  },
  video: {
    flex: 1
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    padding: 16
  },
  loadingText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center'
  },
  playPauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playPauseIcon: {
    width: 24,
    height: 24
  },
  screenTapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1 // Ensure it's above other content
  }
});
//# sourceMappingURL=VideoComponent.js.map