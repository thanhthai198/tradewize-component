import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ImagePickerComponent from './index';
import { type Image as PickerImage } from 'react-native-image-crop-picker';

const ImagePickerExample: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>([]);
  const [singleImage, setSingleImage] = useState<PickerImage | null>(null);

  const handleMultipleImages = (image: PickerImage | PickerImage[]) => {
    const images = Array.isArray(image) ? image : [image];
    setSelectedImages(images);
    console.log('Multiple images selected:', images);
  };

  const handleSingleImage = (image: PickerImage | PickerImage[]) => {
    const singleImg = Array.isArray(image) ? image[0] : image;
    if (singleImg) {
      setSingleImage(singleImg);
      console.log('Single image selected:', singleImg);
    }
  };

  const handleError = (error: any) => {
    console.error('ImagePicker Error:', error);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ImagePicker Examples</Text>

      {/* Basic Image Picker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Image Picker</Text>
        <ImagePickerComponent
          onImageSelected={handleSingleImage}
          onError={handleError}
          buttonText="Select Single Image"
        />
        {singleImage && (
          <Text style={styles.imageInfo}>Selected: {singleImage.path}</Text>
        )}
      </View>

      {/* Multiple Images */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multiple Images</Text>
        <ImagePickerComponent
          multiple={true}
          maxFiles={3}
          onImageSelected={handleMultipleImages}
          onError={handleError}
          buttonText="Select Multiple Images"
        />
        <Text style={styles.imageInfo}>
          Selected {selectedImages.length} images
        </Text>
      </View>

      {/* With Cropping */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Cropping</Text>
        <ImagePickerComponent
          cropping={true}
          width={300}
          height={300}
          onImageSelected={handleSingleImage}
          onError={handleError}
          buttonText="Select & Crop Image"
        />
      </View>

      {/* With Constraints */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Size Constraints</Text>
        <ImagePickerComponent
          minWidth={200}
          minHeight={200}
          maxWidth={1000}
          maxHeight={1000}
          onImageSelected={handleSingleImage}
          onError={handleError}
          buttonText="Select Constrained Image"
        />
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <ImagePickerComponent
          onImageSelected={handleSingleImage}
          onError={handleError}
          buttonText="Custom Style"
          buttonStyle={styles.customButton}
          buttonTextStyle={styles.customButtonText}
        />
      </View>

      {/* Video Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Video Selection</Text>
        <ImagePickerComponent
          mediaType="video"
          onImageSelected={handleSingleImage}
          onError={handleError}
          buttonText="Select Video"
        />
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <ImagePickerComponent
          disabled={true}
          onImageSelected={handleSingleImage}
          onError={handleError}
          buttonText="Disabled Button"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  imageInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  customButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  customButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImagePickerExample;
