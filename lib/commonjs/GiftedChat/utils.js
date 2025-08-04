"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chunkArray = chunkArray;
exports.generateThumbnails = exports.formatDurationSmart = void 0;
exports.isSameDay = isSameDay;
exports.isSameUser = isSameUser;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _reactNativeCreateThumbnail = require("react-native-create-thumbnail");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isSameDay(currentMessage, diffMessage) {
  if (!diffMessage || !diffMessage.createdAt) return false;
  const currentCreatedAt = (0, _dayjs.default)(currentMessage.createdAt);
  const diffCreatedAt = (0, _dayjs.default)(diffMessage.createdAt);
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) return false;
  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}
function isSameUser(currentMessage, diffMessage) {
  return !!(diffMessage && diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id);
}
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
const generateThumbnails = async videoList => {
  const results = await Promise.all(videoList.map(async (video, index) => {
    try {
      const result = await (0, _reactNativeCreateThumbnail.createThumbnail)({
        url: video.uri,
        timeStamp: 1000
      });
      return {
        index,
        path: result.path
      };
    } catch (e) {
      console.error(`Lỗi với video ${video.id}`, e);
      return {
        index,
        path: ''
      };
    }
  }));
  return results;
};
exports.generateThumbnails = generateThumbnails;
const formatDurationSmart = seconds => {
  const totalSeconds = Math.ceil(seconds);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds % 86400 / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const secondsLeft = totalSeconds % 60;
  const padSeconds = n => String(n).padStart(2, '0');
  const parts = [];
  if (days) parts.push(String(days));
  if (days || hours) parts.push(String(hours)); // chỉ show giờ nếu có ngày hoặc giờ
  parts.push(String(minutes));
  parts.push(padSeconds(secondsLeft));
  return parts.join(':');
};
exports.formatDurationSmart = formatDurationSmart;
//# sourceMappingURL=utils.js.map