# Collapse Component

A highly customizable and accessible collapsible component for React Native applications. This component provides smooth animations, multiple variants, and extensive styling options.

## Features

- ✨ Smooth expand/collapse animations
- 🎨 Multiple visual variants (default, bordered, elevated, flat)
- 📱 Responsive sizing options (small, medium, large)
- ♿ Full accessibility support
- 🎯 Customizable icons and headers
- 🌈 Extensive styling options
- 📐 Flexible layout controls
- 🔧 TypeScript support

## Installation

```bash
# If using npm
npm install @tradewize/collapse

# If using yarn
yarn add @tradewize/collapse
```

## Basic Usage

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Collapse } from '@tradewize/collapse';

const MyComponent = () => {
  return (
    <Collapse title="Click to expand">
      <Text>This is the collapsible content!</Text>
    </Collapse>
  );
};
```

## Examples

### Basic Collapse

```tsx
<Collapse title="Basic Example">
  <Text>This is the content that will be shown/hidden.</Text>
</Collapse>
```

### Pre-expanded Collapse

```tsx
<Collapse title="Pre-expanded" defaultExpanded={true}>
  <Text>This content is visible by default.</Text>
</Collapse>
```

### Different Variants

```tsx
{
  /* Default variant */
}
<Collapse title="Default" variant="default">
  <Text>Default styling</Text>
</Collapse>;

{
  /* Bordered variant */
}
<Collapse title="Bordered" variant="bordered">
  <Text>With border</Text>
</Collapse>;

{
  /* Elevated variant */
}
<Collapse title="Elevated" variant="elevated" shadow={true}>
  <Text>With shadow effect</Text>
</Collapse>;

{
  /* Flat variant */
}
<Collapse title="Flat" variant="flat">
  <Text>Flat background</Text>
</Collapse>;
```

### Different Sizes

```tsx
<Collapse title="Small" size="small">
  <Text>Small size</Text>
</Collapse>

<Collapse title="Medium" size="medium">
  <Text>Medium size (default)</Text>
</Collapse>

<Collapse title="Large" size="large">
  <Text>Large size</Text>
</Collapse>
```

### Custom Styling

```tsx
<Collapse
  title="Custom Styled"
  backgroundColor="#f0f8ff"
  titleColor="#2c3e50"
  borderRadius={12}
  borderColor="#3498db"
  borderWidth={2}
>
  <Text>Custom styled content</Text>
</Collapse>
```

### With Custom Icons

```tsx
import { Ionicons } from '@expo/vector-icons';

<Collapse
  title="With Icons"
  leftIcon={<Ionicons name="information-circle" size={20} color="#007AFF" />}
  rightIcon={<Ionicons name="chevron-down" size={20} color="#007AFF" />}
  iconPosition="left"
>
  <Text>Content with custom icons</Text>
</Collapse>;
```

### Custom Header

```tsx
<Collapse
  customHeader={
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="star" size={20} color="#FFD700" />
      <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>Custom Header</Text>
    </View>
  }
>
  <Text>Content with custom header</Text>
</Collapse>
```

### With Callback

```tsx
<Collapse
  title="With Callback"
  onToggle={(expanded) => {
    console.log('Collapse state:', expanded ? 'expanded' : 'collapsed');
  }}
>
  <Text>Content with toggle callback</Text>
</Collapse>
```

### Disabled State

```tsx
<Collapse
  title="Disabled"
  disabled={true}
  disabledBackgroundColor="#f5f5f5"
  disabledTitleColor="#999"
>
  <Text>This content cannot be accessed</Text>
</Collapse>
```

## Props

### Basic Props

| Prop              | Type              | Default | Description                                 |
| ----------------- | ----------------- | ------- | ------------------------------------------- |
| `title`           | `string`          | -       | The title text to display in the header     |
| `children`        | `React.ReactNode` | -       | The content to show/hide                    |
| `defaultExpanded` | `boolean`         | `false` | Whether the collapse is expanded by default |
| `disabled`        | `boolean`         | `false` | Whether the collapse is disabled            |

### Styling Props

| Prop              | Type                                              | Default     | Description                                  |
| ----------------- | ------------------------------------------------- | ----------- | -------------------------------------------- |
| `variant`         | `'default' \| 'bordered' \| 'elevated' \| 'flat'` | `'default'` | Visual variant of the collapse               |
| `size`            | `'small' \| 'medium' \| 'large'`                  | -           | Size variant affecting padding and font size |
| `backgroundColor` | `string`                                          | -           | Custom background color                      |
| `titleColor`      | `string`                                          | `'#333333'` | Color of the title text                      |
| `borderColor`     | `string`                                          | -           | Color of the border                          |
| `borderRadius`    | `number`                                          | -           | Border radius of the component               |
| `borderWidth`     | `number`                                          | `0`         | Width of the border                          |
| `borderStyle`     | `'solid' \| 'dotted' \| 'dashed'`                 | `'solid'`   | Style of the border                          |

### Layout Props

| Prop        | Type                                                            | Default  | Description                                  |
| ----------- | --------------------------------------------------------------- | -------- | -------------------------------------------- |
| `fullWidth` | `boolean`                                                       | `false`  | Whether the component should take full width |
| `alignSelf` | `'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'stretch'` | `'auto'` | Alignment of the component                   |

### Animation Props

| Prop                | Type      | Default | Description                               |
| ------------------- | --------- | ------- | ----------------------------------------- |
| `animated`          | `boolean` | `true`  | Whether to animate the expand/collapse    |
| `animationDuration` | `number`  | `300`   | Duration of the animation in milliseconds |

### Icon Props

| Prop                 | Type                | Default   | Description                          |
| -------------------- | ------------------- | --------- | ------------------------------------ |
| `leftIcon`           | `React.ReactNode`   | -         | Icon to display on the left side     |
| `rightIcon`          | `React.ReactNode`   | -         | Icon to display on the right side    |
| `customExpandIcon`   | `React.ReactNode`   | -         | Custom icon for expanded state       |
| `customCollapseIcon` | `React.ReactNode`   | -         | Custom icon for collapsed state      |
| `iconPosition`       | `'left' \| 'right'` | `'right'` | Position of the expand/collapse icon |
| `iconSpacing`        | `number`            | `8`       | Spacing between icons and text       |

### Shadow Props

| Prop            | Type                                | Default                   | Description            |
| --------------- | ----------------------------------- | ------------------------- | ---------------------- |
| `shadow`        | `boolean`                           | `false`                   | Whether to show shadow |
| `shadowColor`   | `string`                            | `'#000'`                  | Color of the shadow    |
| `shadowOffset`  | `{ width: number, height: number }` | `{ width: 0, height: 2 }` | Offset of the shadow   |
| `shadowOpacity` | `number`                            | `0.25`                    | Opacity of the shadow  |
| `shadowRadius`  | `number`                            | `3.84`                    | Radius of the shadow   |

### Content Props

| Prop           | Type              | Default     | Description                                          |
| -------------- | ----------------- | ----------- | ---------------------------------------------------- |
| `showDivider`  | `boolean`         | `false`     | Whether to show a divider between header and content |
| `dividerColor` | `string`          | `'#e0e0e0'` | Color of the divider                                 |
| `dividerWidth` | `number`          | `1`         | Width of the divider                                 |
| `customHeader` | `React.ReactNode` | -           | Custom header component                              |

### Accessibility Props

| Prop                 | Type                 | Default    | Description                            |
| -------------------- | -------------------- | ---------- | -------------------------------------- |
| `accessibilityLabel` | `string`             | -          | Accessibility label for screen readers |
| `accessibilityHint`  | `string`             | -          | Accessibility hint for screen readers  |
| `accessibilityRole`  | `'button' \| 'none'` | `'button'` | Accessibility role                     |

### Style Props

| Prop             | Type        | Default | Description                            |
| ---------------- | ----------- | ------- | -------------------------------------- |
| `style`          | `ViewStyle` | -       | Custom style for the main container    |
| `titleStyle`     | `TextStyle` | -       | Custom style for the title text        |
| `contentStyle`   | `ViewStyle` | -       | Custom style for the content container |
| `containerStyle` | `ViewStyle` | -       | Custom style for the outer container   |

### Disabled State Props

| Prop                      | Type     | Default | Description                    |
| ------------------------- | -------- | ------- | ------------------------------ |
| `disabledBackgroundColor` | `string` | -       | Background color when disabled |
| `disabledTitleColor`      | `string` | -       | Title color when disabled      |
| `disabledBorderColor`     | `string` | -       | Border color when disabled     |

### Event Props

| Prop       | Type                          | Default | Description                          |
| ---------- | ----------------------------- | ------- | ------------------------------------ |
| `onToggle` | `(expanded: boolean) => void` | -       | Callback when collapse state changes |

## Variants

### Default

Clean, minimal styling with white background.

### Bordered

Adds a subtle border around the component.

### Elevated

Adds shadow and rounded corners for a card-like appearance.

### Flat

Uses a light gray background for a flat design aesthetic.

## Sizes

### Small

- Padding: 8px vertical, 12px horizontal
- Font size: 14px
- Min height: 40px

### Medium (Default)

- Padding: 12px vertical, 16px horizontal
- Font size: 16px
- Min height: 48px

### Large

- Padding: 16px vertical, 20px horizontal
- Font size: 18px
- Min height: 56px

## Best Practices

### 1. Use Semantic Titles

```tsx
// Good
<Collapse title="User Profile Information">
  <Text>Name, email, phone...</Text>
</Collapse>

// Avoid
<Collapse title="Click here">
  <Text>Content...</Text>
</Collapse>
```

### 2. Provide Accessibility Labels

```tsx
<Collapse
  title="Settings"
  accessibilityLabel="Application settings section"
  accessibilityHint="Double tap to expand or collapse settings"
>
  <Text>Settings content...</Text>
</Collapse>
```

### 3. Use Appropriate Variants

```tsx
// For form sections
<Collapse variant="bordered" title="Personal Information">
  <Text>Form fields...</Text>
</Collapse>

// For cards
<Collapse variant="elevated" shadow={true} title="Card Title">
  <Text>Card content...</Text>
</Collapse>
```

### 4. Handle State Changes

```tsx
const [expandedSections, setExpandedSections] = useState(new Set());

<Collapse
  title="Section 1"
  defaultExpanded={expandedSections.has('section1')}
  onToggle={(expanded) => {
    const newSections = new Set(expandedSections);
    if (expanded) {
      newSections.add('section1');
    } else {
      newSections.delete('section1');
    }
    setExpandedSections(newSections);
  }}
>
  <Text>Content...</Text>
</Collapse>;
```

### 5. Optimize Performance

```tsx
// For large content, consider lazy loading
<Collapse title="Large Content">{expanded && <HeavyComponent />}</Collapse>
```

## Accessibility

The component includes comprehensive accessibility features:

- **Screen Reader Support**: Proper accessibility labels and hints
- **Keyboard Navigation**: Full keyboard support through ButtonBase
- **State Announcements**: Announces expanded/collapsed state
- **Focus Management**: Proper focus handling

## Browser Support

- React Native 0.60+
- iOS 11+
- Android API 21+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [documentation](https://docs.tradewize.com)
2. Search [existing issues](https://github.com/tradewize/collapse/issues)
3. Create a [new issue](https://github.com/tradewize/collapse/issues/new)

---

Made with ❤️ by the TradeWize team
