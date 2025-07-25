"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSubtitles = exports.isYoutubeUrl = exports.extractYoutubeId = void 0;
var _utils = require("../utils");
//thanhthai198.github.io/my_cdn/subtitle/videoTest/es.vtt
const loadSubtitles = async vttUrl => {
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
    const parsed = (0, _utils.parseVtt)(vttText);
    if (!parsed.length) {
      console.warn('[Subtitle] Parsed subtitle is empty.');
    }
    return parsed;
  } catch (err) {
    console.error('[Subtitle] Load error:', err);
    return [];
  }
};
exports.loadSubtitles = loadSubtitles;
const isYoutubeUrl = url => {
  return /(?:youtube\.com|youtu\.be)/.test(url);
};
exports.isYoutubeUrl = isYoutubeUrl;
const extractYoutubeId = url => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match && match[1] ? match[1] : null;
};
exports.extractYoutubeId = extractYoutubeId;
//# sourceMappingURL=index.js.map