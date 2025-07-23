"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ScrollTabView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ScrollTabView = ({
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
  const scrollViewRef = (0, _react.useRef)(null);
  const [activeIndex, setActiveIndex] = (0, _react.useState)(() => {
    if (activeTabKey) {
      const index = tabs.findIndex(tab => tab.key === activeTabKey);
      return index >= 0 ? index : 0;
    }
    return 0;
  });
  const handleTabPress = (0, _react.useCallback)((tabKey, index) => {
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
  const defaultRenderTab = (tab, isActive, index) => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
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
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.tabText, {
      fontSize: defaultTabFontSize,
      fontWeight: defaultTabFontWeight,
      color: isActive ? activeTabTextColor : inactiveTabTextColor
    }, tabTextStyle, isActive && activeTabTextStyle],
    numberOfLines: 1
  }, tab.title));
  const defaultRenderContent = (tab, isActive) => {
    if (!isActive) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.defaultContent
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.defaultContentText, {
        fontSize: defaultContentFontSize,
        color: defaultContentTextColor
      }]
    }, tab.content || `Content for ${tab.title}`));
  };
  const activeTab = tabs[activeIndex];
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.tabNavigationContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    ref: scrollViewRef,
    horizontal: true,
    showsHorizontalScrollIndicator: showsHorizontalScrollIndicator,
    scrollEnabled: scrollEnabled,
    contentContainerStyle: [styles.tabContainer, tabContainerStyle],
    bounces: scrollBounces
  }, tabs.map((tab, index) => {
    const isActive = index === activeIndex;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: tab.key
    }, renderTab ? renderTab(tab, isActive, index) : defaultRenderTab(tab, isActive, index));
  }))), showContent && activeTab && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.contentContainer, contentContainerStyle]
  }, renderContent ? renderContent(activeTab, true, activeIndex) : defaultRenderContent(activeTab, true)));
};
exports.ScrollTabView = ScrollTabView;
const styles = _reactNative.StyleSheet.create({
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
var _default = exports.default = ScrollTabView;
//# sourceMappingURL=index.js.map