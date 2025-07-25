// VideoPlayer.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import type { ViewStyle, DimensionValue } from 'react-native';
import Video from 'react-native-video';

interface VideoPlayerProps {
  source: string; // Có thể là link mp4 hoặc link YouTube
  height?: number;
  width?: DimensionValue;
  style?: ViewStyle;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  progressUpdateInterval?: number;
  onError?: (error: any, loading: boolean) => void;
  onLoad?: (loading: boolean) => void;
  onEnd?: () => void;
  onProgress?: (progress: {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
  }) => void;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
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
  onPlayingChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showButtonWithAnimation = useCallback(() => {
    setShowPlayPauseButton(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const hideButtonWithAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowPlayPauseButton(false);
    });
  }, [fadeAnim]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  // Notify parent when playing state changes
  useEffect(() => {
    onPlayingChange?.(isPlaying);
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
    onLoad?.(loading);
  }, [onLoad, autoPlay, loading]);

  const handleError = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (error: any) => {
      console.log('Video error:', error);
      setLoading(false);
      const errorMessage =
        error?.error?.errorString ||
        error?.message ||
        error?.error?.localizedDescription ||
        'Video playback error';

      setError(errorMessage);
      onError?.(error, loading);
    },
    [onError, loading]
  );

  const handleEnd = useCallback(() => {
    // console.log('Video ended:', source);
    onEnd?.();
  }, [onEnd]);

  const handleProgress = useCallback(
    (progress: any) => {
      onProgress?.(progress);
    },
    [onProgress]
  );

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
  }, [
    showControls,
    isPlaying,
    showButtonWithAnimation,
    hideButtonWithAnimation,
  ]);

  // console.log(
  //   'VideoPlayer source:',
  //   source,
  //   'isYoutube:',
  //   isYoutubeUrl(source)
  // );

  // For MP4 videos
  return (
    <View style={[styles.container, { height, width }, style]}>
      <Video
        progressUpdateInterval={progressUpdateInterval}
        source={{
          uri: source,
        }}
        style={styles.video}
        resizeMode="contain"
        controls={showControls}
        onLoad={handleLoad}
        onError={handleError}
        onEnd={handleEnd}
        onProgress={handleProgress}
        repeat={loop}
        muted={muted}
        paused={!isPlaying}
        bufferConfig={{
          minBufferMs: 5000,
          maxBufferMs: 10000,
          bufferForPlaybackMs: 1000,
          bufferForPlaybackAfterRebufferMs: 2000,
        }}
        ignoreSilentSwitch="ignore"
        playInBackground={false}
        playWhenInactive={false}
      />
      {!showControls && !loading && !error && (
        <TouchableOpacity
          style={styles.screenTapOverlay}
          onPress={handleScreenTap}
          activeOpacity={1}
        >
          {showPlayPauseButton && (
            <TouchableOpacity
              style={styles.playPauseOverlay}
              onPress={handlePlayPause}
              activeOpacity={0.8}
            >
              <Animated.View
                style={[styles.playPauseButton, { opacity: fadeAnim }]}
              >
                {isPlaying ? (
                  <Image
                    tintColor="#fff"
                    source={require('../assets/pause.png')}
                    style={styles.playPauseIcon}
                  />
                ) : (
                  <Image
                    tintColor="#fff"
                    source={require('../assets/play.png')}
                    style={styles.playPauseIcon}
                  />
                )}
              </Animated.View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading video...</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    padding: 16,
  },
  loadingText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  playPauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseIcon: {
    width: 24,
    height: 24,
  },
  screenTapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // Ensure it's above other content
  },
});

export { VideoModal } from './VideoModal';
