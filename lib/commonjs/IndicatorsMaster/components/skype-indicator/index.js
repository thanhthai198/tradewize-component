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
class SkypeIndicator extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }
  renderComponent({
    index,
    count,
    progress
  }) {
    let {
      size,
      minScale,
      maxScale,
      color: backgroundColor,
      animationDuration
    } = this.props;
    let frames = 60 * animationDuration / 1000;
    let offset = index / (count - 1);
    let easing = _reactNative.Easing.bezier(0.5, offset, 0.5, 1.0);
    let inputRange = Array.from(new Array(frames), (_item, index) => index / (frames - 1));
    let outputRange = Array.from(new Array(frames), (_item, index) => easing(index / (frames - 1)) * 360 + 'deg');
    let layerStyle = {
      transform: [{
        rotate: progress.interpolate({
          inputRange,
          outputRange
        })
      }]
    };
    let ballStyle = {
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [maxScale - (maxScale - minScale) * offset, minScale + (maxScale - minScale) * offset]
        })
      }]
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: [_styles.default.layer, layerStyle],
      key: index
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: ballStyle
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
exports.default = SkypeIndicator;
_defineProperty(SkypeIndicator, "defaultProps", {
  animationDuration: 1600,
  color: 'rgb(0, 0, 0)',
  count: 5,
  size: 40,
  minScale: 0.2,
  maxScale: 1.0
});
_defineProperty(SkypeIndicator, "propTypes", {
  ..._indicator.default.propTypes,
  color: _propTypes.default.string,
  size: _propTypes.default.number,
  minScale: _propTypes.default.number,
  maxScale: _propTypes.default.number
});
//# sourceMappingURL=index.js.map