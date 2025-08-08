import React, { useEffect, useState, memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import type { FileMessage, IMessage } from './types';
import { generateThumbnails } from './utils';
import FastImage from 'react-native-fast-image';
import Color from './Color';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { getScreenWidth } from '../utils';
import { ButtonBase } from '../ButtonBase';

const GAP_MEDIA = 3;

interface MessageFileProps {
  onPressFile?: (
    file: FileMessage,
    isShowAll?: boolean,
    arrMedia?: IMessage
  ) => void;
  messageWidth?: { width: number; _id: string } | null;
  currentMessage: IMessage;
  isReaction?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  onSaveThumbnail?: (file: FileMessage[]) => void;
  isShowAll?: boolean;
  onLongPressFile?: () => void;
}

export function MessageFile({
  onPressFile,
  messageWidth,
  currentMessage,
  isReaction,
  onLayout,
  onSaveThumbnail,
  isShowAll,
  onLongPressFile,
}: MessageFileProps) {
  const [arrMedia, setArrMedia] = useState<FileMessage[]>(
    currentMessage?.file || []
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const MediaItem = memo(
    ({ item, index }: { item: FileMessage; index: number }) => {
      const sizeMedia = Number(messageWidth?.width) / 4.65 - GAP_MEDIA * 3.65;
      const sizeMediaShowAll = Number(messageWidth?.width) / 4 - GAP_MEDIA * 3;
      const size = isShowAll
        ? sizeMediaShowAll
        : sizeMedia < getScreenWidth() * 0.1
          ? getScreenWidth() * 0.15
          : sizeMedia;
      const raw = item?.progress;
      const progressNum = Number(raw);
      const safeProgress = Number.isFinite(progressNum)
        ? Math.max(0, Math.min(100, progressNum))
        : 0;
      const safeSize = Number.isFinite(size) ? size : 120;

      return (
        <View>
          <ButtonBase
            onLongPress={onLongPressFile}
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
                width: size,
                height: size,
              },
            ]}
          >
            {(item?.thumbnailPreview || item?.uri || item?.url) && (
              <FastImage
                source={{
                  uri: item?.thumbnailPreview || item?.uri || item?.url,
                  priority: FastImage.priority.low,
                }}
                style={styles.image}
              />
            )}

            {item?.typeFile === 'video' && (
              <View
                style={[
                  styles.playIcon,
                  (safeProgress <= 0 ||
                    safeProgress >= 100 ||
                    item?.isLoading) && {
                    width: sizeMedia * 0.5,
                    height: sizeMedia * 0.5,
                    borderRadius: (sizeMedia * 0.5) / 2,
                  },
                ]}
              >
                {item?.isLoading ? (
                  <ActivityIndicator size="small" color={Color.defaultBlue} />
                ) : (
                  <>
                    {(safeProgress <= 0 || safeProgress >= 100) && (
                      <FastImage
                        source={require('./assets/play.png')}
                        resizeMode={FastImage.resizeMode.cover}
                        style={[
                          styles.iconPlay,
                          {
                            width: (sizeMedia * 0.5) / 2,
                            height: (sizeMedia * 0.5) / 2,
                          },
                        ]}
                      />
                    )}
                  </>
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

          {!item?.isLoading && safeProgress > 0 && safeProgress < 100 && (
            <View
              style={[styles.progress, { width: safeSize, height: safeSize }]}
            >
              <AnimatedCircularProgress
                size={safeSize * 0.3}
                width={3}
                fill={safeProgress}
                tintColor={Color.white}
                backgroundColor={Color.defaultColor}
              />
            </View>
          )}
        </View>
      );
    },
    (prev, next) => {
      // So sánh shallow để tránh render lại khi không cần thiết
      return (
        prev.item.uri === next.item.uri &&
        prev.item.thumbnailPreview === next.item.thumbnailPreview &&
        prev.item.progress === next.item.progress &&
        prev.item.isLoading === next.item.isLoading
      );
    }
  );

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
      <FlatList
        data={arrMediaShow || []}
        renderItem={({ item, index }) => (
          <MediaItem item={item} index={index} />
        )}
        keyExtractor={(item) => item?.uri?.toString()}
        numColumns={4}
        scrollEnabled={false}
        onLayout={onLayout}
        contentContainerStyle={styles.container}
        columnWrapperStyle={{ gap: GAP_MEDIA }}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
