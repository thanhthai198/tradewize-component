"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageReply = void 0;
var _reactNative = _interopRequireWildcard(require("react-native"));
var _Color = _interopRequireDefault(require("./Color"));
var _MessageFile = require("./MessageFile");
var _MessageText = require("./MessageText");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const {
  width
} = _reactNative.Dimensions.get('window');
const MessageReply = ({
  messageReply,
  onPressFile,
  onSaveThumbnail
}) => {
  var _messageReply$file;
  return /*#__PURE__*/_reactNative.default.createElement(_reactNative.View, {
    style: styles.container
  }, (messageReply === null || messageReply === void 0 || (_messageReply$file = messageReply.file) === null || _messageReply$file === void 0 ? void 0 : _messageReply$file.length) && /*#__PURE__*/_reactNative.default.createElement(_MessageFile.MessageFile, {
    onPressFile: onPressFile,
    onSaveThumbnail: onSaveThumbnail,
    currentMessage: messageReply,
    messageWidth: {
      width: width * 0.9,
      _id: '1'
    }
  }), !messageReply.text && /*#__PURE__*/_reactNative.default.createElement(_reactNative.View, {
    style: styles.space
  }), messageReply.text && /*#__PURE__*/_reactNative.default.createElement(_MessageText.MessageText, {
    currentMessage: messageReply,
    position: "left",
    customTextStyle: {
      color: _Color.default.black
    }
  }), /*#__PURE__*/_reactNative.default.createElement(_reactNative.View, {
    style: styles.space
  }));
};
exports.MessageReply = MessageReply;
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: _Color.default.leftBubbleBackground,
    minWidth: width * 0.12,
    borderRadius: 16,
    marginBottom: -4
  },
  space: {
    height: 4
  }
});
//# sourceMappingURL=MessageReply.js.map