# TradeWize Component Library

Một thư viện component React Native toàn diện với các component UI được thiết kế đẹp và dễ sử dụng.

Cần cài các thư viện
react-native-reanimated, react-native-safe-area-context, react-native-vision-camera, react-native-gesture-handler, @react-native-community/slider

## 📦 Cài đặt

```bash
npm install git+https://github.com/thanhthai198/tradewize-component.git react-native-safe-area-context react-native-vision-camera react-native-reanimated  react-native-gesture-handler @react-native-community/slider
```

hoặc sử dụng yarn:

```bash
yarn add git+https://github.com/thanhthai198/tradewize-component.git react-native-safe-area-context react-native-vision-camera react-native-reanimated react-native-gesture-handler @react-native-community/slider
```

Đối với android
Vào android/settings.gradle thêm

# include ':tradewizecomponent'

# project(':tradewizecomponent').projectDir = new File(rootProject.projectDir, '../node_modules/tradewize/android')

## 🚀 Các Component có sẵn

Thư viện này bao gồm các component sau:

- **ButtonBase** - Button component linh hoạt với nhiều variant
- **InputBase** - Component input cơ bản
- **FlatInput** - Input component với style phẳng
- **OutlinedInput** - Input component với viền outline
- **RadioButton** - Component radio button
- **CheckBox** - Component checkbox
- **ButtonSwitchToggle** - Component toggle switch
- **TabView** - Component tab view
- **ScrollTabView** - Tab view với khả năng scroll
- **Collapse** - Component có thể thu gọn

## 📖 Cách sử dụng

### Import các component

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

### 1. ButtonBase Component

Component button toàn diện với nhiều tính năng nâng cao.

```jsx
import { ButtonBase } from 'tradewize';

// Button cơ bản
<ButtonBase
  title="Click me"
  onPress={() => console.log('Pressed!')}
/>

// Button với variant khác nhau
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

// Button với loading state
<ButtonBase
  title="Loading..."
  loading={true}
  onPress={handleSubmit}
/>

// Button với icon
<ButtonBase
  title="Save"
  leftIcon="save"
  onPress={handleSave}
/>
```

**Các variant có sẵn:** `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `warning`

**Các size có sẵn:** `small`, `medium`, `large`, `xlarge`

### 2. Input Components

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

### 3. TabView Component

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

### 4. ScrollTabView Component

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

### 5. Collapse Component

Component có thể thu gọn nội dung.

```jsx
import { Collapse } from 'tradewize';

<Collapse title="Tiêu đề có thể thu gọn" variant="outlined" size="medium">
  <Text>Nội dung bên trong component collapse</Text>
</Collapse>;
```

### 6. RadioButton Component

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

### 7. CheckBox Component

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

### 8. ButtonSwitchToggle Component

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

## 🎨 Tùy chỉnh Style

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

## 📄 License

MIT

---

Made with ❤️ by TradeWize Team
