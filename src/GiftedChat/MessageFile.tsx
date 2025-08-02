import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import type { FileMessage, IMessage } from './types';
import { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { generateThumbnails } from './utils';
import FastImage from 'react-native-fast-image';
import Color from './Color';
import { ButtonBase } from '../ButtonBase';

const GAP_MEDIA = 3;

interface MessageFileProps {
  onPressFile?: (
    file: FileMessage,
    isShowAll?: boolean,
    arrMedia?: IMessage
  ) => void;
  messageWidth: { width: number; _id: string } | null;
  currentMessage: IMessage;
  isReaction?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  onSaveThumbnail?: (file: FileMessage[]) => void;
  isShowAll?: boolean;
}

export function MessageFile({
  onPressFile,
  messageWidth,
  currentMessage,
  isReaction,
  onLayout,
  onSaveThumbnail,
  isShowAll,
}: MessageFileProps) {
  const [arrMedia, setArrMedia] = useState<FileMessage[]>(
    currentMessage?.file || []
  );

  const MediaItem = useCallback(
    ({ item, index }: { item: FileMessage; index: number }) => {
      const sizeMedia = Number(messageWidth?.width) / 4.65 - GAP_MEDIA * 3.65;
      const sizeMediaShowAll = Number(messageWidth?.width) / 4 - GAP_MEDIA * 3;
      return (
        <ButtonBase
          onPress={() =>
            onPressFile?.(item, arrMedia?.length > 8 && index === 7, {
              ...currentMessage,
              file: arrMedia,
            })
          }
          disabled={
            isReaction || (item?.isLoading && item?.typeFile === 'video')
          }
          style={[
            styles.mediaItem,
            {
              width: isShowAll ? sizeMediaShowAll : sizeMedia,
              height: isShowAll ? sizeMediaShowAll : sizeMedia,
            },
          ]}
        >
          <FastImage
            source={{ uri: item.thumbnailPreview || item.uri }}
            style={styles.image}
          />

          {item?.typeFile === 'video' && (
            <View
              style={[
                styles.playIcon,
                {
                  width: sizeMedia * 0.5,
                  height: sizeMedia * 0.5,
                  borderRadius: (sizeMedia * 0.5) / 2,
                },
              ]}
            >
              {item?.isLoading ? (
                <ActivityIndicator size="small" color={Color.defaultBlue} />
              ) : (
                <FastImage
                  source={require('../assets/play.png')}
                  style={[
                    styles.iconPlay,
                    {
                      width: (sizeMedia * 0.5) / 2,
                      height: (sizeMedia * 0.5) / 2,
                    },
                  ]}
                />
              )}
            </View>
          )}

          {arrMedia?.length > 8 && index === 7 && !isShowAll && (
            <View style={styles.reactionIcon}>
              <Text style={styles.reactionIconText}>
                + {arrMedia?.length - 8 > 99 ? '99+' : arrMedia?.length - 8}
              </Text>
            </View>
          )}
        </ButtonBase>
      );
    },
    [messageWidth, onPressFile, isReaction, arrMedia, currentMessage, isShowAll]
  );

  const renderFile = useMemo(() => {
    if (!currentMessage?.file) return null;

    const arrMediaShow = isShowAll ? arrMedia : arrMedia?.slice(0, 8);

    return (
      <View
        onLayout={onLayout}
        style={[
          styles.container,
          {
            gap: GAP_MEDIA,
          },
        ]}
      >
        {arrMediaShow?.map((item, index) => (
          <MediaItem key={`${item.uri}-${index}`} item={item} index={index} />
        ))}
      </View>
    );
  }, [currentMessage?.file, arrMedia, MediaItem, onLayout, isShowAll]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { file } = currentMessage;
        const getFileComplete = file?.filter((item) => item.uri);
        if (!getFileComplete) return;

        // isLoading: true cho video
        const newArrMediaLoading = getFileComplete.map((item) => {
          if (item.typeFile === 'video') {
            const isLoading = !item?.thumbnailPreview;
            return { ...item, isLoading };
          }
          return item;
        });

        setArrMedia(newArrMediaLoading);

        // Lấy danh sách video để generate thumbnail
        const arrVideo = getFileComplete.filter(
          (item) => item.typeFile === 'video'
        );
        const result = await generateThumbnails(arrVideo); // generate tất cả video một lần

        const newArrMedia = getFileComplete.map((item) => {
          if (item.typeFile === 'video') {
            // Tìm thumbnail tương ứng theo vị trí trong arrVideo
            const videoIndex = arrVideo.findIndex((v) => v.uri === item.uri);
            const path = result?.find((res) => res?.index === videoIndex)?.path;
            // isLoading: false cho video
            return { ...item, thumbnailPreview: path, isLoading: false };
          }
          return item; // Không phải video thì giữ nguyên
        });
        onSaveThumbnail?.(newArrMedia);
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
    marginBottom: 4,
  },
  mediaItem: {
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  iconPlay: {
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  reactionIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionIconText: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
});
