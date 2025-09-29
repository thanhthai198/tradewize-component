import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { CameraComponent } from './CameraComponent';
import type { CameraProps } from './CameraComponent';
import Modal, { type ModalProps } from 'react-native-modal';
import { Camera } from 'react-native-vision-camera';
import { ButtonBase } from '../ButtonBase';

export interface CameraModalProps extends Omit<CameraProps, 'onClose'> {
  visible: boolean;
  onClose: () => void;
  modalProps?: Partial<ModalProps>;
  titleErrorPermission?: string;
  txtButtonPermission?: string;
  txtRequestingPermissions?: string;
  txtOpenSettings?: string;
  txtInitializingCamera?: string;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  visible,
  onClose,
  modalProps,
  audio = true,
  mode = 'both',
  onError,
  titleErrorPermission = 'Camera permission is required',
  txtButtonPermission = 'Grant Permission',
  txtRequestingPermissions = 'Requesting permissions...',
  txtOpenSettings = 'Open Settings',
  txtInitializingCamera = 'Initializing camera...',
  ...cameraProps
}) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean>(false);
  const [isRequestingPermissions, setIsRequestingPermissions] =
    useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check and request permissions when modal becomes visible
  const checkAndRequestPermissions = useCallback(async () => {
    try {
      setIsRequestingPermissions(true);

      // Check camera permission
      const cameraStatus = await Camera.getCameraPermissionStatus();

      let cameraGranted = cameraStatus === 'granted';

      // Request camera permission if not granted
      if (!cameraGranted) {
        const newCameraStatus = await Camera.requestCameraPermission();
        cameraGranted = newCameraStatus === 'granted';
        setHasPermission(cameraGranted);

        if (!cameraGranted) {
          // Kiểm tra xem quyền có bị từ chối vĩnh viễn không
          if (newCameraStatus === 'denied') {
            setPermissionDenied(true);
          }
          onError?.('Camera permission is required');
        } else {
          setPermissionDenied(false);
        }
      } else {
        setHasPermission(cameraGranted);
        setPermissionDenied(false);
      }

      // Check microphone permission if audio is enabled
      if (audio && (mode === 'video' || mode === 'both')) {
        const microphoneStatus = await Camera.getMicrophonePermissionStatus();
        let audioGranted = microphoneStatus === 'granted';

        // Request microphone permission if not granted
        if (!audioGranted) {
          const newMicrophoneStatus =
            await Camera.requestMicrophonePermission();
          audioGranted = newMicrophoneStatus === 'granted';
          setHasAudioPermission(audioGranted);

          if (!audioGranted) {
            onError?.(
              'Microphone permission is required for video recording with audio'
            );
          }
        } else {
          setHasAudioPermission(audioGranted);
        }
      } else {
        setHasAudioPermission(true);
      }
    } catch (error) {
      console.error('Error checking/requesting permissions:', error);
      onError?.('Failed to request camera permissions');
    } finally {
      setIsLoading(false);
      setIsRequestingPermissions(false);
    }
  }, [audio, mode, onError]);

  // Check and request permissions when modal becomes visible
  useEffect(() => {
    if (visible) {
      // Hiển thị loading ngay lập tức
      setIsLoading(true);

      // Delay để modal mở xong rồi mới xin quyền
      const timer = setTimeout(() => {
        checkAndRequestPermissions();
      }, 500); // Delay 500ms để loading hiển thị đủ lâu

      return () => clearTimeout(timer);
    } else {
      // Reset permissions when modal is hidden
      setHasPermission(false);
      setHasAudioPermission(false);
      setIsRequestingPermissions(false);
      setPermissionDenied(false);
      setIsLoading(false);
      return undefined;
    }
  }, [visible, checkAndRequestPermissions]);

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const renderLoadingScreen = () => (
    <View style={styles.loadingContainer}>
      <ButtonBase style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </ButtonBase>
      <View style={styles.itemCenter}>
        <Text style={styles.loadingText}>{txtInitializingCamera}</Text>
      </View>
    </View>
  );

  const renderPermissionScreen = () => (
    <View style={styles.permissionContainer}>
      <ButtonBase style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </ButtonBase>
      <View style={styles.itemCenter}>
        {isRequestingPermissions ? (
          <>
            <Text style={styles.permissionText}>
              {txtRequestingPermissions}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.permissionText}>{titleErrorPermission}</Text>
            {permissionDenied ? (
              <ButtonBase
                style={styles.permissionButton}
                onPress={openSettings}
              >
                <Text style={styles.permissionButtonText}>
                  {txtOpenSettings}
                </Text>
              </ButtonBase>
            ) : (
              <ButtonBase
                style={styles.permissionButton}
                onPress={checkAndRequestPermissions}
              >
                <Text style={styles.permissionButtonText}>
                  {txtButtonPermission}
                </Text>
              </ButtonBase>
            )}
          </>
        )}
      </View>
    </View>
  );

  const renderCameraComponent = () => (
    <CameraComponent
      {...cameraProps}
      onClose={onClose}
      hasPermission={hasPermission}
      hasAudioPermission={hasAudioPermission}
    />
  );

  return (
    <Modal
      propagateSwipe={false}
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriver={true}
      style={{ margin: 0, backgroundColor: 'black' }}
      {...modalProps}
    >
      {isLoading
        ? renderLoadingScreen()
        : hasPermission
          ? renderCameraComponent()
          : renderPermissionScreen()}
    </Modal>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  permissionContainer: {
    flex: 1,
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
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
