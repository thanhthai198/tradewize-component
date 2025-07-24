import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { CameraComponent } from './CameraComponent';
import type { PhotoFile, VideoFile } from 'react-native-vision-camera';

export const CameraExample: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video' | 'both'>(
    'both'
  );
  const [capturedPhoto, setCapturedPhoto] = useState<PhotoFile | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<VideoFile | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const handlePhotoCaptured = (photo: PhotoFile) => {
    console.log('Photo captured:', photo);
    setCapturedPhoto(photo);
    setShowCamera(false);
    Alert.alert('Success', 'Photo captured successfully!');
  };

  const handleVideoRecorded = (video: VideoFile) => {
    console.log('Video recorded:', video);
    setRecordedVideo(video);
    // setShowCamera(false);
    Alert.alert('Success', 'Video recorded successfully!');
  };

  const handleError = (error: string) => {
    console.error('Camera error:', error);
    Alert.alert('Error', error);
  };

  const openCamera = (mode: 'photo' | 'video' | 'both') => {
    setCameraMode(mode);
    setShowCamera(true);
  };

  const clearData = () => {
    setCapturedPhoto(null);
    setRecordedVideo(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Camera Component Example</Text>

      {/* Audio Control */}
      <View style={styles.audioContainer}>
        <Text style={styles.audioLabel}>🎤 Audio Recording:</Text>
        <Switch
          value={audioEnabled}
          onValueChange={setAudioEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={audioEnabled ? '#007AFF' : '#f4f3f4'}
        />
        <Text style={styles.audioStatus}>
          {audioEnabled ? 'Enabled' : 'Disabled'}
        </Text>
      </View>

      {/* Camera Mode Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openCamera('photo')}
        >
          <Text style={styles.buttonText}>📸 Photo Only</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => openCamera('video')}
        >
          <Text style={styles.buttonText}>
            🎥 Video Only {audioEnabled ? '(with Audio)' : '(no Audio)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => openCamera('both')}
        >
          <Text style={styles.buttonText}>
            📸🎥 Photo & Video {audioEnabled ? '(with Audio)' : '(no Audio)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results Section */}
      <View style={styles.resultsContainer}>
        <Text style={styles.sectionTitle}>Results</Text>

        {capturedPhoto && (
          <View style={styles.resultItem}>
            <Text style={styles.resultTitle}>📸 Captured Photo:</Text>
            <Text style={styles.resultText}>Path: {capturedPhoto.path}</Text>
            <Text style={styles.resultText}>
              Size: {capturedPhoto.width} x {capturedPhoto.height}
            </Text>
            <Text style={styles.resultText}>
              Raw: {capturedPhoto.isRawPhoto ? 'Yes' : 'No'}
            </Text>
          </View>
        )}

        {recordedVideo && (
          <View style={styles.resultItem}>
            <Text style={styles.resultTitle}>🎥 Recorded Video:</Text>
            <Text style={styles.resultText}>Path: {recordedVideo.path}</Text>
            <Text style={styles.resultText}>
              Duration: {recordedVideo.duration}ms
            </Text>
            <Text style={styles.resultText}>
              Audio: {audioEnabled ? 'Yes' : 'No'}
            </Text>
          </View>
        )}

        {(capturedPhoto || recordedVideo) && (
          <TouchableOpacity style={styles.clearButton} onPress={clearData}>
            <Text style={styles.clearButtonText}>Clear Results</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Camera Modal */}
      <Modal
        visible={showCamera}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <CameraComponent
          mode={cameraMode}
          onPhotoCaptured={handlePhotoCaptured}
          onVideoRecorded={handleVideoRecorded}
          onError={handleError}
          onClose={() => setShowCamera(false)}
          flashMode="off"
          audio={audioEnabled}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
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
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  audioLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  audioStatus: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  resultItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CameraExample;
