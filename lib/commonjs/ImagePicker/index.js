"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeImageCropPicker = _interopRequireDefault(require("react-native-image-crop-picker"));
var _reactNativePermissions = require("react-native-permissions");
var _getAllowedPhotos = require("../getAllowedPhotos");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const {
  width
} = _reactNative.Dimensions.get('window');
const ImagePickerComponent = ({
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
  compressImageQuality = 0.8,
  forceJpg = false,
  disabled = false,
  isShowSelectedImages = false,
  useCamera = false,
  confirmButtonStyle,
  confirmButtonText,
  titleModal = 'Select Media',
  customButton
}) => {
  const [selectedImages, setSelectedImages] = (0, _react.useState)([]);
  const [showLimitedPhotosModal, setShowLimitedPhotosModal] = (0, _react.useState)(false);
  const [limitedPhotos, setLimitedPhotos] = (0, _react.useState)([]);
  const [selectedLimitedPhotos, setSelectedLimitedPhotos] = (0, _react.useState)(new Set());
  const requestCameraPermission = (0, _react.useCallback)(async () => {
    try {
      if (_reactNative.Platform.OS === 'android') {
        const result = await (0, _reactNativePermissions.request)(_reactNativePermissions.PERMISSIONS.ANDROID.CAMERA);
        return result === _reactNativePermissions.RESULTS.GRANTED;
      } else {
        const result = await (0, _reactNativePermissions.request)(_reactNativePermissions.PERMISSIONS.IOS.CAMERA);
        if (result === _reactNativePermissions.RESULTS.GRANTED) {} else {}
        return result === _reactNativePermissions.RESULTS.GRANTED;
      }
    } catch (error) {
      console.error('Camera permission error:', error);
      return false;
    }
  }, []);
  const requestGalleryPermission = (0, _react.useCallback)(async () => {
    try {
      if (_reactNative.Platform.OS === 'android') {
        if (_reactNative.Platform.Version >= 33) {
          // Android 13+ cần cả READ_MEDIA_IMAGES và READ_MEDIA_VIDEO
          const results = await (0, _reactNativePermissions.requestMultiple)([_reactNativePermissions.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, _reactNativePermissions.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO]);
          const grantedImages = results[_reactNativePermissions.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === _reactNativePermissions.RESULTS.GRANTED;
          const grantedVideos = results[_reactNativePermissions.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === _reactNativePermissions.RESULTS.GRANTED;
          return grantedImages || grantedVideos; // miễn có 1 quyền là true
        } else {
          // Android <= 12 dùng READ_EXTERNAL_STORAGE
          const result = await (0, _reactNativePermissions.request)(_reactNativePermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          return result === _reactNativePermissions.RESULTS.GRANTED;
        }
      } else {
        // iOS
        const result = await (0, _reactNativePermissions.request)(_reactNativePermissions.PERMISSIONS.IOS.PHOTO_LIBRARY);
        return result === _reactNativePermissions.RESULTS.GRANTED || result === _reactNativePermissions.RESULTS.LIMITED;
      }
    } catch (error) {
      console.error('Gallery permission error:', error);
      return false;
    }
  }, []);
  const showError = (0, _react.useCallback)(error => {
    console.error('ImagePicker Error:', error);
    if (onError) {
      onError(error);
    } else {
      _reactNative.Alert.alert('Error', error.message || 'An error occurred while selecting image');
    }
  }, [onError]);
  const getPickerOptions = (0, _react.useCallback)(() => {
    const baseOptions = {
      mediaType,
      includeBase64,
      includeExif,
      compressImageQuality,
      forceJpg
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
  }, [mediaType, includeBase64, includeExif, compressImageQuality, forceJpg, cropping, width, height, minWidth, minHeight, maxWidth, maxHeight, multiple, maxFiles]);
  const openCamera = (0, _react.useCallback)(async () => {
    try {
      // Request camera permission first
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        return;
      }
      const options = getPickerOptions();
      const result = await _reactNativeImageCropPicker.default.openCamera(options);
      if (multiple && Array.isArray(result)) {
        setSelectedImages(result);
        onImageSelected === null || onImageSelected === void 0 || onImageSelected(result);
      } else if (!multiple && result && !Array.isArray(result)) {
        setSelectedImages([result]);
        onImageSelected === null || onImageSelected === void 0 || onImageSelected(result);
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        showError(error);
      }
    }
  }, [getPickerOptions, multiple, onImageSelected, showError, requestCameraPermission]);
  const openGallery = (0, _react.useCallback)(async () => {
    try {
      // Request gallery permission first
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) {
        _reactNative.Alert.alert('Permission Required', 'Gallery permission is required to select photos. Please enable it in settings.', [{
          text: 'OK'
        }]);
        return;
      }

      // For Android, check if we have limited photos and show modal
      if (_reactNative.Platform.OS === 'android') {
        try {
          const allowedPhotos = await (0, _getAllowedPhotos.getAllowedPhotos)();
          if (allowedPhotos && allowedPhotos.length > 0) {
            const filteredPhotos = mediaType === 'photo' ? allowedPhotos.filter(photo => {
              var _photo$type;
              return (_photo$type = photo.type) === null || _photo$type === void 0 ? void 0 : _photo$type.startsWith('image/');
            }) : allowedPhotos;
            setLimitedPhotos(filteredPhotos);
            setShowLimitedPhotosModal(true);
            return;
          }
        } catch (error) {
          console.log('Error getting allowed photos:', error);
        }
      }
      const options = getPickerOptions();
      const result = await _reactNativeImageCropPicker.default.openPicker(options);
      if (multiple && Array.isArray(result)) {
        setSelectedImages(result);
        onImageSelected === null || onImageSelected === void 0 || onImageSelected(result);
      } else if (!multiple && result && !Array.isArray(result)) {
        setSelectedImages([result]);
        onImageSelected === null || onImageSelected === void 0 || onImageSelected(result);
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        showError(error);
      }
    }
  }, [requestGalleryPermission, getPickerOptions, multiple, mediaType, onImageSelected, showError]);
  const showImagePicker = (0, _react.useCallback)(() => {
    if (disabled) return;
    if (useCamera) {
      openCamera();
    } else {
      openGallery();
    }
  }, [disabled, openGallery, openCamera, useCamera]);
  const removeImage = (0, _react.useCallback)(index => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    onImageSelected === null || onImageSelected === void 0 || onImageSelected(newImages);
  }, [selectedImages, onImageSelected]);
  const handleLimitedPhotoSelect = (0, _react.useCallback)((photo, index) => {
    if (multiple) {
      // Toggle selection for multiple mode
      const newSelected = new Set(selectedLimitedPhotos);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        // Check max files limit
        if (newSelected.size >= maxFiles) {
          return;
        }
        newSelected.add(index);
      }
      setSelectedLimitedPhotos(newSelected);
    } else {
      // Single selection mode - select and close modal
      const pickerImage = {
        path: photo.uri || photo.path,
        width: photo.width || 0,
        height: photo.height || 0,
        mime: photo.mime || 'image/jpeg',
        size: photo.size || 0,
        data: photo.data || '',
        filename: photo.filename || '',
        creationDate: photo.creationDate || new Date().toISOString(),
        modificationDate: photo.modificationDate || new Date().toISOString()
      };
      setSelectedImages([pickerImage]);
      onImageSelected === null || onImageSelected === void 0 || onImageSelected(pickerImage);
      setShowLimitedPhotosModal(false);
    }
  }, [selectedLimitedPhotos, multiple, maxFiles, onImageSelected]);
  const handleConfirmSelection = (0, _react.useCallback)(() => {
    if (selectedLimitedPhotos.size === 0) {
      _reactNative.Alert.alert('No Selection', 'Please select at least one photo.', [{
        text: 'OK'
      }]);
      return;
    }
    const selectedPhotos = Array.from(selectedLimitedPhotos).map(index => limitedPhotos[index]);
    const pickerImages = selectedPhotos === null || selectedPhotos === void 0 ? void 0 : selectedPhotos.map(photo => ({
      path: photo.uri || photo.path,
      width: photo.width || 0,
      height: photo.height || 0,
      mime: photo.mime || photo.type || '',
      size: photo.size || 0,
      filename: photo.name || '',
      creationDate: photo.dateAdded || new Date().toISOString()
    }));
    setSelectedImages(pickerImages);
    onImageSelected === null || onImageSelected === void 0 || onImageSelected(pickerImages);
    setShowLimitedPhotosModal(false);
    setSelectedLimitedPhotos(new Set());
  }, [selectedLimitedPhotos, limitedPhotos, onImageSelected]);
  const renderLimitedPhotoItem = (0, _react.useCallback)(({
    item,
    index
  }) => {
    const isSelected = selectedLimitedPhotos.has(index);
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.limitedPhotoItem, isSelected && styles.selectedPhotoItem],
      onPress: () => handleLimitedPhotoSelect(item, index)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: {
        uri: (item === null || item === void 0 ? void 0 : item.mediaType) === 'video' ? item.thumbnail : item.uri
      },
      style: styles.limitedPhotoImage,
      resizeMode: "cover"
    }), isSelected && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.selectionOverlay
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.selectionCheckmark
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.selectionCheckmarkText
    }, "\u2713"))), (item === null || item === void 0 ? void 0 : item.mediaType) === 'video' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.videoOverlayContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: require('../assets/play.png'),
      style: styles.videoOverlay
    })));
  }, [handleLimitedPhotoSelect, selectedLimitedPhotos]);

  // Optimized keyExtractor
  const keyExtractor = (0, _react.useCallback)((item, index) => {
    return item !== null && item !== void 0 && item.uri ? `${item.uri}-${index}` : `photo-${index}`;
  }, []);

  // Calculate item layout for better performance
  const getItemLayout = (0, _react.useCallback)((_, index) => {
    const itemWidth = (width - 40) / 3;
    const itemHeight = itemWidth; // Square aspect ratio
    return {
      length: itemHeight,
      offset: itemHeight * Math.floor(index / 3),
      index
    };
  }, [width]);
  const renderSelectedImages = () => {
    if (selectedImages.length === 0) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.selectedImagesContainer
    }, selectedImages.map((image, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: index,
      style: styles.imageContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: {
        uri: image.path
      },
      style: styles.selectedImage
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.removeButton,
      onPress: () => removeImage(index)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.removeButtonText
    }, "\xD7")))));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style
  }, customButton ? customButton(showImagePicker) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.button, buttonStyle, disabled && styles.disabledButton],
    onPress: showImagePicker,
    disabled: disabled
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.buttonText, buttonTextStyle, disabled && styles.disabledText]
  }, buttonText)), isShowSelectedImages && renderSelectedImages(), /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    visible: showLimitedPhotosModal,
    animationType: "slide",
    presentationStyle: "pageSheet",
    onRequestClose: () => setShowLimitedPhotosModal(false)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalHeader
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.modalTitle
  }, multiple ? `${titleModal} (${selectedLimitedPhotos.size}/${maxFiles})` : titleModal), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.closeButton,
    onPress: () => {
      setShowLimitedPhotosModal(false);
      setSelectedLimitedPhotos(new Set());
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.closeButtonText
  }, "\u2715"))), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: limitedPhotos,
    renderItem: renderLimitedPhotoItem,
    keyExtractor: keyExtractor,
    numColumns: 3,
    contentContainerStyle: styles.photoGrid,
    showsVerticalScrollIndicator: false,
    getItemLayout: getItemLayout,
    windowSize: 10,
    initialNumToRender: 15,
    maxToRenderPerBatch: 10,
    updateCellsBatchingPeriod: 50,
    removeClippedSubviews: true,
    legacyImplementation: false
  }), multiple && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalFooter
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.confirmButton, selectedLimitedPhotos.size === 0 && styles.disabledConfirmButton, confirmButtonStyle],
    onPress: handleConfirmSelection,
    disabled: selectedLimitedPhotos.size === 0
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.confirmButtonText, selectedLimitedPhotos.size === 0 && styles.disabledConfirmButtonText]
  }, confirmButtonText ?? `Confirm (${selectedLimitedPhotos.size})`))))));
};
const styles = _reactNative.StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    backgroundColor: '#CCCCCC'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  disabledText: {
    color: '#999999'
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8
  },
  imageContainer: {
    position: 'relative'
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0'
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
    justifyContent: 'center'
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000'
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666666',
    fontWeight: 'bold'
  },
  photoGrid: {
    padding: 8
  },
  limitedPhotoItem: {
    width: (width - 40) / 3,
    margin: 4,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  limitedPhotoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0'
  },
  selectedPhotoItem: {
    borderWidth: 3,
    borderColor: '#007AFF'
  },
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    zIndex: 1,
    flexDirection: 'row',
    padding: 8
  },
  selectionCheckmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectionCheckmarkText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF'
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center'
  },
  disabledConfirmButton: {
    backgroundColor: '#CCCCCC'
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  disabledConfirmButtonText: {
    color: '#999999'
  },
  videoOverlay: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
    marginLeft: 4
  },
  videoOverlayContainer: {
    position: 'absolute',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 1000,
    width: 40,
    height: 40
  }
});
var _default = exports.default = ImagePickerComponent;
//# sourceMappingURL=index.js.map