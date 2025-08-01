import { type ReactNode, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Color from './Color';
import { useChatContext } from './GiftedChatContext';

import stylesCommon from './styles';

export interface ActionsProps {
  options?: { [key: string]: () => void };
  optionTintColor?: string;
  icon?: () => ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  iconTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPressActionButton?(): void;
}

export function Actions({
  options,
  optionTintColor = Color.optionTintColor,
  icon,
  wrapperStyle,
  iconTextStyle,
  onPressActionButton,
  containerStyle,
}: ActionsProps) {
  const { actionSheet } = useChatContext();

  const onActionsPress = useCallback(() => {
    if (!options) return;

    const optionKeys = Object.keys(options);
    const cancelButtonIndex = optionKeys.indexOf('Cancel');

    actionSheet().showActionSheetWithOptions(
      {
        options: optionKeys,
        cancelButtonIndex,
        tintColor: optionTintColor,
      },
      (buttonIndex: number | undefined) => {
        if (buttonIndex === undefined) return;

        const key = optionKeys[buttonIndex];
        if (key) options[key]?.();
      }
    );
  }, [actionSheet, options, optionTintColor]);

  const renderIcon = useCallback(() => {
    if (icon) return icon();

    return (
      <View
        style={[
          stylesCommon.fill,
          stylesCommon.centerItems,
          styles.wrapper,
          wrapperStyle,
        ]}
      >
        <Text style={[styles.iconText, iconTextStyle]}>{'+'}</Text>
      </View>
    );
  }, [icon, iconTextStyle, wrapperStyle]);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPressActionButton || onActionsPress}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: Color.defaultColor,
    borderWidth: 2,
  },
  iconText: {
    color: Color.defaultColor,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16,
    backgroundColor: Color.backgroundTransparent,
    textAlign: 'center',
  },
});
