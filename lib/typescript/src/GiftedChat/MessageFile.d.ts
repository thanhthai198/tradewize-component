import { type LayoutChangeEvent } from 'react-native';
import type { FileMessage, IMessage } from './types';
interface MessageFileProps {
    onPressFile?: (file: FileMessage, isShowAll?: boolean, arrMedia?: IMessage) => void;
    messageWidth: {
        width: number;
        _id: string;
    } | null;
    currentMessage: IMessage;
    isReaction?: boolean;
    onLayout?: (event: LayoutChangeEvent) => void;
    onSaveThumbnail?: (file: FileMessage[]) => void;
    isShowAll?: boolean;
}
export declare function MessageFile({ onPressFile, messageWidth, currentMessage, isReaction, onLayout, onSaveThumbnail, isShowAll, }: MessageFileProps): import("react/jsx-runtime").JSX.Element | null;
export {};
