function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
const floatEpsilon = Math.pow(2, -23);
export default class WaveIndicator extends PureComponent {
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
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: styles.layer,
      key: index
    }, /*#__PURE__*/React.createElement(Animated.View, {
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
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.container, style]
    }, /*#__PURE__*/React.createElement(Indicator, _extends({
      style: {
        width,
        height
      },
      renderComponent: this.renderComponent
    }, props)));
  }
}
_defineProperty(WaveIndicator, "defaultProps", {
  animationEasing: Easing.out(Easing.ease),
  animationDuration: 1600,
  waveFactor: 0.54,
  waveMode: 'fill',
  color: 'rgb(0, 0, 0)',
  count: 4,
  size: 40
});
_defineProperty(WaveIndicator, "propTypes", {
  ...Indicator.propTypes,
  waveFactor: PropTypes.number,
  waveMode: PropTypes.oneOf(['fill', 'outline']),
  color: PropTypes.string,
  size: PropTypes.number
});
//# sourceMappingURL=index.js.map