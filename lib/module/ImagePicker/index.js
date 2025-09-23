import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ButtonBase } from '../ButtonBase';
export const ImagePickerComponent = ({
  onImageSelected,
  onError,
  enableCrop = false,
  cropWidth = 300,
  cropHeight = 300,
  maxFileSize = 10 * 1024 * 1024,
  // 10MB
  quality = 0.8,
  includeBase64 = false,
  buttonText = 'Chọn ảnh',
  buttonStyle,
  textStyle,
  showPreview = true,
  previewStyle,
  multiple = false,
  maxFiles = 5,
  compress = true,
  compressQuality = 0.8,
  showLoading = true,
  loadingComponent,
  showActionSheet = true,
  actionSheetOptions = {
    title: 'Chọn ảnh từ',
    options: ['Camera', 'Thư viện ảnh', 'Hủy'],
    cancelButtonIndex: 2
  }
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleError = useCallback(error => {
    console.error('ImagePicker Error:', error);
    const errorMessage = error.message || 'Có lỗi xảy ra khi chọn ảnh';
    onError === null || onError === void 0 || onError(errorMessage);
    Alert.alert('Lỗi', errorMessage);
  }, [onError]);
  const validateImage = useCallback(image => {
    if (image.size > maxFileSize) {
      const errorMessage = `Kích thước ảnh vượt quá giới hạn ${Math.round(maxFileSize / (1024 * 1024))}MB`;
      handleError({
        message: errorMessage
      });
      return false;
    }
    return true;
  }, [maxFileSize, handleError]);
  const processImage = useCallback(image => {
    const processedImage = {
      uri: image.path,
      width: image.width,
      height: image.height,
      mime: image.mime,
      size: image.size,
      filename: image.filename,
      path: image.path
    };
    if (includeBase64 && image.data) {
      processedImage.data = image.data;
    }
    return processedImage;
  }, [includeBase64]);
  const openCamera = useCallback(async () => {
    try {
      setIsLoading(true);
      const options = {
        mediaType: 'photo',
        quality: quality,
        includeBase64: includeBase64,
        compressImageQuality: compress ? compressQuality : 1
      };
      if (enableCrop) {
        options.cropping = true;
        options.width = cropWidth;
        options.height = cropHeight;
      }
      const image = await ImagePicker.openCamera(options);
      if (validateImage(image)) {
        const processedImage = processImage(image);
        setSelectedImages([processedImage]);
        onImageSelected === null || onImageSelected === void 0 || onImageSelected(processedImage);
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [quality, includeBase64, compress, compressQuality, enableCrop, cropWidth, cropHeight, validateImage, processImage, onImageSelected, handleError]);
  const openGallery = useCallback(async () => {
    try {
      setIsLoading(true);
      const options = {
        mediaType: 'photo',
        quality: quality,
        includeBase64: includeBase64,
        compressImageQuality: compress ? compressQuality : 1,
        multiple: multiple
      };
      if (multiple && maxFiles > 1) {
        options.maxFiles = maxFiles;
      }
      if (enableCrop && !multiple) {
        options.cropping = true;
        options.width = cropWidth;
        options.height = cropHeight;
      }
      const images = await ImagePicker.openPicker(options);
      const imageArray = Array.isArray(images) ? images : [images];
      const validImages = imageArray.filter(validateImage);
      const processedImages = validImages.map(processImage);
      if (processedImages.length > 0) {
        setSelectedImages(processedImages);
        if (multiple) {
          onImageSelected === null || onImageSelected === void 0 || onImageSelected(processedImages);
        } else {
          onImageSelected === null || onImageSelected === void 0 || onImageSelected(processedImages[0]);
        }
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [quality, includeBase64, compress, compressQuality, multiple, maxFiles, enableCrop, cropWidth, cropHeight, validateImage, processImage, onImageSelected, handleError]);
  const showImagePicker = useCallback(() => {
    if (showActionSheet) {
      var _actionSheetOptions$o, _actionSheetOptions$o2, _actionSheetOptions$o3;
      Alert.alert(actionSheetOptions.title || 'Chọn ảnh từ', '', [{
        text: ((_actionSheetOptions$o = actionSheetOptions.options) === null || _actionSheetOptions$o === void 0 ? void 0 : _actionSheetOptions$o[0]) || 'Camera',
        onPress: openCamera
      }, {
        text: ((_actionSheetOptions$o2 = actionSheetOptions.options) === null || _actionSheetOptions$o2 === void 0 ? void 0 : _actionSheetOptions$o2[1]) || 'Thư viện ảnh',
        onPress: openGallery
      }, {
        text: ((_actionSheetOptions$o3 = actionSheetOptions.options) === null || _actionSheetOptions$o3 === void 0 ? void 0 : _actionSheetOptions$o3[2]) || 'Hủy',
        style: 'cancel'
      }], {
        cancelable: true
      });
    } else {
      openGallery();
    }
  }, [showActionSheet, actionSheetOptions, openCamera, openGallery]);
  const removeImage = useCallback(index => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    if (multiple) {
      onImageSelected === null || onImageSelected === void 0 || onImageSelected(newImages);
    } else if (newImages.length > 0) {
      onImageSelected === null || onImageSelected === void 0 || onImageSelected(newImages[0]);
    }
  }, [selectedImages, multiple, onImageSelected]);
  const renderButtonContent = () => {
    if (isLoading && showLoading) {
      if (loadingComponent) {
        return loadingComponent;
      }
      return /*#__PURE__*/React.createElement(View, {
        style: styles.buttonLoadingContainer
      }, /*#__PURE__*/React.createElement(ActivityIndicator, {
        size: "small",
        color: "#FFFFFF"
      }), /*#__PURE__*/React.createElement(Text, {
        style: [styles.buttonText, textStyle, styles.loadingText]
      }, "\u0110ang x\u1EED l\xFD..."));
    }
    return /*#__PURE__*/React.createElement(Text, {
      style: [styles.buttonText, textStyle]
    }, buttonText);
  };
  const renderPreview = () => {
    if (!showPreview || selectedImages.length === 0) return null;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.previewContainer
    }, selectedImages.map((image, index) => /*#__PURE__*/React.createElement(View, {
      key: index,
      style: styles.imageContainer
    }, /*#__PURE__*/React.createElement(Image, {
      source: {
        uri: image.uri
      },
      style: [styles.previewImage, previewStyle]
    }), /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: styles.removeButton,
      onPress: () => removeImage(index)
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.removeButtonText
    }, "\xD7")))));
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(ButtonBase, {
    onPress: showImagePicker,
    style: [styles.button, buttonStyle],
    disabled: isLoading
  }, renderButtonContent()), renderPreview());
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  buttonLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    marginLeft: 8,
    opacity: 0.8
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    justifyContent: 'center'
  },
  imageContainer: {
    position: 'relative',
    margin: 5
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0'
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
export default ImagePickerComponent;
//# sourceMappingURL=index.js.map