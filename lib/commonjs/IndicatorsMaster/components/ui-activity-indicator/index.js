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
class UIActivityIndicator extends _react.PureComponent {
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
      color: backgroundColor
    } = this.props;
    let angle = index * 360 / count;
    let layerStyle = {
      transform: [{
        rotate: angle + 'deg'
      }]
    };
    let inputRange = Array.from(new Array(count + 1), (_item, index) => index / count);
    let outputRange = Array.from(new Array(count), (_item, index) => Math.max(1.0 - index * (1 / (count - 1)), 0));
    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop());
    }
    outputRange.unshift(...outputRange.slice(-1));
    let barStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor,
      opacity: progress.interpolate({
        inputRange,
        outputRange
      })
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: [_styles.default.layer, layerStyle],
      key: index
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: barStyle
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
exports.default = UIActivityIndicator;
_defineProperty(UIActivityIndicator, "defaultProps", {
  color: 'rgb(0, 0, 0)',
  count: 12,
  size: 40
});
_defineProperty(UIActivityIndicator, "propTypes", {
  ..._indicator.default.propTypes,
  color: _propTypes.default.string,
  size: _propTypes.default.number
});
//# sourceMappingURL=index.js.map