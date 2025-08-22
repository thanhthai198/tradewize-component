"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageReply = MessageReply;
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("./Color"));
var _MessageFile = require("./MessageFile");
var _MessageText = require("./MessageText");
var _utils = require("../utils");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MessageReply({
  messageReply,
  onPressFile,
  onSaveThumbnail
}) {
  var _messageReply$file;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, (messageReply === null || messageReply === void 0 || (_messageReply$file = messageReply.file) === null || _messageReply$file === void 0 ? void 0 : _messageReply$file.length) && /*#__PURE__*/_react.default.createElement(_MessageFile.MessageFile, {
    onPressFile: onPressFile,
    onSaveThumbnail: onSaveThumbnail,
    currentMessage: messageReply,
    messageWidth: {
      width: (0, _utils.getScreenWidth)() * 0.9,
      _id: '1'
    }
  }), !(messageReply !== null && messageReply !== void 0 && messageReply.text) && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.space
  }), (messageReply === null || messageReply === void 0 ? void 0 : messageReply.text) && /*#__PURE__*/_react.default.createElement(_MessageText.MessageText, {
    currentMessage: messageReply,
    position: "left",
    customTextStyle: {
      color: _Color.default.black
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.space
  }));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    minWidth: (0, _utils.getScreenWidth)() * 0.12,
    borderRadius: 8,
    marginBottom: -4,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.05)'
  },
  space: {
    height: 4
  }
});
//# sourceMappingURL=MessageReply.js.map