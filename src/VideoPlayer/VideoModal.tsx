import React, { useCallback, useRef, useEffect, useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { VideoPlayer } from './index';
import { getScreenHeight } from '../utils';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Helper function to format time
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface VideoModalProps {
  visible: boolean;
  onClose: () => void;
  source: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  showSkipButton?: boolean;
  autoCloseOnEnd?: boolean;
  onError?: (error: any) => void;
  onLoad?: () => void;
  onEnd?: () => void;
  onProgress?: (progress: {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
  }) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  visible,
  onClose,
  source,
  autoPlay = true,
  loop = false,
  muted = false,
  showControls = false,
  showSkipButton = true,
  autoCloseOnEnd = true,
  onError,
  onLoad,
  onEnd,
  onProgress,
}) => {
  const insets = useSafeAreaInsets();
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleVideoEnd = useCallback(() => {
    onEnd?.();
    if (autoCloseOnEnd) {
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }, [onEnd, autoCloseOnEnd, onClose]);

  const handleVideoProgress = useCallback(
    (progressData: any) => {
      setCurrentTime(progressData.currentTime);
      setDuration(progressData.seekableDuration);
      if (progressData.seekableDuration > 0) {
        setProgress(progressData.currentTime / progressData.seekableDuration);
      }
      onProgress?.(progressData);
    },
    [onProgress]
  );

  const handlePlayingChange = useCallback(
    (isPlaying: boolean) => {
      Animated.timing(buttonOpacity, {
        toValue: isPlaying ? 0.3 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
    [buttonOpacity]
  );

  // Reset button opacity when modal opens
  useEffect(() => {
    if (visible) {
      // If autoPlay is true, button should be dimmed initially
      const initialOpacity = autoPlay ? 0.3 : 1;
      Animated.timing(buttonOpacity, {
        toValue: initialOpacity,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, buttonOpacity, autoPlay]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.9)"
      />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Video Player */}
          <View style={styles.videoContainer}>
            <VideoPlayer
              source={source}
              height={getScreenHeight()}
              width="100%"
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              showControls={showControls}
              onError={onError}
              onLoad={onLoad}
              onEnd={handleVideoEnd}
              onProgress={handleVideoProgress}
              onPlayingChange={handlePlayingChange}
            />
          </View>

          {/* Progress Bar */}
          <View
            style={[styles.progressContainer, { bottom: insets.bottom + 20 }]}
          >
            <View style={styles.progressBar}>
              <Slider
                style={styles.slider}
                value={progress}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#ff3b30"
                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                thumbTintColor="#fff"
                disabled={true}
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </View>
          </View>

          {/* Close Button Overlay */}
          {showSkipButton && (
            <Animated.View
              style={[
                styles.closeButtonOverlay,
                {
                  top: insets.top + 24,
                  opacity: buttonOpacity,
                },
              ]}
            >
              <TouchableOpacity
                onPress={handleClose}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <View style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Skip</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Backdrop for closing */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 16,
  },
  closeButton: {
    minWidth: 40,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  closeButtonOverlay: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
  },
  progressContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 100,
    zIndex: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  slider: {
    height: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
  },
});
