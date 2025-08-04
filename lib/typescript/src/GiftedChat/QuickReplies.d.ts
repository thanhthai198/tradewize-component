import React from 'react';
import { type StyleProp, type ViewStyle, type TextStyle } from 'react-native';
import { type IMessage, type Reply } from './types';
export interface QuickRepliesProps<TMessage extends IMessage = IMessage> {
    nextMessage?: TMessage;
    currentMessage: TMessage;
    color?: string;
    sendText?: string;
    quickReplyStyle?: StyleProp<ViewStyle>;
    quickReplyTextStyle?: StyleProp<TextStyle>;
    quickReplyContainerStyle?: StyleProp<ViewStyle>;
    onQuickReply?(reply: Reply[]): void;
    renderQuickReplySend?(): React.ReactNode;
}
export declare function QuickReplies({ currentMessage, nextMessage, color, quickReplyStyle, quickReplyTextStyle, quickReplyContainerStyle, onQuickReply, sendText, renderQuickReplySend, }: QuickRepliesProps<IMessage>): React.JSX.Element | null;
