import { type FileMessage, type IMessage } from './types';
interface MessageReplyProps {
    messageReply: IMessage;
    onPressFile?: (file: FileMessage, isShowAll?: boolean, arrMedia?: IMessage) => void;
    onSaveThumbnail?: (file: FileMessage[]) => void;
}
export declare const MessageReply: ({ messageReply, onPressFile, onSaveThumbnail, }: MessageReplyProps) => JSX.Element;
export {};
