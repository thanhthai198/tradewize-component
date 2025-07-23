# Input Components

This folder contains reusable input components built on top of the `InputBase` component. These components provide different visual styles and behaviors for text input fields in React Native applications.

## Components

### FlatInput

A flat input component with no visible borders by default, providing a clean and minimal appearance.

### OutlinedInput

An outlined input component with visible borders, providing a traditional form input appearance.

## Installation

```bash
# Import the components
import { FlatInput, OutlinedInput } from './Input';
```

## Usage

### FlatInput

```tsx
import React, { useState } from 'react';
import { FlatInput } from './Input';

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <FlatInput
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChangeText={setValue}
      backgroundColor="#f5f5f5"
      focusBorderColor="#007AFF"
      errorBorderColor="#ff3b30"
      borderRadius={8}
    />
  );
};
```

### OutlinedInput

```tsx
import React, { useState } from 'react';
import { OutlinedInput } from './Input';

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <OutlinedInput
      label="Username"
      placeholder="Enter your username"
      value={value}
      onChangeText={setValue}
      borderWidth={1}
      borderRadius={6}
      borderColor="#E1E1E1"
      focusBorderColor="#007AFF"
      errorBorderColor="#ff3b30"
    />
  );
};
```

## Props

### FlatInputProps

| Prop               | Type     | Default         | Description                      |
| ------------------ | -------- | --------------- | -------------------------------- |
| `backgroundColor`  | `string` | `'transparent'` | Background color of the input    |
| `borderColor`      | `string` | `'transparent'` | Border color in normal state     |
| `focusBorderColor` | `string` | `'#007AFF'`     | Border color when focused        |
| `errorBorderColor` | `string` | `'#ff3b30'`     | Border color when in error state |
| `borderRadius`     | `number` | `0`             | Border radius of the input       |

### OutlinedInputProps

| Prop               | Type     | Default     | Description                      |
| ------------------ | -------- | ----------- | -------------------------------- |
| `borderWidth`      | `number` | `1`         | Width of the border              |
| `borderRadius`     | `number` | `6`         | Border radius of the input       |
| `borderColor`      | `string` | `'#E1E1E1'` | Border color in normal state     |
| `focusBorderColor` | `string` | `'#007AFF'` | Border color when focused        |
| `errorBorderColor` | `string` | `'#ff3b30'` | Border color when in error state |

### Common Props

Both components inherit all props from `InputBaseProps`, including:

- **Basic props**: `label`, `placeholder`, `value`, `onChangeText`, etc.
- **Styling props**: `variant`, `size`, `type`, etc.
- **State props**: `disabled`, `error`, `errorMessage`, etc.
- **Layout props**: `fullWidth`, `multiline`, `numberOfLines`, etc.
- **Icon props**: `leftIcon`, `rightIcon`, `onRightIconPress`, etc.
- **Validation props**: `validateOnBlur`, `validateOnChange`, `validator`, etc.

## Examples

### Basic Usage

```tsx
// Flat input with custom styling
<FlatInput
  label="Search"
  placeholder="Search products..."
  backgroundColor="#f8f9fa"
  borderRadius={20}
  leftIcon={<SearchIcon />}
/>

// Outlined input with validation
<OutlinedInput
  label="Email"
  placeholder="Enter your email"
  type="email"
  required
  error={!!emailError}
  errorMessage={emailError}
  validateOnBlur
  validator={(value) => {
    if (!value.includes('@')) return 'Invalid email format';
    return null;
  }}
/>
```

### Advanced Usage

```tsx
// Password input with toggle visibility
const [showPassword, setShowPassword] = useState(false);

<OutlinedInput
  label="Password"
  placeholder="Enter your password"
  type="password"
  secureTextEntry={!showPassword}
  rightIcon={
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Icon name={showPassword ? 'eye-off' : 'eye'} />
    </TouchableOpacity>
  }
  onRightIconPress={() => setShowPassword(!showPassword)}
/>

// Multiline input
<FlatInput
  label="Description"
  placeholder="Enter description..."
  multiline
  numberOfLines={4}
  backgroundColor="#ffffff"
  borderRadius={8}
  borderColor="#e0e0e0"
/>
```

## Styling

Both components support extensive styling options through the `InputBase` component:

- **Colors**: Customize all color aspects (background, border, text, placeholder, etc.)
- **Sizes**: Choose from `small`, `medium`, or `large` sizes
- **Borders**: Customize border width, radius, and style
- **Shadows**: Add shadow effects for depth
- **Spacing**: Control margins and padding
- **Typography**: Customize font sizes and styles

## Accessibility

Both components include built-in accessibility features:

- Proper `accessibilityLabel` and `accessibilityHint` support
- Screen reader compatibility
- Keyboard navigation support
- Focus management

## Dependencies

- React Native
- InputBase component (from `../InputBase`)

## Notes

- Both components use `forwardRef` to properly forward refs to the underlying `TextInput`
- All components are built on top of the `InputBase` component for consistency
- The components follow React Native best practices for performance and accessibility
