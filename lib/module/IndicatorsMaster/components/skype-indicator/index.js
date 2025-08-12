function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
export default class SkypeIndicator extends PureComponent {
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
    let easing = Easing.bezier(0.5, offset, 0.5, 1.0);
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
_defineProperty(SkypeIndicator, "defaultProps", {
  animationDuration: 1600,
  color: 'rgb(0, 0, 0)',
  count: 5,
  size: 40,
  minScale: 0.2,
  maxScale: 1.0
});
_defineProperty(SkypeIndicator, "propTypes", {
  ...Indicator.propTypes,
  color: PropTypes.string,
  size: PropTypes.number,
  minScale: PropTypes.number,
  maxScale: PropTypes.number
});
//# sourceMappingURL=index.js.map