import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  type LayoutChangeEvent,
} from 'react-native';

import Modal from 'react-native-modal';
import { type IMessage, type User } from './types';
import { BlurView } from '@react-native-community/blur';
import Color from './Color';
import { ButtonBase } from '../ButtonBase';
import FastImage from 'react-native-fast-image';
import { MessageText } from './MessageText';
import { Time } from './Time';
import { MessageFile } from './MessageFile';
import { getScreenHeight, getScreenWidth } from '../utils';
export const EMOJI_REACTIONS = ['❤️', '😂', '😮', '😢', '😠', '👍'];

export interface MessageWithReactionProps {
  isVisible: boolean;
  onClose: () => void;
  message: IMessage;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  };
  user: User;
}

export const MessageWithReaction = ({
  isVisible,
  onClose,
  message,
  position,
  user,
}: MessageWithReactionProps) => {
  delete message.quickReplies;
  const [isExceedsScreenHeight, setIsExceedsScreenHeight] = useState(false);
  const [differenceLevel, setDifferenceLevel] = useState(0);

  const isMyMessage = message.user?._id === user?._id;

  const styleMessage = useCallback(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80 + getScreenHeight() * 0.05 + 8;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY;
    } else {
      top = position.pageY - differenceLevel - 48;
    }

    if (isMyMessage) {
      return {
        top,
        right: 16,
        width: position.width - 24,
        height: position.height,
      };
    }

    return {
      top,
      left: position.pageX,
      width: position.width - 24,
      height: position.height,
    };
  }, [
    isMyMessage,
    position.pageX,
    position.pageY,
    position.width,
    position.height,
    isExceedsScreenHeight,
    differenceLevel,
  ]);

  const styleReactionIcon = useCallback(() => {
    let top = 0;

    if (position.pageY < 80) {
      top = 80;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY - getScreenHeight() * 0.05 - 8;
    } else {
      top = position.pageY - getScreenHeight() * 0.05 - differenceLevel - 56;
    }

    if (isMyMessage) {
      return {
        top,
        right: 16,
      };
    }
    return {
      top,
      left: position.pageX,
    };
  }, [
    isExceedsScreenHeight,
    differenceLevel,
    position.pageY,
    position.pageX,
    isMyMessage,
  ]);

  const styleLayoutAction = useCallback(() => {
    let top = 0;
    if (position.pageY < 80) {
      top = 80 + getScreenHeight() * 0.05 + 8 + position.height;
    } else if (!isExceedsScreenHeight) {
      top = position.pageY + position.height;
    } else {
      top = position.pageY + position.height - differenceLevel - 48;
    }

    if (isMyMessage) {
      return {
        top,
        right: 16,
      };
    }
    return {
      top,
      left: position.pageX,
    };
  }, [
    isMyMessage,
    position.pageX,
    position.pageY,
    position.height,
    isExceedsScreenHeight,
    differenceLevel,
  ]);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const isHeight =
        position.pageY + e.nativeEvent.layout.height + position.height + 139 >
        getScreenHeight();

      setDifferenceLevel(
        position.pageY +
          e.nativeEvent.layout.height +
          position.height -
          getScreenHeight()
      );
      setIsExceedsScreenHeight(isHeight);
    },
    [position.pageY, position.height]
  );

  const renderTime = useMemo(
    () => <Time currentMessage={message} position="left" />,
    [message]
  );

  const renderMessage = useMemo(
    () => <MessageText currentMessage={message} position="left" />,
    [message]
  );

  const renderFile = useMemo(
    () => (
      <MessageFile
        isReaction
        currentMessage={message}
        messageWidth={{ width: position.width + 36, _id: '' }}
      />
    ),
    [position.width, message]
  );

  return (
    <Modal
      animationOut={'zoomOut'}
      animationIn={'zoomInDown'}
      animationOutTiming={500}
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0}
    >
      {/* Pressable bắt sự kiện bấm nền */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <BlurView
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
        />
      </Pressable>

      <View style={[styles.reactionIcon, styleReactionIcon()]}>
        {EMOJI_REACTIONS?.map((emoji) => (
          <Pressable
            key={emoji}
            onPress={() => {}}
            style={styles.reactionIconItem}
          >
            <Text style={styles.reactionIconText}>{emoji}</Text>
          </Pressable>
        ))}
      </View>

      {/* Hiển thị message ở vị trí đã đo */}
      <View style={[styles.message, styleMessage()]}>
        {renderFile}
        {renderMessage}
        {renderTime}
      </View>

      <View onLayout={onLayout} style={[styles.layout, styleLayoutAction()]}>
        <ButtonBase
          style={[
            styles.btnAction,
            { width: getScreenWidth() * 0.5 },
            styles.btnBorderAction,
          ]}
        >
          <Text style={styles.btnActionText}>Reply</Text>
          <FastImage
            style={styles.icon}
            source={require('../assets/reply.png')}
          />
        </ButtonBase>
        <ButtonBase style={[styles.btnAction]}>
          <Text style={styles.btnActionText}>Copy</Text>
          <FastImage
            style={styles.icon}
            source={require('../assets/copy.png')}
          />
        </ButtonBase>
        <ButtonBase style={[styles.btnAction, styles.btnActionOther]}>
          <Text style={styles.btnActionText}>Other</Text>
          <FastImage
            style={styles.icon}
            source={require('../assets/more-information.png')}
          />
        </ButtonBase>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  message: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 16,
    backgroundColor: Color.white,
    minWidth: getScreenWidth() * 0.15,
  },
  layout: {
    backgroundColor: Color.white,
    position: 'absolute',
    borderRadius: 16,
    marginTop: 8,
  },
  btnAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  btnActionOther: {
    borderTopWidth: 4,
    borderTopColor: Color.defaultColor,
  },
  icon: {
    width: 18,
    height: 18,
  },
  btnActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.black,
  },
  btnBorderAction: {
    borderBottomWidth: 1,
    borderBottomColor: Color.defaultColor,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  reactionIcon: {
    position: 'absolute',
    backgroundColor: Color.white,
    borderRadius: 16,
    zIndex: 1,
    height: getScreenHeight() * 0.05,
    width: getScreenWidth() * 0.75,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  reactionIconItem: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: (getScreenWidth() * 0.75 - 56) / 6,
  },
  reactionIconText: {
    fontSize: 24,
  },
});
