import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert, ScrollView, Switch } from 'react-native';
import { CameraComponent } from './CameraComponent';
export const CameraExample = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState('both');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const handlePhotoCaptured = photo => {
    console.log('Photo captured:', photo);
    setCapturedPhoto(photo);
    setShowCamera(false);
    Alert.alert('Success', 'Photo captured successfully!');
  };
  const handleVideoRecorded = video => {
    console.log('Video recorded:', video);
    setRecordedVideo(video);
    // setShowCamera(false);
    Alert.alert('Success', 'Video recorded successfully!');
  };
  const handleError = error => {
    console.error('Camera error:', error);
    Alert.alert('Error', error);
  };
  const openCamera = mode => {
    setCameraMode(mode);
    setShowCamera(true);
  };
  const clearData = () => {
    setCapturedPhoto(null);
    setRecordedVideo(null);
  };
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, "Camera Component Example"), /*#__PURE__*/React.createElement(View, {
    style: styles.audioContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.audioLabel
  }, "\uD83C\uDFA4 Audio Recording:"), /*#__PURE__*/React.createElement(Switch, {
    value: audioEnabled,
    onValueChange: setAudioEnabled,
    trackColor: {
      false: '#767577',
      true: '#81b0ff'
    },
    thumbColor: audioEnabled ? '#007AFF' : '#f4f3f4'
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.audioStatus
  }, audioEnabled ? 'Enabled' : 'Disabled')), /*#__PURE__*/React.createElement(View, {
    style: styles.buttonContainer
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: () => openCamera('photo')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.buttonText
  }, "\uD83D\uDCF8 Photo Only")), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: () => openCamera('video')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.buttonText
  }, "\uD83C\uDFA5 Video Only ", audioEnabled ? '(with Audio)' : '(no Audio)')), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.button,
    onPress: () => openCamera('both')
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.buttonText
  }, "\uD83D\uDCF8\uD83C\uDFA5 Photo & Video ", audioEnabled ? '(with Audio)' : '(no Audio)'))), /*#__PURE__*/React.createElement(View, {
    style: styles.resultsContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Results"), capturedPhoto && /*#__PURE__*/React.createElement(View, {
    style: styles.resultItem
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.resultTitle
  }, "\uD83D\uDCF8 Captured Photo:"), /*#__PURE__*/React.createElement(Text, {
    style: styles.resultText
  }, "Path: ", capturedPhoto.path), /*#__PURE__*/React.createElement(Text, {
    style: styles.resultText
  }, "Size: ", capturedPhoto.width, " x ", capturedPhoto.height), /*#__PURE__*/React.createElement(Text, {
    style: styles.resultText
  }, "Raw: ", capturedPhoto.isRawPhoto ? 'Yes' : 'No')), recordedVideo && /*#__PURE__*/React.createElement(View, {
    style: styles.resultItem
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.resultTitle
  }, "\uD83C\uDFA5 Recorded Video:"), /*#__PURE__*/React.createElement(Text, {
    style: styles.resultText
  }, "Path: ", recordedVideo.path), /*#__PURE__*/React.createElement(Text, {
    style: styles.resultText
  }, "Duration: ", recordedVideo.duration, "ms"), /*#__PURE__*/React.createElement(Text, {
    style: styles.resultText
  }, "Audio: ", audioEnabled ? 'Yes' : 'No')), (capturedPhoto || recordedVideo) && /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: styles.clearButton,
    onPress: clearData
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.clearButtonText
  }, "Clear Results"))), /*#__PURE__*/React.createElement(Modal, {
    visible: showCamera,
    animationType: "slide",
    presentationStyle: "fullScreen"
  }, /*#__PURE__*/React.createElement(CameraComponent, {
    mode: cameraMode,
    onPhotoCaptured: handlePhotoCaptured,
    onVideoRecorded: handleVideoRecorded,
    onError: handleError,
    onClose: () => setShowCamera(false),
    flashMode: "off",
    audio: audioEnabled
  })));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333'
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  audioLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1
  },
  audioStatus: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 30
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  resultItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});
export default CameraExample;
//# sourceMappingURL=example.js.map