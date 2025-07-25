import type { SubtitleEntry } from '../types';
export declare const loadSubtitles: (vttUrl: string) => Promise<SubtitleEntry[]>;
export declare const isYoutubeUrl: (url: string) => boolean;
export declare const extractYoutubeId: (url: string) => string | null;
