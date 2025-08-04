import dayjs from 'dayjs';
import { createThumbnail } from 'react-native-create-thumbnail';
export function isSameDay(currentMessage, diffMessage) {
  if (!diffMessage || !diffMessage.createdAt) return false;
  const currentCreatedAt = dayjs(currentMessage.createdAt);
  const diffCreatedAt = dayjs(diffMessage.createdAt);
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) return false;
  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}
export function isSameUser(currentMessage, diffMessage) {
  return !!(diffMessage && diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id);
}
export function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
export const generateThumbnails = async videoList => {
  const results = await Promise.all(videoList.map(async (video, index) => {
    try {
      const result = await createThumbnail({
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
export const formatDurationSmart = seconds => {
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
//# sourceMappingURL=utils.js.map