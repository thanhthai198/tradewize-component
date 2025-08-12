"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Indicator extends _react.PureComponent {
  constructor(props) {
    super(props);

    /*
     *  0 -> 1
     *    | startAnimation
     *    | resumeAnimation
     *
     *  1 -> -1
     *    | stopAnimation
     *
     * -1 -> 0
     *    | saveAnimation
     */
    _defineProperty(this, "animationState", void 0);
    _defineProperty(this, "savedValue", void 0);
    this.animationState = 0;
    this.savedValue = 0;
    let {
      animating
    } = this.props;
    this.state = {
      progress: new _reactNative.Animated.Value(0),
      hideAnimation: new _reactNative.Animated.Value(animating ? 1 : 0)
    };
  }
  componentDidMount() {
    let {
      animating
    } = this.props;
    if (animating) {
      this.startAnimation();
    }
  }
  componentDidUpdate(prevProps) {
    let {
      animating
    } = this.props;
    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }
    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }
    if (animating ^ prevProps.animating) {
      let {
        hideAnimation
      } = this.state;
      let {
        hideAnimationDuration: duration
      } = this.props;
      _reactNative.Animated.timing(hideAnimation, {
        toValue: animating ? 1 : 0,
        duration,
        useNativeDriver: false
      }).start();
    }
  }
  startAnimation() {
    let {
      progress
    } = this.state;
    let {
      interaction,
      animationEasing,
      animationDuration
    } = this.props;
    if (0 !== this.animationState) {
      return;
    }
    let animation = _reactNative.Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    });
    _reactNative.Animated.loop(animation).start();
    this.animationState = 1;
  }
  stopAnimation() {
    let {
      progress
    } = this.state;
    if (1 !== this.animationState) {
      return;
    }
    let listener = progress.addListener(({
      value
    }) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => this.saveAnimation(value));
    });
    this.animationState = -1;
  }
  saveAnimation(value) {
    let {
      animating
    } = this.props;
    this.savedValue = value;
    this.animationState = 0;
    if (animating) {
      this.resumeAnimation();
    }
  }
  resumeAnimation() {
    let {
      progress
    } = this.state;
    let {
      interaction,
      animationDuration
    } = this.props;
    if (0 !== this.animationState) {
      return;
    }
    _reactNative.Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - this.savedValue) * animationDuration,
      toValue: 1
    }).start(({
      finished
    }) => {
      if (finished) {
        progress.setValue(0);
        this.animationState = 0;
        this.startAnimation();
      }
    });
    this.savedValue = 0;
    this.animationState = 1;
  }
  renderComponent(_item, index) {
    let {
      progress
    } = this.state;
    let {
      renderComponent,
      count
    } = this.props;
    if ('function' === typeof renderComponent) {
      return renderComponent({
        index,
        count,
        progress
      });
    }
    return null;
  }
  render() {
    let {
      hideAnimation
    } = this.state;
    let {
      count,
      hidesWhenStopped,
      ...props
    } = this.props;
    if (hidesWhenStopped) {
      props.style = [...(Array.isArray(props.style) ? props.style : [props.style]), {
        opacity: hideAnimation
      }].filter(Boolean);
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, props, Array.from(new Array(count), this.renderComponent, this));
  }
}
exports.default = Indicator;
_defineProperty(Indicator, "defaultProps", {
  animationEasing: _reactNative.Easing.linear,
  animationDuration: 1200,
  hideAnimationDuration: 200,
  animating: true,
  interaction: true,
  hidesWhenStopped: true,
  count: 1
});
_defineProperty(Indicator, "propTypes", {
  animationEasing: _propTypes.default.func,
  animationDuration: _propTypes.default.number,
  hideAnimationDuration: _propTypes.default.number,
  animating: _propTypes.default.bool,
  interaction: _propTypes.default.bool,
  hidesWhenStopped: _propTypes.default.bool,
  renderComponent: _propTypes.default.func,
  count: _propTypes.default.number
});
//# sourceMappingURL=index.js.map