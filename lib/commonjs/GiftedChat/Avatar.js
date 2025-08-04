"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = Avatar;
var _react = require("react");
var _reactNative = require("react-native");
var _GiftedAvatar = require("./GiftedAvatar");
var _utils = require("./utils");
/* eslint-disable react-native/no-inline-styles */

const styles = {
  left: _reactNative.StyleSheet.create({
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
  right: _reactNative.StyleSheet.create({
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
function Avatar(props) {
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
  const renderAvatarComponent = (0, _react.useCallback)(() => {
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
    if (currentMessage) return /*#__PURE__*/React.createElement(_GiftedAvatar.GiftedAvatar, {
      avatarStyle: [styles[position].image, imageStyle === null || imageStyle === void 0 ? void 0 : imageStyle[position]],
      user: currentMessage.user,
      onPress: () => onPressAvatar === null || onPressAvatar === void 0 ? void 0 : onPressAvatar(currentMessage.user),
      onLongPress: () => onLongPressAvatar === null || onLongPressAvatar === void 0 ? void 0 : onLongPressAvatar(currentMessage.user)
    });
    return null;
  }, [renderAvatar, renderAvatarOnTop, showAvatarForEveryMessage, containerStyle, position, currentMessage, previousMessage, nextMessage, imageStyle, onPressAvatar, onLongPressAvatar]);
  if (renderAvatar === null) return null;
  if (!showAvatarForEveryMessage && currentMessage && messageToCompare && (0, _utils.isSameUser)(currentMessage, messageToCompare) && (0, _utils.isSameDay)(currentMessage, messageToCompare)) return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles[position].container, containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle[position]]
  }, /*#__PURE__*/React.createElement(_GiftedAvatar.GiftedAvatar, {
    avatarStyle: [styles[position].image, imageStyle === null || imageStyle === void 0 ? void 0 : imageStyle[position]]
  }));
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles[position].container, renderAvatarOnTop && styles[position].onTop, containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle[position], {
      marginBottom: currentMessage !== null && currentMessage !== void 0 && currentMessage.isLast ? 32 : 0
    }],
    onLayout: onLayout
  }, renderAvatarComponent());
}
//# sourceMappingURL=Avatar.js.map