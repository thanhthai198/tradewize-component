import React, { useRef, useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
export const ScrollTabView = ({
  tabs,
  activeTabKey,
  onTabPress,
  containerStyle,
  tabContainerStyle,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  contentContainerStyle,
  scrollEnabled = true,
  showsHorizontalScrollIndicator = false,
  tabWidth,
  tabSpacing = 16,
  tabPaddingHorizontal = 16,
  tabPaddingVertical = 12,
  activeTabBackgroundColor = '#007AFF',
  activeTabTextColor = '#FFFFFF',
  inactiveTabTextColor = '#666',
  tabMinHeight = 44,
  tabBorderRadius = 0,
  tabActiveOpacity = 0.7,
  scrollBounces = false,
  defaultTabFontSize = 16,
  defaultTabFontWeight = '500',
  defaultContentFontSize = 18,
  defaultContentTextColor = '#333',
  renderTab,
  renderContent,
  showContent = true
}) => {
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    if (activeTabKey) {
      const index = tabs.findIndex(tab => tab.key === activeTabKey);
      return index >= 0 ? index : 0;
    }
    return 0;
  });
  const handleTabPress = useCallback((tabKey, index) => {
    setActiveIndex(index);
    onTabPress === null || onTabPress === void 0 || onTabPress(tabKey, index);

    // Simple scroll to tab
    if (scrollViewRef.current && tabWidth) {
      const scrollToX = index * (tabWidth + tabSpacing);
      scrollViewRef.current.scrollTo({
        x: scrollToX,
        animated: true
      });
    }
  }, [onTabPress, tabWidth, tabSpacing]);
  const defaultRenderTab = (tab, isActive, index) => /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.tab,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      paddingHorizontal: tabPaddingHorizontal,
      paddingVertical: tabPaddingVertical,
      marginRight: index < tabs.length - 1 ? tabSpacing : 0,
      width: tabWidth,
      minHeight: tabMinHeight,
      borderRadius: tabBorderRadius,
      backgroundColor: isActive ? activeTabBackgroundColor : 'transparent'
    }, tabStyle, isActive && activeTabStyle],
    onPress: () => handleTabPress(tab.key, index),
    activeOpacity: tabActiveOpacity
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.tabText, {
      fontSize: defaultTabFontSize,
      fontWeight: defaultTabFontWeight,
      color: isActive ? activeTabTextColor : inactiveTabTextColor
    }, tabTextStyle, isActive && activeTabTextStyle],
    numberOfLines: 1
  }, tab.title));
  const defaultRenderContent = (tab, isActive) => {
    if (!isActive) return null;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.defaultContent
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.defaultContentText, {
        fontSize: defaultContentFontSize,
        color: defaultContentTextColor
      }]
    }, tab.content || `Content for ${tab.title}`));
  };
  const activeTab = tabs[activeIndex];
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, containerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.tabNavigationContainer
  }, /*#__PURE__*/React.createElement(ScrollView, {
    ref: scrollViewRef,
    horizontal: true,
    showsHorizontalScrollIndicator: showsHorizontalScrollIndicator,
    scrollEnabled: scrollEnabled,
    contentContainerStyle: [styles.tabContainer, tabContainerStyle],
    bounces: scrollBounces
  }, tabs.map((tab, index) => {
    const isActive = index === activeIndex;
    return /*#__PURE__*/React.createElement(View, {
      key: tab.key
    }, renderTab ? renderTab(tab, isActive, index) : defaultRenderTab(tab, isActive, index));
  }))), showContent && activeTab && /*#__PURE__*/React.createElement(View, {
    style: [styles.contentContainer, contentContainerStyle]
  }, renderContent ? renderContent(activeTab, true, activeIndex) : defaultRenderContent(activeTab, true)));
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1
  },
  tabNavigationContainer: {
    position: 'relative'
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center'
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 2
  },
  contentContainer: {
    flex: 1
  },
  defaultContent: {
    flex: 1
  },
  defaultContentText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center'
  }
});
export default ScrollTabView;
//# sourceMappingURL=index.js.map