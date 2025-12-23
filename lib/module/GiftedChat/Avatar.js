/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedAvatar } from './GiftedAvatar';
import { isSameUser, isSameDay } from './utils';
const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8
    },
    onTop: {
      alignSelf: 'flex-start'
    },
    image: {
      height: 36,
      width: 36,
      borderRadius: 18
    }
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8
    },
    onTop: {
      alignSelf: 'flex-start'
    },
    image: {
      height: 36,
      width: 36,
      borderRadius: 18
    }
  })
};
export function Avatar(props) {
  const {
    renderAvatarOnTop,
    showAvatarForEveryMessage,
    containerStyle,
    position,
    currentMessage,
    renderAvatar,
    previousMessage,
    nextMessage,
    imageStyle,
    onPressAvatar,
    onLongPressAvatar,
    onLayout
  } = props;
  const messageToCompare = renderAvatarOnTop ? previousMessage : nextMessage;
  const renderAvatarComponent = useCallback(() => {
    if (renderAvatar) return renderAvatar({
      renderAvatarOnTop,
      showAvatarForEveryMessage,
      containerStyle,
      position,
      currentMessage,
      previousMessage,
      nextMessage,
      imageStyle,
      onPressAvatar,
      onLongPressAvatar
    });
    if (currentMessage) return /*#__PURE__*/React.createElement(GiftedAvatar, {
      avatarStyle: [styles[position].image, imageStyle === null || imageStyle === void 0 ? void 0 : imageStyle[position]],
      user: currentMessage.user,
      onPress: () => onPressAvatar === null || onPressAvatar === void 0 ? void 0 : onPressAvatar(currentMessage.user),
      onLongPress: () => onLongPressAvatar === null || onLongPressAvatar === void 0 ? void 0 : onLongPressAvatar(currentMessage.user)
    });
    return null;
  }, [renderAvatar, renderAvatarOnTop, showAvatarForEveryMessage, containerStyle, position, currentMessage, previousMessage, nextMessage, imageStyle, onPressAvatar, onLongPressAvatar]);
  if (renderAvatar === null) return null;
  if (!showAvatarForEveryMessage && currentMessage && messageToCompare && isSameUser(currentMessage, messageToCompare) && isSameDay(currentMessage, messageToCompare)) return /*#__PURE__*/React.createElement(View, {
    style: [styles[position].container, containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle[position]]
  }, /*#__PURE__*/React.createElement(GiftedAvatar, {
    avatarStyle: [styles[position].image, imageStyle === null || imageStyle === void 0 ? void 0 : imageStyle[position]]
  }));
  return /*#__PURE__*/React.createElement(View, {
    style: [styles[position].container, renderAvatarOnTop && styles[position].onTop, containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle[position], {
      marginBottom: currentMessage !== null && currentMessage !== void 0 && currentMessage.isLast ? 12 : 0
    }],
    onLayout: onLayout
  }, renderAvatarComponent());
}
//# sourceMappingURL=Avatar.js.map