import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import type { ScrollViewProps, ViewStyle } from 'react-native';
import ButtonBase from '../ButtonBase';

export interface TabItem {
  key: string;
  title: string;
  content?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabViewProps {
  // Basic props
  tabs: TabItem[];
  initialTabIndex?: number;
  onTabChange?: (index: number, tab: TabItem) => void;

  // Layout props
  tabBarPosition?: 'top' | 'bottom';
  scrollable?: boolean;
  fullWidth?: boolean;
  equalWidth?: boolean; // New prop to explicitly control equal width distribution

  // Styling props
  tabBarStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  indicatorStyle?: ViewStyle;
  showIndicator?: boolean; // New prop to control indicator visibility

  // Tab button props
  tabVariant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'warning';
  tabSize?: 'small' | 'medium' | 'large' | 'xlarge';
  tabShape?: 'rounded' | 'pill' | 'square';
  activeTabVariant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'warning';

  // Colors
  activeTabBackgroundColor?: string;
  activeTabTextColor?: string;
  inactiveTabBackgroundColor?: string;
  inactiveTabTextColor?: string;
  indicatorColor?: string;

  // Animation props
  animated?: boolean;
  animationDuration?: number;

  // ScrollView props
  scrollViewProps?: ScrollViewProps;

  // Custom styles
  containerStyle?: ViewStyle;
  tabBarContainerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const TabView: React.FC<TabViewProps> = ({
  // Basic props
  tabs,
  initialTabIndex = 0,
  onTabChange,

  // Layout props
  tabBarPosition = 'top',
  scrollable = false,
  fullWidth = false,
  equalWidth = false,

  // Styling props
  tabBarStyle,
  tabStyle,
  contentStyle,
  indicatorStyle,
  showIndicator = false,

  // Tab button props
  tabVariant = 'ghost',
  tabSize = 'medium',
  tabShape = 'rounded',
  activeTabVariant = 'primary',

  // Colors
  activeTabBackgroundColor,
  activeTabTextColor,
  inactiveTabBackgroundColor,
  inactiveTabTextColor,
  indicatorColor = '#007bff',

  // Animation props
  animated = true,
  animationDuration = 300,

  // ScrollView props
  scrollViewProps,

  // Custom styles
  containerStyle,
  tabBarContainerStyle,
  contentContainerStyle,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);
  const [tabLayouts, setTabLayouts] = useState<{
    [key: string]: { x: number; width: number };
  }>({});
  const tabBarRef = useRef<ScrollView>(null);
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const tabWidthAnim = useRef(new Animated.Value(0)).current;

  // Validate initial tab index
  useEffect(() => {
    if (initialTabIndex >= 0 && initialTabIndex < tabs.length) {
      setActiveTabIndex(initialTabIndex);
    }
  }, [initialTabIndex, tabs.length]);

  // Animate indicator when active tab changes
  useEffect(() => {
    const activeTab = tabs[activeTabIndex];
    if (activeTab && tabLayouts[activeTab.key]) {
      const layout = tabLayouts[activeTab.key];
      if (layout) {
        const { x, width } = layout;

        if (animated) {
          Animated.parallel([
            Animated.timing(indicatorAnim, {
              toValue: x,
              duration: animationDuration,
              useNativeDriver: false,
            }),
            Animated.timing(tabWidthAnim, {
              toValue: width,
              duration: animationDuration,
              useNativeDriver: false,
            }),
          ]).start();
        } else {
          indicatorAnim.setValue(x);
          tabWidthAnim.setValue(width);
        }
      }
    }
  }, [
    activeTabIndex,
    tabLayouts,
    animated,
    animationDuration,
    indicatorAnim,
    tabWidthAnim,
    tabs,
  ]);

  const handleTabPress = useCallback(
    (index: number, tab: TabItem) => {
      if (tab.disabled) return;

      setActiveTabIndex(index);
      onTabChange?.(index, tab);

      // Scroll to tab if scrollable
      if (scrollable && tabBarRef.current) {
        const activeTab = tabs[index];
        if (activeTab && tabLayouts[activeTab.key]) {
          const layout = tabLayouts[activeTab.key];
          if (layout) {
            const { x, width } = layout;
            const screenWidth = Dimensions.get('window').width;
            const scrollToX = Math.max(0, x - screenWidth / 2 + width / 2);

            tabBarRef.current.scrollTo({
              x: scrollToX,
              animated: true,
            });
          }
        }
      }
    },
    [scrollable, tabLayouts, onTabChange, tabs]
  );

  const handleTabLayout = useCallback((tabKey: string, event: any) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => ({
      ...prev,
      [tabKey]: { x, width },
    }));
  }, []);

  const renderTabBar = () => {
    const tabBarContent = (
      <View style={[styles.tabBar, tabBarStyle]}>
        {tabs.map((tab, index) => {
          const isActive = index === activeTabIndex;
          const isDisabled = tab.disabled;

          return (
            <View
              key={tab.key}
              style={[
                styles.tabContainer,
                (fullWidth || equalWidth) && styles.tabContainerEqualWidth,
                tabStyle,
              ]}
              onLayout={(event) => handleTabLayout(tab.key, event)}
            >
              <ButtonBase
                title={tab.title}
                variant={isActive ? activeTabVariant : tabVariant}
                size={tabSize}
                shape={tabShape}
                backgroundColor={
                  isActive
                    ? activeTabBackgroundColor
                    : inactiveTabBackgroundColor
                }
                textColor={isActive ? activeTabTextColor : inactiveTabTextColor}
                disabled={isDisabled}
                onPress={() => handleTabPress(index, tab)}
                fullWidth={fullWidth || equalWidth}
                leftIcon={tab.icon}
                rightIcon={
                  tab.badge ? (
                    <View style={styles.badgeContainer}>
                      <ButtonBase
                        title={String(tab.badge)}
                        size="small"
                        variant="danger"
                        shape="pill"
                        style={styles.badge}
                        // eslint-disable-next-line react-native/no-inline-styles
                        textStyle={{ fontSize: 10 }}
                      />
                    </View>
                  ) : undefined
                }
                style={{
                  ...styles.tabButton,
                  ...(isActive ? styles.activeTabButton : {}),
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                textStyle={{
                  fontSize: 12,
                  textAlign: 'center',
                }}
              />
            </View>
          );
        })}

        {/* Animated indicator */}
        {tabs.length > 0 && showIndicator && (
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: indicatorColor,
                transform: [{ translateX: indicatorAnim }],
                width: tabWidthAnim,
              },
              indicatorStyle,
            ]}
          />
        )}
      </View>
    );

    if (scrollable) {
      return (
        <ScrollView
          ref={tabBarRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollableTabBar,
            tabBarContainerStyle,
          ]}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ flexGrow: 0 }}
          {...scrollViewProps}
        >
          {tabBarContent}
        </ScrollView>
      );
    }

    return (
      <View style={[styles.tabBarContainer, tabBarContainerStyle]}>
        {tabBarContent}
      </View>
    );
  };

  const renderContent = () => {
    const activeTab = tabs[activeTabIndex];
    if (!activeTab) return null;

    return (
      <View style={[styles.content, contentStyle, contentContainerStyle]}>
        {activeTab.content}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {tabBarPosition === 'top' && renderTabBar()}
      {renderContent()}
      {tabBarPosition === 'bottom' && renderTabBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  scrollableTabBar: {
    flexGrow: 0,
    flexShrink: 0,
  },
  tabContainer: {
    flex: 1,
    minWidth: 0,
  },
  tabContainerEqualWidth: {
    flex: 1,
    minWidth: 0,
  },
  tabButton: {
    borderRadius: 0,
    overflow: 'hidden',
  },
  activeTabButton: {
    // Additional styles for active tab if needed
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    borderRadius: 1,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  badgeContainer: {
    marginLeft: 4,
    flexShrink: 0,
  },
  badge: {
    minWidth: 20,
    height: 20,
    overflow: 'hidden',
  },
});

export default TabView;
