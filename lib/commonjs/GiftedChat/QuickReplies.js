"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickReplies = QuickReplies;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("./Color"));
var _logging = require("./logging");
var _styles = _interopRequireDefault(require("./styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 300
  },
  quickReply: {
    borderWidth: 1,
    maxWidth: 200,
    paddingVertical: 7,
    paddingHorizontal: 12,
    minHeight: 50,
    borderRadius: 13,
    margin: 3
  },
  quickReplyText: {
    overflow: 'visible'
  },
  sendLink: {
    borderWidth: 0
  },
  sendLinkText: {
    color: _Color.default.defaultBlue,
    fontWeight: '600',
    fontSize: 17
  }
});
const sameReply = currentReply => reply => currentReply.value === reply.value;
const diffReply = currentReply => reply => currentReply.value !== reply.value;
function QuickReplies({
  currentMessage,
  nextMessage,
  color = _Color.default.peterRiver,
  quickReplyStyle,
  quickReplyTextStyle,
  quickReplyContainerStyle,
  onQuickReply,
  sendText = 'Send',
  renderQuickReplySend
}) {
  const {
    type
  } = currentMessage.quickReplies;
  const [replies, setReplies] = (0, _react.useState)([]);
  const shouldComponentDisplay = (0, _react.useMemo)(() => {
    const hasReplies = !!currentMessage && !!currentMessage.quickReplies;
    const hasNext = !!nextMessage && !!nextMessage._id;
    const keepIt = currentMessage.quickReplies.keepIt;
    if (hasReplies && !hasNext) return true;
    if (hasReplies && hasNext && keepIt) return true;
    return false;
  }, [currentMessage, nextMessage]);
  const handleSend = (0, _react.useCallback)(repliesData => () => {
    onQuickReply === null || onQuickReply === void 0 || onQuickReply(repliesData.map(reply => ({
      ...reply,
      messageId: currentMessage._id
    })));
  }, [onQuickReply, currentMessage]);
  const handlePress = (0, _react.useCallback)(reply => () => {
    if (currentMessage) {
      const {
        type
      } = currentMessage.quickReplies;
      switch (type) {
        case 'radio':
          {
            handleSend([reply])();
            return;
          }
        case 'checkbox':
          {
            if (replies.find(sameReply(reply))) setReplies(replies.filter(diffReply(reply)));else setReplies([...replies, reply]);
            return;
          }
        default:
          {
            (0, _logging.warning)(`onQuickReply unknown type: ${type}`);
          }
      }
    }
  }, [replies, currentMessage, handleSend]);
  if (!shouldComponentDisplay) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, quickReplyContainerStyle]
  }, currentMessage.quickReplies.values.map((reply, index) => {
    const selected = type === 'checkbox' && replies.find(sameReply(reply));
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: handlePress(reply),
      style: [_styles.default.centerItems, styles.quickReply, quickReplyStyle, {
        borderColor: color
      }, selected && {
        backgroundColor: color
      }],
      key: `${reply.value}-${index}`
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      numberOfLines: 10,
      ellipsizeMode: "tail",
      style: [styles.quickReplyText, {
        color: selected ? _Color.default.white : color
      }, quickReplyTextStyle]
    }, reply.title));
  }), replies.length > 0 && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [_styles.default.centerItems, styles.quickReply, styles.sendLink],
    onPress: handleSend(replies)
  }, (renderQuickReplySend === null || renderQuickReplySend === void 0 ? void 0 : renderQuickReplySend()) || /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.sendLinkText
  }, sendText)));
}
//# sourceMappingURL=QuickReplies.js.map