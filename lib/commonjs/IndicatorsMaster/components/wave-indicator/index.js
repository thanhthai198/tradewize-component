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
const floatEpsilon = Math.pow(2, -23);
class WaveIndicator extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }
  renderComponent({
    index,
    progress
  }) {
    let {
      size,
      color,
      waveFactor,
      waveMode
    } = this.props;
    let fill = 'fill' === waveMode;
    let factor = Math.max(1 - Math.pow(waveFactor, index), floatEpsilon);
    let waveStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill ? 0 : Math.floor(size / 20),
      [fill ? 'backgroundColor' : 'borderColor']: color,
      transform: [{
        scale: progress.interpolate({
          inputRange: [factor, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        })
      }],
      opacity: progress.interpolate({
        inputRange: [0, factor, 1],
        outputRange: [0, 1, 0]
      })
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: _styles.default.layer,
      key: index
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: waveStyle
    }));
  }
  render() {
    let {
      style,
      size: width,
      size: height,
      ...props
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.default.container, style]
    }, /*#__PURE__*/_react.default.createElement(_indicator.default, _extends({
      style: {
        width,
        height
      },
      renderComponent: this.renderComponent
    }, props)));
  }
}
exports.default = WaveIndicator;
_defineProperty(WaveIndicator, "defaultProps", {
  animationEasing: _reactNative.Easing.out(_reactNative.Easing.ease),
  animationDuration: 1600,
  waveFactor: 0.54,
  waveMode: 'fill',
  color: 'rgb(0, 0, 0)',
  count: 4,
  size: 40
});
_defineProperty(WaveIndicator, "propTypes", {
  ..._indicator.default.propTypes,
  waveFactor: _propTypes.default.number,
  waveMode: _propTypes.default.oneOf(['fill', 'outline']),
  color: _propTypes.default.string,
  size: _propTypes.default.number
});
//# sourceMappingURL=index.js.map