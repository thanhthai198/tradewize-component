import { Dimensions } from 'react-native';
const getScreenWidth = () => {
  return Dimensions.get('window').width;
};
const getScreenHeight = () => {
  return Dimensions.get('window').height;
};
const parseVtt = vtt => {
  const lines = vtt.split('\n');
  const entries = [];
  for (let i = 0; i < lines.length; i++) {
    var _lines$i;
    const line = (_lines$i = lines[i]) === null || _lines$i === void 0 ? void 0 : _lines$i.trim();
    if (!line) continue;
    if (line.includes('-->')) {
      const [startRaw, endRaw] = line.split('-->').map(s => s.trim());
      if (!startRaw || !endRaw) continue;
      const start = timeToSeconds(startRaw);
      const end = timeToSeconds(endRaw);
      let text = '';
      let j = i + 1;
      while (j < lines.length && (_lines$j = lines[j]) !== null && _lines$j !== void 0 && _lines$j.trim()) {
        var _lines$j, _lines$j2;
        text += ((_lines$j2 = lines[j]) === null || _lines$j2 === void 0 ? void 0 : _lines$j2.trim()) + ' ';
        j++;
      }
      entries.push({
        start,
        end,
        text: text.trim()
      });
    }
  }
  return entries;
};
const timeToSeconds = time => {
  const [hh, mm, ss] = time.split(':');
  if (!hh || !mm || !ss) return 0;
  const [s, ms] = ss.split('.');
  if (!s) return 0;
  return parseInt(hh, 10) * 3600 + parseInt(mm, 10) * 60 + parseInt(s, 10) + parseInt(ms || '0', 10) / 1000;
};
export { getScreenWidth, getScreenHeight, parseVtt };
//# sourceMappingURL=index.js.map