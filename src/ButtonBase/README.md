# ButtonBase Component

Một component button toàn diện và linh hoạt cho React Native với nhiều tính năng nâng cao.

## Tính năng

### 🎨 **Styling Options**

- **Variants**: primary, secondary, outline, ghost, danger, success, warning
- **Sizes**: small, medium, large, xlarge
- **Shapes**: rounded, pill, square
- **Custom colors**: backgroundColor, textColor, borderColor
- **Shadows**: Tùy chỉnh shadow với đầy đủ thuộc tính
- **Borders**: Tùy chỉnh borderWidth, borderStyle

### 📱 **Layout & Responsive**

- **Full width**: `fullWidth` prop
- **Alignment**: `alignSelf` prop
- **Flexible sizing**: Tự động điều chỉnh theo content

### ♿ **Accessibility**

- **Accessibility labels**: Tự động hoặc tùy chỉnh
- **Accessibility hints**: Hướng dẫn cho screen readers
- **Accessibility roles**: button, link, none
- **Minimum touch target**: 44px theo guidelines

### 🎯 **Interactive Features**

- **Debounced press**: Tránh spam click
- **Loading state**: Hiển thị ActivityIndicator
- **Disabled state**: Tự động disable khi loading
- **Active opacity**: Tùy chỉnh opacity khi press
- **Pressable control**: Bật/tắt khả năng press

### 🎨 **Content Options**

- **Icons**: leftIcon, rightIcon với spacing tùy chỉnh
- **Custom text styling**: textStyle prop
- **Container styling**: containerStyle prop

## Cài đặt

```bash
npm install lodash
npm install --save-dev @types/lodash
```

## Sử dụng cơ bản

```tsx
import ButtonBase from './src/ButtonBase';

// Button cơ bản
<ButtonBase
  title="Click me"
  onPress={() => console.log('Pressed!')}
/>

// Button với variant
<ButtonBase
  title="Success"
  variant="success"
  onPress={handleSuccess}
/>

// Button với loading state
<ButtonBase
  title="Loading..."
  loading={true}
  onPress={handleSubmit}
/>
```

## Props Reference

### Basic Props

| Prop       | Type              | Default | Description                 |
| ---------- | ----------------- | ------- | --------------------------- |
| `title`    | `string`          | -       | Text hiển thị trên button   |
| `onPress`  | `(event) => void` | -       | Function được gọi khi press |
| `disabled` | `boolean`         | `false` | Disable button              |
| `loading`  | `boolean`         | `false` | Hiển thị loading indicator  |

### Styling Props

| Prop              | Type            | Default     | Description                                                                |
| ----------------- | --------------- | ----------- | -------------------------------------------------------------------------- |
| `variant`         | `ButtonVariant` | `'primary'` | Kiểu button (primary, secondary, outline, ghost, danger, success, warning) |
| `size`            | `ButtonSize`    | `'medium'`  | Kích thước (small, medium, large, xlarge)                                  |
| `shape`           | `ButtonShape`   | `'rounded'` | Hình dạng (rounded, pill, square)                                          |
| `backgroundColor` | `string`        | -           | Màu nền tùy chỉnh                                                          |
| `textColor`       | `string`        | -           | Màu text tùy chỉnh                                                         |
| `borderColor`     | `string`        | -           | Màu border tùy chỉnh                                                       |
| `borderRadius`    | `number`        | -           | Border radius tùy chỉnh                                                    |

### Layout Props

| Prop        | Type      | Default  | Description                |
| ----------- | --------- | -------- | -------------------------- |
| `fullWidth` | `boolean` | `false`  | Button chiếm toàn bộ width |
| `alignSelf` | `string`  | `'auto'` | Alignment của button       |

### Content Props

| Prop          | Type              | Default | Description                   |
| ------------- | ----------------- | ------- | ----------------------------- |
| `leftIcon`    | `React.ReactNode` | -       | Icon bên trái text            |
| `rightIcon`   | `React.ReactNode` | -       | Icon bên phải text            |
| `iconSpacing` | `number`          | `8`     | Khoảng cách giữa icon và text |

### Functionality Props

| Prop            | Type      | Default | Description             |
| --------------- | --------- | ------- | ----------------------- |
| `debounceTime`  | `number`  | `500`   | Thời gian debounce (ms) |
| `activeOpacity` | `number`  | `0.7`   | Opacity khi press       |
| `pressable`     | `boolean` | `true`  | Bật/tắt khả năng press  |

### Shadow Props

| Prop            | Type      | Default                 | Description    |
| --------------- | --------- | ----------------------- | -------------- |
| `shadow`        | `boolean` | `false`                 | Bật shadow     |
| `shadowColor`   | `string`  | `'#000'`                | Màu shadow     |
| `shadowOffset`  | `object`  | `{width: 0, height: 2}` | Offset shadow  |
| `shadowOpacity` | `number`  | `0.25`                  | Opacity shadow |
| `shadowRadius`  | `number`  | `3.84`                  | Radius shadow  |

### Border Props

| Prop          | Type     | Default   | Description                         |
| ------------- | -------- | --------- | ----------------------------------- |
| `borderWidth` | `number` | `0`       | Độ dày border                       |
| `borderStyle` | `string` | `'solid'` | Kiểu border (solid, dotted, dashed) |

### Accessibility Props

| Prop                 | Type     | Default    | Description             |
| -------------------- | -------- | ---------- | ----------------------- |
| `accessibilityLabel` | `string` | -          | Label cho accessibility |
| `accessibilityHint`  | `string` | -          | Hint cho accessibility  |
| `accessibilityRole`  | `string` | `'button'` | Role cho accessibility  |

### Style Props

| Prop             | Type        | Default | Description                |
| ---------------- | ----------- | ------- | -------------------------- |
| `style`          | `ViewStyle` | -       | Custom style cho button    |
| `textStyle`      | `TextStyle` | -       | Custom style cho text      |
| `containerStyle` | `ViewStyle` | -       | Custom style cho container |

## Ví dụ sử dụng

### 1. Button với Icons

```tsx
import { Ionicons } from '@expo/vector-icons';

<ButtonBase
  title="Add Item"
  leftIcon={<Ionicons name="add" size={20} color="white" />}
  variant="success"
  onPress={handleAdd}
/>;
```

### 2. Button với Shadow

```tsx
<ButtonBase
  title="Elevated Button"
  shadow={true}
  shadowColor="#000"
  shadowOffset={{ width: 0, height: 4 }}
  shadowOpacity={0.3}
  shadowRadius={8}
  onPress={handlePress}
/>
```

### 3. Outline Button

```tsx
<ButtonBase
  title="Outline Button"
  variant="outline"
  borderColor="#007bff"
  textColor="#007bff"
  onPress={handlePress}
/>
```

### 4. Full Width Button

```tsx
<ButtonBase
  title="Submit"
  fullWidth={true}
  variant="primary"
  size="large"
  onPress={handleSubmit}
/>
```

### 5. Button với Custom Styling

```tsx
<ButtonBase
  title="Custom Button"
  backgroundColor="#ff6b6b"
  textColor="#ffffff"
  borderRadius={20}
  style={{
    marginVertical: 10,
  }}
  textStyle={{
    fontFamily: 'Arial',
    letterSpacing: 1,
  }}
  onPress={handlePress}
/>
```

### 6. Disabled Button

```tsx
<ButtonBase
  title="Disabled Button"
  disabled={true}
  variant="secondary"
  onPress={handlePress} // Sẽ không được gọi
/>
```

### 7. Loading Button

```tsx
<ButtonBase
  title="Processing..."
  loading={true}
  variant="primary"
  onPress={handleSubmit} // Sẽ không được gọi khi loading
/>
```

## Variants

### Primary (Default)

```tsx
<ButtonBase title="Primary" variant="primary" />
```

### Secondary

```tsx
<ButtonBase title="Secondary" variant="secondary" />
```

### Outline

```tsx
<ButtonBase title="Outline" variant="outline" />
```

### Ghost

```tsx
<ButtonBase title="Ghost" variant="ghost" />
```

### Danger

```tsx
<ButtonBase title="Delete" variant="danger" />
```

### Success

```tsx
<ButtonBase title="Save" variant="success" />
```

### Warning

```tsx
<ButtonBase title="Warning" variant="warning" />
```

## Sizes

### Small

```tsx
<ButtonBase title="Small" size="small" />
```

### Medium (Default)

```tsx
<ButtonBase title="Medium" size="medium" />
```

### Large

```tsx
<ButtonBase title="Large" size="large" />
```

### XLarge

```tsx
<ButtonBase title="XLarge" size="xlarge" />
```

## Shapes

### Rounded (Default)

```tsx
<ButtonBase title="Rounded" shape="rounded" />
```

### Pill

```tsx
<ButtonBase title="Pill" shape="pill" />
```

### Square

```tsx
<ButtonBase title="Square" shape="square" />
```

## Best Practices

1. **Accessibility**: Luôn cung cấp `accessibilityLabel` cho buttons quan trọng
2. **Touch Targets**: Component tự động đảm bảo minimum 44px touch target
3. **Loading States**: Sử dụng `loading` prop thay vì disable button thủ công
4. **Debouncing**: Sử dụng `debounceTime` để tránh spam click
5. **Consistent Styling**: Sử dụng variants và sizes có sẵn để đảm bảo consistency

## TypeScript Support

Component được viết hoàn toàn bằng TypeScript với đầy đủ type definitions:

```tsx
import ButtonBase, {
  ButtonVariant,
  ButtonSize,
  ButtonShape,
} from './src/ButtonBase';

// Type-safe props
const variant: ButtonVariant = 'primary';
const size: ButtonSize = 'large';
const shape: ButtonShape = 'pill';
```

## Performance

- Sử dụng `useMemo` cho debounced function
- Conditional rendering cho icons và content
- Optimized style calculations
- Minimal re-renders với proper prop handling
