"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _DayAnimated = _interopRequireDefault(require("./components/DayAnimated"));
var _Item = _interopRequireDefault(require("./components/Item"));
var _LoadEarlier = require("../LoadEarlier");
var _TypingIndicator = _interopRequireDefault(require("../TypingIndicator"));
var _logging = require("../logging");
var _styles = _interopRequireDefault(require("../styles"));
var _styles2 = _interopRequireDefault(require("./styles"));
var _utils = require("../utils");
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const AnimatedFlatList = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeGestureHandler.FlatList);
function MessageContainer(props) {
  const {
    messages = [],
    user,
    isTyping = false,
    renderChatEmpty: renderChatEmptyProp,
    onLoadEarlier,
    inverted = true,
    loadEarlier = false,
    listViewProps,
    invertibleScrollViewProps,
    extraData = null,
    isScrollToBottomEnabled = false,
    scrollToBottomOffset = 200,
    alignTop = false,
    scrollToBottomStyle,
    infiniteScroll = false,
    isLoadingEarlier = false,
    renderTypingIndicator: renderTypingIndicatorProp,
    renderFooter: renderFooterProp,
    renderLoadEarlier: renderLoadEarlierProp,
    forwardRef,
    handleOnScroll: handleOnScrollProp,
    scrollToBottomComponent: scrollToBottomComponentProp,
    renderDay: renderDayProp,
    onPressFile,
    onLongPressReaction
  } = props;
  const scrollToBottomOpacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const [isScrollToBottomVisible, setIsScrollToBottomVisible] = (0, _react.useState)(false);
  const scrollToBottomStyleAnim = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: scrollToBottomOpacity.value
  }), [scrollToBottomOpacity]);
  const daysPositions = (0, _reactNativeReanimated.useSharedValue)({});
  const listHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const scrolledY = (0, _reactNativeReanimated.useSharedValue)(0);
  const renderTypingIndicator = (0, _react.useCallback)(() => {
    if (renderTypingIndicatorProp) return renderTypingIndicatorProp();
    if (isTyping) return /*#__PURE__*/_react.default.createElement(_TypingIndicator.default, null);
    return null;
  }, [isTyping, renderTypingIndicatorProp]);
  const ListFooterComponent = (0, _react.useMemo)(() => {
    if (renderFooterProp) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderFooterProp(props));
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderTypingIndicator());
  }, [renderFooterProp, renderTypingIndicator, props]);
  const renderLoadEarlier = (0, _react.useCallback)(() => {
    if (loadEarlier) {
      if (renderLoadEarlierProp) return renderLoadEarlierProp(props);
      return /*#__PURE__*/_react.default.createElement(_LoadEarlier.LoadEarlier, props);
    }
    return null;
  }, [loadEarlier, renderLoadEarlierProp, props]);
  const scrollTo = (0, _react.useCallback)(options => {
    if (forwardRef !== null && forwardRef !== void 0 && forwardRef.current && options) forwardRef.current.scrollToOffset(options);
  }, [forwardRef]);
  const doScrollToBottom = (0, _react.useCallback)((animated = true) => {
    if (inverted) scrollTo({
      offset: 0,
      animated
    });else if (forwardRef !== null && forwardRef !== void 0 && forwardRef.current) forwardRef.current.scrollToEnd({
      animated
    });
  }, [forwardRef, inverted, scrollTo]);
  const handleOnScroll = (0, _react.useCallback)(event => {
    handleOnScrollProp === null || handleOnScrollProp === void 0 || handleOnScrollProp(event);
    const {
      contentOffset: {
        y: contentOffsetY
      },
      contentSize: {
        height: contentSizeHeight
      },
      layoutMeasurement: {
        height: layoutMeasurementHeight
      }
    } = event;
    const duration = 250;
    const makeScrollToBottomVisible = () => {
      setIsScrollToBottomVisible(true);
      scrollToBottomOpacity.value = (0, _reactNativeReanimated.withTiming)(1, {
        duration
      });
    };
    const makeScrollToBottomHidden = () => {
      scrollToBottomOpacity.value = (0, _reactNativeReanimated.withTiming)(0, {
        duration
      }, isFinished => {
        if (isFinished) (0, _reactNativeReanimated.runOnJS)(setIsScrollToBottomVisible)(false);
      });
    };
    if (inverted) {
      if (contentOffsetY > scrollToBottomOffset) makeScrollToBottomVisible();else makeScrollToBottomHidden();
    } else if (contentOffsetY < scrollToBottomOffset && contentSizeHeight - layoutMeasurementHeight > scrollToBottomOffset) makeScrollToBottomVisible();else makeScrollToBottomHidden();
  }, [handleOnScrollProp, inverted, scrollToBottomOffset, scrollToBottomOpacity]);
  const renderItem = (0, _react.useCallback)(({
    item,
    index
  }) => {
    const messageItem = item;
    if (!messageItem._id && messageItem._id !== 0) (0, _logging.warning)('GiftedChat: `_id` is missing for message', JSON.stringify(item));
    if (!messageItem.user) {
      if (!messageItem.system) (0, _logging.warning)('GiftedChat: `user` is missing for message', JSON.stringify(messageItem));
      messageItem.user = {
        _id: 0
      };
    }
    const {
      messages,
      ...restProps
    } = props;
    if (messages && user) {
      const previousMessage = (inverted ? messages[index + 1] : messages[index - 1]) || {};
      const nextMessage = (inverted ? messages[index - 1] : messages[index + 1]) || {};
      const messageProps = {
        ...restProps,
        currentMessage: messageItem,
        previousMessage,
        nextMessage,
        position: messageItem.user._id === user._id ? 'right' : 'left',
        scrolledY,
        daysPositions,
        listHeight,
        onPressFile,
        onLongPressReaction
      };
      return /*#__PURE__*/_react.default.createElement(_Item.default, messageProps);
    }
    return null;
  }, [props, inverted, scrolledY, daysPositions, listHeight, user, onPressFile, onLongPressReaction]);
  const renderChatEmpty = (0, _react.useCallback)(() => {
    if (renderChatEmptyProp) return inverted ? renderChatEmptyProp() : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.default.fill, _styles2.default.emptyChatContainer]
    }, renderChatEmptyProp());
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.default.fill
    });
  }, [inverted, renderChatEmptyProp]);
  const ListHeaderComponent = (0, _react.useMemo)(() => {
    const content = renderLoadEarlier();
    if (!content) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.default.fill
    }, content);
  }, [renderLoadEarlier]);
  const renderScrollBottomComponent = (0, _react.useCallback)(() => {
    if (scrollToBottomComponentProp) return scrollToBottomComponentProp();
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, 'V');
  }, [scrollToBottomComponentProp]);
  const renderScrollToBottomWrapper = (0, _react.useCallback)(() => {
    if (!isScrollToBottomVisible) return null;
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: () => doScrollToBottom()
    }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: [_styles.default.centerItems, _styles2.default.scrollToBottomStyle, scrollToBottomStyle, scrollToBottomStyleAnim]
    }, renderScrollBottomComponent()));
  }, [scrollToBottomStyle, renderScrollBottomComponent, doScrollToBottom, scrollToBottomStyleAnim, isScrollToBottomVisible]);
  const onLayoutList = (0, _react.useCallback)(event => {
    var _listViewProps$onLayo;
    listHeight.value = event.nativeEvent.layout.height;
    if (!inverted && messages !== null && messages !== void 0 && messages.length) setTimeout(() => {
      doScrollToBottom(false);
    }, 500);
    listViewProps === null || listViewProps === void 0 || (_listViewProps$onLayo = listViewProps.onLayout) === null || _listViewProps$onLayo === void 0 || _listViewProps$onLayo.call(listViewProps, event);
  }, [inverted, messages, doScrollToBottom, listHeight, listViewProps]);
  const onEndReached = (0, _react.useCallback)(() => {
    if (infiniteScroll && loadEarlier && onLoadEarlier && !isLoadingEarlier && _reactNative.Platform.OS !== 'web') onLoadEarlier();
  }, [infiniteScroll, loadEarlier, onLoadEarlier, isLoadingEarlier]);
  const keyExtractor = (0, _react.useCallback)(item => item._id.toString(), []);
  const renderCell = (0, _react.useCallback)(props => {
    const handleOnLayout = event => {
      var _props$onLayout, _props$item;
      (_props$onLayout = props.onLayout) === null || _props$onLayout === void 0 || _props$onLayout.call(props, event);
      const {
        y,
        height
      } = event.nativeEvent.layout;
      const newValue = {
        y,
        height,
        createdAt: new Date(props === null || props === void 0 || (_props$item = props.item) === null || _props$item === void 0 ? void 0 : _props$item.createdAt).getTime()
      };
      daysPositions.modify(value => {
        'worklet';

        const isSameDay = (date1, date2) => {
          const d1 = new Date(date1);
          const d2 = new Date(date2);
          return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
        };
        for (const [key, item] of Object.entries(value)) if (isSameDay(newValue.createdAt, item.createdAt) && (inverted ? item.y <= newValue.y : item.y >= newValue.y)) {
          delete value[key];
          break;
        }

        // @ts-expect-error: https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue#remarks
        value[props.item._id] = newValue;
        return value;
      });
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, props, {
      onLayout: handleOnLayout
    }), props.children);
  }, [daysPositions, inverted]);
  const scrollHandler = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
    onScroll: event => {
      scrolledY.value = event.contentOffset.y;
      (0, _reactNativeReanimated.runOnJS)(handleOnScroll)(event);
    }
  }, [handleOnScroll]);

  // removes unrendered days positions when messages are added/removed
  (0, _react.useEffect)(() => {
    Object.keys(daysPositions.value).forEach(key => {
      const messageIndex = messages.findIndex(m => m._id.toString() === key);
      let shouldRemove = messageIndex === -1;
      if (!shouldRemove) {
        const prevMessage = messages[messageIndex + (inverted ? 1 : -1)];
        const message = messages[messageIndex];
        shouldRemove = !!prevMessage && (0, _utils.isSameDay)(message, prevMessage);
      }
      if (shouldRemove) daysPositions.modify(value => {
        'worklet';

        delete value[key];
        return value;
      });
    });
  }, [messages, daysPositions, inverted]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles2.default.contentContainerStyle, alignTop ? _styles2.default.containerAlignTop : _styles.default.fill]
  }, /*#__PURE__*/_react.default.createElement(AnimatedFlatList, _extends({
    extraData: extraData,
    ref: forwardRef,
    keyExtractor: keyExtractor,
    data: messages,
    renderItem: renderItem,
    inverted: inverted,
    automaticallyAdjustContentInsets: false,
    style: _styles.default.fill
  }, invertibleScrollViewProps, {
    ListEmptyComponent: renderChatEmpty,
    ListFooterComponent: inverted ? ListHeaderComponent : ListFooterComponent,
    ListHeaderComponent: inverted ? ListFooterComponent : ListHeaderComponent,
    onScroll: scrollHandler,
    scrollEventThrottle: 1,
    onEndReached: onEndReached,
    onEndReachedThreshold: 0.1
  }, listViewProps, {
    onLayout: onLayoutList,
    CellRendererComponent: renderCell
  })), isScrollToBottomEnabled ? renderScrollToBottomWrapper() : null, /*#__PURE__*/_react.default.createElement(_DayAnimated.default, {
    scrolledY: scrolledY,
    daysPositions: daysPositions,
    listHeight: listHeight,
    renderDay: renderDayProp,
    messages: messages,
    isLoadingEarlier: isLoadingEarlier
  }));
}
var _default = exports.default = MessageContainer;
//# sourceMappingURL=index.js.map