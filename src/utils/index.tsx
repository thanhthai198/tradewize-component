import { Dimensions } from 'react-native';
import type { SubtitleEntry } from '../types';

const getScreenWidth = () => {
  return Dimensions.get('window').width;
};

const getScreenHeight = () => {
  return Dimensions.get('window').height;
};

const parseVtt = (vtt: string): SubtitleEntry[] => {
  const lines = vtt.split('\n');
  const entries: SubtitleEntry[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;

    if (line.includes('-->')) {
      const [startRaw, endRaw] = line.split('-->').map((s) => s.trim());
      if (!startRaw || !endRaw) continue;

      const start = timeToSeconds(startRaw);
      const end = timeToSeconds(endRaw);

      let text = '';
      let j = i + 1;
      while (j < lines.length && lines[j]?.trim()) {
        text += lines[j]?.trim() + ' ';
        j++;
      }

      entries.push({ start, end, text: text.trim() });
    }
  }

  return entries;
};

const timeToSeconds = (time: string): number => {
  const [hh, mm, ss] = time.split(':');
  if (!hh || !mm || !ss) return 0;

  const [s, ms] = ss.split('.');
  if (!s) return 0;

  return (
    parseInt(hh, 10) * 3600 +
    parseInt(mm, 10) * 60 +
    parseInt(s, 10) +
    parseInt(ms || '0', 10) / 1000
  );
};

export { getScreenWidth, getScreenHeight, parseVtt };
