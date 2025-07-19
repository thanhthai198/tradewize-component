import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

export interface TabItem {
  key: string;
  title: string;
  content?: React.ReactNode;
}

export interface ScrollTabViewProps {
  tabs: TabItem[];
  activeTabKey?: string;
  onTabPress?: (tabKey: string, index: number) => void;
  containerStyle?: ViewStyle;
  tabContainerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  tabTextStyle?: TextStyle;
  activeTabTextStyle?: TextStyle;
  contentContainerStyle?: ViewStyle;
  scrollEnabled?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  tabWidth?: number;
  tabSpacing?: number;
  tabPaddingHorizontal?: number;
  tabPaddingVertical?: number;
  activeTabBackgroundColor?: string;
  activeTabTextColor?: string;
  inactiveTabTextColor?: string;
  tabMinHeight?: number;
  tabBorderRadius?: number;
  tabActiveOpacity?: number;
  scrollBounces?: boolean;
  defaultTabFontSize?: number;
  defaultTabFontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  defaultContentFontSize?: number;
  defaultContentTextColor?: string;
  renderTab?: (
    tab: TabItem,
    isActive: boolean,
    index: number
  ) => React.ReactNode;
  renderContent?: (
    tab: TabItem,
    isActive: boolean,
    index: number
  ) => React.ReactNode;
  showContent?: boolean;
}

export const ScrollTabView: React.FC<ScrollTabViewProps> = ({
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
  showContent = true,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    if (activeTabKey) {
      const index = tabs.findIndex((tab) => tab.key === activeTabKey);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  const handleTabPress = useCallback(
    (tabKey: string, index: number) => {
      setActiveIndex(index);
      onTabPress?.(tabKey, index);

      // Simple scroll to tab
      if (scrollViewRef.current && tabWidth) {
        const scrollToX = index * (tabWidth + tabSpacing);
        scrollViewRef.current.scrollTo({
          x: scrollToX,
          animated: true,
        });
      }
    },
    [onTabPress, tabWidth, tabSpacing]
  );

  const defaultRenderTab = (tab: TabItem, isActive: boolean, index: number) => (
    <TouchableOpacity
      style={[
        styles.tab,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingHorizontal: tabPaddingHorizontal,
          paddingVertical: tabPaddingVertical,
          marginRight: index < tabs.length - 1 ? tabSpacing : 0,
          width: tabWidth,
          minHeight: tabMinHeight,
          borderRadius: tabBorderRadius,
          backgroundColor: isActive ? activeTabBackgroundColor : 'transparent',
        },
        tabStyle,
        isActive && activeTabStyle,
      ]}
      onPress={() => handleTabPress(tab.key, index)}
      activeOpacity={tabActiveOpacity}
    >
      <Text
        style={[
          styles.tabText,
          {
            fontSize: defaultTabFontSize,
            fontWeight: defaultTabFontWeight,
            color: isActive ? activeTabTextColor : inactiveTabTextColor,
          },
          tabTextStyle,
          isActive && activeTabTextStyle,
        ]}
        numberOfLines={1}
      >
        {tab.title}
      </Text>
    </TouchableOpacity>
  );

  const defaultRenderContent = (tab: TabItem, isActive: boolean) => {
    if (!isActive) return null;
    return (
      <View style={styles.defaultContent}>
        <Text
          style={[
            styles.defaultContentText,
            {
              fontSize: defaultContentFontSize,
              color: defaultContentTextColor,
            },
          ]}
        >
          {tab.content || `Content for ${tab.title}`}
        </Text>
      </View>
    );
  };

  const activeTab = tabs[activeIndex];

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Tab Navigation */}
      <View style={styles.tabNavigationContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={[styles.tabContainer, tabContainerStyle]}
          bounces={scrollBounces}
        >
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <View key={tab.key}>
                {renderTab
                  ? renderTab(tab, isActive, index)
                  : defaultRenderTab(tab, isActive, index)}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Content Area */}
      {showContent && activeTab && (
        <View style={[styles.contentContainer, contentContainerStyle]}>
          {renderContent
            ? renderContent(activeTab, true, activeIndex)
            : defaultRenderContent(activeTab, true)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  tabNavigationContainer: {
    position: 'relative',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
  },
  defaultContent: {
    flex: 1,
  },
  defaultContentText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default ScrollTabView;
