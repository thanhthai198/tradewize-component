import React from 'react';
import { type LayoutChangeEvent } from 'react-native';
import type { FileMessage, IMessage } from './types';
interface MessageFileProps {
    onPressFile?: (file: FileMessage, isShowAll?: boolean, arrMedia?: IMessage) => void;
    messageWidth?: {
        width: number;
        _id: string;
    } | null;
    currentMessage: IMessage;
    isReaction?: boolean;
    onLayout?: (event: LayoutChangeEvent) => void;
    onSaveThumbnail?: (file: FileMessage[]) => void;
    isShowAll?: boolean;
    onLongPressFile?: () => void;
}
export declare function MessageFile({ onPressFile, messageWidth, currentMessage, isReaction, onLayout, onSaveThumbnail, isShowAll, onLongPressFile, }: MessageFileProps): React.JSX.Element;
export {};
