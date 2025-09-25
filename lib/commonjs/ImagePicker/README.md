# ImagePicker Component

A comprehensive React Native ImagePicker component built on top of `react-native-image-crop-picker` library.

## Features

- 📸 Camera and Gallery support
- 🖼️ Image cropping functionality
- 📱 Multiple image selection
- 🎨 Customizable UI
- 📏 Image dimension constraints
- 🗜️ Image compression
- 🔧 TypeScript support
- 📱 Cross-platform (iOS/Android)

## Installation

Make sure you have `react-native-image-crop-picker` installed:

```bash
npm install react-native-image-crop-picker
# or
yarn add react-native-image-crop-picker
```

For iOS, you need to add permissions to `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs access to camera to take photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs access to photo library to select images</string>
```

## Basic Usage

```tsx
import { ImagePicker } from 'tradewize';

function MyComponent() {
  const handleImageSelected = (image) => {
    console.log('Selected image:', image);
  };

  return (
    <ImagePicker
      onImageSelected={handleImageSelected}
      buttonText="Choose Photo"
    />
  );
}
```

## Advanced Usage

```tsx
import { ImagePicker } from 'tradewize';

function AdvancedImagePicker() {
  const handleMultipleImages = (images) => {
    console.log('Selected images:', images);
  };

  return (
    <ImagePicker
      multiple={true}
      maxFiles={5}
      cropping={true}
      width={400}
      height={400}
      quality={0.8}
      minWidth={200}
      minHeight={200}
      onImageSelected={handleMultipleImages}
      buttonText="Select Photos"
      showActionSheet={true}
    />
  );
}
```

## Props

| Prop                   | Type                                            | Default                           | Description                              |
| ---------------------- | ----------------------------------------------- | --------------------------------- | ---------------------------------------- |
| `onImageSelected`      | `(image: PickerImage \| PickerImage[]) => void` | -                                 | Callback when image(s) are selected      |
| `onError`              | `(error: any) => void`                          | -                                 | Callback when error occurs               |
| `multiple`             | `boolean`                                       | `false`                           | Enable multiple image selection          |
| `maxFiles`             | `number`                                        | `10`                              | Maximum number of images (multiple mode) |
| `cropping`             | `boolean`                                       | `false`                           | Enable image cropping                    |
| `width`                | `number`                                        | `300`                             | Crop rectangle width                     |
| `height`               | `number`                                        | `300`                             | Crop rectangle height                    |
| `minWidth`             | `number`                                        | -                                 | Minimum image width                      |
| `minHeight`            | `number`                                        | -                                 | Minimum image height                     |
| `maxWidth`             | `number`                                        | -                                 | Maximum image width                      |
| `maxHeight`            | `number`                                        | -                                 | Maximum image height                     |
| `quality`              | `number`                                        | `0.8`                             | Image quality (0-1)                      |
| `includeBase64`        | `boolean`                                       | `false`                           | Include base64 data                      |
| `includeExif`          | `boolean`                                       | `false`                           | Include EXIF data                        |
| `mediaType`            | `'photo' \| 'video' \| 'any'`                   | `'photo'`                         | Media type to pick                       |
| `buttonText`           | `string`                                        | `'Select Image'`                  | Button text                              |
| `buttonStyle`          | `any`                                           | -                                 | Custom button style                      |
| `buttonTextStyle`      | `any`                                           | -                                 | Custom button text style                 |
| `style`                | `any`                                           | -                                 | Container style                          |
| `showActionSheet`      | `boolean`                                       | `true`                            | Show source selection sheet              |
| `actionSheetOptions`   | `string[]`                                      | `['Camera', 'Gallery', 'Cancel']` | Action sheet options                     |
| `compressImageQuality` | `number`                                        | `0.8`                             | Image compression quality                |
| `forceJpg`             | `boolean`                                       | `false`                           | Force JPEG format                        |
| `disabled`             | `boolean`                                       | `false`                           | Disable the component                    |

## Examples

### Single Image with Crop

```tsx
<ImagePicker
  cropping={true}
  width={300}
  height={300}
  onImageSelected={(image) => {
    // Handle single cropped image
  }}
/>
```

### Multiple Images

```tsx
<ImagePicker
  multiple={true}
  maxFiles={3}
  onImageSelected={(images) => {
    // Handle multiple images
  }}
/>
```

### Video Selection

```tsx
<ImagePicker
  mediaType="video"
  onImageSelected={(video) => {
    // Handle video selection
  }}
/>
```

### Custom Styling

```tsx
<ImagePicker
  buttonText="Upload Photo"
  buttonStyle={{
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
  }}
  buttonTextStyle={{
    fontSize: 18,
    fontWeight: 'bold',
  }}
  onImageSelected={handleImageSelected}
/>
```

## Error Handling

The component provides built-in error handling with optional custom error callbacks:

```tsx
<ImagePicker
  onError={(error) => {
    console.log('Custom error handling:', error);
    // Handle error as needed
  }}
  onImageSelected={handleImageSelected}
/>
```

## Platform Differences

- **iOS**: Shows action sheet by default for source selection
- **Android**: Goes directly to gallery unless action sheet is explicitly enabled

## Dependencies

- `react-native-image-crop-picker` (>=0.42.0)
- `react-native` (>=0.60.0)
