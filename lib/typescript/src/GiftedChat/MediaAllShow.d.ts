import React from 'react';
import type { FileMessage } from './types';
import type { IMessage } from './types';
interface MediaAllShowProps {
    isVisible: boolean;
    onClose: () => void;
    fileMediaAll: IMessage | null;
    onPressFile?: (file: FileMessage) => void;
}
export declare function MediaAllShow({ isVisible, onClose, fileMediaAll, onPressFile, }: MediaAllShowProps): React.JSX.Element;
export {};
