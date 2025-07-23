# InputBase Component

The `InputBase` component is the foundation for all input components in this library. It provides a highly customizable, feature-rich text input component with extensive styling options, validation, accessibility features, and various input types.

## Features

- **Multiple Variants**: `outlined`, `filled`, `underlined`
- **Multiple Sizes**: `small`, `medium`, `large`
- **Input Types**: `text`, `email`, `password`, `number`, `phone`, `url`
- **Validation**: Built-in validation with custom validators
- **Icons**: Support for left and right icons with click handlers
- **Animation**: Floating labels and smooth transitions
- **Accessibility**: Full accessibility support
- **Styling**: Extensive customization options
- **States**: Error, disabled, readonly, required states

## Installation

```bash
# Import the component
import { InputBase } from './InputBase';
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { InputBase } from './InputBase';

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <InputBase
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChangeText={setValue}
      type="email"
      variant="outlined"
      size="medium"
    />
  );
};
```

## Props

### Basic Props

| Prop           | Type                     | Default | Description                     |
| -------------- | ------------------------ | ------- | ------------------------------- |
| `label`        | `string`                 | -       | Label text for the input        |
| `placeholder`  | `string`                 | -       | Placeholder text                |
| `value`        | `string`                 | -       | Current value of the input      |
| `defaultValue` | `string`                 | -       | Default value                   |
| `onChangeText` | `(text: string) => void` | -       | Callback when text changes      |
| `onFocus`      | `() => void`             | -       | Callback when input is focused  |
| `onBlur`       | `() => void`             | -       | Callback when input loses focus |

### Styling Props

| Prop      | Type                                                              | Default      | Description                 |
| --------- | ----------------------------------------------------------------- | ------------ | --------------------------- |
| `variant` | `'outlined' \| 'filled' \| 'underlined'`                          | `'outlined'` | Visual variant of the input |
| `size`    | `'small' \| 'medium' \| 'large'`                                  | `'medium'`   | Size of the input           |
| `type`    | `'text' \| 'email' \| 'password' \| 'number' \| 'phone' \| 'url'` | `'text'`     | Input type                  |

### Color Props

| Prop               | Type         | Default     | Description            |
| ------------------ | ------------ | ----------- | ---------------------- |
| `backgroundColor`  | `ColorValue` | -           | Background color       |
| `borderColor`      | `ColorValue` | -           | Border color           |
| `textColor`        | `ColorValue` | `'#000'`    | Text color             |
| `placeholderColor` | `ColorValue` | `'#999'`    | Placeholder text color |
| `labelColor`       | `ColorValue` | `'#666'`    | Label color            |
| `focusColor`       | `ColorValue` | -           | Color when focused     |
| `errorColor`       | `ColorValue` | `'#ff3b30'` | Error state color      |

### State Props

| Prop           | Type      | Default | Description                |
| -------------- | --------- | ------- | -------------------------- |
| `disabled`     | `boolean` | `false` | Whether input is disabled  |
| `error`        | `boolean` | `false` | Whether input has an error |
| `errorMessage` | `string`  | -       | Error message to display   |
| `required`     | `boolean` | `false` | Whether input is required  |
| `readonly`     | `boolean` | `false` | Whether input is readonly  |

### Layout Props

| Prop            | Type      | Default | Description                           |
| --------------- | --------- | ------- | ------------------------------------- |
| `fullWidth`     | `boolean` | `false` | Whether input takes full width        |
| `multiline`     | `boolean` | `false` | Whether input supports multiple lines |
| `numberOfLines` | `number`  | `1`     | Number of lines for multiline input   |
| `maxLength`     | `number`  | -       | Maximum character length              |

### Icon Props

| Prop               | Type              | Default | Description                         |
| ------------------ | ----------------- | ------- | ----------------------------------- |
| `leftIcon`         | `React.ReactNode` | -       | Icon to display on the left         |
| `rightIcon`        | `React.ReactNode` | -       | Icon to display on the right        |
| `onRightIconPress` | `() => void`      | -       | Callback when right icon is pressed |
| `onLeftIconPress`  | `() => void`      | -       | Callback when left icon is pressed  |

### Animation Props

| Prop            | Type      | Default | Description                  |
| --------------- | --------- | ------- | ---------------------------- |
| `animated`      | `boolean` | `true`  | Whether to enable animations |
| `floatingLabel` | `boolean` | `false` | Whether label should float   |

### Validation Props

| Prop               | Type                                | Default | Description                |
| ------------------ | ----------------------------------- | ------- | -------------------------- |
| `validateOnBlur`   | `boolean`                           | `false` | Validate on blur event     |
| `validateOnChange` | `boolean`                           | `false` | Validate on change event   |
| `validator`        | `(value: string) => string \| null` | -       | Custom validation function |

### Border Props

| Prop           | Type                              | Default   | Description   |
| -------------- | --------------------------------- | --------- | ------------- |
| `borderRadius` | `number`                          | -         | Border radius |
| `borderWidth`  | `number`                          | `1`       | Border width  |
| `borderStyle`  | `'solid' \| 'dotted' \| 'dashed'` | `'solid'` | Border style  |

### Shadow Props

| Prop            | Type                                | Default                   | Description            |
| --------------- | ----------------------------------- | ------------------------- | ---------------------- |
| `shadow`        | `boolean`                           | `false`                   | Whether to show shadow |
| `shadowColor`   | `ColorValue`                        | `'#000'`                  | Shadow color           |
| `shadowOffset`  | `{ width: number, height: number }` | `{ width: 0, height: 2 }` | Shadow offset          |
| `shadowOpacity` | `number`                            | `0.25`                    | Shadow opacity         |
| `shadowRadius`  | `number`                            | `3.84`                    | Shadow radius          |

### Spacing Props

| Prop             | Type     | Default | Description          |
| ---------------- | -------- | ------- | -------------------- |
| `margin`         | `number` | -       | Margin on all sides  |
| `marginTop`      | `number` | -       | Top margin           |
| `marginBottom`   | `number` | -       | Bottom margin        |
| `marginLeft`     | `number` | -       | Left margin          |
| `marginRight`    | `number` | -       | Right margin         |
| `_padding`       | `number` | -       | Padding on all sides |
| `_paddingTop`    | `number` | -       | Top padding          |
| `_paddingBottom` | `number` | -       | Bottom padding       |
| `_paddingLeft`   | `number` | -       | Left padding         |
| `_paddingRight`  | `number` | -       | Right padding        |

### Custom Style Props

| Prop             | Type        | Default | Description                  |
| ---------------- | ----------- | ------- | ---------------------------- |
| `style`          | `ViewStyle` | -       | Custom container style       |
| `inputStyle`     | `TextStyle` | -       | Custom input style           |
| `labelStyle`     | `TextStyle` | -       | Custom label style           |
| `errorStyle`     | `TextStyle` | -       | Custom error text style      |
| `containerStyle` | `ViewStyle` | -       | Custom outer container style |

### Accessibility Props

| Prop                 | Type     | Default | Description         |
| -------------------- | -------- | ------- | ------------------- |
| `accessibilityLabel` | `string` | -       | Accessibility label |
| `accessibilityHint`  | `string` | -       | Accessibility hint  |

## Examples

### Basic Input with Validation

```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (value: string) => {
  if (!value) return 'Email is required';
  if (!value.includes('@')) return 'Invalid email format';
  return null;
};

<InputBase
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  type="email"
  error={!!emailError}
  errorMessage={emailError}
  validateOnBlur
  validator={validateEmail}
  required
/>;
```

### Password Input with Toggle

```tsx
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

<InputBase
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChangeText={setPassword}
  type="password"
  secureTextEntry={!showPassword}
  rightIcon={
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} />
    </TouchableOpacity>
  }
  onRightIconPress={() => setShowPassword(!showPassword)}
/>;
```

### Multiline Input

```tsx
<InputBase
  label="Description"
  placeholder="Enter description..."
  value={description}
  onChangeText={setDescription}
  multiline
  numberOfLines={4}
  variant="outlined"
  size="large"
  borderRadius={8}
  backgroundColor="#f8f9fa"
/>
```

### Custom Styled Input

```tsx
<InputBase
  label="Search"
  placeholder="Search products..."
  value={searchTerm}
  onChangeText={setSearchTerm}
  leftIcon={<SearchIcon size={20} color="#666" />}
  variant="filled"
  backgroundColor="#f5f5f5"
  borderRadius={25}
  borderWidth={0}
  shadow
  shadowColor="#000"
  shadowOffset={{ width: 0, height: 2 }}
  shadowOpacity={0.1}
  shadowRadius={4}
  fullWidth
/>
```

### Different Variants

```tsx
// Outlined variant
<InputBase
  label="Outlined Input"
  variant="outlined"
  borderColor="#ddd"
  focusColor="#007AFF"
/>

// Filled variant
<InputBase
  label="Filled Input"
  variant="filled"
  backgroundColor="#f0f0f0"
  borderWidth={0}
/>

// Underlined variant
<InputBase
  label="Underlined Input"
  variant="underlined"
  borderColor="#ddd"
  focusColor="#007AFF"
/>
```

### Different Sizes

```tsx
// Small size
<InputBase
  label="Small Input"
  size="small"
  placeholder="Small input..."
/>

// Medium size (default)
<InputBase
  label="Medium Input"
  size="medium"
  placeholder="Medium input..."
/>

// Large size
<InputBase
  label="Large Input"
  size="large"
  placeholder="Large input..."
/>
```

## Variants

### Outlined

- Traditional input with visible borders
- Border changes color on focus
- Good for most use cases

### Filled

- Input with background color
- No visible borders
- Modern, clean appearance

### Underlined

- Only bottom border visible
- Minimal design
- Good for forms with many inputs

## Sizes

### Small

- Compact padding
- Smaller font size
- Good for dense layouts

### Medium (Default)

- Balanced padding and font size
- Suitable for most applications

### Large

- Generous padding
- Larger font size
- Good for mobile applications

## Validation

The component supports both built-in and custom validation:

```tsx
// Custom validator function
const validatePhone = (value: string) => {
  if (!value) return 'Phone number is required';
  if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
    return 'Invalid phone number format';
  }
  return null;
};

<InputBase
  label="Phone"
  type="phone"
  validator={validatePhone}
  validateOnBlur
  validateOnChange
/>;
```

## Accessibility

The component includes comprehensive accessibility features:

- Proper `accessibilityLabel` and `accessibilityHint` support
- Screen reader compatibility
- Keyboard navigation support
- Focus management
- Error announcements

## Dependencies

- React Native
- React (for hooks and forwardRef)

## Notes

- The component uses `forwardRef` to properly forward refs to the underlying `TextInput`
- All styling is done through StyleSheet for optimal performance
- The component supports all standard `TextInput` props
- Validation is handled internally with proper error state management
- Icons are fully customizable and support touch interactions
