import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';
import Color from './Color';
import FastImage from 'react-native-fast-image';
import { MessageText } from './MessageText';
import { Time } from './Time';
import { MessageFile } from './MessageFile';
import { getScreenHeight, getScreenWidth } from '../utils';
import { ButtonBase } from '../ButtonBase';
export const EMOJI_REACTIONS = ['❤️', '😂', '😮', '😢', '😠', '👍'];
const DIFFERENCE_LEVEL = 72;
export const MessageWithReaction = ({
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
  const [isExceedsScreenHeight, setIsExceedsScreenHeight] = useState(false);
  const [differenceLevel, setDifferenceLevel] = useState(0);
  const isMyMessage = ((_message$user = message.user) === null || _message$user === void 0 ? void 0 : _message$user._id) === (user === null || user === void 0 ? void 0 : user._id);
  const styleMessage = useCallback(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80 + getScreenHeight() * 0.05 + 8;
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
  const styleReactionIcon = useCallback(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY - getScreenHeight() * 0.05 - 8;
    } else {
      top = position.pageY - getScreenHeight() * 0.05 - differenceLevel - DIFFERENCE_LEVEL - 8;
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
  const styleLayoutAction = useCallback(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80 + getScreenHeight() * 0.05 + 8 + position.height;
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
  const onLayout = useCallback(e => {
    const isHeight = position.pageY + e.nativeEvent.layout.height + position.height + 139 > getScreenHeight();
    setDifferenceLevel(position.pageY + e.nativeEvent.layout.height + position.height - getScreenHeight());
    setIsExceedsScreenHeight(isHeight);
  }, [position.pageY, position.height]);
  const timeTextStyle = useMemo(() => {
    return {
      left: {
        alignSelf: 'flex-start'
      },
      right: {
        alignSelf: 'flex-end',
        color: Color.black
      }
    };
  }, []);
  const renderTime = useMemo(() => /*#__PURE__*/React.createElement(Time, {
    currentMessage: message,
    position: isMyMessage ? 'right' : 'left',
    timeTextStyle: timeTextStyle
  }), [message, timeTextStyle, isMyMessage]);
  const renderMessage = useMemo(() => {
    if (message !== null && message !== void 0 && message.text) {
      return /*#__PURE__*/React.createElement(MessageText, {
        currentMessage: message,
        position: "left"
      });
    } else {
      return null;
    }
  }, [message]);
  const renderFile = useMemo(() => {
    var _message$file, _message$file2;
    if (message !== null && message !== void 0 && (_message$file = message.file) !== null && _message$file !== void 0 && _message$file.length && (message === null || message === void 0 || (_message$file2 = message.file) === null || _message$file2 === void 0 ? void 0 : _message$file2.length) > 0) {
      return /*#__PURE__*/React.createElement(MessageFile, {
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
  return /*#__PURE__*/React.createElement(Modal, {
    animationOut: 'zoomOut',
    animationIn: 'zoomIn',
    animationInTiming: 300,
    animationOutTiming: 300,
    isVisible: isVisible,
    style: styles.modal,
    backdropOpacity: 0,
    useNativeDriver: true
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: StyleSheet.absoluteFill,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(BlurView, {
    pointerEvents: "none",
    style: [StyleSheet.absoluteFill, {
      overflow: 'hidden'
    }],
    blurType: "dark",
    blurAmount: 10,
    reducedTransparencyFallbackColor: "black"
  })), /*#__PURE__*/React.createElement(View, {
    style: [styles.reactionIcon, styleReactionIcon()]
  }, EMOJI_REACTIONS === null || EMOJI_REACTIONS === void 0 ? void 0 : EMOJI_REACTIONS.map(emoji => /*#__PURE__*/React.createElement(Pressable, {
    key: emoji,
    onPress: () => {
      var _message$_id;
      onClose();
      onReactionEmoji === null || onReactionEmoji === void 0 || onReactionEmoji(emoji, message === null || message === void 0 || (_message$_id = message._id) === null || _message$_id === void 0 ? void 0 : _message$_id.toString());
    },
    style: styles.reactionIconItem
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.reactionIconText
  }, emoji)))), /*#__PURE__*/React.createElement(View, {
    style: [styles.message, styleMessage()]
  }, renderFile, renderMessage, renderTime), /*#__PURE__*/React.createElement(View, {
    onLayout: onLayout,
    style: [styles.layout, styleLayoutAction()]
  }, /*#__PURE__*/React.createElement(ButtonBase, {
    style: [styles.btnAction, {
      width: getScreenWidth() * 0.5
    }, (message === null || message === void 0 ? void 0 : message.text) && styles.btnBorderAction],
    onPress: () => {
      onClose();
      onActionReaction === null || onActionReaction === void 0 || onActionReaction(message, 'reply');
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.btnActionText
  }, "Reply"), /*#__PURE__*/React.createElement(FastImage, {
    style: styles.icon,
    source: require('./assets/reply.png')
  })), (message === null || message === void 0 ? void 0 : message.text) && /*#__PURE__*/React.createElement(ButtonBase, {
    style: [styles.btnAction],
    onPress: () => {
      onClose();
      onActionReaction === null || onActionReaction === void 0 || onActionReaction(message, 'copy');
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.btnActionText
  }, "Copy"), /*#__PURE__*/React.createElement(FastImage, {
    style: styles.icon,
    source: require('./assets/copy.png')
  }))));
};
const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  message: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: Color.white,
    minWidth: getScreenWidth() * 0.19
  },
  layout: {
    backgroundColor: Color.white,
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
    borderTopColor: Color.defaultColor
  },
  icon: {
    width: 18,
    height: 18
  },
  btnActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.black
  },
  btnBorderAction: {
    borderBottomWidth: 1,
    borderBottomColor: Color.defaultColor
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  reactionIcon: {
    position: 'absolute',
    backgroundColor: Color.white,
    borderRadius: 16,
    zIndex: 1,
    height: getScreenHeight() * 0.05,
    width: getScreenWidth() * 0.75,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  reactionIconItem: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: (getScreenWidth() * 0.75 - 56) / 6
  },
  reactionIconText: {
    fontSize: 24
  }
});
//# sourceMappingURL=MessageWithReaction.js.map