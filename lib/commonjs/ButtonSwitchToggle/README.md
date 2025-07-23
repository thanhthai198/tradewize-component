# ButtonSwitchToggle Component

A highly customizable and performant toggle switch component for React Native with enhanced animations, accessibility, and haptic feedback.

## ✨ Features

- **🎨 Multiple Variants**: Primary, secondary, outline, ghost, danger, success, warning
- **📏 Flexible Sizing**: Small, medium, large with custom dimensions
- **🎭 Smooth Animations**: Timing and spring animations with customizable configs
- **📱 Haptic Feedback**: Light, medium, and heavy vibration patterns
- **♿ Enhanced Accessibility**: Full VoiceOver support with proper labels and hints
- **⚡ Performance Optimized**: Memoized calculations and optimized re-renders
- **🎯 Custom Components**: Support for custom track and thumb components
- **🌙 Shadow Support**: Configurable shadows with elevation
- **🔄 Controlled/Uncontrolled**: Works in both controlled and uncontrolled modes

## 🚀 Installation

```bash
npm install @your-org/button-switch-toggle
```

## 📖 Basic Usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import ButtonSwitchToggle from './ButtonSwitchToggle';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <ButtonSwitchToggle
        value={isEnabled}
        onValueChange={setIsEnabled}
        variant="primary"
        size="medium"
      />
    </View>
  );
};
```

## 🎛️ Props

### Basic Props

| Prop            | Type                       | Default | Description                 |
| --------------- | -------------------------- | ------- | --------------------------- |
| `value`         | `boolean`                  | `false` | Current state of the switch |
| `onValueChange` | `(value: boolean) => void` | -       | Callback when value changes |
| `disabled`      | `boolean`                  | `false` | Disable the switch          |
| `loading`       | `boolean`                  | `false` | Show loading state          |

### Styling Props

| Prop        | Type                                                                                     | Default     | Description                        |
| ----------- | ---------------------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `size`      | `'small' \| 'medium' \| 'large'`                                                         | `'medium'`  | Predefined sizes                   |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'success' \| 'warning'` | `'primary'` | Color variant                      |
| `width`     | `number`                                                                                 | -           | Custom width (overrides size)      |
| `height`    | `number`                                                                                 | -           | Custom height (overrides size)     |
| `thumbSize` | `number`                                                                                 | -           | Custom thumb size (overrides size) |

### Color Props

| Prop                      | Type     | Default     | Description                    |
| ------------------------- | -------- | ----------- | ------------------------------ |
| `activeBackgroundColor`   | `string` | -           | Background color when active   |
| `inactiveBackgroundColor` | `string` | -           | Background color when inactive |
| `thumbColor`              | `string` | `'#ffffff'` | Thumb color                    |
| `activeThumbColor`        | `string` | -           | Thumb color when active        |
| `inactiveThumbColor`      | `string` | -           | Thumb color when inactive      |

### Animation Props

| Prop                 | Type      | Default                         | Description                            |
| -------------------- | --------- | ------------------------------- | -------------------------------------- |
| `animationDuration`  | `number`  | `300`                           | Duration for timing animation (ms)     |
| `useSpringAnimation` | `boolean` | `false`                         | Use spring instead of timing animation |
| `springConfig`       | `object`  | `{ tension: 100, friction: 8 }` | Spring animation configuration         |

### Shadow Props

| Prop            | Type                                | Default                   | Description    |
| --------------- | ----------------------------------- | ------------------------- | -------------- |
| `shadow`        | `boolean`                           | `true`                    | Enable shadow  |
| `shadowColor`   | `string`                            | `'#000'`                  | Shadow color   |
| `shadowOffset`  | `{ width: number, height: number }` | `{ width: 0, height: 2 }` | Shadow offset  |
| `shadowOpacity` | `number`                            | `0.25`                    | Shadow opacity |
| `shadowRadius`  | `number`                            | `3.84`                    | Shadow radius  |

### Haptic Feedback Props

| Prop             | Type                             | Default   | Description               |
| ---------------- | -------------------------------- | --------- | ------------------------- |
| `hapticFeedback` | `boolean`                        | `false`   | Enable haptic feedback    |
| `hapticType`     | `'light' \| 'medium' \| 'heavy'` | `'light'` | Haptic feedback intensity |

### Accessibility Props

| Prop                 | Type     | Default | Description                |
| -------------------- | -------- | ------- | -------------------------- |
| `accessibilityLabel` | `string` | -       | Custom accessibility label |
| `accessibilityHint`  | `string` | -       | Custom accessibility hint  |

### Custom Component Props

| Prop          | Type              | Default | Description            |
| ------------- | ----------------- | ------- | ---------------------- |
| `customTrack` | `React.ReactNode` | -       | Custom track component |
| `customThumb` | `React.ReactNode` | -       | Custom thumb component |

### Style Props

| Prop             | Type        | Default | Description            |
| ---------------- | ----------- | ------- | ---------------------- |
| `style`          | `ViewStyle` | -       | Custom switch style    |
| `containerStyle` | `ViewStyle` | -       | Custom container style |

## 🎨 Examples

### Basic Variants

```tsx
<View style={{ gap: 20 }}>
  <ButtonSwitchToggle variant="primary" />
  <ButtonSwitchToggle variant="secondary" />
  <ButtonSwitchToggle variant="danger" />
  <ButtonSwitchToggle variant="success" />
  <ButtonSwitchToggle variant="warning" />
</View>
```

### Different Sizes

```tsx
<View style={{ gap: 20 }}>
  <ButtonSwitchToggle size="small" />
  <ButtonSwitchToggle size="medium" />
  <ButtonSwitchToggle size="large" />
</View>
```

### Custom Colors

```tsx
<ButtonSwitchToggle
  activeBackgroundColor="#FF6B6B"
  inactiveBackgroundColor="#F7F7F7"
  activeThumbColor="#FFFFFF"
  inactiveThumbColor="#CCCCCC"
/>
```

### Spring Animation

```tsx
<ButtonSwitchToggle
  useSpringAnimation={true}
  springConfig={{ tension: 150, friction: 10 }}
/>
```

### With Haptic Feedback

```tsx
<ButtonSwitchToggle
  hapticFeedback={true}
  hapticType="medium"
  onValueChange={(value) => console.log('Switch toggled:', value)}
/>
```

### Custom Components

```tsx
const CustomThumb = () => (
  <View
    style={{
      width: 20,
      height: 20,
      backgroundColor: '#FF6B6B',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ fontSize: 10, color: 'white' }}>✓</Text>
  </View>
);

<ButtonSwitchToggle
  customThumb={<CustomThumb />}
  activeBackgroundColor="#4ECDC4"
  inactiveBackgroundColor="#F7F7F7"
/>;
```

### Controlled vs Uncontrolled

```tsx
// Controlled
const [value, setValue] = useState(false);
<ButtonSwitchToggle value={value} onValueChange={setValue} />

// Uncontrolled
<ButtonSwitchToggle onValueChange={(value) => console.log(value)} />
```

## 🔧 Performance Optimizations

The component includes several performance optimizations:

- **Memoized Calculations**: Dimensions, colors, and styles are memoized
- **Custom Hooks**: Logic is separated into reusable hooks
- **Optimized Re-renders**: Only re-renders when necessary props change
- **Native Driver**: Animations use native driver for better performance

## ♿ Accessibility

The component provides comprehensive accessibility support:

- **VoiceOver**: Proper labels and hints for screen readers
- **Accessibility Actions**: Support for accessibility actions
- **Accessibility State**: Proper state management for assistive technologies
- **Keyboard Navigation**: Support for keyboard navigation

## 🎯 Custom Hooks

The component exports several custom hooks for advanced usage:

### `useSwitchToggle`

```tsx
const { currentValue, handleToggle } = useSwitchToggle(
  value,
  onValueChange,
  disabled,
  loading,
  hapticFeedback,
  hapticType
);
```

### `useSwitchDimensions`

```tsx
const { width, height, thumbSize, maxTranslateX } = useSwitchDimensions(
  size,
  width,
  height,
  thumbSize
);
```

### `useSwitchColors`

```tsx
const { backgroundColor, thumbColor } = useSwitchColors(
  variant,
  currentValue,
  activeBackgroundColor,
  inactiveBackgroundColor,
  thumbColor,
  activeThumbColor,
  inactiveThumbColor
);
```

## 🐛 Troubleshooting

### Common Issues

1. **Animation not working**: Ensure `useNativeDriver: true` is set (it is by default)
2. **Haptic feedback not working**: Check if device supports haptic feedback
3. **Custom components not rendering**: Ensure custom components are valid React elements

### Performance Tips

1. Use `useMemo` for expensive calculations in custom components
2. Avoid inline styles in custom components
3. Use `React.memo` for custom components if they're expensive to render

## 📝 Changelog

### v2.0.0

- ✨ Added spring animation support
- ✨ Added haptic feedback
- ✨ Added custom component support
- ⚡ Performance optimizations with custom hooks
- ♿ Enhanced accessibility support
- 🎨 Improved color management
- 📚 Better documentation

### v1.0.0

- 🎉 Initial release
- Basic toggle functionality
- Multiple variants and sizes
- Shadow support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
