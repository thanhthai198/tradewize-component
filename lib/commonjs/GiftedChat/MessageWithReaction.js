"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageWithReaction = exports.EMOJI_REACTIONS = void 0;
var _reactNative = require("react-native");
var _reactNativeModal = _interopRequireDefault(require("react-native-modal"));
var _blur = require("@react-native-community/blur");
var _Color = _interopRequireDefault(require("./Color"));
var _ButtonBase = require("../ButtonBase");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _MessageText = require("./MessageText");
var _react = require("react");
var _Time = require("./Time");
var _MessageFile = require("./MessageFile");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EMOJI_REACTIONS = exports.EMOJI_REACTIONS = ['❤️', '😂', '😮', '😢', '😠', '👍'];
const MessageWithReaction = ({
  isVisible,
  onClose,
  message,
  position,
  user
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
      top = position.pageY - differenceLevel - 48;
    }
    if (isMyMessage) {
      return {
        top,
        right: 16,
        width: position.width - 24,
        height: position.height
      };
    }
    return {
      top,
      left: position.pageX,
      width: position.width - 24,
      height: position.height
    };
  }, [isMyMessage, position.pageX, position.pageY, position.width, position.height, isExceedsScreenHeight, differenceLevel]);
  const styleReactionIcon = (0, _react.useCallback)(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY - (0, _utils.getScreenHeight)() * 0.05 - 8;
    } else {
      top = position.pageY - (0, _utils.getScreenHeight)() * 0.05 - differenceLevel - 56;
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
      top = position.pageY + position.height - differenceLevel - 48;
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
  const renderTime = (0, _react.useMemo)(() => /*#__PURE__*/React.createElement(_Time.Time, {
    currentMessage: message,
    position: "left"
  }), [message]);
  const renderMessage = (0, _react.useMemo)(() => /*#__PURE__*/React.createElement(_MessageText.MessageText, {
    currentMessage: message,
    position: "left"
  }), [message]);
  const renderFile = (0, _react.useMemo)(() => /*#__PURE__*/React.createElement(_MessageFile.MessageFile, {
    isReaction: true,
    currentMessage: message,
    messageWidth: {
      width: position.width + 36,
      _id: ''
    }
  }), [position.width, message]);
  return /*#__PURE__*/React.createElement(_reactNativeModal.default, {
    animationOut: 'zoomOut',
    animationIn: 'zoomInDown',
    animationOutTiming: 500,
    isVisible: isVisible,
    style: styles.modal,
    backdropOpacity: 0
  }, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    style: _reactNative.StyleSheet.absoluteFill,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(_blur.BlurView, {
    pointerEvents: "none",
    style: _reactNative.StyleSheet.absoluteFill,
    blurType: "dark",
    blurAmount: 10,
    reducedTransparencyFallbackColor: "black"
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.reactionIcon, styleReactionIcon()]
  }, EMOJI_REACTIONS === null || EMOJI_REACTIONS === void 0 ? void 0 : EMOJI_REACTIONS.map(emoji => /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    key: emoji,
    onPress: () => {},
    style: styles.reactionIconItem
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.reactionIconText
  }, emoji)))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.message, styleMessage()]
  }, renderFile, renderMessage, renderTime), /*#__PURE__*/React.createElement(_reactNative.View, {
    onLayout: onLayout,
    style: [styles.layout, styleLayoutAction()]
  }, /*#__PURE__*/React.createElement(_ButtonBase.ButtonBase, {
    style: [styles.btnAction, {
      width: (0, _utils.getScreenWidth)() * 0.5
    }, styles.btnBorderAction]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.btnActionText
  }, "Reply"), /*#__PURE__*/React.createElement(_reactNativeFastImage.default, {
    style: styles.icon,
    source: require('../assets/reply.png')
  })), /*#__PURE__*/React.createElement(_ButtonBase.ButtonBase, {
    style: [styles.btnAction]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.btnActionText
  }, "Copy"), /*#__PURE__*/React.createElement(_reactNativeFastImage.default, {
    style: styles.icon,
    source: require('../assets/copy.png')
  })), /*#__PURE__*/React.createElement(_ButtonBase.ButtonBase, {
    style: [styles.btnAction, styles.btnActionOther]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: styles.btnActionText
  }, "Other"), /*#__PURE__*/React.createElement(_reactNativeFastImage.default, {
    style: styles.icon,
    source: require('../assets/more-information.png')
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
    borderRadius: 16,
    backgroundColor: _Color.default.white,
    minWidth: (0, _utils.getScreenWidth)() * 0.15
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