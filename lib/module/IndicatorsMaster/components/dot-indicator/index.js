function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
export default class DotIndicator extends PureComponent {
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
    let style = {
      width: size,
      height: size,
      margin: size / 2,
      borderRadius: size / 2,
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0.0, (index + 0.5) / (count + 1), (index + 1.0) / (count + 1), (index + 1.5) / (count + 1), 1.0],
          outputRange: [1.0, 1.36, 1.56, 1.06, 1.0]
        })
      }]
    };
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: style,
      key: index
    });
  }
  render() {
    let {
      style,
      ...props
    } = this.props;
    return /*#__PURE__*/React.createElement(Indicator, _extends({
      style: [styles.container, style],
      renderComponent: this.renderComponent
    }, props));
  }
}
_defineProperty(DotIndicator, "defaultProps", {
  animationEasing: Easing.inOut(Easing.ease),
  color: 'rgb(0, 0, 0)',
  count: 4,
  size: 16
});
_defineProperty(DotIndicator, "propTypes", {
  ...Indicator.propTypes,
  color: PropTypes.string,
  size: PropTypes.number
});
//# sourceMappingURL=index.js.map