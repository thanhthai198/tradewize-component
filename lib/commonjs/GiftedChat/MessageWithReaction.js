"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageWithReaction = exports.EMOJI_REACTIONS = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeModal = _interopRequireDefault(require("react-native-modal"));
var _blur = require("@react-native-community/blur");
var _Color = _interopRequireDefault(require("./Color"));
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _MessageText = require("./MessageText");
var _Time = require("./Time");
var _MessageFile = require("./MessageFile");
var _utils = require("../utils");
var _ButtonBase = require("../ButtonBase");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const EMOJI_REACTIONS = exports.EMOJI_REACTIONS = ['❤️', '😂', '😮', '😢', '😠', '👍'];
const DIFFERENCE_LEVEL = 72;
const MessageWithReaction = ({
  isVisible,
  onClose,
  message,
  position,
  user,
  onReactionEmoji,
  onActionReaction
}) => {
  var _message$user;
  delete message.quickReplies;
  const [isExceedsScreenHeight, setIsExceedsScreenHeight] = (0, _react.useState)(false);
  const [differenceLevel, setDifferenceLevel] = (0, _react.useState)(0);
  const isMyMessage = ((_message$user = message.user) === null || _message$user === void 0 ? void 0 : _message$user._id) === (user === null || user === void 0 ? void 0 : user._id);
  const styleMessage = (0, _react.useCallback)(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80 + (0, _utils.getScreenHeight)() * 0.05 + 8;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY;
    } else {
      top = position.pageY - differenceLevel - DIFFERENCE_LEVEL;
    }
    if (isMyMessage) {
      return {
        top,
        right: 16
      };
    }
    return {
      top,
      left: position.pageX
    };
  }, [isMyMessage, position.pageX, position.pageY, isExceedsScreenHeight, differenceLevel]);
  const styleReactionIcon = (0, _react.useCallback)(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY - (0, _utils.getScreenHeight)() * 0.05 - 8;
    } else {
      top = position.pageY - (0, _utils.getScreenHeight)() * 0.05 - differenceLevel - DIFFERENCE_LEVEL - 8;
    }
    if (isMyMessage) {
      return {
        top,
        right: 16
      };
    }
    return {
      top,
      left: position.pageX
    };
  }, [isExceedsScreenHeight, differenceLevel, position.pageY, position.pageX, isMyMessage]);
  const styleLayoutAction = (0, _react.useCallback)(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80 + (0, _utils.getScreenHeight)() * 0.05 + 8 + position.height;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY + position.height;
    } else {
      top = position.pageY + position.height - differenceLevel - DIFFERENCE_LEVEL;
    }
    if (isMyMessage) {
      return {
        top,
        right: 16
      };
    }
    return {
      top,
      left: position.pageX
    };
  }, [isMyMessage, position.pageX, position.pageY, position.height, isExceedsScreenHeight, differenceLevel]);
  const onLayout = (0, _react.useCallback)(e => {
    const isHeight = position.pageY + e.nativeEvent.layout.height + position.height + 139 > (0, _utils.getScreenHeight)();
    setDifferenceLevel(position.pageY + e.nativeEvent.layout.height + position.height - (0, _utils.getScreenHeight)());
    setIsExceedsScreenHeight(isHeight);
  }, [position.pageY, position.height]);
  const timeTextStyle = (0, _react.useMemo)(() => {
    return {
      left: {
        alignSelf: 'flex-start'
      },
      right: {
        alignSelf: 'flex-end',
        color: _Color.default.black
      }
    };
  }, []);
  const renderTime = (0, _react.useMemo)(() => /*#__PURE__*/_react.default.createElement(_Time.Time, {
    currentMessage: message,
    position: isMyMessage ? 'right' : 'left',
    timeTextStyle: timeTextStyle
  }), [message, timeTextStyle, isMyMessage]);
  const renderMessage = (0, _react.useMemo)(() => {
    if (message !== null && message !== void 0 && message.text) {
      return /*#__PURE__*/_react.default.createElement(_MessageText.MessageText, {
        currentMessage: message,
        position: "left"
      });
    } else {
      return null;
    }
  }, [message]);
  const renderFile = (0, _react.useMemo)(() => {
    var _message$file, _message$file2;
    if (message !== null && message !== void 0 && (_message$file = message.file) !== null && _message$file !== void 0 && _message$file.length && (message === null || message === void 0 || (_message$file2 = message.file) === null || _message$file2 === void 0 ? void 0 : _message$file2.length) > 0) {
      return /*#__PURE__*/_react.default.createElement(_MessageFile.MessageFile, {
        isReaction: true,
        currentMessage: message,
        messageWidth: {
          width: position.width + 36,
          _id: ''
        }
      });
    }
    return null;
  }, [position.width, message]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
    animationOut: 'zoomOut',
    animationIn: 'zoomIn',
    animationInTiming: 300,
    animationOutTiming: 300,
    isVisible: isVisible,
    style: styles.modal,
    backdropOpacity: 0,
    useNativeDriver: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: _reactNative.StyleSheet.absoluteFill,
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_blur.BlurView, {
    pointerEvents: "none",
    style: [_reactNative.StyleSheet.absoluteFill, {
      overflow: 'hidden'
    }],
    blurType: "dark",
    blurAmount: 10,
    reducedTransparencyFallbackColor: "black"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.reactionIcon, styleReactionIcon()]
  }, EMOJI_REACTIONS === null || EMOJI_REACTIONS === void 0 ? void 0 : EMOJI_REACTIONS.map(emoji => /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    key: emoji,
    onPress: () => {
      var _message$_id;
      onClose();
      onReactionEmoji === null || onReactionEmoji === void 0 || onReactionEmoji(emoji, message === null || message === void 0 || (_message$_id = message._id) === null || _message$_id === void 0 ? void 0 : _message$_id.toString());
    },
    style: styles.reactionIconItem
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.reactionIconText
  }, emoji)))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.message, styleMessage()]
  }, renderFile, renderMessage, renderTime), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onLayout: onLayout,
    style: [styles.layout, styleLayoutAction()]
  }, /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    style: [styles.btnAction, {
      width: (0, _utils.getScreenWidth)() * 0.5
    }, (message === null || message === void 0 ? void 0 : message.text) && styles.btnBorderAction],
    onPress: () => {
      onClose();
      onActionReaction === null || onActionReaction === void 0 || onActionReaction(message, 'reply');
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.btnActionText
  }, "Reply"), /*#__PURE__*/_react.default.createElement(_reactNativeFastImage.default, {
    style: styles.icon,
    source: require('./assets/reply.png')
  })), (message === null || message === void 0 ? void 0 : message.text) && /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    style: [styles.btnAction],
    onPress: () => {
      onClose();
      onActionReaction === null || onActionReaction === void 0 || onActionReaction(message, 'copy');
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.btnActionText
  }, "Copy"), /*#__PURE__*/_react.default.createElement(_reactNativeFastImage.default, {
    style: styles.icon,
    source: require('./assets/copy.png')
  }))));
};
exports.MessageWithReaction = MessageWithReaction;
const styles = _reactNative.StyleSheet.create({
  modal: {
    margin: 0
  },
  message: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: _Color.default.white,
    minWidth: (0, _utils.getScreenWidth)() * 0.19
  },
  layout: {
    backgroundColor: _Color.default.white,
    position: 'absolute',
    borderRadius: 16,
    marginTop: 8
  },
  btnAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  btnActionOther: {
    borderTopWidth: 4,
    borderTopColor: _Color.default.defaultColor
  },
  icon: {
    width: 18,
    height: 18
  },
  btnActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: _Color.default.black
  },
  btnBorderAction: {
    borderBottomWidth: 1,
    borderBottomColor: _Color.default.defaultColor
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  reactionIcon: {
    position: 'absolute',
    backgroundColor: _Color.default.white,
    borderRadius: 16,
    zIndex: 1,
    height: (0, _utils.getScreenHeight)() * 0.05,
    width: (0, _utils.getScreenWidth)() * 0.75,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  reactionIconItem: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: ((0, _utils.getScreenWidth)() * 0.75 - 56) / 6
  },
  reactionIconText: {
    fontSize: 24
  }
});
//# sourceMappingURL=MessageWithReaction.js.map