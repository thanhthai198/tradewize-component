import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import type {
  CameraPermissionStatus,
  PhotoFile,
  VideoFile,
} from 'react-native-vision-camera';
import Slider from '@react-native-community/slider';
import { SnapScrollView } from './CameraModeSelector';
import { ButtonBase } from '../ButtonBase';
import { getScreenHeight } from '../utils';
import RNFS from 'react-native-fs';

export interface CameraProps {
  onPhotoCaptured?: (photo: PhotoFile & { size: number }) => void;
  onVideoRecorded?: (video: VideoFile & { size: number }) => void;
  onError?: (error: string) => void;
  onClose?: () => void;
  flashMode?: 'off' | 'on';
  mode?: 'photo' | 'video' | 'both';
  audio?: boolean; // Cho phép tắt/bật âm thanh khi quay video
  initialZoom?: number; // Thêm prop cho zoom ban đầu
}

export const CameraComponent: React.FC<CameraProps> = ({
  onPhotoCaptured,
  onVideoRecorded,
  onError,
  onClose,
  mode = 'both',
  audio = true, // Mặc định bật âm thanh
  initialZoom = 1, // Mặc định zoom 1x
  flashMode = 'off',
}) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back'
  );
  const [currentFlashMode, setCurrentFlashMode] = useState<'off' | 'on'>(
    flashMode
  );
  const [zoom, setZoom] = useState<number>(initialZoom); // Thêm state cho zoom

  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find((_device) => _device.position === cameraPosition);

  // Lấy min/max zoom từ device
  const minZoom = device?.minZoom || 1;
  const maxZoom = device?.maxZoom || 10;

  // Timer for recording duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);

  const requestCameraPermission = useCallback(async () => {
    try {
      const status: CameraPermissionStatus =
        await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');

      if (status !== 'granted') {
        onError?.('Camera permission is required');
      }
    } catch (error) {
      onError?.('Failed to request camera permission');
    }
  }, [onError]);

  const requestMicrophonePermission = useCallback(async () => {
    try {
      const status = await Camera.requestMicrophonePermission();
      setHasAudioPermission(status === 'granted');

      if (status !== 'granted' && audio) {
        onError?.(
          'Microphone permission is required for video recording with audio'
        );
      }
    } catch (error) {
      setHasAudioPermission(false);
      if (audio) {
        onError?.('Failed to request microphone permission');
      }
    }
  }, [audio, onError]);

  useEffect(() => {
    requestCameraPermission();
    if (audio && (mode === 'video' || mode === 'both')) {
      requestMicrophonePermission();
    }
  }, [requestCameraPermission, requestMicrophonePermission, audio, mode]);

  const toggleCameraPosition = useCallback(() => {
    setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
    // Reset zoom khi chuyển camera
    setZoom(initialZoom);
  }, [initialZoom]);

  const toggleFlashMode = useCallback(() => {
    setCurrentFlashMode((prev) => {
      switch (prev) {
        case 'off':
          return 'on';
        case 'on':
          return 'off';
        default:
          return 'off';
      }
    });
  }, []);

  const setZoomLevel = useCallback(
    (level: number) => {
      setZoom(Math.max(minZoom, Math.min(level, maxZoom))); // Sử dụng min/max zoom của device
    },
    [minZoom, maxZoom]
  );

  const capturePhoto = useCallback(async () => {
    if (!camera.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await camera.current.takePhoto({
        flash: currentFlashMode,
      });

      const getSize = await RNFS.stat(photo.path);
      const img = {
        ...photo,
        size: getSize?.size,
      };

      onPhotoCaptured?.(img);
    } catch (error) {
      onError?.('Failed to capture photo');
    } finally {
      setIsCapturing(false);
    }
  }, [camera, isCapturing, currentFlashMode, onPhotoCaptured, onError]);

  const startRecording = useCallback(async () => {
    if (!camera.current || isRecording) return;

    try {
      setIsRecording(true);
      setIsPaused(false);
      setRecordingDuration(0);
      await camera.current.startRecording({
        onRecordingFinished: async (video) => {
          const path = video.path.replace('file://', '');
          const stat = await RNFS.stat(path);
          const videoFile = {
            ...video,
            size: stat?.size,
          };
          onVideoRecorded?.(videoFile);
          setIsRecording(false);
          setIsPaused(false);
          setRecordingDuration(0);
        },
        onRecordingError: (error) => {
          onError?.(`Recording error: ${error.message}`);
          setIsRecording(false);
          setIsPaused(false);
          setRecordingDuration(0);
        },
        flash: currentFlashMode,
      });
    } catch (error) {
      onError?.('Failed to start recording');
      setIsRecording(false);
      setIsPaused(false);
      setRecordingDuration(0);
    }
  }, [camera, isRecording, currentFlashMode, onVideoRecorded, onError]);

  const stopRecording = useCallback(async () => {
    if (!camera.current || !isRecording) return;

    try {
      await camera.current.stopRecording();
    } catch (error) {
      onError?.('Failed to stop recording');
      setIsRecording(false);
      setIsPaused(false);
      setRecordingDuration(0);
    }
  }, [camera, isRecording, onError]);

  const pauseRecording = useCallback(async () => {
    if (!camera.current || !isRecording || isPaused) return;

    try {
      await camera.current.pauseRecording();
      setIsPaused(true);
    } catch (error) {
      onError?.('Failed to pause recording');
    }
  }, [camera, isRecording, isPaused, onError]);

  const resumeRecording = useCallback(async () => {
    if (!camera.current || !isRecording || !isPaused) return;

    try {
      await camera.current.resumeRecording();
      setIsPaused(false);
    } catch (error) {
      onError?.('Failed to resume recording');
    }
  }, [camera, isRecording, isPaused, onError]);

  // Format duration to MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!device) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <ButtonBase
          style={styles.permissionButton}
          onPress={requestCameraPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </ButtonBase>
      </View>
    );
  }

  // Hiển thị cảnh báo nếu không có quyền microphone nhưng cần âm thanh
  const showAudioWarning =
    audio && !hasAudioPermission && (mode === 'video' || mode === 'both');

  const height = isRecording ? getScreenHeight() : getScreenHeight() * 0.8;
  const flashButtonColor =
    currentFlashMode === 'off' ? 'rgba(0, 0, 0, 0.5)' : '#EDE27D';

  return (
    <View style={styles.container}>
      <Camera
        torch={currentFlashMode}
        ref={camera}
        style={[StyleSheet.absoluteFill, { height }]}
        device={device}
        isActive={true}
        photo={mode === 'photo' || mode === 'both'}
        video={mode === 'video' || mode === 'both'}
        audio={audio && hasAudioPermission}
        zoom={zoom} // Thêm prop zoom
      />

      {/* Audio Warning */}
      {showAudioWarning && (
        <View style={styles.audioWarning}>
          <Text style={styles.audioWarningText}>
            ⚠️ Video will be recorded without audio
          </Text>
        </View>
      )}

      {/* Top Controls */}
      <View style={styles.topControls}>
        <ButtonBase style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </ButtonBase>

        <ButtonBase
          style={[
            styles.flashButton,
            {
              backgroundColor: flashButtonColor,
            },
          ]}
          onPress={toggleFlashMode}
        >
          <Text style={styles.flashButtonText}>⚡</Text>
        </ButtonBase>
      </View>

      {/* Zoom Slider */}
      <View style={styles.zoomSliderContainer}>
        <View style={styles.zoomLevelBackground}>
          <Text style={styles.zoomLevelText}>{zoom.toFixed(1)}x</Text>
        </View>
        <Slider
          style={styles.zoomSlider}
          minimumValue={minZoom}
          maximumValue={maxZoom}
          value={zoom}
          onValueChange={setZoomLevel}
          minimumTrackTintColor="white"
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          thumbTintColor="white"
        />
      </View>

      {/* Bottom Controls */}
      <SnapScrollView
        mode={mode}
        isRecording={isRecording}
        isPaused={isPaused}
        isCapturing={isCapturing}
        capturePhoto={capturePhoto}
        toggleCameraPosition={toggleCameraPosition}
        stopRecording={stopRecording}
        startRecording={startRecording}
        pauseRecording={pauseRecording}
        resumeRecording={resumeRecording}
      />

      {/* Recording Indicator */}
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <View
            style={[styles.recordingDot, isPaused && styles.recordingDotPaused]}
          />
          <Text style={styles.recordingText}>
            {formatDuration(recordingDuration)} {isPaused ? '(Paused)' : ''}
            {!hasAudioPermission && audio ? '(No Audio)' : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  audioWarning: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.9)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  audioWarningText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  // Zoom Slider Styles
  zoomSliderContainer: {
    position: 'absolute',
    bottom: getScreenHeight() * 0.2 + 8,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  zoomSlider: {
    width: '100%',
    height: 40,
  },
  zoomLevelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  zoomLevelBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  captureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  recordButtonStop: {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  recordingIndicator: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  recordingDotPaused: {
    backgroundColor: '#FFD700',
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CameraComponent;
