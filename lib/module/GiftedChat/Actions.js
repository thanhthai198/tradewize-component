import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from './Color';
import { useChatContext } from './GiftedChatContext';
import stylesCommon from './styles';
export function Actions({
  options,
  optionTintColor = Color.optionTintColor,
  icon,
  wrapperStyle,
  iconTextStyle,
  onPressActionButton,
  containerStyle
}) {
  const {
    actionSheet
  } = useChatContext();
  const onActionsPress = useCallback(() => {
    if (!options) return;
    const optionKeys = Object.keys(options);
    const cancelButtonIndex = optionKeys.indexOf('Cancel');
    actionSheet().showActionSheetWithOptions({
      options: optionKeys,
      cancelButtonIndex,
      tintColor: optionTintColor
    }, buttonIndex => {
      var _options$key;
      if (buttonIndex === undefined) return;
      const key = optionKeys[buttonIndex];
      if (key) (_options$key = options[key]) === null || _options$key === void 0 || _options$key.call(options);
    });
  }, [actionSheet, options, optionTintColor]);
  const renderIcon = useCallback(() => {
    if (icon) return icon();
    return /*#__PURE__*/React.createElement(View, {
      style: [stylesCommon.fill, stylesCommon.centerItems, styles.wrapper, wrapperStyle]
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.iconText, iconTextStyle]
    }, '+'));
  }, [icon, iconTextStyle, wrapperStyle]);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.container, containerStyle],
    onPress: onPressActionButton || onActionsPress
  }, renderIcon());
}
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10
  },
  wrapper: {
    borderRadius: 13,
    borderColor: Color.defaultColor,
    borderWidth: 2
  },
  iconText: {
    color: Color.defaultColor,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
    backgroundColor: Color.backgroundTransparent,
    textAlign: 'center'
  }
});
//# sourceMappingURL=Actions.js.map