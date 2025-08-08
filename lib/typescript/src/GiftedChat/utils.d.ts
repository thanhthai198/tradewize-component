import { type FileMessage, type IMessage } from './types';
export declare function isSameDay(currentMessage: IMessage, diffMessage: IMessage | null | undefined): boolean;
export declare function isSameUser(currentMessage: IMessage, diffMessage: IMessage | null | undefined): boolean;
export declare function chunkArray<T>(array: T[], size: number): T[][];
export declare const generateThumbnails: (videoList: FileMessage[]) => Promise<{
    index: number;
    path: string;
}[]>;
export declare const formatDurationSmart: (seconds: number) => string;
export declare const normalizeFileUri: (uri: string) => string;
export declare function getFileTypeFromPath(path: string): string | null;
