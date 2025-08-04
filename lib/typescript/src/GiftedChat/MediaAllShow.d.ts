import type { FileMessage } from './types';
import type { IMessage } from './types';
interface MediaAllShowProps {
    isVisible: boolean;
    onClose: () => void;
    fileMediaAll: IMessage | null;
    onPressFile?: (file: FileMessage) => void;
}
export declare function MediaAllShow({ isVisible, onClose, fileMediaAll, onPressFile, }: MediaAllShowProps): import("react/jsx-runtime").JSX.Element;
export {};
