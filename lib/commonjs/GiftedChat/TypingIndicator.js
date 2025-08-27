"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("./Color"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const TypingIndicator = ({
  size = 6,
  speed = 320,
  dotColor = _Color.default.defaultBlue,
  bubbleColor = _Color.default.leftBubbleBackground,
  style
}) => {
  const v1 = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const v2 = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const v3 = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const animate = (v, delay) => _reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.delay(delay), _reactNative.Animated.timing(v, {
    toValue: 1,
    duration: speed,
    useNativeDriver: true
  }), _reactNative.Animated.timing(v, {
    toValue: 0,
    duration: speed,
    useNativeDriver: true
  })]));
  (0, _react.useEffect)(() => {
    const a1 = animate(v1, 0);
    const a2 = animate(v2, speed / 2);
    const a3 = animate(v3, speed);
    a1.start();
    a2.start();
    a3.start();
    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, v1, v2, v3]);
  const dotAnimStyle = v => ({
    opacity: v.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1]
    }),
    transform: [{
      translateY: v.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1]
      })
    }, {
      scale: v.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.15]
      })
    }]
  });
  const dotBase = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: dotColor,
    marginHorizontal: Math.max(1, Math.round(size * 0.33))
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: bubbleColor,
      paddingVertical: Math.max(4, Math.round(size * 0.8)),
      paddingHorizontal: Math.max(6, Math.round(size * 1.2)),
      borderRadius: Math.round(size * 2.2)
    }, style]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [dotBase, dotAnimStyle(v1)]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [dotBase, dotAnimStyle(v2)]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [dotBase, dotAnimStyle(v3)]
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 26,
    width: 56,
    justifyContent: 'center',
    borderWidth: 0.2,
    borderColor: _Color.default.defaultColor
  }
});
var _default = exports.default = TypingIndicator;
//# sourceMappingURL=TypingIndicator.js.map