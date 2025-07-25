import type { SubtitleEntry } from '../types';
import { parseVtt } from '../utils';

//thanhthai198.github.io/my_cdn/subtitle/videoTest/es.vtt
export const loadSubtitles = async (
  vttUrl: string
): Promise<SubtitleEntry[]> => {
  try {
    if (!vttUrl) {
      return [];
    }
    const res = await fetch(vttUrl);

    if (!res.ok) {
      console.warn(`[Subtitle] Failed to fetch: ${res.status}`);
      return [];
    }

    const vttText = await res.text();

    if (!vttText.trim()) {
      console.warn('[Subtitle] Empty subtitle file.');
      return [];
    }

    const parsed = parseVtt(vttText);
    if (!parsed.length) {
      console.warn('[Subtitle] Parsed subtitle is empty.');
    }

    return parsed;
  } catch (err) {
    console.error('[Subtitle] Load error:', err);
    return [];
  }
};

export const isYoutubeUrl = (url: string): boolean => {
  return /(?:youtube\.com|youtu\.be)/.test(url);
};

export const extractYoutubeId = (url: string): string | null => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match && match[1] ? match[1] : null;
};
