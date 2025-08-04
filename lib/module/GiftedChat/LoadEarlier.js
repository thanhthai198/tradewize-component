import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from './Color';
import stylesCommon from './styles';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  wrapper: {
    backgroundColor: Color.defaultColor,
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.white,
    fontSize: 12
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16,
      default: -15
    })
  }
});
export function LoadEarlier({
  isLoadingEarlier = false,
  onLoadEarlier = () => {},
  label = 'Load earlier messages',
  containerStyle,
  wrapperStyle,
  textStyle,
  activityIndicatorColor = 'white',
  activityIndicatorSize = 'small',
  activityIndicatorStyle
}) {
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.container, containerStyle],
    onPress: onLoadEarlier,
    disabled: isLoadingEarlier,
    accessibilityRole: "button"
  }, /*#__PURE__*/React.createElement(View, {
    style: [stylesCommon.centerItems, styles.wrapper, wrapperStyle]
  }, isLoadingEarlier ? /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, textStyle, {
      opacity: 0
    }]
  }, label), /*#__PURE__*/React.createElement(ActivityIndicator, {
    color: activityIndicatorColor,
    size: activityIndicatorSize,
    style: [styles.activityIndicator, activityIndicatorStyle]
  })) : /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, textStyle]
  }, label)));
}
//# sourceMappingURL=LoadEarlier.js.map