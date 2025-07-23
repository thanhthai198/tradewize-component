# CheckBox Component

Một component checkbox toàn diện và linh hoạt cho React Native với nhiều tính năng nâng cao, được xây dựng dựa trên ButtonBase.

## Tính năng

### 🎨 **Styling Options**

- **Variants**: primary, secondary, success, warning, danger, info
- **Sizes**: small, medium, large
- **Shapes**: rounded, square, circle
- **Custom colors**: backgroundColor, checkedBackgroundColor, textColor, borderColor, checkedBorderColor
- **Shadows**: Tùy chỉnh shadow với đầy đủ thuộc tính
- **Borders**: Tùy chỉnh borderWidth, borderStyle

### 📱 **Layout & Responsive**

- **Full width**: `fullWidth` prop
- **Alignment**: `alignSelf` prop
- **Label position**: `labelPosition` prop (left/right)
- **Flexible sizing**: Tự động điều chỉnh theo content

### ♿ **Accessibility**

- **Accessibility labels**: Tự động hoặc tùy chỉnh
- **Accessibility hints**: Hướng dẫn cho screen readers
- **Accessibility roles**: checkbox, button, none
- **Accessibility state**: checked, disabled states

### 🎯 **Interactive Features**

- **Debounced press**: Tránh spam click
- **Disabled state**: Tự động disable khi cần
- **Active opacity**: Tùy chỉnh opacity khi press
- **Pressable control**: Bật/tắt khả năng press
- **Indeterminate state**: Hỗ trợ trạng thái không xác định

### 🎨 **Content Options**

- **Custom check icon**: Tùy chỉnh icon khi checked
- **Custom indeterminate icon**: Tùy chỉnh icon khi indeterminate
- **Custom text styling**: textStyle prop
- **Container styling**: containerStyle prop
- **Checkbox styling**: checkboxStyle prop

## Cài đặt

```bash
npm install lodash
npm install --save-dev @types/lodash
```

## Sử dụng cơ bản

```tsx
import CheckBox from './src/CheckBox';

// Checkbox cơ bản
<CheckBox
  label="Accept terms and conditions"
  checked={isChecked}
  onValueChange={setIsChecked}
/>

// Checkbox với variant
<CheckBox
  label="Enable notifications"
  variant="success"
  checked={notificationsEnabled}
  onValueChange={setNotificationsEnabled}
/>

// Checkbox với indeterminate state
<CheckBox
  label="Select all"
  indeterminate={true}
  onValueChange={handleSelectAll}
/>
```

## Props Reference

### Basic Props

| Prop            | Type                         | Default | Description                          |
| --------------- | ---------------------------- | ------- | ------------------------------------ |
| `label`         | `string`                     | -       | Text hiển thị bên cạnh checkbox      |
| `checked`       | `boolean`                    | `false` | Trạng thái checked                   |
| `onPress`       | `(event) => void`            | -       | Function được gọi khi press          |
| `onValueChange` | `(checked: boolean) => void` | -       | Function được gọi khi value thay đổi |
| `disabled`      | `boolean`                    | `false` | Disable checkbox                     |
| `indeterminate` | `boolean`                    | `false` | Trạng thái không xác định            |

### Styling Props

| Prop                     | Type              | Default     | Description                                                        |
| ------------------------ | ----------------- | ----------- | ------------------------------------------------------------------ |
| `variant`                | `CheckBoxVariant` | -           | Kiểu checkbox (primary, secondary, success, warning, danger, info) |
| `size`                   | `CheckBoxSize`    | `'medium'`  | Kích thước (small, medium, large)                                  |
| `shape`                  | `CheckBoxShape`   | `'rounded'` | Hình dạng (rounded, square, circle)                                |
| `backgroundColor`        | `string`          | -           | Màu nền khi unchecked                                              |
| `checkedBackgroundColor` | `string`          | -           | Màu nền khi checked                                                |
| `textColor`              | `string`          | -           | Màu text tùy chỉnh                                                 |
| `borderColor`            | `string`          | -           | Màu border khi unchecked                                           |
| `checkedBorderColor`     | `string`          | -           | Màu border khi checked                                             |
| `borderRadius`           | `number`          | -           | Border radius tùy chỉnh                                            |
| `width`                  | `number`          | -           | Chiều rộng tùy chỉnh (ưu tiên cao hơn size)                        |
| `height`                 | `number`          | -           | Chiều cao tùy chỉnh (ưu tiên cao hơn size)                         |

### Active/Checked State UI Props

| Prop                    | Type        | Default | Description                                  |
| ----------------------- | ----------- | ------- | -------------------------------------------- |
| `activeTextStyle`       | `TextStyle` | -       | Custom style cho text khi checked            |
| `activeContainerStyle`  | `ViewStyle` | -       | Custom style cho container khi checked       |
| `activeCheckboxStyle`   | `ViewStyle` | -       | Custom style cho checkbox khi checked        |
| `activeBackgroundColor` | `string`    | -       | Màu nền khi checked (ưu tiên cao nhất)       |
| `activeTextColor`       | `string`    | -       | Màu text khi checked (ưu tiên cao nhất)      |
| `activeBorderColor`     | `string`    | -       | Màu border khi checked (ưu tiên cao nhất)    |
| `activeBorderRadius`    | `number`    | -       | Border radius khi checked (ưu tiên cao nhất) |
| `activeBorderWidth`     | `number`    | -       | Border width khi checked (ưu tiên cao nhất)  |
| `activeShadow`          | `boolean`   | -       | Bật shadow khi checked                       |
| `activeShadowColor`     | `string`    | -       | Màu shadow khi checked                       |
| `activeShadowOffset`    | `object`    | -       | Offset shadow khi checked                    |
| `activeShadowOpacity`   | `number`    | -       | Opacity shadow khi checked                   |
| `activeShadowRadius`    | `number`    | -       | Radius shadow khi checked                    |

### Layout Props

| Prop            | Type      | Default   | Description                  |
| --------------- | --------- | --------- | ---------------------------- |
| `fullWidth`     | `boolean` | `false`   | Checkbox chiếm toàn bộ width |
| `alignSelf`     | `string`  | `'auto'`  | Alignment của checkbox       |
| `labelPosition` | `string`  | `'right'` | Vị trí label (left/right)    |

### Content Props

| Prop                      | Type              | Default     | Description                        |
| ------------------------- | ----------------- | ----------- | ---------------------------------- |
| `customCheckIcon`         | `React.ReactNode` | -           | Icon tùy chỉnh khi checked         |
| `customIndeterminateIcon` | `React.ReactNode` | -           | Icon tùy chỉnh khi indeterminate   |
| `labelSpacing`            | `number`          | `12`        | Khoảng cách giữa checkbox và label |
| `checkIconText`           | `string`          | `'✓'`       | Text hiển thị khi checked          |
| `checkIconSize`           | `number`          | `18`        | Kích thước icon check              |
| `checkIconColor`          | `string`          | `'#ffffff'` | Màu icon check                     |
| `checkIconStyle`          | `TextStyle`       | -           | Custom style cho icon check        |

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
| `borderWidth` | `number` | `2`       | Độ dày border                       |
| `borderStyle` | `string` | `'solid'` | Kiểu border (solid, dotted, dashed) |

### Accessibility Props

| Prop                 | Type     | Default      | Description             |
| -------------------- | -------- | ------------ | ----------------------- |
| `accessibilityLabel` | `string` | -            | Label cho accessibility |
| `accessibilityHint`  | `string` | -            | Hint cho accessibility  |
| `accessibilityRole`  | `string` | `'checkbox'` | Role cho accessibility  |

### Style Props

| Prop             | Type        | Default | Description                |
| ---------------- | ----------- | ------- | -------------------------- |
| `textStyle`      | `TextStyle` | -       | Custom style cho text      |
| `containerStyle` | `ViewStyle` | -       | Custom style cho container |
| `checkboxStyle`  | `ViewStyle` | -       | Custom style cho checkbox  |

## Ví dụ sử dụng

### 1. Checkbox với Variants

```tsx
<CheckBox
  label="Primary checkbox"
  variant="primary"
  checked={primaryChecked}
  onValueChange={setPrimaryChecked}
/>

<CheckBox
  label="Success checkbox"
  variant="success"
  checked={successChecked}
  onValueChange={setSuccessChecked}
/>

<CheckBox
  label="Danger checkbox"
  variant="danger"
  checked={dangerChecked}
  onValueChange={setDangerChecked}
/>
```

### 2. Checkbox với Sizes

```tsx
<CheckBox
  label="Small checkbox"
  size="small"
  checked={smallChecked}
  onValueChange={setSmallChecked}
/>

<CheckBox
  label="Large checkbox"
  size="large"
  checked={largeChecked}
  onValueChange={setLargeChecked}
/>
```

### 3. Checkbox với Shapes

```tsx
<CheckBox
  label="Rounded checkbox"
  shape="rounded"
  checked={roundedChecked}
  onValueChange={setRoundedChecked}
/>

<CheckBox
  label="Circle checkbox"
  shape="circle"
  checked={circleChecked}
  onValueChange={setCircleChecked}
/>
```

### 4. Checkbox với Custom Colors

```tsx
<CheckBox
  label="Custom colored checkbox"
  backgroundColor="#f0f0f0"
  checkedBackgroundColor="#ff6b6b"
  borderColor="#ff6b6b"
  checkedBorderColor="#ff6b6b"
  textColor="#333"
  checked={customChecked}
  onValueChange={setCustomChecked}
/>
```

### 5. Checkbox với Custom Check Icon Props

```tsx
// Tùy chỉnh icon check
<CheckBox
  label="Custom check icon"
  checkIconText="✓"
  checkIconSize={20}
  checkIconColor="#ffffff"
  checkIconStyle={{ fontWeight: 'bold' }}
  checked={customIconChecked}
  onValueChange={setCustomIconChecked}
/>

// Sử dụng emoji khác
<CheckBox
  label="Emoji check"
  checkIconText="✅"
  checkIconSize={16}
  checkIconColor="#ffffff"
  checked={emojiChecked}
  onValueChange={setEmojiChecked}
/>

// Icon với style tùy chỉnh
<CheckBox
  label="Styled check"
  checkIconText="✓"
  checkIconSize={24}
  checkIconColor="#4ecdc4"
  checkIconStyle={{
    fontWeight: '900',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
  }}
  checked={styledChecked}
  onValueChange={setStyledChecked}
/>
```

### 6. Checkbox với Custom Dimensions

```tsx
// Checkbox với kích thước tùy chỉnh
<CheckBox
  label="Large custom checkbox"
  width={40}
  height={40}
  checked={largeChecked}
  onValueChange={setLargeChecked}
/>

// Checkbox nhỏ với icon tự động điều chỉnh
<CheckBox
  label="Small checkbox"
  width={16}
  height={16}
  checked={smallChecked}
  onValueChange={setSmallChecked}
/>

// Checkbox hình chữ nhật
<CheckBox
  label="Rectangle checkbox"
  width={60}
  height={30}
  checked={rectChecked}
  onValueChange={setRectChecked}
/>

// Checkbox với kích thước khác nhau cho width/height
<CheckBox
  label="Custom ratio checkbox"
  width={50}
  height={25}
  checked={ratioChecked}
  onValueChange={setRatioChecked}
/>
```

### 7. Checkbox với Shadow
