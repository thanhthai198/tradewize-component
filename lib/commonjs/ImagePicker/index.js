"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeImageCropPicker = _interopRequireDefault(require("react-native-image-crop-picker"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
  showActionSheet = true,
  actionSheetOptions = ['Camera', 'Gallery', 'Cancel'],
  compressImageQuality = 0.8,
  forceJpg = false,
  disabled = false
}) => {
  const [selectedImages, setSelectedImages] = (0, _react.useState)([]);
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
  }, [getPickerOptions, multiple, onImageSelected, showError]);
  const openGallery = (0, _react.useCallback)(async () => {
    try {
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
  }, [getPickerOptions, multiple, onImageSelected, showError]);
  const showImagePicker = (0, _react.useCallback)(() => {
    if (disabled) return;
    if (showActionSheet && _reactNative.Platform.OS === 'ios') {
      const options = actionSheetOptions;
      _reactNative.Alert.alert('Select Image Source', 'Choose how you want to select an image', [{
        text: options[0] || 'Camera',
        onPress: openCamera
      }, {
        text: options[1] || 'Gallery',
        onPress: openGallery
      }, {
        text: options[2] || 'Cancel',
        style: 'cancel'
      }], {
        cancelable: true
      });
    } else {
      // For Android or when action sheet is disabled, go directly to gallery
      openGallery();
    }
  }, [disabled, showActionSheet, actionSheetOptions, openCamera, openGallery]);
  const removeImage = (0, _react.useCallback)(index => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    onImageSelected === null || onImageSelected === void 0 || onImageSelected(newImages);
  }, [selectedImages, onImageSelected]);
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
    style: [styles.container, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.button, buttonStyle, disabled && styles.disabledButton],
    onPress: showImagePicker,
    disabled: disabled
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.buttonText, buttonTextStyle, disabled && styles.disabledText]
  }, buttonText)), renderSelectedImages());
};
const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center'
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
  }
});
var _default = exports.default = ImagePickerComponent;
//# sourceMappingURL=index.js.map