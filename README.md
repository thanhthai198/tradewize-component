# 🚀 TradeWize Component Library

> Một thư viện component React Native toàn diện với các component UI được thiết kế đẹp và dễ sử dụng.

[![npm version](https://img.shields.io/badge/npm-latest-blue.svg)](https://www.npmjs.com/package/tradewize)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.70+-blue.svg)](https://reactnative.dev/)

## 📋 Table of Contents

- [📦 Installation](#-installation)
- [🔧 Dependencies](#-dependencies)
- [🎯 Available Components](#-available-components)
- [📖 Usage Examples](#-usage-examples)
- [🎨 Customization](#-customization)
- [📱 Responsive Design](#-responsive-design)
- [♿ Accessibility](#-accessibility)
- [🔧 TypeScript Support](#-typescript-support)
- [📄 License](#-license)

## 📦 Installation

### Using npm

```bash
npm install git+https://github.com/thanhthai198/tradewize-component.git
```

### Using yarn

```bash
yarn add git+https://github.com/thanhthai198/tradewize-component.git
```

### Android Setup

Thêm vào file `android/settings.gradle`:

```gradle
include ':tradewizecomponent'
project(':tradewizecomponent').projectDir = new File(rootProject.projectDir, '../node_modules/tradewize/android')
```

## 🔧 Dependencies

Thư viện này yêu cầu các dependencies sau:

```json
{
  "@expo/react-native-action-sheet": ">=4.1.1",
  "@react-native-community/blur": ">=4.4.1",
  "@react-native-community/slider": ">=4.5.7",
  "react-native-create-thumbnail": ">=2.1.1",
  "react-native-fast-image": ">=8.6.3",
  "react-native-fs": ">=2.20.0",
  "react-native-gesture-handler": ">=2.25.0",
  "react-native-image-crop-picker": ">=0.42.0",
  "react-native-image-viewing": ">=0.2.2",
  "react-native-keyboard-controller": ">=1.17.5",
  "react-native-modal": ">=13.0.1",
  "react-native-parsed-text": ">=0.0.22",
  "react-native-reanimated": ">=3.19.0",
  "react-native-safe-area-context": ">=5.5.2",
  "react-native-video": ">=6.16.0",
  "react-native-vision-camera": ">=4.7.0",
  "react-native-webview": ">=13.13.5",
  "react-native-youtube-iframe": ">=2.4.0",
  "react-native-svg": ">=15.12.1",
  "react-native-circular-progress": ">=1.4.1"
}
```

## 🎯 Available Components

| Component              | Description                                  | Status |
| ---------------------- | -------------------------------------------- | ------ |
| **ButtonBase**         | Button component linh hoạt với nhiều variant | ✅     |
| **InputBase**          | Component input cơ bản                       | ✅     |
| **FlatInput**          | Input component với style phẳng              | ✅     |
| **OutlinedInput**      | Input component với viền outline             | ✅     |
| **RadioButton**        | Component radio button                       | ✅     |
| **CheckBox**           | Component checkbox                           | ✅     |
| **ButtonSwitchToggle** | Component toggle switch                      | ✅     |
| **TabView**            | Component tab view                           | ✅     |
| **ScrollTabView**      | Tab view với khả năng scroll                 | ✅     |
| **Collapse**           | Component có thể thu gọn                     | ✅     |
| **GiftChat**           | Component chat                               | ✅     |
| **ShowVideo**          | Component Video Show (không hỗ trợ YouTube)  | ✅     |

## 📖 Usage Examples

### Import Components

```jsx
import {
  ButtonBase,
  InputBase,
  FlatInput,
  OutlinedInput,
  RadioButton,
  CheckBox,
  ButtonSwitchToggle,
  TabView,
  ScrollTabView,
  Collapse,
} from 'tradewize';
```

### 1. 🎯 ButtonBase Component

Component button toàn diện với nhiều tính năng nâng cao.

```jsx
import { ButtonBase } from 'tradewize';

// Basic Button
<ButtonBase
  title="Click me"
  onPress={() => console.log('Pressed!')}
/>

// Button with different variants
<ButtonBase
  title="Success Button"
  variant="success"
  onPress={handleSuccess}
/>

<ButtonBase
  title="Danger Button"
  variant="danger"
  onPress={handleDelete}
/>

// Button with loading state
<ButtonBase
  title="Loading..."
  loading={true}
  onPress={handleSubmit}
/>

// Button with icon
<ButtonBase
  title="Save"
  leftIcon="save"
  onPress={handleSave}
/>
```

**Available Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `warning`

**Available Sizes:** `small`, `medium`, `large`, `xlarge`

### 2. 📝 Input Components

#### FlatInput

Input component với style phẳng, không có viền mặc định.

```jsx
import { FlatInput } from 'tradewize';

const [email, setEmail] = useState('');

<FlatInput
  label="Email"
  placeholder="Nhập email của bạn"
  value={email}
  onChangeText={setEmail}
  backgroundColor="#f5f5f5"
  focusBorderColor="#007AFF"
  errorBorderColor="#ff3b30"
  borderRadius={8}
/>;
```

#### OutlinedInput

Input component với viền outline.

```jsx
import { OutlinedInput } from 'tradewize';

const [username, setUsername] = useState('');

<OutlinedInput
  label="Tên người dùng"
  placeholder="Nhập tên người dùng"
  value={username}
  onChangeText={setUsername}
  borderWidth={1}
  borderRadius={6}
  borderColor="#E1E1E1"
  focusBorderColor="#007AFF"
  errorBorderColor="#ff3b30"
/>;
```

### 3. 📑 TabView Component

Component tab view linh hoạt với khả năng tùy chỉnh cao.

```jsx
import { TabView } from 'tradewize';

const tabs = [
  {
    key: 'tab1',
    title: 'Tab 1',
    content: <Text>Nội dung Tab 1</Text>,
  },
  {
    key: 'tab2',
    title: 'Tab 2',
    content: <Text>Nội dung Tab 2</Text>,
  },
  {
    key: 'tab3',
    title: 'Tab 3',
    content: <Text>Nội dung Tab 3</Text>,
  },
];

<TabView
  tabs={tabs}
  onTabChange={(index, tab) => console.log(`Chuyển sang ${tab.title}`)}
  tabBarPosition="top"
  scrollable={true}
/>;
```

### 4. 📜 ScrollTabView Component

Tab view với khả năng scroll ngang.

```jsx
import { ScrollTabView } from 'tradewize';

const scrollTabs = [
  {
    key: 'home',
    title: 'Trang chủ',
    content: <Text>Nội dung trang chủ</Text>,
  },
  {
    key: 'profile',
    title: 'Hồ sơ',
    content: <Text>Nội dung hồ sơ</Text>,
  },
  // ... nhiều tab khác
];

<ScrollTabView
  tabs={scrollTabs}
  onTabChange={(index, tab) => console.log(`Tab: ${tab.title}`)}
/>;
```

### 5. 📦 Collapse Component

Component có thể thu gọn nội dung.

```jsx
import { Collapse } from 'tradewize';

<Collapse title="Tiêu đề có thể thu gọn" variant="outlined" size="medium">
  <Text>Nội dung bên trong component collapse</Text>
</Collapse>;
```

### 6. 🔘 RadioButton Component

Component radio button.

```jsx
import { RadioButton } from 'tradewize';

const [selectedValue, setSelectedValue] = useState('option1');

<RadioButton
  value="option1"
  selected={selectedValue === 'option1'}
  onSelect={() => setSelectedValue('option1')}
  label="Tùy chọn 1"
/>

<RadioButton
  value="option2"
  selected={selectedValue === 'option2'}
  onSelect={() => setSelectedValue('option2')}
  label="Tùy chọn 2"
/>
```

### 7. ☑️ CheckBox Component

Component checkbox.

```jsx
import { CheckBox } from 'tradewize';

const [isChecked, setIsChecked] = useState(false);

<CheckBox
  checked={isChecked}
  onCheck={setIsChecked}
  label="Đồng ý với điều khoản"
/>;
```

### 8. 🔄 ButtonSwitchToggle Component

Component toggle switch.

```jsx
import { ButtonSwitchToggle } from 'tradewize';

const [isEnabled, setIsEnabled] = useState(false);

<ButtonSwitchToggle
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Bật thông báo"
/>;
```

## 🎨 Customization

Tất cả các component đều hỗ trợ tùy chỉnh style thông qua props:

```jsx
// Ví dụ với ButtonBase
<ButtonBase
  title="Custom Button"
  onPress={handlePress}
  backgroundColor="#FF6B6B"
  textColor="#FFFFFF"
  borderRadius={20}
  containerStyle={{ marginVertical: 10 }}
  textStyle={{ fontWeight: 'bold' }}
/>

// Ví dụ với Input
<FlatInput
  label="Custom Input"
  placeholder="Placeholder"
  value={value}
  onChangeText={setValue}
  backgroundColor="#F8F9FA"
  focusBorderColor="#28A745"
  borderRadius={12}
/>
```

## 📱 Responsive Design

Các component được thiết kế để hoạt động tốt trên nhiều kích thước màn hình khác nhau:

```jsx
// Button với full width
<ButtonBase
  title="Full Width Button"
  onPress={handlePress}
  fullWidth={true}
/>

// Tab view với scroll
<TabView
  tabs={tabs}
  scrollable={true}
  fullWidth={false}
/>
```

## ♿ Accessibility

Tất cả các component đều hỗ trợ accessibility:

```jsx
<ButtonBase
  title="Accessible Button"
  onPress={handlePress}
  accessibilityLabel="Nút thực hiện hành động"
  accessibilityHint="Nhấn để thực hiện hành động"
  accessibilityRole="button"
/>
```

## 🔧 TypeScript Support

Thư viện được viết hoàn toàn bằng TypeScript và cung cấp đầy đủ type definitions:

```tsx
import { ButtonBase, ButtonVariant, ButtonSize } from 'tradewize';

const MyComponent: React.FC = () => {
  const handlePress = (): void => {
    console.log('Button pressed');
  };

  return (
    <ButtonBase
      title="TypeScript Button"
      variant="primary"
      size="medium"
      onPress={handlePress}
    />
  );
};
```

## 🤝 Contributing

Chúng tôi rất hoan nghênh mọi đóng góp! Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by TradeWize Team**

[![GitHub stars](https://img.shields.io/github/stars/thanhthai198/tradewize-component?style=social)](https://github.com/thanhthai198/tradewize-component)
[![GitHub forks](https://img.shields.io/github/forks/thanhthai198/tradewize-component?style=social)](https://github.com/thanhthai198/tradewize-component)
[![GitHub issues](https://img.shields.io/github/issues/thanhthai198/tradewize-component)](https://github.com/thanhthai198/tradewize-component/issues)

</div>
