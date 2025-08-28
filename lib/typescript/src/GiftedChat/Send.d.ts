import React from 'react';
import { type StyleProp, type ViewStyle, type TextStyle, type TouchableOpacityProps, type ImageStyle, type ImageSourcePropType } from 'react-native';
import { type IMessage } from './types';
export interface SendProps<TMessage extends IMessage> {
    text?: string;
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    children?: React.ReactNode;
    alwaysShowSend?: boolean;
    iconStyle?: StyleProp<ImageStyle>;
    sendButtonProps?: Partial<TouchableOpacityProps>;
    iconSend?: ImageSourcePropType;
    onSend?(messages: Partial<TMessage> | Partial<TMessage>[], shouldResetInputToolbar: boolean): void;
    disableComposer?: boolean;
}
export declare const Send: <TMessage extends IMessage = IMessage>({ text, containerStyle, children, alwaysShowSend, sendButtonProps, onSend, iconStyle, iconSend, disableComposer, }: SendProps<TMessage>) => React.JSX.Element | null;
