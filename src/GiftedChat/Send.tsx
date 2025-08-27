import React, { useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
  Image,
  type ImageStyle,
  type ImageSourcePropType,
} from 'react-native';

import Color from './Color';
import { type IMessage } from './types';
import { TEST_ID } from './Constant';
import { ButtonBase } from '../ButtonBase';

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: Color.backgroundTransparent,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

export interface SendProps<TMessage extends IMessage> {
  text?: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  alwaysShowSend?: boolean;
  disabled?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  sendButtonProps?: Partial<TouchableOpacityProps>;
  iconSend?: ImageSourcePropType;
  onSend?(
    messages: Partial<TMessage> | Partial<TMessage>[],
    shouldResetInputToolbar: boolean
  ): void;
}

export const Send = <TMessage extends IMessage = IMessage>({
  text,
  containerStyle,
  children,
  alwaysShowSend = false,
  disabled = false,
  sendButtonProps,
  onSend,
  iconStyle,
  iconSend,
}: SendProps<TMessage>) => {
  const handleOnPress = useCallback(() => {
    onSend?.({ text: text?.trim() } as Partial<TMessage>, true);
  }, [text, onSend]);

  const showSend = useMemo(
    () => alwaysShowSend || (text && text.trim().length > 0),
    [alwaysShowSend, text]
  );

  if (!showSend) return null;
  return (
    <ButtonBase
      testID={TEST_ID.SEND_TOUCHABLE}
      accessible
      accessibilityLabel="send"
      style={[styles.container, containerStyle]}
      onPress={handleOnPress}
      disabled={disabled}
      {...sendButtonProps}
    >
      <View>
        {children || (
          <Image
            source={iconSend ? iconSend : require('./assets/send.png')}
            style={[{ width: 24, height: 24 }, iconStyle]}
            tintColor={Color.defaultBlue}
          />
        )}
      </View>
    </ButtonBase>
  );
};
