# TabView Component

A flexible and customizable TabView component built with React Native, using ButtonBase for tab buttons and ScrollView for content management.

## Features

- ✅ **Flexible Layout**: Support for top or bottom tab bar positioning
- ✅ **Scrollable Tabs**: Horizontal scrolling for many tabs
- ✅ **Animated Indicator**: Smooth animated indicator that follows active tab
- ✅ **Customizable Styling**: Full control over colors, sizes, and variants
- ✅ **Badge Support**: Display badges on tabs
- ✅ **Icon Support**: Add icons to tabs
- ✅ **Disabled Tabs**: Support for disabled tab states
- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **TypeScript Support**: Full TypeScript definitions

## Installation

The TabView component depends on the ButtonBase component. Make sure you have it available in your project.

## Basic Usage

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import TabView, { TabItem } from './src/TabView';

const MyComponent = () => {
  const tabs: TabItem[] = [
    {
      key: 'tab1',
      title: 'Tab 1',
      content: <Text>Content for Tab 1</Text>,
    },
    {
      key: 'tab2',
      title: 'Tab 2',
      content: <Text>Content for Tab 2</Text>,
    },
    {
      key: 'tab3',
      title: 'Tab 3',
      content: <Text>Content for Tab 3</Text>,
    },
  ];

  return (
    <TabView
      tabs={tabs}
      onTabChange={(index, tab) => console.log(`Switched to ${tab.title}`)}
    />
  );
};
```

## Props

### Basic Props

| Prop              | Type                                    | Default      | Description                       |
| ----------------- | --------------------------------------- | ------------ | --------------------------------- |
| `tabs`            | `TabItem[]`                             | **Required** | Array of tab items                |
| `initialTabIndex` | `number`                                | `0`          | Index of the initially active tab |
| `onTabChange`     | `(index: number, tab: TabItem) => void` | -            | Callback when tab changes         |

### Layout Props

| Prop             | Type                | Default | Description                          |
| ---------------- | ------------------- | ------- | ------------------------------------ |
| `tabBarPosition` | `'top' \| 'bottom'` | `'top'` | Position of the tab bar              |
| `scrollable`     | `boolean`           | `false` | Enable horizontal scrolling for tabs |
| `fullWidth`      | `boolean`           | `false` | Make tabs take full width            |

### Styling Props

| Prop             | Type        | Default | Description                        |
| ---------------- | ----------- | ------- | ---------------------------------- |
| `tabBarStyle`    | `ViewStyle` | -       | Custom styles for tab bar          |
| `tabStyle`       | `ViewStyle` | -       | Custom styles for individual tabs  |
| `contentStyle`   | `ViewStyle` | -       | Custom styles for content area     |
| `indicatorStyle` | `ViewStyle` | -       | Custom styles for active indicator |

### Tab Button Props

| Prop               | Type            | Default     | Description               |
| ------------------ | --------------- | ----------- | ------------------------- |
| `tabVariant`       | `ButtonVariant` | `'ghost'`   | Variant for inactive tabs |
| `tabSize`          | `ButtonSize`    | `'medium'`  | Size for tab buttons      |
| `tabShape`         | `ButtonShape`   | `'rounded'` | Shape for tab buttons     |
| `activeTabVariant` | `ButtonVariant` | `'primary'` | Variant for active tab    |

### Color Props

| Prop                         | Type     | Default     | Description                        |
| ---------------------------- | -------- | ----------- | ---------------------------------- |
| `activeTabBackgroundColor`   | `string` | -           | Background color for active tab    |
| `activeTabTextColor`         | `string` | -           | Text color for active tab          |
| `inactiveTabBackgroundColor` | `string` | -           | Background color for inactive tabs |
| `inactiveTabTextColor`       | `string` | -           | Text color for inactive tabs       |
| `indicatorColor`             | `string` | `'#007bff'` | Color of the active indicator      |

### Animation Props

| Prop                | Type      | Default | Description                  |
| ------------------- | --------- | ------- | ---------------------------- |
| `animated`          | `boolean` | `true`  | Enable/disable animations    |
| `animationDuration` | `number`  | `300`   | Duration of animations in ms |

### Other Props

| Prop                    | Type              | Default | Description                         |
| ----------------------- | ----------------- | ------- | ----------------------------------- |
| `scrollViewProps`       | `ScrollViewProps` | -       | Props passed to ScrollView          |
| `containerStyle`        | `ViewStyle`       | -       | Custom styles for main container    |
| `tabBarContainerStyle`  | `ViewStyle`       | -       | Custom styles for tab bar container |
| `contentContainerStyle` | `ViewStyle`       | -       | Custom styles for content container |

## TabItem Interface

```tsx
interface TabItem {
  key: string; // Unique identifier for the tab
  title: string; // Tab title
  content: React.ReactNode; // Tab content
  disabled?: boolean; // Whether the tab is disabled
  badge?: string | number; // Badge to display on the tab
  icon?: React.ReactNode; // Icon to display on the tab
}
```

## Advanced Examples

### Scrollable Tabs with Icons

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabView, { TabItem } from './src/TabView';

const MyComponent = () => {
  const tabs: TabItem[] = [
    {
      key: 'home',
      title: 'Home',
      icon: <Icon name="home" size={20} color="#333" />,
      content: <Text>Home Content</Text>,
    },
    {
      key: 'profile',
      title: 'Profile',
      icon: <Icon name="person" size={20} color="#333" />,
      content: <Text>Profile Content</Text>,
    },
    {
      key: 'settings',
      title: 'Settings',
      icon: <Icon name="settings" size={20} color="#333" />,
      content: <Text>Settings Content</Text>,
    },
  ];

  return (
    <TabView
      tabs={tabs}
      scrollable={true}
      tabVariant="ghost"
      activeTabVariant="primary"
      indicatorColor="#007bff"
    />
  );
};
```

### Tabs with Badges

```tsx
const tabsWithBadges: TabItem[] = [
  {
    key: 'inbox',
    title: 'Inbox',
    badge: 5,
    content: <Text>Inbox Content</Text>,
  },
  {
    key: 'sent',
    title: 'Sent',
    badge: 12,
    content: <Text>Sent Content</Text>,
  },
  {
    key: 'drafts',
    title: 'Drafts',
    content: <Text>Drafts Content</Text>,
  },
];
```

### Custom Styled Tabs

```tsx
<TabView
  tabs={tabs}
  tabBarStyle={{
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 2,
    borderBottomColor: '#dee2e6',
  }}
  tabStyle={{
    marginHorizontal: 4,
  }}
  activeTabBackgroundColor="#007bff"
  activeTabTextColor="#ffffff"
  inactiveTabBackgroundColor="transparent"
  inactiveTabTextColor="#6c757d"
  indicatorColor="#007bff"
/>
```

### Bottom Tab Bar

```tsx
<TabView
  tabs={tabs}
  tabBarPosition="bottom"
  tabBarStyle={{
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  }}
/>
```

### Disabled Tabs

```tsx
const tabsWithDisabled: TabItem[] = [
  {
    key: 'active',
    title: 'Active',
    content: <Text>Active Content</Text>,
  },
  {
    key: 'disabled',
    title: 'Disabled',
    content: <Text>Disabled Content</Text>,
    disabled: true,
  },
];
```

## Styling

The TabView component uses a flexible styling system that allows you to customize:

- **Tab Bar**: Background, borders, padding
- **Individual Tabs**: Colors, sizes, shapes, variants
- **Active Indicator**: Color, height, animation
- **Content Area**: Background, padding, margins

### Default Styles

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabBar: {
    flexDirection: 'row',
    position: 'relative',
  },
  scrollableTabBar: {
    flexGrow: 1,
  },
  tabContainer: {
    flex: 1,
  },
  tabContainerFullWidth: {
    flex: 0,
  },
  tabButton: {
    borderRadius: 0,
  },
  activeTabButton: {
    // Additional styles for active tab
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    borderRadius: 1,
  },
  content: {
    flex: 1,
  },
  badgeContainer: {
    marginLeft: 4,
  },
  badge: {
    minWidth: 20,
    height: 20,
  },
});
```

## Performance Considerations

- The component uses `useCallback` for event handlers to prevent unnecessary re-renders
- Tab layouts are cached to avoid recalculating positions
- Animations use `useNativeDriver: false` for layout animations
- The indicator animation is optimized for smooth transitions

## Accessibility

The TabView component includes proper accessibility support:

- Tab buttons have appropriate accessibility roles
- Active tab state is properly communicated
- Disabled tabs are marked as such
- Tab titles are used as accessibility labels

## Dependencies

- React Native core components
- ButtonBase component (from your project)
- React hooks (useState, useRef, useEffect, useCallback)

## Browser Support

This component is designed for React Native and works on both iOS and Android platforms.
