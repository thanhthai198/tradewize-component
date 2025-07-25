// VideoPlayer.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
export const VideoPlayer = ({
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const showButtonWithAnimation = useCallback(() => {
    setShowPlayPauseButton(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [fadeAnim]);
  const hideButtonWithAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setShowPlayPauseButton(false);
    });
  }, [fadeAnim]);
  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  // Notify parent when playing state changes
  useEffect(() => {
    onPlayingChange === null || onPlayingChange === void 0 || onPlayingChange(isPlaying);
  }, [isPlaying, onPlayingChange]);
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        hideButtonWithAnimation();
      }, 200); // Hide after 500ms when playing
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [isPlaying, hideButtonWithAnimation]);
  const handleLoad = useCallback(() => {
    // console.log('Video loaded successfully:', source);
    setLoading(false);
    setError('');
    setIsPlaying(autoPlay);
    onLoad === null || onLoad === void 0 || onLoad(loading);
  }, [onLoad, autoPlay, loading]);
  const handleError = useCallback(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  error => {
    var _error$error, _error$error2;
    console.log('Video error:', error);
    setLoading(false);
    const errorMessage = (error === null || error === void 0 || (_error$error = error.error) === null || _error$error === void 0 ? void 0 : _error$error.errorString) || (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 || (_error$error2 = error.error) === null || _error$error2 === void 0 ? void 0 : _error$error2.localizedDescription) || 'Video playback error';
    setError(errorMessage);
    onError === null || onError === void 0 || onError(error, loading);
  }, [onError, loading]);
  const handleEnd = useCallback(() => {
    // console.log('Video ended:', source);
    onEnd === null || onEnd === void 0 || onEnd();
  }, [onEnd]);
  const handleProgress = useCallback(progress => {
    onProgress === null || onProgress === void 0 || onProgress(progress);
  }, [onProgress]);
  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);
  const handleScreenTap = useCallback(() => {
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
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      height,
      width
    }, style]
  }, /*#__PURE__*/React.createElement(Video, {
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
  }), !showControls && !loading && !error && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.screenTapOverlay,
    onPress: handleScreenTap,
    activeOpacity: 1
  }, showPlayPauseButton && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.playPauseOverlay,
    onPress: handlePlayPause,
    activeOpacity: 0.8
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.playPauseButton, {
      opacity: fadeAnim
    }]
  }, isPlaying ? /*#__PURE__*/React.createElement(Image, {
    tintColor: "#fff",
    source: require('../assets/pause.png'),
    style: styles.playPauseIcon
  }) : /*#__PURE__*/React.createElement(Image, {
    tintColor: "#fff",
    source: require('../assets/play.png'),
    style: styles.playPauseIcon
  })))), loading && /*#__PURE__*/React.createElement(View, {
    style: styles.loadingOverlay
  }, /*#__PURE__*/React.createElement(ActivityIndicator, {
    size: "large",
    color: "#007AFF"
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.loadingText
  }, "Loading video...")), error && /*#__PURE__*/React.createElement(View, {
    style: styles.errorOverlay
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.errorText
  }, error)));
};
const styles = StyleSheet.create({
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
export { VideoModal } from './VideoModal';
//# sourceMappingURL=VideoComponent.js.map