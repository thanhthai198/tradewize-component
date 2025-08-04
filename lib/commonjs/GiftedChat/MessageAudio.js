"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageAudio = MessageAudio;
var _react = _interopRequireDefault(require("react"));
var _Color = _interopRequireDefault(require("./Color"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MessageAudio() {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: _Color.default.alizarin,
      fontWeight: '600'
    }
  }, 'Audio is not implemented by GiftedChat.'), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: _Color.default.alizarin,
      fontWeight: '600'
    }
  }, '\nYou need to provide your own implementation by using renderMessageAudio prop.'));
}
//# sourceMappingURL=MessageAudio.js.map