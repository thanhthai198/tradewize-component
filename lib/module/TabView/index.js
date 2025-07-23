function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Animated } from 'react-native';
import ButtonBase from '../ButtonBase';
const TabView = ({
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
  contentContainerStyle
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);
  const [tabLayouts, setTabLayouts] = useState({});
  const tabBarRef = useRef(null);
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
        const {
          x,
          width
        } = layout;
        if (animated) {
          Animated.parallel([Animated.timing(indicatorAnim, {
            toValue: x,
            duration: animationDuration,
            useNativeDriver: false
          }), Animated.timing(tabWidthAnim, {
            toValue: width,
            duration: animationDuration,
            useNativeDriver: false
          })]).start();
        } else {
          indicatorAnim.setValue(x);
          tabWidthAnim.setValue(width);
        }
      }
    }
  }, [activeTabIndex, tabLayouts, animated, animationDuration, indicatorAnim, tabWidthAnim, tabs]);
  const handleTabPress = useCallback((index, tab) => {
    if (tab.disabled) return;
    setActiveTabIndex(index);
    onTabChange === null || onTabChange === void 0 || onTabChange(index, tab);

    // Scroll to tab if scrollable
    if (scrollable && tabBarRef.current) {
      const activeTab = tabs[index];
      if (activeTab && tabLayouts[activeTab.key]) {
        const layout = tabLayouts[activeTab.key];
        if (layout) {
          const {
            x,
            width
          } = layout;
          const screenWidth = Dimensions.get('window').width;
          const scrollToX = Math.max(0, x - screenWidth / 2 + width / 2);
          tabBarRef.current.scrollTo({
            x: scrollToX,
            animated: true
          });
        }
      }
    }
  }, [scrollable, tabLayouts, onTabChange, tabs]);
  const handleTabLayout = useCallback((tabKey, event) => {
    const {
      x,
      width
    } = event.nativeEvent.layout;
    setTabLayouts(prev => ({
      ...prev,
      [tabKey]: {
        x,
        width
      }
    }));
  }, []);
  const renderTabBar = () => {
    const tabBarContent = /*#__PURE__*/React.createElement(View, {
      style: [styles.tabBar, tabBarStyle]
    }, tabs.map((tab, index) => {
      const isActive = index === activeTabIndex;
      const isDisabled = tab.disabled;
      return /*#__PURE__*/React.createElement(View, {
        key: tab.key,
        style: [styles.tabContainer, (fullWidth || equalWidth) && styles.tabContainerEqualWidth, tabStyle],
        onLayout: event => handleTabLayout(tab.key, event)
      }, /*#__PURE__*/React.createElement(ButtonBase, {
        title: tab.title,
        variant: isActive ? activeTabVariant : tabVariant,
        size: tabSize,
        shape: tabShape,
        backgroundColor: isActive ? activeTabBackgroundColor : inactiveTabBackgroundColor,
        textColor: isActive ? activeTabTextColor : inactiveTabTextColor,
        disabled: isDisabled,
        onPress: () => handleTabPress(index, tab),
        fullWidth: fullWidth || equalWidth,
        leftIcon: tab.icon,
        rightIcon: tab.badge ? /*#__PURE__*/React.createElement(View, {
          style: styles.badgeContainer
        }, /*#__PURE__*/React.createElement(ButtonBase, {
          title: String(tab.badge),
          size: "small",
          variant: "danger",
          shape: "pill",
          style: styles.badge
          // eslint-disable-next-line react-native/no-inline-styles
          ,
          textStyle: {
            fontSize: 10
          }
        })) : undefined,
        style: {
          ...styles.tabButton,
          ...(isActive ? styles.activeTabButton : {})
        }
        // eslint-disable-next-line react-native/no-inline-styles
        ,
        textStyle: {
          fontSize: 12,
          textAlign: 'center'
        }
      }));
    }), tabs.length > 0 && showIndicator && /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.indicator, {
        backgroundColor: indicatorColor,
        transform: [{
          translateX: indicatorAnim
        }],
        width: tabWidthAnim
      }, indicatorStyle]
    }));
    if (scrollable) {
      return /*#__PURE__*/React.createElement(ScrollView, _extends({
        ref: tabBarRef,
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        contentContainerStyle: [styles.scrollableTabBar, tabBarContainerStyle]
        // eslint-disable-next-line react-native/no-inline-styles
        ,
        style: {
          flexGrow: 0
        }
      }, scrollViewProps), tabBarContent);
    }
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.tabBarContainer, tabBarContainerStyle]
    }, tabBarContent);
  };
  const renderContent = () => {
    const activeTab = tabs[activeTabIndex];
    if (!activeTab) return null;
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.content, contentStyle, contentContainerStyle]
    }, activeTab.content);
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, containerStyle]
  }, tabBarPosition === 'top' && renderTabBar(), renderContent(), tabBarPosition === 'bottom' && renderTabBar());
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    overflow: 'hidden'
  },
  tabBar: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center'
  },
  scrollableTabBar: {
    flexGrow: 0,
    flexShrink: 0
  },
  tabContainer: {
    flex: 1,
    minWidth: 0
  },
  tabContainerEqualWidth: {
    flex: 1,
    minWidth: 0
  },
  tabButton: {
    borderRadius: 0,
    overflow: 'hidden'
  },
  activeTabButton: {
    // Additional styles for active tab if needed
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    borderRadius: 1
  },
  content: {
    flex: 1,
    overflow: 'hidden'
  },
  badgeContainer: {
    marginLeft: 4,
    flexShrink: 0
  },
  badge: {
    minWidth: 20,
    height: 20,
    overflow: 'hidden'
  }
});
export default TabView;
//# sourceMappingURL=index.js.map