"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _indicator = _interopRequireDefault(require("../indicator"));
var _styles = _interopRequireDefault(require("./styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class BarIndicator extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }
  outputRange(base, index, count, samples) {
    let range = Array.from(new Array(samples), (_item, index) => base * Math.abs(Math.cos(Math.PI * index / (samples - 1))));
    for (let j = 0; j < index * (samples / count); j++) {
      range.unshift(range.pop());
    }
    range.unshift(...range.slice(-1));
    return range;
  }
  renderComponent({
    index,
    count,
    progress
  }) {
    let {
      color: backgroundColor,
      size,
      animationDuration
    } = this.props;
    let frames = 60 * animationDuration / 1000;
    let samples = 0;
    do samples += count; while (samples < frames);
    let inputRange = Array.from(new Array(samples + 1), (_item, index) => index / samples);
    let width = Math.floor(size / 5),
      height = Math.floor(size / 2),
      radius = Math.ceil(width / 2);
    let containerStyle = {
      height: size,
      width: width,
      marginHorizontal: radius
    };
    let topStyle = {
      width,
      height,
      backgroundColor,
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(+(height - radius) / 2, index, count, samples)
        })
      }]
    };
    let bottomStyle = {
      width,
      height,
      backgroundColor,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(-(height - radius) / 2, index, count, samples)
        })
      }]
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: containerStyle,
      key: index
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: topStyle
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: bottomStyle
    }));
  }
  render() {
    let {
      style,
      ...props
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_indicator.default, _extends({
      style: [_styles.default.container, style],
      renderComponent: this.renderComponent
    }, props));
  }
}
exports.default = BarIndicator;
_defineProperty(BarIndicator, "defaultProps", {
  count: 3,
  color: 'rgb(0, 0, 0)',
  size: 40
});
_defineProperty(BarIndicator, "propTypes", {
  ..._indicator.default.propTypes,
  color: _propTypes.default.string,
  size: _propTypes.default.number
});
//# sourceMappingURL=index.js.map