import { type FileMessage, type IMessage } from './types';
import React from 'react';
interface MessageReplyProps {
    messageReply: IMessage;
    onPressFile?: (file: FileMessage, isShowAll?: boolean, arrMedia?: IMessage) => void;
    onSaveThumbnail?: (file: FileMessage[]) => void;
}
export declare function MessageReply({ messageReply, onPressFile, onSaveThumbnail, }: MessageReplyProps): React.JSX.Element;
export {};
