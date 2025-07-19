# ScrollTabView Component

Một component React Native tạo ra các tab có thể scroll ngang với animation mượt mà và tùy chỉnh cao.

## Tính năng

- ✅ Scroll ngang mượt mà
- ✅ Animation indicator
- ✅ Tùy chỉnh styling hoàn toàn
- ✅ TypeScript support
- ✅ Callback khi tab được chọn
- ✅ Auto scroll đến tab được chọn
- ✅ Hỗ trợ custom render tab
- ✅ Responsive design

## Cài đặt

```bash
npm install @your-package/scroll-tab-view
# hoặc
yarn add @your-package/scroll-tab-view
```

## Sử dụng cơ bản

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ScrollTabView, { TabItem } from '@your-package/scroll-tab-view';

const MyComponent = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs: TabItem[] = [
    { key: 'tab1', title: 'Tab 1' },
    { key: 'tab2', title: 'Tab 2' },
    { key: 'tab3', title: 'Tab 3' },
  ];

  const handleTabPress = (tabKey: string, index: number) => {
    setActiveTab(tabKey);
    console.log(`Tab pressed: ${tabKey} at index ${index}`);
  };

  return (
    <ScrollTabView
      tabs={tabs}
      activeTabKey={activeTab}
      onTabPress={handleTabPress}
    />
  );
};
```

## Props

### ScrollTabViewProps

| Prop                             | Type                                                                  | Default      | Mô tả                           |
| -------------------------------- | --------------------------------------------------------------------- | ------------ | ------------------------------- |
| `tabs`                           | `TabItem[]`                                                           | **required** | Danh sách các tab               |
| `activeTabKey`                   | `string`                                                              | -            | Key của tab đang active         |
| `onTabPress`                     | `(tabKey: string, index: number) => void`                             | -            | Callback khi tab được nhấn      |
| `containerStyle`                 | `ViewStyle`                                                           | -            | Style cho container chính       |
| `tabContainerStyle`              | `ViewStyle`                                                           | -            | Style cho container của các tab |
| `tabStyle`                       | `ViewStyle`                                                           | -            | Style cho từng tab              |
| `activeTabStyle`                 | `ViewStyle`                                                           | -            | Style cho tab đang active       |
| `tabTextStyle`                   | `TextStyle`                                                           | -            | Style cho text của tab          |
| `activeTabTextStyle`             | `TextStyle`                                                           | -            | Style cho text của tab active   |
| `indicatorStyle`                 | `ViewStyle`                                                           | -            | Style cho indicator             |
| `scrollEnabled`                  | `boolean`                                                             | `true`       | Cho phép scroll                 |
| `showsHorizontalScrollIndicator` | `boolean`                                                             | `false`      | Hiển thị scroll indicator       |
| `tabWidth`                       | `number`                                                              | -            | Chiều rộng cố định cho mỗi tab  |
| `tabSpacing`                     | `number`                                                              | `16`         | Khoảng cách giữa các tab        |
| `indicatorWidth`                 | `number`                                                              | -            | Chiều rộng của indicator        |
| `indicatorColor`                 | `string`                                                              | `'#007AFF'`  | Màu của indicator               |
| `indicatorHeight`                | `number`                                                              | `3`          | Chiều cao của indicator         |
| `tabPaddingHorizontal`           | `number`                                                              | `16`         | Padding ngang của tab           |
| `tabPaddingVertical`             | `number`                                                              | `12`         | Padding dọc của tab             |
| `renderTab`                      | `(tab: TabItem, isActive: boolean, index: number) => React.ReactNode` | -            | Custom render function cho tab  |

### TabItem

```tsx
interface TabItem {
  key: string; // Unique key cho tab
  title: string; // Text hiển thị trên tab
  content?: React.ReactNode; // Optional content (có thể sử dụng cho custom render)
}
```

## Ví dụ nâng cao

### Custom styling

```tsx
<ScrollTabView
  tabs={tabs}
  activeTabKey={activeTab}
  onTabPress={handleTabPress}
  containerStyle={{
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }}
  tabStyle={{
    borderRadius: 8,
  }}
  activeTabStyle={{
    backgroundColor: '#FF6B6B20',
  }}
  tabTextStyle={{
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  }}
  activeTabTextStyle={{
    color: '#FF6B6B',
    fontWeight: '600',
  }}
  indicatorColor="#FF6B6B"
  indicatorHeight={4}
  tabSpacing={20}
/>
```

### Custom render tab

```tsx
<ScrollTabView
  tabs={tabs}
  activeTabKey={activeTab}
  onTabPress={handleTabPress}
  renderTab={(tab, isActive, index) => (
    <TouchableOpacity
      style={[styles.customTab, isActive && styles.customActiveTab]}
      onPress={() => handleTabPress(tab.key, index)}
    >
      <Icon name={tab.icon} size={20} color={isActive ? '#FF6B6B' : '#666'} />
      <Text
        style={[styles.customTabText, isActive && styles.customActiveTabText]}
      >
        {tab.title}
      </Text>
    </TouchableOpacity>
  )}
/>
```

### Fixed width tabs

```tsx
<ScrollTabView
  tabs={tabs}
  activeTabKey={activeTab}
  onTabPress={handleTabPress}
  tabWidth={120}
  tabSpacing={10}
  indicatorWidth={80}
/>
```

## Styling mặc định

Component có styling mặc định đẹp mắt:

- Tab text: 16px, font-weight 500, màu #666
- Active tab text: màu #007AFF, font-weight 600
- Indicator: màu #007AFF, chiều cao 3px
- Tab spacing: 16px
- Tab padding: 16px horizontal, 12px vertical

## Lưu ý

- Component sử dụng `Animated` API của React Native cho animation mượt mà
- Indicator sẽ tự động animate khi chuyển tab
- ScrollView sẽ tự động scroll đến tab được chọn
- Hỗ trợ TypeScript đầy đủ với type definitions

## License

MIT
