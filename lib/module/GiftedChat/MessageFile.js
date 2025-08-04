import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { generateThumbnails } from './utils';
import FastImage from 'react-native-fast-image';
import Color from './Color';
import { ButtonBase } from '../ButtonBase';
const GAP_MEDIA = 3;
export function MessageFile({
  onPressFile,
  messageWidth,
  currentMessage,
  isReaction,
  onLayout,
  onSaveThumbnail,
  isShowAll
}) {
  const [arrMedia, setArrMedia] = useState((currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.file) || []);
  const MediaItem = useCallback(({
    item,
    index
  }) => {
    const sizeMedia = Number(messageWidth === null || messageWidth === void 0 ? void 0 : messageWidth.width) / 4.65 - GAP_MEDIA * 3.65;
    const sizeMediaShowAll = Number(messageWidth === null || messageWidth === void 0 ? void 0 : messageWidth.width) / 4 - GAP_MEDIA * 3;
    return /*#__PURE__*/React.createElement(ButtonBase, {
      onPress: () => onPressFile === null || onPressFile === void 0 ? void 0 : onPressFile(item, (arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.length) > 8 && index === 7, {
        ...currentMessage,
        file: arrMedia
      }),
      disabled: isReaction || (item === null || item === void 0 ? void 0 : item.isLoading) && (item === null || item === void 0 ? void 0 : item.typeFile) === 'video',
      style: [styles.mediaItem, {
        width: isShowAll ? sizeMediaShowAll : sizeMedia,
        height: isShowAll ? sizeMediaShowAll : sizeMedia
      }]
    }, /*#__PURE__*/React.createElement(FastImage, {
      source: {
        uri: item.thumbnailPreview || item.uri
      },
      style: styles.image
    }), (item === null || item === void 0 ? void 0 : item.typeFile) === 'video' && /*#__PURE__*/React.createElement(View, {
      style: [styles.playIcon, {
        width: sizeMedia * 0.5,
        height: sizeMedia * 0.5,
        borderRadius: sizeMedia * 0.5 / 2
      }]
    }, item !== null && item !== void 0 && item.isLoading ? /*#__PURE__*/React.createElement(ActivityIndicator, {
      size: "small",
      color: Color.defaultBlue
    }) : /*#__PURE__*/React.createElement(FastImage, {
      source: require('../assets/play.png'),
      style: [styles.iconPlay, {
        width: sizeMedia * 0.5 / 2,
        height: sizeMedia * 0.5 / 2
      }]
    })), (arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.length) > 8 && index === 7 && !isShowAll && /*#__PURE__*/React.createElement(View, {
      style: styles.reactionIcon
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.reactionIconText
    }, "+ ", (arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.length) - 8 > 99 ? '99+' : (arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.length) - 8)));
  }, [messageWidth, onPressFile, isReaction, arrMedia, currentMessage, isShowAll]);
  const renderFile = useMemo(() => {
    if (!(currentMessage !== null && currentMessage !== void 0 && currentMessage.file)) return null;
    const arrMediaShow = isShowAll ? arrMedia : arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.slice(0, 8);
    return /*#__PURE__*/React.createElement(View, {
      onLayout: onLayout,
      style: [styles.container, {
        gap: GAP_MEDIA
      }]
    }, arrMediaShow === null || arrMediaShow === void 0 ? void 0 : arrMediaShow.map((item, index) => /*#__PURE__*/React.createElement(MediaItem, {
      key: `${item.uri}-${index}`,
      item: item,
      index: index
    })));
  }, [currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.file, arrMedia, MediaItem, onLayout, isShowAll]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          file
        } = currentMessage;
        const getFileComplete = file === null || file === void 0 ? void 0 : file.filter(item => item.uri);
        if (!getFileComplete) return;

        // isLoading: true cho video
        const newArrMediaLoading = getFileComplete.map(item => {
          if (item.typeFile === 'video') {
            const isLoading = !(item !== null && item !== void 0 && item.thumbnailPreview);
            return {
              ...item,
              isLoading
            };
          }
          return item;
        });
        setArrMedia(newArrMediaLoading);

        // Lấy danh sách video để generate thumbnail
        const arrVideo = getFileComplete.filter(item => item.typeFile === 'video');
        const result = await generateThumbnails(arrVideo); // generate tất cả video một lần

        const newArrMedia = getFileComplete.map(item => {
          if (item.typeFile === 'video') {
            var _result$find;
            // Tìm thumbnail tương ứng theo vị trí trong arrVideo
            const videoIndex = arrVideo.findIndex(v => v.uri === item.uri);
            const path = result === null || result === void 0 || (_result$find = result.find(res => (res === null || res === void 0 ? void 0 : res.index) === videoIndex)) === null || _result$find === void 0 ? void 0 : _result$find.path;
            // isLoading: false cho video
            return {
              ...item,
              thumbnailPreview: path,
              isLoading: false
            };
          }
          return item; // Không phải video thì giữ nguyên
        });
        onSaveThumbnail === null || onSaveThumbnail === void 0 || onSaveThumbnail(newArrMedia);
        setArrMedia(newArrMedia);
      } catch (error) {
        console.log('error fetchData media', error);
      }
    };
    fetchData();
  }, [currentMessage, onSaveThumbnail]);
  return renderFile;
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingTop: 8,
    marginBottom: 4
  },
  mediaItem: {
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  iconPlay: {
    marginLeft: 4
  },
  image: {
    width: '100%',
    height: '100%'
  },
  reactionIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reactionIconText: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22
  }
});
//# sourceMappingURL=MessageFile.js.map