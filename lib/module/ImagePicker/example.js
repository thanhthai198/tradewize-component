import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ImagePickerComponent from './index';
const ImagePickerExample = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
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
  return /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, "ImagePicker Examples"), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Basic Image Picker"), /*#__PURE__*/React.createElement(ImagePickerComponent, {
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Select Single Image"
  }), singleImage && /*#__PURE__*/React.createElement(Text, {
    style: styles.imageInfo
  }, "Selected: ", singleImage.path)), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Multiple Images"), /*#__PURE__*/React.createElement(ImagePickerComponent, {
    multiple: true,
    maxFiles: 3,
    onImageSelected: handleMultipleImages,
    onError: handleError,
    buttonText: "Select Multiple Images"
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.imageInfo
  }, "Selected ", selectedImages.length, " images")), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "With Cropping"), /*#__PURE__*/React.createElement(ImagePickerComponent, {
    cropping: true,
    width: 300,
    height: 300,
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Select & Crop Image"
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "With Size Constraints"), /*#__PURE__*/React.createElement(ImagePickerComponent, {
    minWidth: 200,
    minHeight: 200,
    maxWidth: 1000,
    maxHeight: 1000,
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Select Constrained Image"
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Custom Styling"), /*#__PURE__*/React.createElement(ImagePickerComponent, {
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Custom Style",
    buttonStyle: styles.customButton,
    buttonTextStyle: styles.customButtonText
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Video Selection"), /*#__PURE__*/React.createElement(ImagePickerComponent, {
    mediaType: "video",
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Select Video"
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Disabled State"), /*#__PURE__*/React.createElement(ImagePickerComponent, {
    disabled: true,
    onImageSelected: handleSingleImage,
    onError: handleError,
    buttonText: "Disabled Button"
  })));
};
const styles = StyleSheet.create({
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
export default ImagePickerExample;
//# sourceMappingURL=example.js.map