"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _index = _interopRequireDefault(require("./index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ImagePickerExample = () => {
  const [selectedImages, setSelectedImages] = (0, _react.useState)([]);
  const [singleImage, setSingleImage] = (0, _react.useState)(null);
  const handleMultipleImages = image => {
    const images = Array.isArray(image) ? image : [image];
    setSelectedImages(images);
    console.log('Multiple images selected:', images);
  };
  const handleSingleImage = image => {
    const singleImg = Array.isArray(image) ? image[0] : image;
    if (singleImg) {
      setSingleImage(singleImg);
      console.log('Single image selected:', singleImg);
    }
  };
  const handleError = error => {
    console.error('ImagePicker Error:', error);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, "ImagePicker Examples"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.section
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sectionTitle
  }, "Basic Image Picker"), /*#__PURE__*/_react.default.createElement(_index.default, {
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Select Single Image"
  }), singleImage && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.imageInfo
  }, "Selected: ", singleImage.path)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.section
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sectionTitle
  }, "Multiple Images"), /*#__PURE__*/_react.default.createElement(_index.default, {
    multiple: true,
    maxFiles: 3,
    onImageSelected: handleMultipleImages,
    onError: handleError,
    buttonText: "Select Multiple Images"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.imageInfo
  }, "Selected ", selectedImages.length, " images")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.section
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sectionTitle
  }, "With Cropping"), /*#__PURE__*/_react.default.createElement(_index.default, {
    cropping: true,
    width: 300,
    height: 300,
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Select & Crop Image"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.section
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sectionTitle
  }, "With Size Constraints"), /*#__PURE__*/_react.default.createElement(_index.default, {
    minWidth: 200,
    minHeight: 200,
    maxWidth: 1000,
    maxHeight: 1000,
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Select Constrained Image"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.section
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sectionTitle
  }, "Custom Styling"), /*#__PURE__*/_react.default.createElement(_index.default, {
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Custom Style",
    buttonStyle: styles.customButton,
    buttonTextStyle: styles.customButtonText
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.section
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sectionTitle
  }, "Video Selection"), /*#__PURE__*/_react.default.createElement(_index.default, {
    mediaType: "video",
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Select Video"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.section
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sectionTitle
  }, "Disabled State"), /*#__PURE__*/_react.default.createElement(_index.default, {
    disabled: true,
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Disabled Button"
  })));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333'
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333'
  },
  imageInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic'
  },
  customButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  customButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
var _default = exports.default = ImagePickerExample;
//# sourceMappingURL=example.js.map