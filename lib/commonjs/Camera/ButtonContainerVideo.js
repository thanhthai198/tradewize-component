"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonContainerVideo = void 0;
var _reactNative = require("react-native");
var _ButtonBase = require("../ButtonBase");
const ButtonContainerVideo = ({
  isRecording,
  isPaused,
  resumeRecording,
  pauseRecording,
  startRecording
}) => {
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.videoControlsContainer
  }, /*#__PURE__*/React.createElement(_ButtonBase.ButtonBase, {
    style: styles.recordButton,
    onPress: isRecording ? isPaused ? resumeRecording : pauseRecording : startRecording
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: isRecording ? isPaused ? styles.recordButtonInner : styles.recordButtonInnerActive : styles.recordButtonInner
  })));
};
exports.ButtonContainerVideo = ButtonContainerVideo;
const styles = _reactNative.StyleSheet.create({
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