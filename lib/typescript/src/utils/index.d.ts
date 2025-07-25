import type { SubtitleEntry } from '../types';
declare const getScreenWidth: () => number;
declare const getScreenHeight: () => number;
declare const parseVtt: (vtt: string) => SubtitleEntry[];
export { getScreenWidth, getScreenHeight, parseVtt };
