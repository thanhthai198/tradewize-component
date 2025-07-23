# RadioButton Component

A customizable radio button component built on top of the ButtonBase component. This component provides a modern, accessible radio button interface with support for individual and group selection.

## Features

- ✅ Built on ButtonBase for consistent styling and behavior
- ✅ Support for individual and group selection
- ✅ Multiple size options (small, medium, large)
- ✅ Customizable colors and variants
- ✅ Smooth animations for selection state changes
- ✅ Press feedback animations
- ✅ Full accessibility support
- ✅ Disabled state support
- ✅ Custom styling options
- ✅ TypeScript support

## Props

### Basic Props

| Prop       | Type      | Default      | Description                                               |
| ---------- | --------- | ------------ | --------------------------------------------------------- |
| `value`    | `string`  | **Required** | The value of the radio button                             |
| `label`    | `string`  | -            | The label text to display                                 |
| `selected` | `boolean` | `false`      | Whether the radio button is selected (for individual use) |
| `disabled` | `boolean` | `false`      | Whether the radio button is disabled                      |

### Group Management

| Prop            | Type                      | Default | Description                                |
| --------------- | ------------------------- | ------- | ------------------------------------------ |
| `groupValue`    | `string`                  | -       | The currently selected value in a group    |
| `onValueChange` | `(value: string) => void` | -       | Callback when the radio button is selected |

### Styling Props

| Prop      | Type                                 | Default     | Description                            |
| --------- | ------------------------------------ | ----------- | -------------------------------------- |
| `size`    | `'small' \| 'medium' \| 'large'`     | `'medium'`  | The size of the radio button           |
| `variant` | `'default' \| 'outline' \| 'filled'` | `'default'` | The visual variant of the radio button |

### Custom Colors

| Prop                | Type     | Default     | Description                  |
| ------------------- | -------- | ----------- | ---------------------------- |
| `selectedColor`     | `string` | `'#007bff'` | Color when selected          |
| `unselectedColor`   | `string` | `'#e9ecef'` | Color when not selected      |
| `disabledColor`     | `string` | `'#f8f9fa'` | Color when disabled          |
| `textColor`         | `string` | `'#212529'` | Text color when not selected |
| `selectedTextColor` | `string` | `'#007bff'` | Text color when selected     |

### Layout Props

| Prop        | Type                                                            | Default  | Description                               |
| ----------- | --------------------------------------------------------------- | -------- | ----------------------------------------- |
| `fullWidth` | `boolean`                                                       | `false`  | Whether the button should take full width |
| `alignSelf` | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'stretch'` | `'auto'` | Self alignment                            |

### Custom Styles

| Prop             | Type        | Default | Description             |
| ---------------- | ----------- | ------- | ----------------------- |
| `style`          | `ViewStyle` | -       | Custom button styles    |
| `containerStyle` | `ViewStyle` | -       | Custom container styles |

### Animation Props

| Prop                | Type                                          | Default  | Description                            |
| ------------------- | --------------------------------------------- | -------- | -------------------------------------- |
| `animationDuration` | `number`                                      | `200`    | Duration of selection animations in ms |
| `animationEasing`   | `'linear' \| 'ease' \| 'bounce' \| 'elastic'` | `'ease'` | Easing function for animations         |
| `enableAnimation`   | `boolean`                                     | `true`   | Whether to enable animations           |

### Accessibility

| Prop                 | Type     | Default | Description                |
| -------------------- | -------- | ------- | -------------------------- |
| `accessibilityLabel` | `string` | -       | Custom accessibility label |
| `accessibilityHint`  | `string` | -       | Custom accessibility hint  |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import RadioButton from './src/RadioButton';

const BasicExample = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View>
      <RadioButton
        value="option1"
        label="Option 1"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        value="option2"
        label="Option 2"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        value="option3"
        label="Option 3"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
    </View>
  );
};
```

### Individual Radio Buttons

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import RadioButton from './src/RadioButton';

const IndividualExample = () => {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);

  return (
    <View>
      <RadioButton
        value="option1"
        label="Individual Option 1"
        selected={option1}
        onValueChange={() => setOption1(!option1)}
      />
      <RadioButton
        value="option2"
        label="Individual Option 2"
        selected={option2}
        onValueChange={() => setOption2(!option2)}
      />
    </View>
  );
};
```

### Different Sizes

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import RadioButton from './src/RadioButton';

const SizeExample = () => {
  const [selectedValue, setSelectedValue] = useState('small');

  return (
    <View>
      <RadioButton
        value="small"
        label="Small Radio Button"
        size="small"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        value="medium"
        label="Medium Radio Button"
        size="medium"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        value="large"
        label="Large Radio Button"
        size="large"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
    </View>
  );
};
```

### Custom Colors

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import RadioButton from './src/RadioButton';

const CustomColorsExample = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View>
      <RadioButton
        value="option1"
        label="Custom Blue Theme"
        selectedColor="#007bff"
        unselectedColor="#e9ecef"
        selectedTextColor="#007bff"
        textColor="#212529"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        value="option2"
        label="Custom Green Theme"
        selectedColor="#28a745"
        unselectedColor="#e9ecef"
        selectedTextColor="#28a745"
        textColor="#212529"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
    </View>
  );
};
```

### Disabled State

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import RadioButton from './src/RadioButton';

const DisabledExample = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View>
      <RadioButton
        value="option1"
        label="Enabled Option"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        value="option2"
        label="Disabled Option"
        disabled={true}
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
    </View>
  );
};
```

### Full Width Layout

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import RadioButton from './src/RadioButton';

const FullWidthExample = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View style={{ width: '100%' }}>
      <RadioButton
        value="option1"
        label="Full Width Option 1"
        fullWidth={true}
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
      <RadioButton
        value="option2"
        label="Full Width Option 2"
        fullWidth={true}
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
    </View>
  );
};
```

### Animation Examples

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import RadioButton from './src/RadioButton';

const AnimationExample = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View>
      {/* Default animation */}
      <RadioButton
        value="option1"
        label="Default Animation"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />

      {/* Custom duration */}
      <RadioButton
        value="option2"
        label="Slow Animation (500ms)"
        animationDuration={500}
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />

      {/* Bounce effect */}
      <RadioButton
        value="option3"
        label="Bounce Animation"
        animationEasing="bounce"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />

      {/* Elastic effect */}
      <RadioButton
        value="option4"
        label="Elastic Animation"
        animationEasing="elastic"
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />

      {/* No animation */}
      <RadioButton
        value="option5"
        label="No Animation"
        enableAnimation={false}
        groupValue={selectedValue}
        onValueChange={setSelectedValue}
      />
    </View>
  );
};
```

## Size Specifications

| Size     | Radio Size | Padding                        | Font Size | Icon Size |
| -------- | ---------- | ------------------------------ | --------- | --------- |
| `small`  | 16px       | 12px horizontal, 8px vertical  | 14px      | 8px       |
| `medium` | 20px       | 16px horizontal, 12px vertical | 16px      | 10px      |
| `large`  | 24px       | 20px horizontal, 16px vertical | 18px      | 12px      |

## Accessibility

The RadioButton component includes comprehensive accessibility support:

- **Accessibility Role**: Automatically set to "radio"
- **Accessibility State**: Includes `checked` and `disabled` states
- **Accessibility Label**: Auto-generated or customizable
- **Accessibility Hint**: Provides context for screen readers
- **Touch Target**: Minimum 44px touch target for better usability

## Dependencies

- React Native
- ButtonBase component (from `../ButtonBase`)

## Notes

- The component uses ButtonBase's "ghost" variant for a clean, minimal appearance
- Radio buttons in a group should share the same `groupValue` and `onValueChange` props
- The component automatically handles the visual state based on selection and disabled status
- All styling is customizable through props and style objects

## Animation Features

The RadioButton component includes smooth animations for better user experience:

### Selection Animations

- **Inner Circle**: Smooth opacity and scale transitions when selecting/deselecting
- **Border Color**: Animated color transitions between selected and unselected states
- **Background Color**: Smooth background color changes

### Press Feedback

- **Scale Animation**: Subtle scale down/up effect when pressing the radio button
- **Duration**: 100ms for press feedback (configurable for selection animations)

### Animation Options

- **Duration**: Configurable from 0ms to any duration (default: 200ms)
- **Easing**: Multiple easing functions available (linear, ease, bounce, elastic)
- **Enable/Disable**: Can be completely disabled for performance or preference

### Performance

- Uses React Native's native driver where possible for optimal performance
- Smooth 60fps animations on both iOS and Android
- Minimal impact on app performance
