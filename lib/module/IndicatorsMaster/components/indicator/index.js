function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
export default class Indicator extends PureComponent {
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
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0)
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
      Animated.timing(hideAnimation, {
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
    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    });
    Animated.loop(animation).start();
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
    Animated.timing(progress, {
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
    return /*#__PURE__*/React.createElement(Animated.View, props, Array.from(new Array(count), this.renderComponent, this));
  }
}
_defineProperty(Indicator, "defaultProps", {
  animationEasing: Easing.linear,
  animationDuration: 1200,
  hideAnimationDuration: 200,
  animating: true,
  interaction: true,
  hidesWhenStopped: true,
  count: 1
});
_defineProperty(Indicator, "propTypes", {
  animationEasing: PropTypes.func,
  animationDuration: PropTypes.number,
  hideAnimationDuration: PropTypes.number,
  animating: PropTypes.bool,
  interaction: PropTypes.bool,
  hidesWhenStopped: PropTypes.bool,
  renderComponent: PropTypes.func,
  count: PropTypes.number
});
//# sourceMappingURL=index.js.map