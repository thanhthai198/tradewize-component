"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useAbsoluteScrolledPositionToBottomOfDay: true,
  useRelativeScrolledPositionToBottomOfDay: true
};
exports.useRelativeScrolledPositionToBottomOfDay = exports.useAbsoluteScrolledPositionToBottomOfDay = exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _Message = _interopRequireDefault(require("../../../Message"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _Day = require("../../../Day");
var _utils = require("../../../utils");
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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// y-position of current scroll position relative to the bottom of the day container. (since we have inverted list it is bottom)
const useAbsoluteScrolledPositionToBottomOfDay = (listHeight, scrolledY, containerHeight, dayBottomMargin, dayTopOffset) => {
  const absoluteScrolledPositionToBottomOfDay = (0, _reactNativeReanimated.useDerivedValue)(() => listHeight.value + scrolledY.value - containerHeight.value - dayBottomMargin - dayTopOffset, [listHeight, scrolledY, containerHeight, dayBottomMargin, dayTopOffset]);
  return absoluteScrolledPositionToBottomOfDay;
};
exports.useAbsoluteScrolledPositionToBottomOfDay = useAbsoluteScrolledPositionToBottomOfDay;
const useRelativeScrolledPositionToBottomOfDay = (listHeight, scrolledY, daysPositions, containerHeight, dayBottomMargin, dayTopOffset, createdAt) => {
  const dayMarginTop = (0, _react.useMemo)(() => 5, []);
  const absoluteScrolledPositionToBottomOfDay = useAbsoluteScrolledPositionToBottomOfDay(listHeight, scrolledY, containerHeight, dayBottomMargin, dayTopOffset);

  // sorted array of days positions by y
  const daysPositionsArray = (0, _reactNativeReanimated.useDerivedValue)(() => Object.values(daysPositions.value).sort((a, b) => a.y - b.y));

  // find current day position by scrolled position
  const currentDayPosition = (0, _reactNativeReanimated.useDerivedValue)(() => {
    if (createdAt != null) {
      const currentDayPosition = daysPositionsArray.value.find(day => day.createdAt === createdAt);
      if (currentDayPosition) return currentDayPosition;
    }
    return daysPositionsArray.value.find((day, index) => {
      const dayPosition = day.y + day.height;
      return absoluteScrolledPositionToBottomOfDay.value < dayPosition || index === daysPositionsArray.value.length - 1;
    });
  }, [daysPositionsArray, absoluteScrolledPositionToBottomOfDay, createdAt]);
  const relativeScrolledPositionToBottomOfDay = (0, _reactNativeReanimated.useDerivedValue)(() => {
    var _currentDayPosition$v, _currentDayPosition$v2;
    const scrolledBottomY = listHeight.value + scrolledY.value - ((((_currentDayPosition$v = currentDayPosition.value) === null || _currentDayPosition$v === void 0 ? void 0 : _currentDayPosition$v.y) ?? 0) + (((_currentDayPosition$v2 = currentDayPosition.value) === null || _currentDayPosition$v2 === void 0 ? void 0 : _currentDayPosition$v2.height) ?? 0) + dayMarginTop);
    return scrolledBottomY;
  }, [listHeight, scrolledY, currentDayPosition, dayMarginTop]);
  return relativeScrolledPositionToBottomOfDay;
};
exports.useRelativeScrolledPositionToBottomOfDay = useRelativeScrolledPositionToBottomOfDay;
const DayWrapper = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const {
    renderDay: renderDayProp,
    currentMessage,
    previousMessage
  } = props;
  if (!(currentMessage !== null && currentMessage !== void 0 && currentMessage.createdAt) || (0, _utils.isSameDay)(currentMessage, previousMessage)) return null;
  const {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    containerStyle,
    onMessageLayout,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    ref: ref
  }, renderDayProp ? renderDayProp({
    ...rest,
    createdAt: currentMessage.createdAt
  }) : /*#__PURE__*/React.createElement(_Day.Day, _extends({}, rest, {
    createdAt: currentMessage.createdAt
  })));
});
const Item = props => {
  const {
    renderMessage: renderMessageProp,
    scrolledY,
    daysPositions,
    listHeight,
    onPressFile,
    onLongPressReaction,
    ...rest
  } = props;
  const dayContainerHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const dayTopOffset = (0, _react.useMemo)(() => 10, []);
  const dayBottomMargin = (0, _react.useMemo)(() => 10, []);
  const createdAt = (0, _react.useMemo)(() => new Date(props.currentMessage.createdAt).getTime(), [props.currentMessage.createdAt]);
  const relativeScrolledPositionToBottomOfDay = useRelativeScrolledPositionToBottomOfDay(listHeight, scrolledY, daysPositions, dayContainerHeight, dayBottomMargin, dayTopOffset, createdAt);
  const handleLayoutDayContainer = (0, _react.useCallback)(({
    nativeEvent
  }) => {
    dayContainerHeight.value = nativeEvent.layout.height;
  }, [dayContainerHeight]);
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: (0, _reactNativeReanimated.interpolate)(relativeScrolledPositionToBottomOfDay.value, [-dayTopOffset, -0.0001, 0, dayContainerHeight.value + dayTopOffset], [0, 0, 1, 1], 'clamp')
  }), [relativeScrolledPositionToBottomOfDay, dayContainerHeight, dayTopOffset]);
  return (
    /*#__PURE__*/
    // do not remove key. it helps to get correct position of the day container
    React.createElement(_reactNative.View, {
      key: props.currentMessage._id.toString()
    }, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      style: style,
      onLayout: handleLayoutDayContainer
    }, /*#__PURE__*/React.createElement(DayWrapper, rest)), renderMessageProp ? renderMessageProp(rest) : /*#__PURE__*/React.createElement(_Message.default, _extends({}, rest, {
      onPressFile: onPressFile,
      onLongPressReaction: onLongPressReaction
    })))
  );
};
var _default = exports.default = Item;
//# sourceMappingURL=index.js.map