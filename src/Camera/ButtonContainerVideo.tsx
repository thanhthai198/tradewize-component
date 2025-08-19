import React from 'react';
import { StyleSheet, View, type GestureResponderEvent } from 'react-native';
import { ButtonBase } from '../ButtonBase';

interface ButtonContainerVideoProps {
  isRecording?: boolean;
  isPaused?: boolean;
  isCanPause?: boolean;
  canStopRecording?: boolean;
  resumeRecording?: ((event: GestureResponderEvent) => void) | undefined;
  pauseRecording?: ((event: GestureResponderEvent) => void) | undefined;
  startRecording?: ((event: GestureResponderEvent) => void) | undefined;
  stopRecording?: ((event: GestureResponderEvent) => void) | undefined;
}

export const ButtonContainerVideo = ({
  isRecording,
  isPaused,
  isCanPause,
  canStopRecording = false,
  resumeRecording,
  pauseRecording,
  startRecording,
  stopRecording,
}: ButtonContainerVideoProps) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (isRecording) {
      if (isCanPause) {
        if (isPaused) {
          resumeRecording?.(event);
        } else {
          pauseRecording?.(event);
        }
      } else {
        // Chỉ cho phép dừng quay khi đã đạt thời gian tối thiểu
        if (canStopRecording) {
          stopRecording?.(event);
        }
      }
    } else {
      startRecording?.(event);
    }
  };

  return (
    <View style={styles.videoControlsContainer}>
      <ButtonBase
        style={[
          styles.recordButton,
          isRecording && !canStopRecording && styles.recordButtonDisabled,
        ]}
        onPress={handlePress}
        disabled={isRecording && !canStopRecording}
      >
        <View
          style={
            isRecording
              ? isPaused
                ? styles.recordButtonInner
                : styles.recordButtonInnerActive
              : styles.recordButtonInner
          }
        />
      </ButtonBase>
    </View>
  );
};

const styles = StyleSheet.create({
  videoControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
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
  recordButtonDisabled: {
    opacity: 0.5,
    borderColor: '#FFA500',
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
});
