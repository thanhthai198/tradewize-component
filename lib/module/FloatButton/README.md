# FloatButton Component

Một component button float có thể di chuyển mượt mà trên màn hình với khả năng drag and drop, hiển thị popup và menu hình quạt.

## Tính năng

- ✅ Di chuyển mượt mà bằng cách kéo thả
- ✅ Tự động snap về cạnh màn hình
- ✅ Giới hạn trong phạm vi màn hình
- ✅ Animation mượt mà khi thả
- ✅ Tùy chỉnh kích thước, màu sắc
- ✅ Hỗ trợ custom content
- ✅ **Popup với animation mượt mà**
- ✅ **Tự động định vị popup thông minh**
- ✅ **Hỗ trợ tương tác trong popup**
- ✅ **Fan Menu hình quạt với animation**
- ✅ **Menu items được sắp xếp theo hình tròn**
- ✅ **Staggered animation cho menu items**
- ✅ TypeScript support

## Cách sử dụng

### Import

```tsx
import FloatButton from './src/FloatButton';
```

### Basic Usage

```tsx
<FloatButton onPress={() => console.log('Button pressed!')} />
```

### Với tùy chỉnh

```tsx
<FloatButton
  onPress={handlePress}
  size={80}
  backgroundColor="#FF6B6B"
  iconColor="#FFFFFF"
  initialPosition={{ x: 20, y: 100 }}
/>
```

### Với custom content

```tsx
<FloatButton onPress={handlePress} size={70} backgroundColor="#4ECDC4">
  <Text style={{ fontSize: 30 }}>🎯</Text>
</FloatButton>
```

### Với Popup

```tsx
<FloatButton
  showPopup={true}
  popupContent={
    <View>
      <Text>Nội dung popup</Text>
      <TouchableOpacity onPress={handleAction}>
        <Text>Thực hiện</Text>
      </TouchableOpacity>
    </View>
  }
  popupWidth={250}
  popupHeight={150}
  onPopupClose={() => console.log('Popup closed')}
/>
```

### Với Fan Menu

```tsx
const menuItems = [
  {
    id: '1',
    icon: '📱',
    label: 'Call',
    onPress: () => console.log('Call pressed'),
    color: '#FF6B6B',
  },
  {
    id: '2',
    icon: '📧',
    label: 'Email',
    onPress: () => console.log('Email pressed'),
    color: '#4ECDC4',
  },
  {
    id: '3',
    icon: '📷',
    label: 'Camera',
    onPress: () => console.log('Camera pressed'),
    color: '#45B7D1',
  },
];

<FloatButton
  showFanMenu={true}
  menuItems={menuItems}
  menuRadius={120}
  menuItemSize={50}
  menuStartAngle={-90}
  menuEndAngle={90}
  onMenuClose={() => console.log('Menu closed')}
/>;
```

### Fan Menu với tùy chỉnh

```tsx
<FloatButton
  showFanMenu={true}
  menuItems={menuItems}
  menuRadius={150}
  menuItemSize={55}
  menuStartAngle={-120}
  menuEndAngle={120}
  menuItemBackgroundColor="#007AFF"
  menuItemTextColor="#FFFFFF"
/>
```

## Props

| Prop                      | Type                       | Default      | Description                        |
| ------------------------- | -------------------------- | ------------ | ---------------------------------- |
| `onPress`                 | `() => void`               | -            | Callback khi button được nhấn      |
| `children`                | `React.ReactNode`          | `+`          | Nội dung bên trong button          |
| `size`                    | `number`                   | `60`         | Kích thước button (width = height) |
| `backgroundColor`         | `string`                   | `#007AFF`    | Màu nền của button                 |
| `iconColor`               | `string`                   | `#FFFFFF`    | Màu của icon mặc định              |
| `initialPosition`         | `{ x: number, y: number }` | Bottom right | Vị trí ban đầu                     |
| `style`                   | `any`                      | -            | Style bổ sung                      |
| **Popup Props**           |                            |              |                                    |
| `showPopup`               | `boolean`                  | `false`      | Bật/tắt tính năng popup            |
| `popupContent`            | `React.ReactNode`          | -            | Nội dung hiển thị trong popup      |
| `popupWidth`              | `number`                   | `200`        | Chiều rộng popup                   |
| `popupHeight`             | `number`                   | `150`        | Chiều cao popup                    |
| `popupBackgroundColor`    | `string`                   | `#FFFFFF`    | Màu nền popup                      |
| `popupBorderRadius`       | `number`                   | `12`         | Bo góc popup                       |
| `onPopupClose`            | `() => void`               | -            | Callback khi popup đóng            |
| **Fan Menu Props**        |                            |              |                                    |
| `showFanMenu`             | `boolean`                  | `false`      | Bật/tắt tính năng fan menu         |
| `menuItems`               | `MenuItem[]`               | `[]`         | Danh sách menu items               |
| `menuRadius`              | `number`                   | `120`        | Bán kính của fan menu              |
| `menuItemSize`            | `number`                   | `50`         | Kích thước của menu item           |
| `menuStartAngle`          | `number`                   | `-90`        | Góc bắt đầu của fan menu (độ)      |
| `menuEndAngle`            | `number`                   | `90`         | Góc kết thúc của fan menu (độ)     |
| `menuItemBackgroundColor` | `string`                   | `#007AFF`    | Màu nền mặc định của menu item     |
| `menuItemTextColor`       | `string`                   | `#FFFFFF`    | Màu chữ của menu item              |
| `onMenuClose`             | `() => void`               | -            | Callback khi fan menu đóng         |

## MenuItem Interface

```tsx
interface MenuItem {
  id: string; // Unique identifier
  icon: string; // Emoji or text icon
  label: string; // Label text
  onPress: () => void; // Action when pressed
  color?: string; // Optional custom color
}
```

## Demo

Chạy file `demo.tsx` để xem các ví dụ sử dụng:

```tsx
import FloatButtonDemo from './src/FloatButton/demo';
```

Demo bao gồm:

- Button cơ bản
- Button với popup đơn giản
- Button với popup tương tác
- **Button với Fan Menu - Quick Actions (3 items)**
- **Button với Fan Menu - Social (4 items)**
- **Button với Fan Menu - Tools (5 items)**

## Cách hoạt động

### FloatButton

1. **PanResponder**: Sử dụng để xử lý gesture kéo thả
2. **Animated.ValueXY**: Quản lý vị trí của button
3. **Spring Animation**: Tạo hiệu ứng mượt mà khi thả button
4. **Boundary Detection**: Tự động giới hạn button trong màn hình
5. **Edge Snapping**: Tự động snap về cạnh gần nhất

### Popup

1. **Modal**: Sử dụng React Native Modal để hiển thị popup
2. **Position Calculation**: Tự động tính toán vị trí popup dựa trên vị trí button
3. **Boundary Detection**: Đảm bảo popup không vượt ra ngoài màn hình
4. **Animation**: Fade in/out và scale animation mượt mà
5. **Backdrop**: Có thể đóng popup bằng cách nhấn vào backdrop

### Fan Menu

1. **Circular Layout**: Menu items được sắp xếp theo hình tròn xung quanh button
2. **Trigonometric Calculation**: Sử dụng sin/cos để tính vị trí chính xác
3. **Staggered Animation**: Menu items xuất hiện với delay lần lượt
4. **Spring Animation**: Hiệu ứng bounce mượt mà cho từng item
5. **Customizable Arc**: Có thể điều chỉnh góc mở của fan menu

## Lưu ý

- Button sẽ tự động snap về cạnh trái hoặc phải khi thả
- Button không thể di chuyển ra ngoài màn hình
- Khi đang kéo, button sẽ không trigger onPress event
- Component sử dụng `position: absolute` nên cần đặt trong container phù hợp
- **Popup sẽ tự động định vị để không bị che khuất**
- **Popup có thể chứa bất kỳ React component nào**
- **Có thể tương tác với các element bên trong popup**
- **Fan Menu ưu tiên hơn Popup khi cả hai được bật**
- **Menu items có thể có màu riêng hoặc dùng màu mặc định**
- **Góc mở của fan menu có thể điều chỉnh từ -180° đến 180°**
