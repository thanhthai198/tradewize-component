import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { StyleSheet, Pressable, Text, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay } from 'react-native-reanimated';
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
  onActionReaction,
  isShowEmoji = true
}) => {
  var _message$user, _message$user3, _message$user4;
  delete message.quickReplies;
  const [isExceedsScreenHeight, setIsExceedsScreenHeight] = useState(false);
  const [differenceLevel, setDifferenceLevel] = useState(0);
  const isMyMessage = ((_message$user = message.user) === null || _message$user === void 0 ? void 0 : _message$user._id) === (user === null || user === void 0 ? void 0 : user._id);

  // Animation values
  const overlayOpacity = useSharedValue(0);
  const messageScale = useSharedValue(0.8);
  const messageOpacity = useSharedValue(0);
  const reactionIconOpacity = useSharedValue(0);
  const actionButtonsOpacity = useSharedValue(0);

  // Animation effects
  useEffect(() => {
    if (isVisible) {
      var _message$user2;
      // Start entrance animations
      overlayOpacity.value = withTiming(0.9, {
        duration: 30
      });
      messageScale.value = withSpring(1, {
        damping: 30,
        stiffness: 500
      });
      messageOpacity.value = withTiming(1, {
        duration: 30
      });

      // Staggered animations for reaction icons
      if (isShowEmoji && (user === null || user === void 0 ? void 0 : user._id) !== (message === null || message === void 0 || (_message$user2 = message.user) === null || _message$user2 === void 0 ? void 0 : _message$user2._id)) {
        reactionIconOpacity.value = withDelay(30, withTiming(1, {
          duration: 30
        }));
      }

      // Staggered animations for action buttons
      actionButtonsOpacity.value = withDelay(60, withTiming(1, {
        duration: 30
      }));
    } else {
      // Reset animations when closing
      overlayOpacity.value = 0;
      messageScale.value = 0.8;
      messageOpacity.value = 0;
      reactionIconOpacity.value = 0;
      actionButtonsOpacity.value = 0;
    }
  }, [isVisible, isShowEmoji, user === null || user === void 0 ? void 0 : user._id, message === null || message === void 0 || (_message$user3 = message.user) === null || _message$user3 === void 0 ? void 0 : _message$user3._id, isMyMessage, overlayOpacity, messageScale, messageOpacity, reactionIconOpacity, actionButtonsOpacity]);

  // Animated styles
  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value
  }));
  const messageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: messageScale.value
    }],
    opacity: messageOpacity.value
  }));
  const reactionIconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: reactionIconOpacity.value
  }));
  const actionButtonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: actionButtonsOpacity.value
  }));
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
    visible: isVisible,
    style: styles.modal,
    transparent: true,
    animationType: "none"
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: StyleSheet.absoluteFill
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: StyleSheet.absoluteFill,
    onPress: onClose
  }), /*#__PURE__*/React.createElement(Animated.View, {
    style: [StyleSheet.absoluteFill, styles.overlay, overlayAnimatedStyle],
    pointerEvents: "none"
  }), isShowEmoji && (user === null || user === void 0 ? void 0 : user._id) !== (message === null || message === void 0 || (_message$user4 = message.user) === null || _message$user4 === void 0 ? void 0 : _message$user4._id) && /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.reactionIcon, styleReactionIcon(), reactionIconAnimatedStyle]
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
  }, emoji)))), /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.message, styleMessage(), messageAnimatedStyle]
  }, renderFile, renderMessage, renderTime), /*#__PURE__*/React.createElement(Animated.View, {
    onLayout: onLayout,
    style: [styles.layout, styleLayoutAction(), actionButtonsAnimatedStyle]
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
  })))));
};
const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  message: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: Color.white,
    minWidth: getScreenWidth() * 0.19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  layout: {
    backgroundColor: Color.white,
    position: 'absolute',
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6
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
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6
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