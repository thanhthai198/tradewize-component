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
class PacmanIndicator extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }
  renderBlock({
    index,
    count,
    progress
  }) {
    let {
      size,
      color: backgroundColor
    } = this.props;
    let transform = [{
      translateX: progress.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0, size / (_reactNative.I18nManager.isRTL ? 4 : -4)],
        extrapolate: 'clamp'
      })
    }];
    let style = {
      position: 'absolute',
      top: size / 2 - size / 16,
      left: size / 2 + size / 16 + (index - 2) * size / 4,
      width: size / 8,
      height: size / 8,
      borderRadius: size / 16,
      backgroundColor,
      transform
    };
    if (index === count - 1) {
      transform.push({
        scale: progress.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        })
      });
      style.opacity = progress.interpolate({
        inputRange: [0, 0.25],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      });
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: style,
      key: index
    });
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
    if (index > 1) {
      return this.renderBlock({
        index,
        count,
        progress
      });
    }
    let hf = size / 2;
    let qr = size / 4;
    let pacmanStyle = {
      position: 'absolute',
      top: qr,
      left: 0,
      width: hf,
      height: hf,
      transform: [{
        rotate: progress.interpolate({
          inputRange: [0, 0.67, 1],
          outputRange:
          // @ts-expect-error not sure about this
          // eslint-disable-next-line no-bitwise
          index ^ _reactNative.I18nManager.isRTL ? ['0deg', '45deg', '0deg'] : ['0deg', '-45deg', '0deg'],
          extrapolate: 'clamp'
        })
      }]
    };
    let containerStyle = {
      overflow: 'hidden',
      width: hf,
      height: qr,
      ...(index ? {
        top: qr,
        borderBottomLeftRadius: qr,
        borderBottomRightRadius: qr
      } : {
        borderTopLeftRadius: qr,
        borderTopRightRadius: qr
      }),
      backgroundColor
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: pacmanStyle,
      key: index
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: containerStyle
    }));
  }
  render() {
    let {
      style,
      size,
      ...props
    } = this.props;
    let indicatorStyle = {
      width: size * 1.25,
      height: size
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.default.container, style]
    }, /*#__PURE__*/_react.default.createElement(_indicator.default, _extends({
      style: indicatorStyle,
      renderComponent: this.renderComponent
    }, props, {
      count: 5
    })));
  }
}
exports.default = PacmanIndicator;
_defineProperty(PacmanIndicator, "defaultProps", {
  animationDuration: 600,
  color: 'rgb(0, 0, 0)',
  size: 48
});
_defineProperty(PacmanIndicator, "propTypes", {
  ..._indicator.default.propTypes,
  color: _propTypes.default.string,
  size: _propTypes.default.number
});
//# sourceMappingURL=index.js.map