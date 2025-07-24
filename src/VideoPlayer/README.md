# VideoPlayer Components

Bộ component video player cho React Native với hỗ trợ cả MP4 và YouTube videos.

## Components

### VideoPlayer

Component video player cơ bản hỗ trợ cả MP4 và YouTube.

### VideoModal

Modal component để hiển thị video trong overlay với khả năng mở/đóng, sử dụng `react-native-modal` để có animation mượt mà hơn.

## Cách sử dụng VideoModal

### Import

```typescript
import { VideoModal } from './src/VideoPlayer';
```

### Basic Usage

```typescript
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { VideoModal } from './src/VideoPlayer';

const MyComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text>Open Video</Text>
      </TouchableOpacity>

      <VideoModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        source="https://example.com/video.mp4"
        title="My Video"
        autoPlay={true}
      />
    </View>
  );
};
```

### Props

#### VideoModal Props

| Prop                          | Type             | Default              | Description                            |
| ----------------------------- | ---------------- | -------------------- | -------------------------------------- |
| `visible`                     | `boolean`        | -                    | Hiển thị modal hay không               |
| `onClose`                     | `() => void`     | -                    | Callback khi đóng modal                |
| `title`                       | `string`         | -                    | Tiêu đề hiển thị trên header           |
| `showCloseButton`             | `boolean`        | `true`               | Hiển thị nút đóng                      |
| `modalHeight`                 | `number`         | `screenHeight * 0.6` | Chiều cao của modal                    |
| `modalWidth`                  | `DimensionValue` | `screenWidth * 0.9`  | Chiều rộng của modal                   |
| `modalStyle`                  | `ViewStyle`      | -                    | Style tùy chỉnh cho modal              |
| `animationIn`                 | `string`         | `'fadeIn'`           | Animation khi mở modal                 |
| `animationOut`                | `string`         | `'fadeOut'`          | Animation khi đóng modal               |
| `animationInTiming`           | `number`         | `300`                | Thời gian animation in (ms)            |
| `animationOutTiming`          | `number`         | `300`                | Thời gian animation out (ms)           |
| `backdropOpacity`             | `number`         | `0.8`                | Độ trong suốt của backdrop             |
| `backdropTransitionInTiming`  | `number`         | `300`                | Thời gian transition backdrop in (ms)  |
| `backdropTransitionOutTiming` | `number`         | `300`                | Thời gian transition backdrop out (ms) |

#### VideoPlayer Props (kế thừa từ VideoPlayer)

| Prop         | Type                        | Default  | Description                  |
| ------------ | --------------------------- | -------- | ---------------------------- |
| `source`     | `string`                    | -        | URL video (MP4 hoặc YouTube) |
| `height`     | `number`                    | `200`    | Chiều cao video              |
| `width`      | `DimensionValue`            | `'100%'` | Chiều rộng video             |
| `style`      | `ViewStyle`                 | -        | Style tùy chỉnh              |
| `autoPlay`   | `boolean`                   | `false`  | Tự động phát                 |
| `loop`       | `boolean`                   | `false`  | Lặp lại video                |
| `muted`      | `boolean`                   | `false`  | Tắt âm thanh                 |
| `onError`    | `(error: any) => void`      | -        | Callback khi có lỗi          |
| `onLoad`     | `() => void`                | -        | Callback khi video load xong |
| `onEnd`      | `() => void`                | -        | Callback khi video kết thúc  |
| `onProgress` | `(progress: {...}) => void` | -        | Callback theo dõi tiến độ    |

### Ví dụ với YouTube

```typescript
<VideoModal
  visible={isModalVisible}
  onClose={() => setIsModalVisible(false)}
  source="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="YouTube Video"
  autoPlay={true}
  modalHeight={400}
  modalWidth="90%"
/>
```

### Ví dụ với MP4

```typescript
<VideoModal
  visible={isModalVisible}
  onClose={() => setIsModalVisible(false)}
  source="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  title="MP4 Video"
  autoPlay={false}
  loop={true}
  onLoad={() => console.log('Video loaded')}
  onError={(error) => console.log('Error:', error)}
/>
```

### Ví dụ với Animation tùy chỉnh

```typescript
<VideoModal
  visible={isModalVisible}
  onClose={() => setIsModalVisible(false)}
  source="https://example.com/video.mp4"
  title="Custom Animation"
  animationIn="slideInUp"
  animationOut="slideOutDown"
  animationInTiming={500}
  animationOutTiming={500}
  backdropOpacity={0.9}
/>
```

## Tính năng

- ✅ Hỗ trợ cả MP4 và YouTube videos
- ✅ Modal overlay với animation mượt mà (sử dụng react-native-modal)
- ✅ Header tùy chỉnh với title và nút đóng
- ✅ Backdrop để đóng modal
- ✅ Swipe down để đóng modal
- ✅ Responsive design
- ✅ Status bar handling
- ✅ Loading và error states
- ✅ Tất cả props của VideoPlayer component
- ✅ Animation tùy chỉnh với nhiều options
- ✅ Tự động xử lý lỗi translateX

## Dependencies

Đảm bảo bạn đã cài đặt các dependencies sau:

```bash
npm install react-native-youtube-iframe react-native-video react-native-modal
```

## Animation Options

VideoModal sử dụng `react-native-modal` với các animation có sẵn:

### ✅ Safe Animations (Khuyến nghị)

- `fadeIn` / `fadeOut` (mặc định) - **An toàn nhất**

### ⚠️ Potentially Problematic Animations

- `slideInUp` / `slideOutDown`
- `slideInDown` / `slideOutUp`
- `slideInLeft` / `slideOutRight`
- `slideInRight` / `slideOutLeft`
- `zoomIn` / `zoomOut`
- `bounceIn` / `bounceOut`
- `flipInX` / `flipOutX`
- `flipInY` / `flipOutY`

## Troubleshooting

### Lỗi translateX

Nếu bạn gặp lỗi `"Transform with key of 'translateX' must be number or a percentage"`, đây là cách khắc phục:

1. **Sử dụng animation an toàn**: Chỉ sử dụng `fadeIn`/`fadeOut`
2. **Tắt useNativeDriver**: Component sẽ tự động tắt cho các animation không tương thích
3. **Cập nhật react-native-modal**: Đảm bảo bạn đang sử dụng phiên bản mới nhất

```typescript
// ✅ Khuyến nghị
<VideoModal
  animationIn="fadeIn"
  animationOut="fadeOut"
  // ... other props
/>

// ⚠️ Có thể gây lỗi
<VideoModal
  animationIn="slideInUp"
  animationOut="slideOutDown"
  // ... other props
/>
```

### Performance Tips

- Sử dụng `fadeIn`/`fadeOut` cho performance tốt nhất
- Tránh sử dụng các animation phức tạp trên thiết bị cũ
- Test trên nhiều thiết bị khác nhau

## Example Component

Xem file `VideoModalExample.tsx` để có ví dụ hoàn chỉnh về cách sử dụng với warning system cho animation.
