import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  Dimensions,
  StyleSheet,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type GestureResponderEvent,
  Image,
  Animated,
} from 'react-native';
import { ButtonBase } from '../ButtonBase';
import { ButtonContainerVideo } from './ButtonContainerVideo';
import { getScreenHeight } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ArrayType = ['Photo', 'Video'];
const ITEM_WIDTH = 80;
const ITEM_MARGIN = 8;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_MARGIN * 2;

interface SnapScrollViewProps {
  mode: 'photo' | 'video' | 'both';
  isCapturing?: boolean;
  isRecording?: boolean;
  isPaused?: boolean;
  isCanPause?: boolean;
  stopRecording?: ((event: GestureResponderEvent) => void) | undefined;
  startRecording?: ((event: GestureResponderEvent) => void) | undefined;
  pauseRecording?: ((event: GestureResponderEvent) => void) | undefined;
  resumeRecording?: ((event: GestureResponderEvent) => void) | undefined;
  capturePhoto?: ((event: GestureResponderEvent) => void) | undefined;
  toggleCameraPosition?: ((event: GestureResponderEvent) => void) | undefined;
}

export const SnapScrollView = (props: SnapScrollViewProps) => {
  const {
    mode,
    isCapturing,
    capturePhoto,
    toggleCameraPosition,
    isRecording,
    isPaused,
    isCanPause,
    stopRecording,
    startRecording,
    pauseRecording,
    resumeRecording,
  } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const flatListRef = useRef<FlatList>(null);
  const lastScrollTime = useRef<number>(0);
  const { bottom } = useSafeAreaInsets();

  // Animation values for stop recording button
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Handle animation for stop recording button
  useEffect(() => {
    if (isRecording && isPaused && mode !== 'photo') {
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isRecording, isPaused, mode, fadeAnim, scaleAnim]);

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
    setActiveIndex(index);
  };

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 300) return; // tránh double trigger
    lastScrollTime.current = now;

    const offsetX = event.nativeEvent.contentOffset.x;
    const rawIndex = offsetX / TOTAL_ITEM_WIDTH;
    const delta = rawIndex - activeIndex;

    let nextIndex = activeIndex;
    if (delta > 0.3) {
      nextIndex = Math.min(activeIndex + 1, ArrayType.length - 1);
    } else if (delta < -0.3) {
      nextIndex = Math.max(activeIndex - 1, 0);
    }

    if (nextIndex !== activeIndex) {
      scrollToIndex(nextIndex);
    } else {
      // nếu không đổi, vẫn snap về đúng vị trí
      scrollToIndex(activeIndex);
    }
  };

  const finalArr = useMemo(() => {
    if (mode !== 'both') {
      return ArrayType.filter((item) => item.toLowerCase() === mode);
    }
    return ArrayType;
  }, [mode]);

  const renderButton = useMemo(() => {
    if (mode === 'both') {
      return (
        <>
          {activeIndex === 0 ? (
            <ButtonBase
              style={[
                styles.captureButton,
                isCapturing && styles.captureButtonDisabled,
              ]}
              onPress={capturePhoto}
              disabled={isCapturing}
            >
              <View style={styles.captureButtonInner} />
            </ButtonBase>
          ) : (
            <ButtonContainerVideo
              isCanPause={isCanPause}
              isPaused={isPaused}
              isRecording={isRecording}
              pauseRecording={pauseRecording}
              resumeRecording={resumeRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
          )}
        </>
      );
    } else if (mode === 'photo') {
      return (
        <ButtonBase
          style={[
            styles.captureButton,
            isCapturing && styles.captureButtonDisabled,
          ]}
          onPress={capturePhoto}
          disabled={isCapturing}
        >
          <View style={styles.captureButtonInner} />
        </ButtonBase>
      );
    } else {
      return (
        <ButtonContainerVideo
          isCanPause={isCanPause}
          isPaused={isPaused}
          isRecording={isRecording}
          pauseRecording={pauseRecording}
          resumeRecording={resumeRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      );
    }
  }, [
    mode,
    activeIndex,
    capturePhoto,
    isCapturing,
    isRecording,
    isPaused,
    startRecording,
    pauseRecording,
    resumeRecording,
    isCanPause,
    stopRecording,
  ]);

  const backgroundColor = isRecording ? 'transparent' : '#000000';

  return (
    <View
      style={[
        styles.bottomControls,
        { paddingBottom: bottom, backgroundColor },
      ]}
    >
      <FlatList
        ref={flatListRef}
        horizontal
        data={finalArr}
        keyExtractor={(_item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={mode === 'both' && !isRecording}
        onScrollEndDrag={onScrollEndDrag}
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - TOTAL_ITEM_WIDTH) / 2,
        }}
        renderItem={({ item, index }) => (
          <ButtonBase
            disabled={mode !== 'both' || isRecording}
            onPress={() => {
              if (index > activeIndex) {
                scrollToIndex(Math.min(activeIndex + 1, ArrayType.length - 1));
              } else if (index < activeIndex) {
                scrollToIndex(Math.max(activeIndex - 1, 0));
              }
            }}
            style={styles.item}
          >
            {!isRecording ? (
              <Text
                style={[
                  styles.text,
                  activeIndex === index && styles.activeText,
                ]}
              >
                {item}
              </Text>
            ) : null}
          </ButtonBase>
        )}
      />
      <View style={styles.captureButtonContainer}>
        <Animated.View
          style={[
            styles.stopRecordingButton,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          {isCanPause && (
            <ButtonBase style={styles.switchButton} onPress={stopRecording}>
              <View style={styles.stopRecordingButtonInner} />
            </ButtonBase>
          )}
        </Animated.View>

        <View style={styles.actionButtonContainer}>{renderButton}</View>

        <View style={styles.switchButtonContainer}>
          <ButtonBase
            style={styles.switchButton}
            onPress={toggleCameraPosition}
          >
            <Image
              tintColor="#FFFFFF"
              source={require('../assets/repeat.png')}
              style={[
                styles.switchButtonImage,
                {
                  transform: [{ rotate: '90deg' }],
                },
              ]}
            />
          </ButtonBase>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 16,
    height: getScreenHeight() * 0.2,
  },
  item: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_MARGIN,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
  },
  activeText: {
    color: '#FFEB3B',
  },
  actionButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  captureButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  captureButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  recordButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FF0000',
  },
  recordButtonInnerActive: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FF0000',
  },
  recordButtonInnerPaused: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FFD700',
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  stopButtonInner: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
  },
  switchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#585753',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  switchButtonImage: {
    width: 32,
    height: 32,
  },
  switchButtonContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 24,
    top: 0,
    zIndex: 1,
  },
  stopRecordingButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 24,
    top: 0,
    zIndex: 1,
  },
  stopRecordingButtonInner: {
    width: 20,
    height: 20,
    backgroundColor: '#FF0000',
  },
});
