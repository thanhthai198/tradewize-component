// VideoPlayer.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import type { ViewStyle, DimensionValue } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
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
  useProxy?: boolean; // Thêm option để sử dụng proxy
  proxyService?: 'cors-anywhere' | 'allorigins' | 'videoproxy'; // Chọn proxy service
  onError?: (error: any) => void;
  onLoad?: () => void;
  onEnd?: () => void;
  onProgress?: (progress: {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
  }) => void;
  onPlayingChange?: (isPlaying: boolean) => void;
}

const isYoutubeUrl = (url: string): boolean => {
  return /(?:youtube\.com|youtu\.be)/.test(url);
};

const extractYoutubeId = (url: string): string | null => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match && match[1] ? match[1] : null;
};

// Function to handle CORS issues with external video sources
const getVideoSource = (
  url: string,
  useProxy?: boolean,
  proxyService?: string
): string => {
  // If proxy is enabled and it's an external URL
  if (useProxy && (url.includes('samplelib.com') || url.includes('http'))) {
    switch (proxyService) {
      case 'cors-anywhere':
        return `https://cors-anywhere.herokuapp.com/${url}`;
      case 'allorigins':
        return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      case 'videoproxy':
        return `https://videoproxy.com/proxy?url=${encodeURIComponent(url)}`;
      default:
        return `https://cors-anywhere.herokuapp.com/${url}`;
    }
  }

  return url;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  height = 200,
  width = '100%',
  style,
  autoPlay = false,
  loop = false,
  muted = false,
  showControls = true,
  useProxy = false,
  proxyService = 'cors-anywhere',
  onError,
  onLoad,
  onEnd,
  onProgress,
  onPlayingChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Auto-hide play/pause button when video starts playing
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        hideButtonWithAnimation();
      }, 200); // Hide after 500ms when playing
      return () => clearTimeout(timer);
    }
  }, [isPlaying, hideButtonWithAnimation]);

  const handleLoad = useCallback(() => {
    console.log('Video loaded successfully:', source);
    setLoading(false);
    setError(null);
    setIsPlaying(autoPlay);
    onLoad?.();
  }, [onLoad, source, autoPlay]);

  const handleError = useCallback(
    (error: any) => {
      console.error('Video error:', error);
      setLoading(false);
      const errorMessage =
        error?.error?.errorString ||
        error?.error ||
        error?.message ||
        'Video playback error';
      setError(errorMessage);
      onError?.(error);
    },
    [onError]
  );

  const handleEnd = useCallback(() => {
    console.log('Video ended:', source);
    onEnd?.();
  }, [onEnd, source]);

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

  console.log(
    'VideoPlayer source:',
    source,
    'isYoutube:',
    isYoutubeUrl(source)
  );

  // Alternative test video sources if samplelib doesn't work:
  // - https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
  // - https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4
  // - https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4

  if (isYoutubeUrl(source)) {
    const videoId = extractYoutubeId(source);
    if (!videoId) {
      return (
        <View style={[styles.errorContainer, { height, width }, style]}>
          <Text style={styles.errorText}>Invalid YouTube URL</Text>
        </View>
      );
    }

    return (
      <View style={[styles.container, { height, width }, style]}>
        <YoutubePlayer
          height={height}
          width={Platform.OS === 'web' ? 100 : undefined}
          videoId={videoId}
          play={isPlaying}
          mute={muted}
          onReady={handleLoad}
          onError={handleError}
          webViewProps={{
            androidLayerType: 'hardware',
            allowsInlineMediaPlayback: true,
            mediaPlaybackRequiresUserAction: false,
            mixedContentMode: 'compatibility',
            domStorageEnabled: true,
            javaScriptEnabled: true,
            startInLoadingState: true,
            scalesPageToFit: true,
            allowsFullscreenVideo: true,
            userAgent:
              'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
          }}
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
            <Text style={styles.loadingText}>Loading YouTube video...</Text>
          </View>
        )}
        {error && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorSubText}>YouTube ID: {videoId}</Text>
          </View>
        )}
      </View>
    );
  }

  // For MP4 videos
  return (
    <View style={[styles.container, { height, width }, style]}>
      <Video
        source={{
          uri: getVideoSource(source, useProxy, proxyService),
          type: 'mp4',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Referer': 'https://samplelib.com/',
          },
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
          <Text style={styles.errorSubText}>Source: {source}</Text>
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
  errorSubText: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 16,
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
