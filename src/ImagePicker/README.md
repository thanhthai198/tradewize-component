# ImagePicker Component

Component để chọn ảnh từ camera hoặc thư viện ảnh sử dụng `react-native-image-crop-picker`.

## Tính năng

- 📸 Chọn ảnh từ camera
- 🖼️ Chọn ảnh từ thư viện
- ✂️ Cắt ảnh với kích thước tùy chỉnh
- 📏 Nén ảnh với chất lượng tùy chỉnh
- 🔢 Chọn nhiều ảnh cùng lúc
- 👁️ Xem trước ảnh đã chọn
- ⚡ Hiển thị loading indicator trong button
- 🎨 Tùy chỉnh giao diện
- 📱 Action sheet để chọn nguồn ảnh
- ✅ Validation kích thước file

## Cài đặt

Component này sử dụng `react-native-image-crop-picker`. Đảm bảo bạn đã cài đặt thư viện này:

```bash
npm install react-native-image-crop-picker
# hoặc
yarn add react-native-image-crop-picker
```

## Sử dụng

### Cơ bản

```tsx
import { ImagePickerComponent } from 'tradewize';

function MyComponent() {
  const handleImageSelected = (image) => {
    console.log('Selected image:', image);
  };

  return (
    <ImagePickerComponent
      onImageSelected={handleImageSelected}
      buttonText="Chọn ảnh"
    />
  );
}
```

### Với cắt ảnh

```tsx
<ImagePickerComponent
  onImageSelected={handleImageSelected}
  enableCrop={true}
  cropWidth={400}
  cropHeight={400}
  buttonText="Chọn và cắt ảnh"
/>
```

### Chọn nhiều ảnh

```tsx
<ImagePickerComponent
  onImageSelected={handleImagesSelected}
  multiple={true}
  maxFiles={5}
  buttonText="Chọn nhiều ảnh"
/>
```

### Tùy chỉnh nén ảnh

```tsx
<ImagePickerComponent
  onImageSelected={handleImageSelected}
  compress={true}
  compressQuality={0.7}
  quality={0.8}
  maxFileSize={5 * 1024 * 1024} // 5MB
  buttonText="Chọn ảnh (nén)"
/>
```

### Không hiển thị action sheet

```tsx
<ImagePickerComponent
  onImageSelected={handleImageSelected}
  showActionSheet={false}
  buttonText="Mở thư viện ảnh"
/>
```

### Tùy chỉnh giao diện

```tsx
<ImagePickerComponent
  onImageSelected={handleImageSelected}
  buttonStyle={{
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
  }}
  textStyle={{
    color: '#FFFFFF',
    fontSize: 18,
  }}
  previewStyle={{
    width: 100,
    height: 100,
    borderRadius: 50,
  }}
  buttonText="Chọn ảnh đẹp"
/>
```

### Loading component tùy chỉnh

```tsx
const CustomLoading = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <ActivityIndicator size="small" color="#FFFFFF" />
    <Text style={{ color: '#FFFFFF', marginLeft: 8 }}>Đang tải...</Text>
  </View>
);

<ImagePickerComponent
  onImageSelected={handleImageSelected}
  loadingComponent={<CustomLoading />}
  buttonText="Chọn ảnh"
/>;
```

## Props

| Prop                 | Type                                        | Default      | Mô tả                                    |
| -------------------- | ------------------------------------------- | ------------ | ---------------------------------------- |
| `onImageSelected`    | `(image: ImageData \| ImageData[]) => void` | -            | Callback khi ảnh được chọn               |
| `onError`            | `(error: string) => void`                   | -            | Callback khi có lỗi                      |
| `enableCrop`         | `boolean`                                   | `false`      | Bật tính năng cắt ảnh                    |
| `cropWidth`          | `number`                                    | `300`        | Chiều rộng khi cắt ảnh                   |
| `cropHeight`         | `number`                                    | `300`        | Chiều cao khi cắt ảnh                    |
| `maxFileSize`        | `number`                                    | `10485760`   | Kích thước file tối đa (bytes)           |
| `quality`            | `number`                                    | `0.8`        | Chất lượng ảnh (0-1)                     |
| `includeBase64`      | `boolean`                                   | `false`      | Bao gồm dữ liệu base64                   |
| `buttonText`         | `string`                                    | `'Chọn ảnh'` | Text hiển thị trên button                |
| `buttonStyle`        | `any`                                       | -            | Style tùy chỉnh cho button               |
| `textStyle`          | `any`                                       | -            | Style tùy chỉnh cho text                 |
| `showPreview`        | `boolean`                                   | `true`       | Hiển thị preview ảnh                     |
| `previewStyle`       | `any`                                       | -            | Style tùy chỉnh cho preview              |
| `multiple`           | `boolean`                                   | `false`      | Cho phép chọn nhiều ảnh                  |
| `maxFiles`           | `number`                                    | `5`          | Số ảnh tối đa khi multiple=true          |
| `compress`           | `boolean`                                   | `true`       | Nén ảnh                                  |
| `compressQuality`    | `number`                                    | `0.8`        | Chất lượng nén (0-1)                     |
| `showLoading`        | `boolean`                                   | `true`       | Hiển thị loading indicator trong button  |
| `loadingComponent`   | `React.ReactNode`                           | -            | Component loading tùy chỉnh trong button |
| `showActionSheet`    | `boolean`                                   | `true`       | Hiển thị action sheet                    |
| `actionSheetOptions` | `object`                                    | -            | Tùy chỉnh action sheet                   |

## ImageData Interface

```tsx
interface ImageData {
  uri: string; // Đường dẫn ảnh
  width: number; // Chiều rộng
  height: number; // Chiều cao
  mime: string; // Loại MIME
  size: number; // Kích thước file (bytes)
  filename?: string; // Tên file
  path: string; // Đường dẫn đầy đủ
  data?: string; // Dữ liệu base64 (nếu includeBase64=true)
}
```

## Lưu ý

1. **Permissions**: Đảm bảo app có quyền truy cập camera và thư viện ảnh
2. **Platform**: Component hoạt động trên cả iOS và Android
3. **Performance**: Với ảnh lớn, nên bật nén để tối ưu hiệu suất
4. **Storage**: Ảnh được lưu tạm thời, cần xử lý lưu trữ lâu dài nếu cần

## Ví dụ đầy đủ

```tsx
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { ImagePickerComponent, ImageData } from 'tradewize';

function ImageUploadScreen() {
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);

  const handleImageSelected = (images: ImageData | ImageData[]) => {
    const imageArray = Array.isArray(images) ? images : [images];
    setSelectedImages(imageArray);
    console.log('Selected images:', imageArray);
  };

  const handleError = (error: string) => {
    Alert.alert('Lỗi', error);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Chọn ảnh để upload</Text>

      <ImagePickerComponent
        onImageSelected={handleImageSelected}
        onError={handleError}
        multiple={true}
        maxFiles={3}
        enableCrop={true}
        cropWidth={500}
        cropHeight={500}
        compress={true}
        compressQuality={0.7}
        maxFileSize={5 * 1024 * 1024}
        buttonText="Chọn ảnh"
        showPreview={true}
      />

      <Text style={{ marginTop: 20, fontSize: 16 }}>
        Đã chọn: {selectedImages.length} ảnh
      </Text>
    </View>
  );
}
```
