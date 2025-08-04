import { View, StyleSheet, Pressable, Text } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';
import Color from './Color';
import { ButtonBase } from '../ButtonBase';
import FastImage from 'react-native-fast-image';
import { MessageText } from './MessageText';
import { useCallback, useMemo, useState } from 'react';
import { Time } from './Time';
import { MessageFile } from './MessageFile';
import { getScreenHeight, getScreenWidth } from '../utils';
export const EMOJI_REACTIONS = ['❤️', '😂', '😮', '😢', '😠', '👍'];
export const MessageWithReaction = ({
  isVisible,
  onClose,
  message,
  position,
  user
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
  const styleReactionIcon = useCallback(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY - getScreenHeight() * 0.05 - 8;
    } else {
      top = position.pageY - getScreenHeight() * 0.05 - differenceLevel - 56;
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
  const onLayout = useCallback(e => {
    const isHeight = position.pageY + e.nativeEvent.layout.height + position.height + 139 > getScreenHeight();
    setDifferenceLevel(position.pageY + e.nativeEvent.layout.height + position.height - getScreenHeight());
    setIsExceedsScreenHeight(isHeight);
  }, [position.pageY, position.height]);
  const renderTime = useMemo(() => /*#__PURE__*/React.createElement(Time, {
    currentMessage: message,
    position: "left"
  }), [message]);
  const renderMessage = useMemo(() => /*#__PURE__*/React.createElement(MessageText, {
    currentMessage: message,
    position: "left"
  }), [message]);
  const renderFile = useMemo(() => /*#__PURE__*/React.createElement(MessageFile, {
    isReaction: true,
    currentMessage: message,
    messageWidth: {
      width: position.width + 36,
      _id: ''
    }
  }), [position.width, message]);
  return /*#__PURE__*/React.createElement(Modal, {
    animationOut: 'zoomOut',
    animationIn: 'zoomInDown',
    animationOutTiming: 500,
    isVisible: isVisible,
    style: styles.modal,
    backdropOpacity: 0
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: StyleSheet.absoluteFill,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(BlurView, {
    pointerEvents: "none",
    style: StyleSheet.absoluteFill,
    blurType: "dark",
    blurAmount: 10,
    reducedTransparencyFallbackColor: "black"
  })), /*#__PURE__*/React.createElement(View, {
    style: [styles.reactionIcon, styleReactionIcon()]
  }, EMOJI_REACTIONS === null || EMOJI_REACTIONS === void 0 ? void 0 : EMOJI_REACTIONS.map(emoji => /*#__PURE__*/React.createElement(Pressable, {
    key: emoji,
    onPress: () => {},
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
    }, styles.btnBorderAction]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.btnActionText
  }, "Reply"), /*#__PURE__*/React.createElement(FastImage, {
    style: styles.icon,
    source: require('../assets/reply.png')
  })), /*#__PURE__*/React.createElement(ButtonBase, {
    style: [styles.btnAction]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.btnActionText
  }, "Copy"), /*#__PURE__*/React.createElement(FastImage, {
    style: styles.icon,
    source: require('../assets/copy.png')
  })), /*#__PURE__*/React.createElement(ButtonBase, {
    style: [styles.btnAction, styles.btnActionOther]
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.btnActionText
  }, "Other"), /*#__PURE__*/React.createElement(FastImage, {
    style: styles.icon,
    source: require('../assets/more-information.png')
  }))));
};
const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  message: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 16,
    backgroundColor: Color.white,
    minWidth: getScreenWidth() * 0.15
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