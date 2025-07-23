"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const [activeTabIndex, setActiveTabIndex] = (0, _react.useState)(initialTabIndex);
  const [tabLayouts, setTabLayouts] = (0, _react.useState)({});
  const tabBarRef = (0, _react.useRef)(null);
  const indicatorAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const tabWidthAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;

  // Validate initial tab index
  (0, _react.useEffect)(() => {
    if (initialTabIndex >= 0 && initialTabIndex < tabs.length) {
      setActiveTabIndex(initialTabIndex);
    }
  }, [initialTabIndex, tabs.length]);

  // Animate indicator when active tab changes
  (0, _react.useEffect)(() => {
    const activeTab = tabs[activeTabIndex];
    if (activeTab && tabLayouts[activeTab.key]) {
      const layout = tabLayouts[activeTab.key];
      if (layout) {
        const {
          x,
          width
        } = layout;
        if (animated) {
          _reactNative.Animated.parallel([_reactNative.Animated.timing(indicatorAnim, {
            toValue: x,
            duration: animationDuration,
            useNativeDriver: false
          }), _reactNative.Animated.timing(tabWidthAnim, {
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
  const handleTabPress = (0, _react.useCallback)((index, tab) => {
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
          const screenWidth = _reactNative.Dimensions.get('window').width;
          const scrollToX = Math.max(0, x - screenWidth / 2 + width / 2);
          tabBarRef.current.scrollTo({
            x: scrollToX,
            animated: true
          });
        }
      }
    }
  }, [scrollable, tabLayouts, onTabChange, tabs]);
  const handleTabLayout = (0, _react.useCallback)((tabKey, event) => {
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
    const tabBarContent = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.tabBar, tabBarStyle]
    }, tabs.map((tab, index) => {
      const isActive = index === activeTabIndex;
      const isDisabled = tab.disabled;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: tab.key,
        style: [styles.tabContainer, (fullWidth || equalWidth) && styles.tabContainerEqualWidth, tabStyle],
        onLayout: event => handleTabLayout(tab.key, event)
      }, /*#__PURE__*/_react.default.createElement(_ButtonBase.default, {
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
        rightIcon: tab.badge ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.badgeContainer
        }, /*#__PURE__*/_react.default.createElement(_ButtonBase.default, {
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
    }), tabs.length > 0 && showIndicator && /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: [styles.indicator, {
        backgroundColor: indicatorColor,
        transform: [{
          translateX: indicatorAnim
        }],
        width: tabWidthAnim
      }, indicatorStyle]
    }));
    if (scrollable) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, _extends({
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.tabBarContainer, tabBarContainerStyle]
    }, tabBarContent);
  };
  const renderContent = () => {
    const activeTab = tabs[activeTabIndex];
    if (!activeTab) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.content, contentStyle, contentContainerStyle]
    }, activeTab.content);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, containerStyle]
  }, tabBarPosition === 'top' && renderTabBar(), renderContent(), tabBarPosition === 'bottom' && renderTabBar());
};
const styles = _reactNative.StyleSheet.create({
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
var _default = exports.default = TabView;
//# sourceMappingURL=index.js.map