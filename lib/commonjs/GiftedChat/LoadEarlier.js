"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadEarlier = LoadEarlier;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("./Color"));
var _styles = _interopRequireDefault(require("./styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  wrapper: {
    backgroundColor: _Color.default.defaultColor,
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    backgroundColor: _Color.default.backgroundTransparent,
    color: _Color.default.white,
    fontSize: 12
  },
  activityIndicator: {
    marginTop: _reactNative.Platform.select({
      ios: -14,
      android: -16,
      default: -15
    })
  }
});
function LoadEarlier({
  isLoadingEarlier = false,
  onLoadEarlier = () => {},
  label = 'Load earlier messages',
  containerStyle,
  wrapperStyle,
  textStyle,
  activityIndicatorColor = 'white',
  activityIndicatorSize = 'small',
  activityIndicatorStyle
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.container, containerStyle],
    onPress: onLoadEarlier,
    disabled: isLoadingEarlier,
    accessibilityRole: "button"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.default.centerItems, styles.wrapper, wrapperStyle]
  }, isLoadingEarlier ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.text, textStyle, {
      opacity: 0
    }]
  }, label), /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
    color: activityIndicatorColor,
    size: activityIndicatorSize,
    style: [styles.activityIndicator, activityIndicatorStyle]
  })) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.text, textStyle]
  }, label)));
}
//# sourceMappingURL=LoadEarlier.js.map