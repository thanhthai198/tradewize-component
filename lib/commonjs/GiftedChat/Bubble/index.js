"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _GiftedChatContext = require("../GiftedChatContext");
var _QuickReplies = require("../QuickReplies");
var _MessageText = require("../MessageText");
var _MessageAudio = require("../MessageAudio");
var _Time = require("../Time");
var _utils = require("../utils");
var _styles = _interopRequireDefault(require("../styles"));
var _styles2 = _interopRequireDefault(require("./styles"));
var _MessageFile = require("../MessageFile");
var _ButtonBase = require("../../ButtonBase");
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable react-native/no-inline-styles */ /* eslint-disable @typescript-eslint/no-shadow */
const Bubble = props => {
  const {
    currentMessage,
    nextMessage,
    position,
    containerToNextStyle,
    previousMessage,
    containerToPreviousStyle,
    onQuickReply,
    renderQuickReplySend,
    quickReplyStyle,
    quickReplyTextStyle,
    quickReplyContainerStyle,
    containerStyle,
    wrapperStyle,
    bottomContainerStyle,
    onPressFile,
    onLongPressReaction
  } = props;
  const context = (0, _GiftedChatContext.useChatContext)();
  const [messageWidth, setMessageWidth] = (0, _react.useState)(null);
  const innerRef = (0, _react.useRef)(null);
  const refArrThumbnail = (0, _react.useRef)([]);
  const onPress = (0, _react.useCallback)(() => {
    if (props.onPress) props.onPress(context, currentMessage);
  }, [context, props, currentMessage]);
  const onLongPress = (0, _react.useCallback)(() => {
    const {
      onLongPress,
      optionTitles
    } = props;
    if (onLongPress) {
      onLongPress(context, currentMessage);
      return;
    }
    if (!(optionTitles !== null && optionTitles !== void 0 && optionTitles.length)) return;
    const options = optionTitles;
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, buttonIndex => {
      console.log('onLongPress', {
        buttonIndex
      });
    });
  }, [currentMessage, context, props]);
  const styledBubbleToNext = (0, _react.useCallback)(() => {
    if (currentMessage && nextMessage && position && (0, _utils.isSameUser)(currentMessage, nextMessage) && (0, _utils.isSameDay)(currentMessage, nextMessage)) return [_styles2.default[position].containerToNext, containerToNextStyle === null || containerToNextStyle === void 0 ? void 0 : containerToNextStyle[position]];
    return null;
  }, [currentMessage, nextMessage, position, containerToNextStyle]);
  const styledBubbleToPrevious = (0, _react.useCallback)(() => {
    if (currentMessage && previousMessage && position && (0, _utils.isSameUser)(currentMessage, previousMessage) && (0, _utils.isSameDay)(currentMessage, previousMessage)) return [_styles2.default[position].containerToPrevious, containerToPreviousStyle && containerToPreviousStyle[position]];
    return null;
  }, [currentMessage, previousMessage, position, containerToPreviousStyle]);
  const renderQuickReplies = (0, _react.useCallback)(() => {
    if (currentMessage !== null && currentMessage !== void 0 && currentMessage.quickReplies) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
        containerStyle,
        wrapperStyle,
        ...quickReplyProps
      } = props;
      if (props.renderQuickReplies) return props.renderQuickReplies(quickReplyProps);
      return /*#__PURE__*/React.createElement(_QuickReplies.QuickReplies, {
        currentMessage: currentMessage,
        onQuickReply: onQuickReply,
        renderQuickReplySend: renderQuickReplySend,
        quickReplyStyle: quickReplyStyle,
        quickReplyTextStyle: quickReplyTextStyle,
        quickReplyContainerStyle: quickReplyContainerStyle,
        nextMessage: nextMessage
      });
    }
    return null;
  }, [currentMessage, onQuickReply, renderQuickReplySend, quickReplyStyle, quickReplyTextStyle, quickReplyContainerStyle, nextMessage, props]);
  const onSaveThumbnail = (0, _react.useCallback)(file => {
    refArrThumbnail.current = file;
  }, []);
  const renderMessageText = (0, _react.useCallback)(() => {
    if (currentMessage !== null && currentMessage !== void 0 && currentMessage.text) {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        containerStyle,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        wrapperStyle,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        optionTitles,
        ...messageTextProps
      } = props;
      if (props.renderMessageText) return props.renderMessageText(messageTextProps);
      return /*#__PURE__*/React.createElement(_MessageText.MessageText, messageTextProps);
    }
    return null;
  }, [props, currentMessage]);
  const renderMessageFile = (0, _react.useCallback)(() => {
    if (!(currentMessage !== null && currentMessage !== void 0 && currentMessage.file)) return null;
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      containerStyle,
      wrapperStyle,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...messageFileProps
    } = props;
    if (props.renderCustomMessageFile) return props.renderCustomMessageFile(messageFileProps);
    return /*#__PURE__*/React.createElement(_MessageFile.MessageFile, _extends({
      onSaveThumbnail: onSaveThumbnail,
      onPressFile: onPressFile,
      messageWidth: messageWidth
    }, messageFileProps));
  }, [currentMessage, props, messageWidth, onPressFile, onSaveThumbnail]);
  const renderMessageAudio = (0, _react.useCallback)(() => {
    if (!(currentMessage !== null && currentMessage !== void 0 && currentMessage.audio)) return null;
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      containerStyle,
      wrapperStyle,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...messageAudioProps
    } = props;
    if (props.renderMessageAudio) return props.renderMessageAudio(messageAudioProps);
    return /*#__PURE__*/React.createElement(_MessageAudio.MessageAudio, null);
  }, [props, currentMessage]);
  const renderTicks = (0, _react.useCallback)(() => {
    const {
      renderTicks,
      user
    } = props;
    if (renderTicks && currentMessage) return renderTicks(currentMessage);
    if (user && currentMessage !== null && currentMessage !== void 0 && currentMessage.user && currentMessage.user._id !== user._id) return null;
    if (currentMessage && (currentMessage.sent || currentMessage.received || currentMessage.pending)) return /*#__PURE__*/React.createElement(_reactNative.View, {
      style: _styles2.default.content.tickView
    }, !!currentMessage.sent && /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: [_styles2.default.content.tick, props.tickStyle]
    }, '✓'), !!currentMessage.received && /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: [_styles2.default.content.tick, props.tickStyle]
    }, '✓'), !!currentMessage.pending && /*#__PURE__*/React.createElement(_reactNative.Text, {
      style: [_styles2.default.content.tick, props.tickStyle]
    }, '🕓'));
    return null;
  }, [props, currentMessage]);
  const renderTime = (0, _react.useCallback)(() => {
    if (currentMessage !== null && currentMessage !== void 0 && currentMessage.createdAt) {
      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        containerStyle,
        wrapperStyle,
        textStyle,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...timeProps
      } = props;
      if (props.renderTime) return props.renderTime(timeProps);
      return /*#__PURE__*/React.createElement(_Time.Time, timeProps);
    }
    return null;
  }, [props, currentMessage]);
  const renderUsername = (0, _react.useCallback)(() => {
    const {
      user,
      renderUsername
    } = props;
    if (props.renderUsernameOnMessage && currentMessage) {
      if (user && currentMessage.user._id === user._id) return null;
      if (renderUsername) return renderUsername(currentMessage.user);
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        style: _styles2.default.content.usernameView
      }, /*#__PURE__*/React.createElement(_reactNative.Text, {
        style: [_styles2.default.content.username, props.usernameStyle]
      }, '~ ', currentMessage.user.name));
    }
    return null;
  }, [currentMessage, props]);
  const renderCustomView = (0, _react.useCallback)(() => {
    if (props.renderCustomView) return props.renderCustomView(props);
    return null;
  }, [props]);
  const renderBubbleContent = (0, _react.useCallback)(() => {
    return /*#__PURE__*/React.createElement(_reactNative.View, null, !props.isCustomViewBottom && renderCustomView(), renderMessageFile(), renderMessageAudio(), renderMessageText(), props.isCustomViewBottom && renderCustomView());
  }, [renderCustomView, renderMessageAudio, renderMessageText, props.isCustomViewBottom, renderMessageFile]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_styles.default.fill, _styles2.default[position].container, containerStyle && containerStyle[position], {
      marginBottom: currentMessage !== null && currentMessage !== void 0 && currentMessage.isLast ? 32 : 8,
      maxWidth: '90%'
    }],
    onLayout: e => {
      if (currentMessage !== null && currentMessage !== void 0 && currentMessage._id) {
        setMessageWidth({
          width: e.nativeEvent.layout.width,
          _id: currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage._id.toString()
        });
      }
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_styles2.default[position].wrapper, styledBubbleToNext(), styledBubbleToPrevious(), wrapperStyle && wrapperStyle[position]]
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableWithoutFeedback, _extends({
    onPress: onPress,
    onLongPress: onLongPress
  }, props.touchableProps), /*#__PURE__*/React.createElement(_ButtonBase.ButtonBase, {
    onLongPress: () => {
      if (innerRef.current) {
        const node = (0, _reactNative.findNodeHandle)(innerRef.current);
        if (node) {
          _reactNative.UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
            const message = {
              ...currentMessage,
              file: refArrThumbnail === null || refArrThumbnail === void 0 ? void 0 : refArrThumbnail.current
            };
            onLongPressReaction === null || onLongPressReaction === void 0 || onLongPressReaction(message, {
              x,
              y,
              width,
              height,
              pageX,
              pageY
            });
          });
        }
      }
    }
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    ref: innerRef
  }, renderBubbleContent(), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_styles2.default[position].bottom, bottomContainerStyle === null || bottomContainerStyle === void 0 ? void 0 : bottomContainerStyle[position]]
  }, renderUsername(), renderTime(), renderTicks()))))), renderQuickReplies());
};
var _default = exports.default = Bubble;
//# sourceMappingURL=index.js.map