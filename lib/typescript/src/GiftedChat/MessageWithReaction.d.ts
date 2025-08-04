import React from 'react';
import { type IMessage, type User } from './types';
export declare const EMOJI_REACTIONS: string[];
export interface MessageWithReactionProps {
    isVisible: boolean;
    onClose: () => void;
    message: IMessage;
    position: {
        x: number;
        y: number;
        width: number;
        height: number;
        pageX: number;
        pageY: number;
    };
    user: User;
}
export declare const MessageWithReaction: ({ isVisible, onClose, message, position, user, }: MessageWithReactionProps) => React.JSX.Element;
