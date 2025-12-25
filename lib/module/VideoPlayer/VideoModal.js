import React, { useCallback, useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar, Text, Animated, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { VideoPlayer } from './VideoComponent';
import { getScreenHeight } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loadSubtitles } from '../helper';
import { ButtonBase } from '../ButtonBase';
import ReactNativeModal from 'react-native-modal';

// Helper function to format time
const formatTime = seconds => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
export const VideoModal = ({
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
  isRateControl = false,
  onError,
  onLoad,
  onEnd,
  onProgress,
  isProgressBar = true,
  refreshOnSubtitleChange = false,
  isControlsMuted = false
}) => {
  const insets = useSafeAreaInsets();
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [hasSubtitles, setHasSubtitles] = useState(true);
  const [subtitleLoaded, setSubtitleLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSubtitleLanguage, setCurrentSubtitleLanguage] = useState(initialSubtitle);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showRateSelector, setShowRateSelector] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(muted);
  const resetState = useCallback(() => {
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setSubtitles([]);
    setCurrentSubtitle('');
  }, []);
  const handleClose = useCallback(() => {
    setRate(1.0);
    resetState();
    onClose();
  }, [onClose, resetState, setRate]);
  const handleBackdropPress = useCallback(() => {
    handleClose();
  }, [handleClose]);
  const handleVideoEnd = useCallback(() => {
    onEnd === null || onEnd === void 0 || onEnd();
    if (autoCloseOnEnd) {
      handleClose();
    }
  }, [onEnd, autoCloseOnEnd, handleClose]);
  const handleVideoError = useCallback((err, loading) => {
    setError(true);
    onError === null || onError === void 0 || onError(err, loading);
  }, [onError]);
  const handleVideoProgress = useCallback(progressData => {
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
  const handleVideoLoad = useCallback(loading => {
    setError(false);
    onLoad === null || onLoad === void 0 || onLoad(loading);
  }, [onLoad]);
  const handlePlayingChange = useCallback(isPlaying => {
    Animated.timing(buttonOpacity, {
      toValue: isPlaying ? 0.3 : 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [buttonOpacity]);
  const loadFileSubtitle = useCallback(async (language = currentSubtitleLanguage) => {
    try {
      const subtitleUrl = subtitle[language] || '';
      const parsed = await loadSubtitles(subtitleUrl);
      setSubtitles(parsed);
      setHasSubtitles(parsed.length > 0);
    } catch (err) {
      console.error('Error loading subtitles:', err);
      setHasSubtitles(false);
    } finally {
      setSubtitleLoaded(true);
    }
  }, [subtitle, currentSubtitleLanguage]);

  // Get the current video source based on selected language
  const getCurrentVideoSource = useCallback(() => {
    if (typeof source === 'string') {
      return source;
    }
    // If source is an object, get the URI for the current language
    return source[currentSubtitleLanguage] || source[initialSubtitle] || Object.values(source)[0] || '';
  }, [source, currentSubtitleLanguage, initialSubtitle]);
  const changeSubtitleLanguage = useCallback(async language => {
    setCurrentSubtitleLanguage(language);
    setCurrentSubtitle(''); // Clear current subtitle when changing language
    setSubtitleLoaded(false);
    // Reset video state to refresh component only if refreshOnSubtitleChange is true
    if (refreshOnSubtitleChange) {
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      setSubtitles([]);
    }
    await loadFileSubtitle(language);
  }, [loadFileSubtitle, refreshOnSubtitleChange]);
  const changeRate = useCallback(rateVideo => {
    setRate(rateVideo);
  }, [setRate]);

  // Get available subtitle languages
  const availableLanguages = Object.keys(subtitle);
  useEffect(() => {
    if (isSubtitle) {
      setSubtitleLoaded(false);
      loadFileSubtitle();
    }
  }, [isSubtitle, loadFileSubtitle]);

  // Reset button opacity when modal opens
  useEffect(() => {
    if (visible) {
      // If autoPlay is true, button should be dimmed initially
      const initialOpacity = autoPlay ? 0.3 : 1;
      Animated.timing(buttonOpacity, {
        toValue: initialOpacity,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [visible, buttonOpacity, autoPlay]);
  useEffect(() => {
    if (initialSubtitle) {
      setCurrentSubtitleLanguage(initialSubtitle);
    }
  }, [initialSubtitle]);
  return /*#__PURE__*/React.createElement(ReactNativeModal, {
    isVisible: visible,
    onBackdropPress: handleClose,
    statusBarTranslucent: true,
    useNativeDriver: true,
    style: {
      margin: 0
    },
    animationIn: "fadeIn",
    animationOut: "fadeOut",
    animationInTiming: 300,
    animationOutTiming: 300,
    backdropOpacity: 0.5
  }, /*#__PURE__*/React.createElement(StatusBar, {
    barStyle: "light-content",
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.modalContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.modalContent
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.videoContainer
  }, /*#__PURE__*/React.createElement(VideoPlayer, {
    key: refreshOnSubtitleChange || typeof source === 'object' ? `video-${currentSubtitleLanguage}-${subtitleLoaded}` : undefined,
    rate: rate,
    progressUpdateInterval: 100,
    source: getCurrentVideoSource(),
    height: getScreenHeight(),
    width: "100%",
    autoPlay: isSubtitle ? subtitleLoaded && autoPlay : autoPlay,
    loop: loop,
    muted: isMuted,
    showControls: showControls,
    onError: handleVideoError,
    onLoad: handleVideoLoad,
    onEnd: handleVideoEnd,
    onProgress: handleVideoProgress,
    onPlayingChange: handlePlayingChange
  })), currentSubtitle && isSubtitle && hasSubtitles && !error && /*#__PURE__*/React.createElement(View, {
    style: [styles.subtitleContainer, {
      bottom: insets.bottom + 48
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.subtitleText
  }, currentSubtitle)), isSubtitle && availableLanguages.length > 1 && !error && /*#__PURE__*/React.createElement(View, {
    style: [styles.languageContainer,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      top: insets.top + 24,
      left: isRateControl ? 90 : 16
    }]
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => setShowLanguageSelector(!showLanguageSelector),
    style: styles.languageButton
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.languageButtonText
  }, currentSubtitleLanguage.toUpperCase())), showLanguageSelector && /*#__PURE__*/React.createElement(View, {
    style: styles.languageDropdown
  }, availableLanguages.map(lang => /*#__PURE__*/React.createElement(TouchableOpacity, {
    key: lang,
    onPress: () => {
      changeSubtitleLanguage(lang);
      setShowLanguageSelector(false);
    },
    style: [styles.languageOption, lang === currentSubtitleLanguage && styles.languageOptionActive]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.languageOptionText, lang === currentSubtitleLanguage && styles.languageOptionTextActive]
  }, lang.toUpperCase()))))), isRateControl && /*#__PURE__*/React.createElement(View, {
    style: [styles.rateContainer, {
      top: insets.top + 24
    }]
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => setShowRateSelector(!showRateSelector),
    style: styles.rateButton
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.rateText
  }, "x", rate.toString())), showRateSelector && /*#__PURE__*/React.createElement(View, {
    style: styles.rateDropdown
  }, ['0.25', '0.5', '1.0', '1.5', '2.0'].map(rateItem => /*#__PURE__*/React.createElement(TouchableOpacity, {
    key: rateItem,
    onPress: () => {
      changeRate(Number(rateItem));
      setShowRateSelector(false);
    },
    style: [styles.languageOption, Number(rateItem) === rate && styles.languageOptionActive]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.languageOptionText, Number(rateItem) === rate && styles.languageOptionTextActive]
  }, rateItem))))), !isControlsMuted && /*#__PURE__*/React.createElement(View, {
    style: [styles.mutedContainer, {
      top: showSkipButton ? insets.top + 84 : insets.top + 24
    }]
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => setIsMuted(!isMuted)
  }, /*#__PURE__*/React.createElement(Image, {
    tintColor: "#fff",
    source: !isMuted ? require('./assets/sound_on.png') : require('./assets/volume_mute.png'),
    style: styles.mutedIcon
  }))), isProgressBar && !error && /*#__PURE__*/React.createElement(View, {
    style: [styles.progressContainer, {
      bottom: insets.bottom
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.progressBar
  }, /*#__PURE__*/React.createElement(Slider, {
    style: styles.slider,
    value: progress,
    minimumValue: 0,
    maximumValue: 1,
    minimumTrackTintColor: "#ff3b30",
    maximumTrackTintColor: "rgba(255, 255, 255, 0.3)",
    disabled: true
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.timeContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.timeText
  }, formatTime(currentTime), " / ", formatTime(duration)))), (showSkipButton || error) && /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.closeButtonOverlay, {
      top: insets.top + 24,
      opacity: buttonOpacity
    }]
  }, /*#__PURE__*/React.createElement(ButtonBase, {
    onPress: handleClose,
    hitSlop: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.closeButton
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.closeButtonText
  }, error ? txtCloseButton : txtSkipButton))))), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.backdrop,
    activeOpacity: 1,
    onPress: handleBackdropPress
  })));
};
const styles = StyleSheet.create({
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
  rateDropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 6,
    paddingVertical: 4,
    width: 60,
    gap: 4
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
  },
  rateContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 10
  },
  rateButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8
  },
  rateText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  mutedContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    right: 16,
    zIndex: 10,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 8
  },
  mutedIcon: {
    width: 24,
    height: 24
  }
});
//# sourceMappingURL=VideoModal.js.map