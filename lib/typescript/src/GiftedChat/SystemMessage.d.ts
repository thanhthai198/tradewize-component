import React from 'react';
import { type ViewStyle, type StyleProp, type TextStyle } from 'react-native';
import { type IMessage } from './types';
export interface SystemMessageProps<TMessage extends IMessage> {
    currentMessage: TMessage;
    containerStyle?: StyleProp<ViewStyle>;
    wrapperStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    children?: React.ReactNode;
}
export declare function SystemMessage<TMessage extends IMessage = IMessage>({ currentMessage, containerStyle, wrapperStyle, textStyle, children, }: SystemMessageProps<TMessage>): import("react/jsx-runtime").JSX.Element | null;
