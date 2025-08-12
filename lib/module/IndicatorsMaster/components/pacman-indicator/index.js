function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, I18nManager } from 'react-native';
import Indicator from '../indicator';
import styles from './styles';
export default class PacmanIndicator extends PureComponent {
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
        outputRange: [0, size / (I18nManager.isRTL ? 4 : -4)],
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
    return /*#__PURE__*/React.createElement(Animated.View, {
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
          index ^ I18nManager.isRTL ? ['0deg', '45deg', '0deg'] : ['0deg', '-45deg', '0deg'],
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
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: pacmanStyle,
      key: index
    }, /*#__PURE__*/React.createElement(Animated.View, {
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
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.container, style]
    }, /*#__PURE__*/React.createElement(Indicator, _extends({
      style: indicatorStyle,
      renderComponent: this.renderComponent
    }, props, {
      count: 5
    })));
  }
}
_defineProperty(PacmanIndicator, "defaultProps", {
  animationDuration: 600,
  color: 'rgb(0, 0, 0)',
  size: 48
});
_defineProperty(PacmanIndicator, "propTypes", {
  ...Indicator.propTypes,
  color: PropTypes.string,
  size: PropTypes.number
});
//# sourceMappingURL=index.js.map