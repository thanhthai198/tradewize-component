function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
export default class BallIndicator extends PureComponent {
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
    let outputRange = Array.from(new Array(count), (_item, index) => 1.2 - 0.5 * index / (count - 1));
    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop());
    }
    outputRange.unshift(...outputRange.slice(-1));
    let ballStyle = {
      margin: size / 20,
      backgroundColor,
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      transform: [{
        scale: progress.interpolate({
          inputRange,
          outputRange
        })
      }]
    };
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.layer, layerStyle],
      key: index
    }, /*#__PURE__*/React.createElement(Animated.View, {
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
_defineProperty(BallIndicator, "defaultProps", {
  color: 'rgb(0, 0, 0)',
  count: 8,
  size: 40
});
_defineProperty(BallIndicator, "propTypes", {
  ...Indicator.propTypes,
  color: PropTypes.string,
  size: PropTypes.number
});
//# sourceMappingURL=index.js.map