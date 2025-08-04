import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Color from './Color';
import stylesCommon from './styles';
const {
  carrot,
  emerald,
  peterRiver,
  wisteria,
  alizarin,
  turquoise,
  midnightBlue
} = Color;
const styles = StyleSheet.create({
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatarTransparent: {
    backgroundColor: Color.backgroundTransparent
  },
  textStyle: {
    color: Color.white,
    fontSize: 16,
    backgroundColor: Color.backgroundTransparent,
    fontWeight: '500'
  }
});
export function GiftedAvatar(props) {
  const [avatarName, setAvatarName] = useState(undefined);
  const [backgroundColor, setBackgroundColor] = useState(undefined);
  const {
    user,
    avatarStyle,
    textStyle,
    onPress
  } = props;
  const setAvatarColor = useCallback(() => {
    var _name$, _name$2, _name$3;
    if (backgroundColor) return;
    const userName = (user === null || user === void 0 ? void 0 : user.name) || '';
    const name = userName.toUpperCase().split(' ');
    if (name.length === 1) setAvatarName(`${(_name$ = name[0]) === null || _name$ === void 0 ? void 0 : _name$.charAt(0)}`);else if (name.length > 1) setAvatarName(`${(_name$2 = name[0]) === null || _name$2 === void 0 ? void 0 : _name$2.charAt(0)}${(_name$3 = name[1]) === null || _name$3 === void 0 ? void 0 : _name$3.charAt(0)}`);else setAvatarName('');
    let sumChars = 0;
    for (let i = 0; i < userName.length; i += 1) sumChars += userName.charCodeAt(i);

    // inspired by https://github.com/wbinnssmith/react-user-avatar
    // colors from https://flatuicolors.com/
    const colors = [carrot, emerald, peterRiver, wisteria, alizarin, turquoise, midnightBlue];
    setBackgroundColor(colors[sumChars % colors.length]);
  }, [user === null || user === void 0 ? void 0 : user.name, backgroundColor]);
  const renderAvatar = useCallback(() => {
    switch (typeof (user === null || user === void 0 ? void 0 : user.avatar)) {
      case 'function':
        return user.avatar([stylesCommon.centerItems, styles.avatarStyle, avatarStyle]);
      case 'string':
        return /*#__PURE__*/React.createElement(Image, {
          source: {
            uri: user.avatar
          },
          style: [stylesCommon.centerItems, styles.avatarStyle, avatarStyle]
        });
      case 'number':
        return /*#__PURE__*/React.createElement(Image, {
          source: user.avatar,
          style: [stylesCommon.centerItems, styles.avatarStyle, avatarStyle]
        });
      default:
        return null;
    }
  }, [user, avatarStyle]);
  const renderInitials = useCallback(() => {
    return /*#__PURE__*/React.createElement(Text, {
      style: [styles.textStyle, textStyle]
    }, avatarName);
  }, [textStyle, avatarName]);
  const handleOnPress = () => {
    const {
      onPress,
      ...rest
    } = props;
    if (onPress) onPress(rest);
  };
  const handleOnLongPress = () => {
    const {
      onLongPress,
      ...rest
    } = props;
    if (onLongPress) onLongPress(rest);
  };
  useEffect(() => {
    setAvatarColor();
  }, [setAvatarColor]);
  if (!user || !user.name && !user.avatar)
    // render placeholder
    return /*#__PURE__*/React.createElement(View, {
      style: [stylesCommon.centerItems, styles.avatarStyle, styles.avatarTransparent, avatarStyle],
      accessibilityRole: "image"
    });
  if (user.avatar) return /*#__PURE__*/React.createElement(TouchableOpacity, {
    disabled: !onPress,
    onPress: handleOnPress,
    onLongPress: handleOnLongPress,
    accessibilityRole: "image"
  }, renderAvatar());
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    disabled: !onPress,
    onPress: handleOnPress,
    onLongPress: handleOnLongPress,
    style: [stylesCommon.centerItems, styles.avatarStyle, {
      backgroundColor
    }, avatarStyle],
    accessibilityRole: "image"
  }, renderInitials());
}
//# sourceMappingURL=GiftedAvatar.js.map