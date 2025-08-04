import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import Color from './Color';
import { TIME_FORMAT } from './Constant';
import { useChatContext } from './GiftedChatContext';
const {
  containerStyle
} = StyleSheet.create({
  containerStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  }
});
const {
  textStyle
} = StyleSheet.create({
  textStyle: {
    fontSize: 10,
    textAlign: 'right'
  }
});
const styles = {
  left: StyleSheet.create({
    container: {
      ...containerStyle
    },
    text: {
      color: Color.timeTextColor,
      ...textStyle
    }
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle
    },
    text: {
      color: Color.white,
      ...textStyle
    }
  })
};
export function Time({
  position = 'left',
  containerStyle,
  currentMessage,
  timeFormat = TIME_FORMAT,
  timeTextStyle
}) {
  const {
    getLocale
  } = useChatContext();
  if (currentMessage == null) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles[position].container, containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle[position]]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles[position].text, timeTextStyle === null || timeTextStyle === void 0 ? void 0 : timeTextStyle[position]]
  }, dayjs(currentMessage.createdAt).locale(getLocale()).format(timeFormat)));
}
//# sourceMappingURL=Time.js.map