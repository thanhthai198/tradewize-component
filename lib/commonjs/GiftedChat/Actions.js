"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Actions = Actions;
var _react = require("react");
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("./Color"));
var _GiftedChatContext = require("./GiftedChatContext");
var _styles = _interopRequireDefault(require("./styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Actions({
  options,
  optionTintColor = _Color.default.optionTintColor,
  icon,
  wrapperStyle,
  iconTextStyle,
  onPressActionButton,
  containerStyle
}) {
  const {
    actionSheet
  } = (0, _GiftedChatContext.useChatContext)();
  const onActionsPress = (0, _react.useCallback)(() => {
    if (!options) return;
    const optionKeys = Object.keys(options);
    const cancelButtonIndex = optionKeys.indexOf('Cancel');
    actionSheet().showActionSheetWithOptions({
      options: optionKeys,
      cancelButtonIndex,
      tintColor: optionTintColor
    }, buttonIndex => {
      var _options$key;
      if (buttonIndex === undefined) return;
      const key = optionKeys[buttonIndex];
      if (key) (_options$key = options[key]) === null || _options$key === void 0 || _options$key.call(options);
    });
  }, [actionSheet, options, optionTintColor]);
  const renderIcon = (0, _react.useCallback)(() => {
    if (icon) return icon();
    return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: [_styles.default.fill, _styles.default.centerItems, styles.wrapper, wrapperStyle]
    }, /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: [styles.iconText, iconTextStyle]
    }, '+'));
  }, [icon, iconTextStyle, wrapperStyle]);
  return /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: [styles.container, containerStyle],
    onPress: onPressActionButton || onActionsPress
  }, renderIcon());
}
const styles = _reactNative.StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: _Color.default.defaultColor,
    borderWidth: 2
  },
  iconText: {
    color: _Color.default.defaultColor,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
    backgroundColor: _Color.default.backgroundTransparent,
    textAlign: 'center'
  }
});
//# sourceMappingURL=Actions.js.map