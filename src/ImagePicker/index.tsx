import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import ImagePicker, {
  type Image as PickerImage,
} from 'react-native-image-crop-picker';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { getAllowedPhotos } from '../getAllowedPhotos';

export interface ImagePickerProps {
  /**
   * Callback function called when an image is selected
   */
  onImageSelected?: (image: PickerImage | PickerImage[]) => void;

  /**
   * Callback function called when there's an error
   */
  onError?: (error: any) => void;

  /**
   * Maximum number of images that can be selected (for multiple selection)
   */
  multiple?: boolean;

  /**
   * Maximum number of images that can be selected
   */
  maxFiles?: number;

  /**
   * Whether to show crop options
   */
  cropping?: boolean;

  /**
   * Crop rectangle width
   */
  width?: number;

  /**
   * Crop rectangle height
   */
  height?: number;

  /**
   * Minimum image dimensions
   */
  minWidth?: number;
  minHeight?: number;

  /**
   * Maximum image dimensions
   */
  maxWidth?: number;
  maxHeight?: number;

  /**
   * Image format
   */
  includeBase64?: boolean;

  /**
   * Include EXIF data
   */
  includeExif?: boolean;

  /**
   * Media type to pick
   */
  mediaType?: 'photo' | 'video' | 'any';

  /**
   * Custom button text
   */
  buttonText?: string;

  /**
   * Custom button style
   */
  buttonStyle?: any;

  /**
   * Custom button text style
   */
  buttonTextStyle?: any;

  /**
   * Container style
   */
  style?: any;

  /**
   * Whether to show action sheet for source selection
   */
  showActionSheet?: boolean;

  /**
   * Custom action sheet options
   */
  actionSheetOptions?: string[];

  /**
   * Whether to compress images
   */
  compressImageQuality?: number;

  /**
   * Force JPEG format
   */
  forceJpg?: boolean;

  /**
   * Disable the component
   */
  disabled?: boolean;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  onImageSelected,
  onError,
  multiple = false,
  maxFiles = 10,
  cropping = false,
  width = 300,
  height = 300,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  includeBase64 = false,
  includeExif = false,
  mediaType = 'photo',
  buttonText = 'Select Image',
  buttonStyle,
  buttonTextStyle,
  style,
  showActionSheet = true,
  actionSheetOptions = ['Camera', 'Gallery', 'Cancel'],
  compressImageQuality = 0.8,
  forceJpg = false,
  disabled = false,
}) => {
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>([]);
  const [showLimitedPhotosModal, setShowLimitedPhotosModal] = useState(false);
  const [limitedPhotos, setLimitedPhotos] = useState<any[]>([]);
  const [selectedLimitedPhotos, setSelectedLimitedPhotos] = useState<
    Set<number>
  >(new Set());

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const result = await request(PERMISSIONS.ANDROID.CAMERA);
        return result === RESULTS.GRANTED;
      } else {
        const result = await request(PERMISSIONS.IOS.CAMERA);

        if (result === RESULTS.GRANTED) {
        } else {
        }

        return result === RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('Camera permission error:', error);
      return false;
    }
  }, []);

  const requestGalleryPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        // For Android 13+ (API 33+), use READ_MEDIA_IMAGES
        if (Platform.Version >= 33) {
          const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
          return result === RESULTS.GRANTED;
        } else {
          // For older Android versions, use READ_EXTERNAL_STORAGE
          const result = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          );
          return result === RESULTS.GRANTED;
        }
      } else {
        const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

        return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
      }
    } catch (error) {
      console.error('Gallery permission error:', error);
      return false;
    }
  }, []);

  const showError = useCallback(
    (error: any) => {
      console.error('ImagePicker Error:', error);
      if (onError) {
        onError(error);
      } else {
        Alert.alert(
          'Error',
          error.message || 'An error occurred while selecting image'
        );
      }
    },
    [onError]
  );

  const getPickerOptions = useCallback((): any => {
    const baseOptions: any = {
      mediaType,
      includeBase64,
      includeExif,
      compressImageQuality,
      forceJpg,
    };

    if (cropping) {
      baseOptions.cropping = true;
      baseOptions.width = width;
      baseOptions.height = height;
    }

    if (minWidth || minHeight) {
      baseOptions.minWidth = minWidth;
      baseOptions.minHeight = minHeight;
    }

    if (maxWidth || maxHeight) {
      baseOptions.maxWidth = maxWidth;
      baseOptions.maxHeight = maxHeight;
    }

    if (multiple) {
      baseOptions.multiple = true;
      baseOptions.maxFiles = maxFiles;
    }

    return baseOptions;
  }, [
    mediaType,
    includeBase64,
    includeExif,
    compressImageQuality,
    forceJpg,
    cropping,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    multiple,
    maxFiles,
  ]);

  const openCamera = useCallback(async () => {
    try {
      // Request camera permission first
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos. Please enable it in settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      const options = getPickerOptions();
      const result = await ImagePicker.openCamera(options);

      if (multiple && Array.isArray(result)) {
        setSelectedImages(result);
        onImageSelected?.(result);
      } else if (!multiple && result && !Array.isArray(result)) {
        setSelectedImages([result]);
        onImageSelected?.(result);
      }
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        showError(error);
      }
    }
  }, [
    getPickerOptions,
    multiple,
    onImageSelected,
    showError,
    requestCameraPermission,
  ]);

  const openGallery = useCallback(async () => {
    try {
      // Request gallery permission first
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Gallery permission is required to select photos. Please enable it in settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      // For Android, check if we have limited photos and show modal
      if (Platform.OS === 'android') {
        try {
          const allowedPhotos = await getAllowedPhotos();

          if (allowedPhotos && allowedPhotos.length > 0) {
            setLimitedPhotos(allowedPhotos);
            setShowLimitedPhotosModal(true);
            return;
          }
        } catch (error) {
          console.log('Error getting allowed photos:', error);
        }
      }

      const options = getPickerOptions();
      const result = await ImagePicker.openPicker(options);

      if (multiple && Array.isArray(result)) {
        setSelectedImages(result);
        onImageSelected?.(result);
      } else if (!multiple && result && !Array.isArray(result)) {
        setSelectedImages([result]);
        onImageSelected?.(result);
      }
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        showError(error);
      }
    }
  }, [
    getPickerOptions,
    multiple,
    onImageSelected,
    showError,
    requestGalleryPermission,
  ]);

  const showImagePicker = useCallback(() => {
    if (disabled) return;

    if (showActionSheet && Platform.OS === 'ios') {
      const options = actionSheetOptions;
      Alert.alert(
        'Select Image Source',
        'Choose how you want to select an image',
        [
          {
            text: options[0] || 'Camera',
            onPress: openCamera,
          },
          {
            text: options[1] || 'Gallery',
            onPress: openGallery,
          },
          {
            text: options[2] || 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    } else {
      // For Android or when action sheet is disabled, go directly to gallery
      openGallery();
    }
  }, [disabled, showActionSheet, actionSheetOptions, openCamera, openGallery]);

  const removeImage = useCallback(
    (index: number) => {
      const newImages = selectedImages.filter((_, i) => i !== index);
      setSelectedImages(newImages);
      onImageSelected?.(newImages);
    },
    [selectedImages, onImageSelected]
  );

  const handleLimitedPhotoSelect = useCallback(
    (photo: any, index: number) => {
      if (multiple) {
        // Toggle selection for multiple mode
        const newSelected = new Set(selectedLimitedPhotos);
        if (newSelected.has(index)) {
          newSelected.delete(index);
        } else {
          // Check max files limit
          if (newSelected.size >= maxFiles) {
            Alert.alert(
              'Limit Reached',
              `You can only select up to ${maxFiles} images.`,
              [{ text: 'OK' }]
            );
            return;
          }
          newSelected.add(index);
        }
        setSelectedLimitedPhotos(newSelected);
      } else {
        // Single selection mode - select and close modal
        const pickerImage: PickerImage = {
          path: photo.uri || photo.path,
          width: photo.width || 0,
          height: photo.height || 0,
          mime: photo.mime || 'image/jpeg',
          size: photo.size || 0,
          data: photo.data || '',
          filename: photo.filename || '',
          creationDate: photo.creationDate || new Date().toISOString(),
          modificationDate: photo.modificationDate || new Date().toISOString(),
        };

        setSelectedImages([pickerImage]);
        onImageSelected?.(pickerImage);
        setShowLimitedPhotosModal(false);
      }
    },
    [selectedLimitedPhotos, multiple, maxFiles, onImageSelected]
  );

  const handleConfirmSelection = useCallback(() => {
    if (selectedLimitedPhotos.size === 0) {
      Alert.alert('No Selection', 'Please select at least one photo.', [
        { text: 'OK' },
      ]);
      return;
    }

    const selectedPhotos = Array.from(selectedLimitedPhotos).map(
      (index) => limitedPhotos[index]
    );
    const pickerImages: PickerImage[] = selectedPhotos.map((photo) => ({
      path: photo.uri || photo.path,
      width: photo.width || 0,
      height: photo.height || 0,
      mime: photo.mime || 'image/jpeg',
      size: photo.size || 0,
      data: photo.data || '',
      filename: photo.filename || '',
      creationDate: photo.creationDate || new Date().toISOString(),
      modificationDate: photo.modificationDate || new Date().toISOString(),
    }));

    setSelectedImages(pickerImages);
    onImageSelected?.(pickerImages);
    setShowLimitedPhotosModal(false);
    setSelectedLimitedPhotos(new Set());
  }, [selectedLimitedPhotos, limitedPhotos, onImageSelected]);

  const renderLimitedPhotoItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const isSelected = selectedLimitedPhotos.has(index);

      return (
        <TouchableOpacity
          style={[
            styles.limitedPhotoItem,
            isSelected && styles.selectedPhotoItem,
          ]}
          onPress={() => handleLimitedPhotoSelect(item, index)}
        >
          <Image
            source={{ uri: item.uri || item.path }}
            style={styles.limitedPhotoImage}
          />
          {isSelected && (
            <View style={styles.selectionOverlay}>
              <View style={styles.selectionCheckmark}>
                <Text style={styles.selectionCheckmarkText}>✓</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [handleLimitedPhotoSelect, selectedLimitedPhotos]
  );

  const renderSelectedImages = () => {
    if (selectedImages.length === 0) return null;

    return (
      <View style={styles.selectedImagesContainer}>
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image.path }} style={styles.selectedImage} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
        onPress={showImagePicker}
        disabled={disabled}
      >
        <Text
          style={[
            styles.buttonText,
            buttonTextStyle,
            disabled && styles.disabledText,
          ]}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>

      {renderSelectedImages()}

      {/* Limited Photos Modal for Android */}
      <Modal
        visible={showLimitedPhotosModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowLimitedPhotosModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {multiple
                ? `Select Photos (${selectedLimitedPhotos.size}/${maxFiles})`
                : 'Select Photo'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowLimitedPhotosModal(false);
                setSelectedLimitedPhotos(new Set());
              }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={limitedPhotos}
            renderItem={renderLimitedPhotoItem}
            keyExtractor={(item, index) => `${item.uri || item.path}-${index}`}
            numColumns={3}
            contentContainerStyle={styles.photoGrid}
            showsVerticalScrollIndicator={false}
          />

          {multiple && (
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  selectedLimitedPhotos.size === 0 &&
                    styles.disabledConfirmButton,
                ]}
                onPress={handleConfirmSelection}
                disabled={selectedLimitedPhotos.size === 0}
              >
                <Text
                  style={[
                    styles.confirmButtonText,
                    selectedLimitedPhotos.size === 0 &&
                      styles.disabledConfirmButtonText,
                  ]}
                >
                  Confirm ({selectedLimitedPhotos.size})
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: '#999999',
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3B30',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666666',
    fontWeight: 'bold',
  },
  photoGrid: {
    padding: 8,
  },
  limitedPhotoItem: {
    flex: 1,
    margin: 4,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  limitedPhotoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
  },
  selectedPhotoItem: {
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionCheckmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionCheckmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledConfirmButton: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledConfirmButtonText: {
    color: '#999999',
  },
});

export default ImagePickerComponent;
