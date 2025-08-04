"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _Day = require("../../../Day");
var _utils = require("../../../utils");
var _Item = require("../Item");
var _styles = _interopRequireDefault(require("../../../styles"));
var _styles2 = _interopRequireDefault(require("./styles"));
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
const DayAnimated = ({
  scrolledY,
  daysPositions,
  listHeight,
  renderDay,
  messages,
  isLoadingEarlier,
  ...rest
}) => {
  const opacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const fadeOutOpacityTimeoutId = (0, _reactNativeReanimated.useSharedValue)(undefined);
  const containerHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const isScrolledOnMount = (0, _reactNativeReanimated.useSharedValue)(false);
  const isLoadingEarlierAnim = (0, _reactNativeReanimated.useSharedValue)(isLoadingEarlier);
  const daysPositionsArray = (0, _reactNativeReanimated.useDerivedValue)(() => Object.values(daysPositions.value).sort((a, b) => a.y - b.y));
  const [createdAt, setCreatedAt] = (0, _react.useState)();
  const dayTopOffset = (0, _react.useMemo)(() => 10, []);
  const dayBottomMargin = (0, _react.useMemo)(() => 10, []);
  const absoluteScrolledPositionToBottomOfDay = (0, _Item.useAbsoluteScrolledPositionToBottomOfDay)(listHeight, scrolledY, containerHeight, dayBottomMargin, dayTopOffset);
  const relativeScrolledPositionToBottomOfDay = (0, _Item.useRelativeScrolledPositionToBottomOfDay)(listHeight, scrolledY, daysPositions, containerHeight, dayBottomMargin, dayTopOffset);
  const messagesDates = (0, _react.useMemo)(() => {
    const messagesDates = [];
    for (let i = 1; i < messages.length; i++) {
      const previousMessage = messages[i - 1];
      const message = messages[i];
      if (!(0, _utils.isSameDay)(previousMessage, message) || !messagesDates.includes(new Date(message.createdAt).getTime())) messagesDates.push(new Date(message.createdAt).getTime());
    }
    return messagesDates;
  }, [messages]);
  const createdAtDate = (0, _reactNativeReanimated.useDerivedValue)(() => {
    for (let i = 0; i < daysPositionsArray.value.length; i++) {
      const day = daysPositionsArray.value[i];
      const dayPosition = day.y + day.height - containerHeight.value - dayBottomMargin;
      if (absoluteScrolledPositionToBottomOfDay.value < dayPosition) return day.createdAt;
    }
    return messagesDates[messagesDates.length - 1];
  }, [daysPositionsArray, absoluteScrolledPositionToBottomOfDay, messagesDates, containerHeight, dayBottomMargin]);
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    top: (0, _reactNativeReanimated.interpolate)(relativeScrolledPositionToBottomOfDay.value, [-dayTopOffset, -0.0001, 0, isLoadingEarlierAnim.value ? 0 : containerHeight.value + dayTopOffset], [dayTopOffset, dayTopOffset, -containerHeight.value, isLoadingEarlierAnim.value ? -containerHeight.value : dayTopOffset], 'clamp')
  }), [relativeScrolledPositionToBottomOfDay, containerHeight, dayTopOffset, isLoadingEarlierAnim]);
  const contentStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value
  }), [opacity]);
  const fadeOut = (0, _react.useCallback)(() => {
    'worklet';

    opacity.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration: 500
    });
  }, [opacity]);
  const scheduleFadeOut = (0, _react.useCallback)(() => {
    clearTimeout(fadeOutOpacityTimeoutId.value);
    fadeOutOpacityTimeoutId.value = setTimeout(fadeOut, 500);
  }, [fadeOut, fadeOutOpacityTimeoutId]);
  const handleLayout = (0, _react.useCallback)(({
    nativeEvent
  }) => {
    containerHeight.value = nativeEvent.layout.height;
  }, [containerHeight]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => [scrolledY.value, daysPositionsArray], (value, prevValue) => {
    if (!isScrolledOnMount.value) {
      isScrolledOnMount.value = true;
      return;
    }
    if (value[0] === (prevValue === null || prevValue === void 0 ? void 0 : prevValue[0])) return;
    opacity.value = (0, _reactNativeReanimated.withTiming)(1, {
      duration: 500
    });
    (0, _reactNativeReanimated.runOnJS)(scheduleFadeOut)();
  }, [scrolledY, scheduleFadeOut, daysPositionsArray]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => createdAtDate.value, (value, prevValue) => {
    if (value && value !== prevValue) (0, _reactNativeReanimated.runOnJS)(setCreatedAt)(value);
  }, [createdAtDate]);
  (0, _react.useEffect)(() => {
    isLoadingEarlierAnim.value = isLoadingEarlier;
  }, [isLoadingEarlierAnim, isLoadingEarlier]);
  if (!createdAt) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_styles.default.centerItems, _styles2.default.dayAnimated, style],
    onLayout: handleLayout
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: contentStyle,
    pointerEvents: "none"
  }, renderDay ? renderDay({
    ...rest,
    createdAt
  }) : /*#__PURE__*/_react.default.createElement(_Day.Day, _extends({}, rest, {
    containerStyle: [_styles2.default.dayAnimatedDayContainerStyle, rest.containerStyle],
    createdAt: createdAt
  }))));
};
var _default = exports.default = DayAnimated;
//# sourceMappingURL=index.js.map