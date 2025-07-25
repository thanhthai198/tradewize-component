"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoModal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _slider = _interopRequireDefault(require("@react-native-community/slider"));
var _VideoComponent = require("./VideoComponent");
var _utils = require("../utils");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _helper = require("../helper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Helper function to format time
const formatTime = seconds => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
const VideoModal = ({
  visible,
  onClose,
  source,
  autoPlay = true,
  loop = false,
  muted = false,
  showControls = false,
  showSkipButton = true,
  autoCloseOnEnd = true,
  isSubtitle = true,
  subtitle,
  txtSkipButton = 'Skip',
  txtCloseButton = 'Close',
  initialSubtitle = 'en',
  onError,
  onLoad,
  onEnd,
  onProgress,
  isProgressBar = true
}) => {
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const buttonOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  const [progress, setProgress] = (0, _react.useState)(0);
  const [currentTime, setCurrentTime] = (0, _react.useState)(0);
  const [duration, setDuration] = (0, _react.useState)(0);
  const [subtitles, setSubtitles] = (0, _react.useState)([]);
  const [currentSubtitle, setCurrentSubtitle] = (0, _react.useState)('');
  const [hasSubtitles, setHasSubtitles] = (0, _react.useState)(true);
  const [subtitleLoaded, setSubtitleLoaded] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(false);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [currentSubtitleLanguage, setCurrentSubtitleLanguage] = (0, _react.useState)(initialSubtitle);
  const [showLanguageSelector, setShowLanguageSelector] = (0, _react.useState)(false);
  const resetState = (0, _react.useCallback)(() => {
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setSubtitles([]);
    setCurrentSubtitle('');
  }, []);
  const handleClose = (0, _react.useCallback)(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);
  const handleBackdropPress = (0, _react.useCallback)(() => {
    handleClose();
  }, [handleClose]);
  const handleVideoEnd = (0, _react.useCallback)(() => {
    onEnd === null || onEnd === void 0 || onEnd();
    if (autoCloseOnEnd) {
      handleClose();
    }
  }, [onEnd, autoCloseOnEnd, handleClose]);
  const handleVideoError = (0, _react.useCallback)((err, loading) => {
    setIsLoading(!loading);
    setError(true);
    onError === null || onError === void 0 || onError(err, loading);
  }, [onError]);
  const handleVideoProgress = (0, _react.useCallback)(progressData => {
    try {
      setCurrentTime(progressData.currentTime);
      setDuration(progressData.seekableDuration);
      if (progressData.seekableDuration > 0) {
        setProgress(progressData.currentTime / progressData.seekableDuration);
      }
      if (isSubtitle) {
        const match = subtitles.find(s => (progressData === null || progressData === void 0 ? void 0 : progressData.currentTime) >= s.start - 0.1 && (progressData === null || progressData === void 0 ? void 0 : progressData.currentTime) <= s.end + 0.1);
        if ((match === null || match === void 0 ? void 0 : match.text) !== currentSubtitle) {
          setCurrentSubtitle((match === null || match === void 0 ? void 0 : match.text) || '');
        }
      }
      onProgress === null || onProgress === void 0 || onProgress(progressData);
    } catch (err) {
      console.error('handleVideoProgress error', err);
    }
  }, [onProgress, subtitles, isSubtitle, currentSubtitle]);
  const handleVideoLoad = (0, _react.useCallback)(loading => {
    setError(false);
    setIsLoading(!loading);
    onLoad === null || onLoad === void 0 || onLoad(loading);
  }, [onLoad]);
  const handlePlayingChange = (0, _react.useCallback)(isPlaying => {
    _reactNative.Animated.timing(buttonOpacity, {
      toValue: isPlaying ? 0.3 : 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [buttonOpacity]);
  const loadFileSubtitle = (0, _react.useCallback)(async (language = currentSubtitleLanguage) => {
    try {
      const subtitleUrl = subtitle[language] || '';
      const parsed = await (0, _helper.loadSubtitles)(subtitleUrl);
      setSubtitles(parsed);
      setHasSubtitles(parsed.length > 0);
    } catch (err) {
      console.error('Error loading subtitles:', err);
      setHasSubtitles(false);
    } finally {
      setSubtitleLoaded(true);
    }
  }, [subtitle, currentSubtitleLanguage]);
  const changeSubtitleLanguage = (0, _react.useCallback)(async language => {
    setCurrentSubtitleLanguage(language);
    setCurrentSubtitle(''); // Clear current subtitle when changing language
    setSubtitleLoaded(false);
    await loadFileSubtitle(language);
  }, [loadFileSubtitle]);

  // Get available subtitle languages
  const availableLanguages = Object.keys(subtitle);
  (0, _react.useEffect)(() => {
    if (isSubtitle) {
      setSubtitleLoaded(false);
      loadFileSubtitle();
    }
  }, [isSubtitle, loadFileSubtitle]);

  // Reset button opacity when modal opens
  (0, _react.useEffect)(() => {
    if (visible) {
      // If autoPlay is true, button should be dimmed initially
      const initialOpacity = autoPlay ? 0.3 : 1;
      _reactNative.Animated.timing(buttonOpacity, {
        toValue: initialOpacity,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [visible, buttonOpacity, autoPlay]);
  (0, _react.useEffect)(() => {
    if (initialSubtitle) {
      setCurrentSubtitleLanguage(initialSubtitle);
    }
  }, [initialSubtitle]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: visible,
    transparent: true,
    animationType: "fade",
    onRequestClose: handleClose,
    statusBarTranslucent: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
    barStyle: "light-content",
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.videoContainer
  }, /*#__PURE__*/_react.default.createElement(_VideoComponent.VideoPlayer, {
    progressUpdateInterval: 100,
    source: source,
    height: (0, _utils.getScreenHeight)(),
    width: "100%",
    autoPlay: isSubtitle ? subtitleLoaded && autoPlay : autoPlay,
    loop: loop,
    muted: muted,
    showControls: showControls,
    onError: handleVideoError,
    onLoad: handleVideoLoad,
    onEnd: handleVideoEnd,
    onProgress: handleVideoProgress,
    onPlayingChange: handlePlayingChange
  })), currentSubtitle && isSubtitle && hasSubtitles && !error && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.subtitleContainer, {
      bottom: insets.bottom + 56
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.subtitleText
  }, currentSubtitle)), isSubtitle && availableLanguages.length > 1 && !error && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.languageContainer, {
      top: insets.top + 24
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => setShowLanguageSelector(!showLanguageSelector),
    style: styles.languageButton
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.languageButtonText
  }, currentSubtitleLanguage.toUpperCase())), showLanguageSelector && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.languageDropdown
  }, availableLanguages.map(lang => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    key: lang,
    onPress: () => {
      changeSubtitleLanguage(lang);
      setShowLanguageSelector(false);
    },
    style: [styles.languageOption, lang === currentSubtitleLanguage && styles.languageOptionActive]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.languageOptionText, lang === currentSubtitleLanguage && styles.languageOptionTextActive]
  }, lang.toUpperCase()))))), isProgressBar && !error && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.progressContainer, {
      bottom: insets.bottom + 8
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.progressBar
  }, /*#__PURE__*/_react.default.createElement(_slider.default, {
    style: styles.slider,
    value: progress,
    minimumValue: 0,
    maximumValue: 1,
    minimumTrackTintColor: "#ff3b30",
    maximumTrackTintColor: "rgba(255, 255, 255, 0.3)",
    disabled: true
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.timeContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.timeText
  }, formatTime(currentTime), " / ", formatTime(duration)))), (showSkipButton || error) && !isLoading && /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.closeButtonOverlay, {
      top: insets.top + 24,
      opacity: buttonOpacity
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: handleClose,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.closeButton
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.closeButtonText
  }, error ? txtCloseButton : txtSkipButton))))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.backdrop,
    activeOpacity: 1,
    onPress: handleBackdropPress
  })));
};
exports.VideoModal = VideoModal;
const styles = _reactNative.StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  modalContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 16
  },
  closeButton: {
    minWidth: 40,
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  closeButtonOverlay: {
    position: 'absolute',
    right: 16,
    zIndex: 10
  },
  progressContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 100,
    zIndex: 10
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  slider: {
    height: '100%'
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  timeText: {
    color: '#fff',
    fontSize: 12
  },
  subtitleContainer: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 4,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    maxWidth: '80%'
  },
  subtitleText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  languageContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 10
  },
  languageButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center'
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  languageDropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 6,
    paddingVertical: 4,
    minWidth: 60
  },
  languageOption: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  languageOptionActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.3)'
  },
  languageOptionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center'
  },
  languageOptionTextActive: {
    color: '#ff3b30',
    fontWeight: '600'
  }
});
//# sourceMappingURL=VideoModal.js.map