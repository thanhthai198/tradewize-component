import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonBase } from '../ButtonBase';
export const ButtonContainerVideo = ({
  isRecording,
  isPaused,
  isCanPause,
  canStopRecording = false,
  resumeRecording,
  pauseRecording,
  startRecording,
  stopRecording
}) => {
  const handlePress = event => {
    if (isRecording) {
      if (isCanPause) {
        if (isPaused) {
          resumeRecording === null || resumeRecording === void 0 || resumeRecording(event);
        } else {
          pauseRecording === null || pauseRecording === void 0 || pauseRecording(event);
        }
      } else {
        // Chỉ cho phép dừng quay khi đã đạt thời gian tối thiểu
        if (canStopRecording) {
          stopRecording === null || stopRecording === void 0 || stopRecording(event);
        }
      }
    } else {
      startRecording === null || startRecording === void 0 || startRecording(event);
    }
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.videoControlsContainer
  }, /*#__PURE__*/React.createElement(ButtonBase, {
    style: [styles.recordButton, isRecording && !canStopRecording && styles.recordButtonDisabled],
    onPress: handlePress,
    disabled: isRecording && !canStopRecording
  }, /*#__PURE__*/React.createElement(View, {
    style: isRecording ? isPaused ? styles.recordButtonInner : styles.recordButtonInnerActive : styles.recordButtonInner
  })));
};
const styles = StyleSheet.create({
  videoControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  recordButtonDisabled: {
    opacity: 0.5,
    borderColor: '#FFA500'
  },
  recordButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FF0000'
  },
  recordButtonInnerActive: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FF0000'
  },
  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  stopButtonInner: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF'
  }
});
//# sourceMappingURL=ButtonContainerVideo.js.map