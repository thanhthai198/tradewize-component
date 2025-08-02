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
import { VideoPlayer } from './VideoComponent';
import { getScreenHeight } from '../utils';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { LanguageCode, SubtitleEntry } from '../types';
import { loadSubtitles } from '../helper';
import { ButtonBase } from '../ButtonBase';

// Helper function to format time
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export interface VideoModalProps {
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
  isSubtitle?: boolean;
  subtitle: { [key: string]: string };
  txtSkipButton?: string;
  txtCloseButton?: string;
  initialSubtitle?: LanguageCode;
  isProgressBar?: boolean;
  onError?: (error: any, loading: boolean) => void;
  onLoad?: (loading: boolean) => void;
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
  isSubtitle = true,
  subtitle,
  txtSkipButton = 'Skip',
  txtCloseButton = 'Close',
  initialSubtitle = 'en',
  onError,
  onLoad,
  onEnd,
  onProgress,
  isProgressBar = true,
}) => {
  const insets = useSafeAreaInsets();
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [hasSubtitles, setHasSubtitles] = useState(true);
  const [subtitleLoaded, setSubtitleLoaded] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [currentSubtitleLanguage, setCurrentSubtitleLanguage] =
    useState<LanguageCode>(initialSubtitle);
  const [showLanguageSelector, setShowLanguageSelector] =
    useState<boolean>(false);

  const resetState = useCallback(() => {
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setSubtitles([]);
    setCurrentSubtitle('');
  }, []);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  const handleBackdropPress = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleVideoEnd = useCallback(() => {
    onEnd?.();
    if (autoCloseOnEnd) {
      handleClose();
    }
  }, [onEnd, autoCloseOnEnd, handleClose]);

  const handleVideoError = useCallback(
    (err: any, loading: boolean) => {
      setError(true);
      onError?.(err, loading);
    },
    [onError]
  );

  const handleVideoProgress = useCallback(
    (progressData: any) => {
      try {
        setCurrentTime(progressData.currentTime);
        setDuration(progressData.seekableDuration);
        if (progressData.seekableDuration > 0) {
          setProgress(progressData.currentTime / progressData.seekableDuration);
        }

        if (isSubtitle) {
          const match = subtitles.find(
            (s) =>
              progressData?.currentTime >= s.start - 0.1 &&
              progressData?.currentTime <= s.end + 0.1
          );
          if (match?.text !== currentSubtitle) {
            setCurrentSubtitle(match?.text || '');
          }
        }

        onProgress?.(progressData);
      } catch (err) {
        console.error('handleVideoProgress error', err);
      }
    },
    [onProgress, subtitles, isSubtitle, currentSubtitle]
  );

  const handleVideoLoad = useCallback(
    (loading: boolean) => {
      setError(false);
      onLoad?.(loading);
    },
    [onLoad]
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

  const loadFileSubtitle = useCallback(
    async (language: LanguageCode = currentSubtitleLanguage) => {
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
    },
    [subtitle, currentSubtitleLanguage]
  );

  const changeSubtitleLanguage = useCallback(
    async (language: LanguageCode) => {
      setCurrentSubtitleLanguage(language);
      setCurrentSubtitle(''); // Clear current subtitle when changing language
      setSubtitleLoaded(false);
      await loadFileSubtitle(language);
    },
    [loadFileSubtitle]
  );

  // Get available subtitle languages
  const availableLanguages = Object.keys(subtitle) as LanguageCode[];

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
        useNativeDriver: true,
      }).start();
    }
  }, [visible, buttonOpacity, autoPlay]);

  useEffect(() => {
    if (initialSubtitle) {
      setCurrentSubtitleLanguage(initialSubtitle);
    }
  }, [initialSubtitle]);

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
              progressUpdateInterval={100}
              source={source}
              height={getScreenHeight()}
              width="100%"
              autoPlay={isSubtitle ? subtitleLoaded && autoPlay : autoPlay}
              loop={loop}
              muted={muted}
              showControls={showControls}
              onError={handleVideoError}
              onLoad={handleVideoLoad}
              onEnd={handleVideoEnd}
              onProgress={handleVideoProgress}
              onPlayingChange={handlePlayingChange}
            />
          </View>

          {currentSubtitle && isSubtitle && hasSubtitles && !error && (
            <View
              style={[styles.subtitleContainer, { bottom: insets.bottom + 56 }]}
            >
              <Text style={styles.subtitleText}>{currentSubtitle}</Text>
            </View>
          )}

          {/* Language Selector */}
          {isSubtitle && availableLanguages.length > 1 && !error && (
            <View style={[styles.languageContainer, { top: insets.top + 24 }]}>
              <TouchableOpacity
                onPress={() => setShowLanguageSelector(!showLanguageSelector)}
                style={styles.languageButton}
              >
                <Text style={styles.languageButtonText}>
                  {currentSubtitleLanguage.toUpperCase()}
                </Text>
              </TouchableOpacity>

              {showLanguageSelector && (
                <View style={styles.languageDropdown}>
                  {availableLanguages.map((lang) => (
                    <TouchableOpacity
                      key={lang}
                      onPress={() => {
                        changeSubtitleLanguage(lang);
                        setShowLanguageSelector(false);
                      }}
                      style={[
                        styles.languageOption,
                        lang === currentSubtitleLanguage &&
                          styles.languageOptionActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.languageOptionText,
                          lang === currentSubtitleLanguage &&
                            styles.languageOptionTextActive,
                        ]}
                      >
                        {lang.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Progress Bar */}
          {isProgressBar && !error && (
            <View
              style={[styles.progressContainer, { bottom: insets.bottom + 8 }]}
            >
              <View style={styles.progressBar}>
                <Slider
                  style={styles.slider}
                  value={progress}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#ff3b30"
                  maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                  disabled={true}
                />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Text>
              </View>
            </View>
          )}

          {/* Close Button Overlay */}
          {(showSkipButton || error) && (
            <Animated.View
              style={[
                styles.closeButtonOverlay,
                {
                  top: insets.top + 24,
                  opacity: buttonOpacity,
                },
              ]}
            >
              <ButtonBase
                onPress={handleClose}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <View style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>
                    {error ? txtCloseButton : txtSkipButton}
                  </Text>
                </View>
              </ButtonBase>
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
    borderRadius: 8,
    padding: 8,
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
  subtitleContainer: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 4,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
  },
  subtitleText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  languageContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  languageButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  languageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  languageDropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 6,
    paddingVertical: 4,
    minWidth: 60,
  },
  languageOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  languageOptionActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.3)',
  },
  languageOptionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  languageOptionTextActive: {
    color: '#ff3b30',
    fontWeight: '600',
  },
});
