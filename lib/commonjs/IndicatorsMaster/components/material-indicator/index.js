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
class MaterialIndicator extends _react.PureComponent {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_renderComponent", ({
      index,
      progress
    }) => {
      let {
        size,
        color,
        trackWidth: borderWidth = size / 10,
        animationDuration
      } = this.props;
      let frames = 60 * animationDuration / 1000;
      let easing = _reactNative.Easing.bezier(0.4, 0.0, 0.7, 1.0);
      let sa = 7.5;
      let ea = 30;
      let sequences = 3;
      let rotations = 5;
      let inputRange = Array.from(new Array(frames), (_item, frameIndex) => frameIndex / (frames - 1));
      let outputRange = Array.from(new Array(frames), (_item, frameIndex) => {
        let progress = 2 * sequences * frameIndex / (frames - 1);
        let rotation = index ? +(360 - sa) : -(180 - sa);
        let sequence = Math.ceil(progress);
        if (sequence % 2) {
          progress = progress - sequence + 1;
        } else {
          progress = sequence - progress;
        }
        let direction = index ? -1 : +1;
        return direction * (180 - (sa + ea)) * easing(progress) + rotation + 'deg';
      });
      let layerStyle = {
        width: size,
        height: size,
        transform: [{
          rotate: 90 - sa + 'deg'
        }, {
          rotate: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', 360 * rotations + 'deg']
          })
        }]
      };
      let viewportStyle = {
        width: size,
        height: size,
        transform: [{
          translateY: index ? -size / 2 : 0
        }, {
          rotate: progress.interpolate({
            inputRange,
            outputRange
          })
        }]
      };
      let containerStyle = {
        width: size,
        height: size / 2,
        overflow: 'hidden'
      };
      let offsetStyle = index ? {
        top: size / 2
      } : null;
      let lineStyle = {
        width: size,
        height: size,
        borderColor: color,
        borderRadius: size / 2,
        borderWidth
      };
      return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: _styles.default.layer,
        key: index
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: layerStyle
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: [containerStyle, offsetStyle],
        collapsable: false
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: viewportStyle
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: containerStyle,
        collapsable: false
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
        style: lineStyle
      }))))));
    });
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
      renderComponent: this._renderComponent
    }, props, {
      count: 2
    })));
  }
}
exports.default = MaterialIndicator;
_defineProperty(MaterialIndicator, "defaultProps", {
  animationDuration: 4000,
  color: 'rgb(0, 0, 0)',
  size: 40
});
_defineProperty(MaterialIndicator, "propTypes", {
  ..._indicator.default.propTypes,
  trackWidth: _propTypes.default.number,
  color: _propTypes.default.string,
  size: _propTypes.default.number
});
//# sourceMappingURL=index.js.map