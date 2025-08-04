"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Time = Time;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _Color = _interopRequireDefault(require("./Color"));
var _Constant = require("./Constant");
var _GiftedChatContext = require("./GiftedChatContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  containerStyle
} = _reactNative.StyleSheet.create({
  containerStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  }
});
const {
  textStyle
} = _reactNative.StyleSheet.create({
  textStyle: {
    fontSize: 10,
    textAlign: 'right'
  }
});
const styles = {
  left: _reactNative.StyleSheet.create({
    container: {
      ...containerStyle
    },
    text: {
      color: _Color.default.timeTextColor,
      ...textStyle
    }
  }),
  right: _reactNative.StyleSheet.create({
    container: {
      ...containerStyle
    },
    text: {
      color: _Color.default.white,
      ...textStyle
    }
  })
};
function Time({
  position = 'left',
  containerStyle,
  currentMessage,
  timeFormat = _Constant.TIME_FORMAT,
  timeTextStyle
}) {
  const {
    getLocale
  } = (0, _GiftedChatContext.useChatContext)();
  if (currentMessage == null) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles[position].container, containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle[position]]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles[position].text, timeTextStyle === null || timeTextStyle === void 0 ? void 0 : timeTextStyle[position]]
  }, (0, _dayjs.default)(currentMessage.createdAt).locale(getLocale()).format(timeFormat)));
}
//# sourceMappingURL=Time.js.map