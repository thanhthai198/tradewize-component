import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  type LayoutChangeEvent,
  type TextStyle,
} from 'react-native';

import Modal from 'react-native-modal';
import { type IMessage, type LeftRightStyle, type User } from './types';
import { BlurView } from '@react-native-community/blur';
import Color from './Color';
import FastImage from 'react-native-fast-image';
import { MessageText } from './MessageText';
import { Time } from './Time';
import { MessageFile } from './MessageFile';
import { getScreenHeight, getScreenWidth } from '../utils';
import { ButtonBase } from '../ButtonBase';
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
  isShowEmoji?: boolean;
  onReactionEmoji?: (emoji: string, messageId: string) => void;
  onActionReaction?: (message: IMessage, action: string) => void;
}

const DIFFERENCE_LEVEL = 72;

export const MessageWithReaction = ({
  isVisible,
  onClose,
  message,
  position,
  user,
  onReactionEmoji,
  onActionReaction,
  isShowEmoji = true,
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
      top = position.pageY - differenceLevel - DIFFERENCE_LEVEL;
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
      top =
        position.pageY -
        getScreenHeight() * 0.05 -
        differenceLevel -
        DIFFERENCE_LEVEL -
        8;
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
      top =
        position.pageY + position.height - differenceLevel - DIFFERENCE_LEVEL;
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
  const timeTextStyle: LeftRightStyle<TextStyle> = useMemo(() => {
    return {
      left: {
        alignSelf: 'flex-start',
      },
      right: {
        alignSelf: 'flex-end',
        color: Color.black,
      },
    };
  }, []);

  const renderTime = useMemo(
    () => (
      <Time
        currentMessage={message}
        position={isMyMessage ? 'right' : 'left'}
        timeTextStyle={timeTextStyle}
      />
    ),
    [message, timeTextStyle, isMyMessage]
  );

  const renderMessage = useMemo(() => {
    if (message?.text) {
      return <MessageText currentMessage={message} position="left" />;
    } else {
      return null;
    }
  }, [message]);

  const renderFile = useMemo(() => {
    if (message?.file?.length && message?.file?.length > 0) {
      return (
        <MessageFile
          isReaction
          currentMessage={message}
          messageWidth={{ width: position.width + 36, _id: '' }}
        />
      );
    }
    return null;
  }, [position.width, message]);

  return (
    <Modal
      animationOut={'zoomOut'}
      animationIn={'zoomIn'}
      animationInTiming={300}
      animationOutTiming={300}
      isVisible={isVisible}
      style={styles.modal}
      backdropOpacity={0}
      useNativeDriver={true}
    >
      {/* Pressable bắt sự kiện bấm nền */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <BlurView
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
        />
      </Pressable>

      {isShowEmoji && (
        <View style={[styles.reactionIcon, styleReactionIcon()]}>
          {EMOJI_REACTIONS?.map((emoji) => (
            <Pressable
              key={emoji}
              onPress={() => {
                onClose();
                onReactionEmoji?.(emoji, message?._id?.toString());
              }}
              style={styles.reactionIconItem}
            >
              <Text style={styles.reactionIconText}>{emoji}</Text>
            </Pressable>
          ))}
        </View>
      )}

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
            message?.text && styles.btnBorderAction,
          ]}
          onPress={() => {
            onClose();
            onActionReaction?.(message, 'reply');
          }}
        >
          <Text style={styles.btnActionText}>Reply</Text>
          <FastImage
            style={styles.icon}
            source={require('./assets/reply.png')}
          />
        </ButtonBase>
        {message?.text && (
          <ButtonBase
            style={[styles.btnAction]}
            onPress={() => {
              onClose();
              onActionReaction?.(message, 'copy');
            }}
          >
            <Text style={styles.btnActionText}>Copy</Text>
            <FastImage
              style={styles.icon}
              source={require('./assets/copy.png')}
            />
          </ButtonBase>
        )}
        {/* <ButtonBase
          style={[styles.btnAction, styles.btnActionOther]}
          onPress={() => {
            onClose();
            onActionReaction?.(message, 'other');
          }}
        >
          <Text style={styles.btnActionText}>Other</Text>
          <FastImage style={styles.icon} source={require('../assets/more-information.png')} />
        </ButtonBase> */}
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
    borderRadius: 8,
    backgroundColor: Color.white,
    minWidth: getScreenWidth() * 0.19,
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
