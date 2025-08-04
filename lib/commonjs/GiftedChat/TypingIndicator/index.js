"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _styles = _interopRequireDefault(require("../styles"));
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
const DotsAnimation = () => {
  const dot1 = (0, _reactNativeReanimated.useSharedValue)(0);
  const dot2 = (0, _reactNativeReanimated.useSharedValue)(0);
  const dot3 = (0, _reactNativeReanimated.useSharedValue)(0);
  const topY = (0, _react.useMemo)(() => -5, []);
  const bottomY = (0, _react.useMemo)(() => 5, []);
  const duration = (0, _react.useMemo)(() => 500, []);
  const dot1Style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: dot1.value
    }]
  }), [dot1]);
  const dot2Style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: dot2.value
    }]
  }), [dot2]);
  const dot3Style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: dot3.value
    }]
  }), [dot3]);
  (0, _react.useEffect)(() => {
    dot1.value = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(topY, {
      duration
    }), (0, _reactNativeReanimated.withTiming)(bottomY, {
      duration
    })), 0, true);
  }, [dot1, topY, bottomY, duration]);
  (0, _react.useEffect)(() => {
    dot2.value = (0, _reactNativeReanimated.withDelay)(100, (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(topY, {
      duration
    }), (0, _reactNativeReanimated.withTiming)(bottomY, {
      duration
    })), 0, true));
  }, [dot2, topY, bottomY, duration]);
  (0, _react.useEffect)(() => {
    dot3.value = (0, _reactNativeReanimated.withDelay)(200, (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(topY, {
      duration
    }), (0, _reactNativeReanimated.withTiming)(bottomY, {
      duration
    })), 0, true));
  }, [dot3, topY, bottomY, duration]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.default.fill, _styles.default.centerItems, _styles2.default.dots]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_styles2.default.dot, dot1Style]
  }), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_styles2.default.dot, dot2Style]
  }), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_styles2.default.dot, dot3Style]
  }));
};
const TypingIndicator = ({
  isTyping
}) => {
  const yCoords = (0, _reactNativeReanimated.useSharedValue)(200);
  const heightScale = (0, _reactNativeReanimated.useSharedValue)(0);
  const marginScale = (0, _reactNativeReanimated.useSharedValue)(0);
  const [isVisible, setIsVisible] = (0, _react.useState)(isTyping);
  const containerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: yCoords.value
    }],
    height: heightScale.value,
    marginBottom: marginScale.value
  }), [yCoords, heightScale, marginScale]);
  const slideIn = (0, _react.useCallback)(() => {
    const duration = 250;
    yCoords.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration
    });
    heightScale.value = (0, _reactNativeReanimated.withTiming)(35, {
      duration
    });
    marginScale.value = (0, _reactNativeReanimated.withTiming)(8, {
      duration
    });
  }, [yCoords, heightScale, marginScale]);
  const slideOut = (0, _react.useCallback)(() => {
    const duration = 250;
    yCoords.value = (0, _reactNativeReanimated.withTiming)(200, {
      duration
    }, isFinished => {
      if (isFinished) (0, _reactNativeReanimated.runOnJS)(setIsVisible)(false);
    });
    heightScale.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration
    });
    marginScale.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration
    });
  }, [yCoords, heightScale, marginScale]);
  (0, _react.useEffect)(() => {
    if (isVisible) if (isTyping) slideIn();else slideOut();
  }, [isVisible, isTyping, slideIn, slideOut]);
  (0, _react.useEffect)(() => {
    if (isTyping) setIsVisible(true);
  }, [isTyping]);
  if (!isVisible) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_styles2.default.container, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(DotsAnimation, null));
};
var _default = exports.default = TypingIndicator;
//# sourceMappingURL=index.js.map