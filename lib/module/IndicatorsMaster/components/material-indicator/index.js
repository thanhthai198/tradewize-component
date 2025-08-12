function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
export default class MaterialIndicator extends PureComponent {
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
      let easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);
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
      return /*#__PURE__*/React.createElement(Animated.View, {
        style: styles.layer,
        key: index
      }, /*#__PURE__*/React.createElement(Animated.View, {
        style: layerStyle
      }, /*#__PURE__*/React.createElement(Animated.View, {
        style: [containerStyle, offsetStyle],
        collapsable: false
      }, /*#__PURE__*/React.createElement(Animated.View, {
        style: viewportStyle
      }, /*#__PURE__*/React.createElement(Animated.View, {
        style: containerStyle,
        collapsable: false
      }, /*#__PURE__*/React.createElement(Animated.View, {
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
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.container, style]
    }, /*#__PURE__*/React.createElement(Indicator, _extends({
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
_defineProperty(MaterialIndicator, "defaultProps", {
  animationDuration: 4000,
  color: 'rgb(0, 0, 0)',
  size: 40
});
_defineProperty(MaterialIndicator, "propTypes", {
  ...Indicator.propTypes,
  trackWidth: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number
});
//# sourceMappingURL=index.js.map