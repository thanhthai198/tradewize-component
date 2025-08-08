import React, { Dimensions, StyleSheet, View } from 'react-native';
import Color from './Color';
import { MessageFile } from './MessageFile';
import { MessageText } from './MessageText';
const {
  width
} = Dimensions.get('window');
export const MessageReply = ({
  messageReply,
  onPressFile,
  onSaveThumbnail
}) => {
  var _messageReply$file;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, (messageReply === null || messageReply === void 0 || (_messageReply$file = messageReply.file) === null || _messageReply$file === void 0 ? void 0 : _messageReply$file.length) && /*#__PURE__*/React.createElement(MessageFile, {
    onPressFile: onPressFile,
    onSaveThumbnail: onSaveThumbnail,
    currentMessage: messageReply,
    messageWidth: {
      width: width * 0.9,
      _id: '1'
    }
  }), !(messageReply !== null && messageReply !== void 0 && messageReply.text) && /*#__PURE__*/React.createElement(View, {
    style: styles.space
  }), (messageReply === null || messageReply === void 0 ? void 0 : messageReply.text) && /*#__PURE__*/React.createElement(MessageText, {
    currentMessage: messageReply,
    position: "left",
    customTextStyle: {
      color: Color.black
    }
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.space
  }));
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.leftBubbleBackground,
    minWidth: width * 0.12,
    borderRadius: 16,
    marginBottom: -4
  },
  space: {
    height: 4
  }
});
//# sourceMappingURL=MessageReply.js.map