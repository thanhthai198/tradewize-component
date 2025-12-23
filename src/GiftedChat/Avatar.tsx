/* eslint-disable react-native/no-inline-styles */
import React, { type ReactNode, useCallback } from 'react';
import {
  type ImageStyle,
  type LayoutChangeEvent,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { GiftedAvatar } from './GiftedAvatar';
import { isSameUser, isSameDay } from './utils';
import { type IMessage, type LeftRightStyle, type User } from './types';

interface Styles {
  left: {
    container: ViewStyle;
    onTop: ViewStyle;
    image: ImageStyle;
  };
  right: {
    container: ViewStyle;
    onTop: ViewStyle;
    image: ImageStyle;
  };
}

const styles: Styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
};

export interface AvatarProps<TMessage extends IMessage> {
  currentMessage: TMessage;
  previousMessage?: TMessage;
  nextMessage?: TMessage;
  position: 'left' | 'right';
  renderAvatarOnTop?: boolean;
  showAvatarForEveryMessage?: boolean;
  imageStyle?: LeftRightStyle<ImageStyle>;
  containerStyle?: LeftRightStyle<ViewStyle>;
  textStyle?: TextStyle;
  renderAvatar?(props: Omit<AvatarProps<TMessage>, 'renderAvatar'>): ReactNode;
  onPressAvatar?: (user: User) => void;
  onLongPressAvatar?: (user: User) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
}

export function Avatar<TMessage extends IMessage = IMessage>(
  props: AvatarProps<TMessage>
) {
  const {
    renderAvatarOnTop,
    showAvatarForEveryMessage,
    containerStyle,
    position,
    currentMessage,
    renderAvatar,
    previousMessage,
    nextMessage,
    imageStyle,
    onPressAvatar,
    onLongPressAvatar,
    onLayout,
  } = props;

  const messageToCompare = renderAvatarOnTop ? previousMessage : nextMessage;

  const renderAvatarComponent = useCallback(() => {
    if (renderAvatar)
      return renderAvatar({
        renderAvatarOnTop,
        showAvatarForEveryMessage,
        containerStyle,
        position,
        currentMessage,
        previousMessage,
        nextMessage,
        imageStyle,
        onPressAvatar,
        onLongPressAvatar,
      });

    if (currentMessage)
      return (
        <GiftedAvatar
          avatarStyle={[styles[position].image, imageStyle?.[position]]}
          user={currentMessage.user}
          onPress={() => onPressAvatar?.(currentMessage.user)}
          onLongPress={() => onLongPressAvatar?.(currentMessage.user)}
        />
      );

    return null;
  }, [
    renderAvatar,
    renderAvatarOnTop,
    showAvatarForEveryMessage,
    containerStyle,
    position,
    currentMessage,
    previousMessage,
    nextMessage,
    imageStyle,
    onPressAvatar,
    onLongPressAvatar,
  ]);

  if (renderAvatar === null) return null;

  if (
    !showAvatarForEveryMessage &&
    currentMessage &&
    messageToCompare &&
    isSameUser(currentMessage, messageToCompare) &&
    isSameDay(currentMessage, messageToCompare)
  )
    return (
      <View style={[styles[position].container, containerStyle?.[position]]}>
        <GiftedAvatar
          avatarStyle={[styles[position].image, imageStyle?.[position]]}
        />
      </View>
    );

  return (
    <View
      style={[
        styles[position].container,
        renderAvatarOnTop && styles[position].onTop,
        containerStyle?.[position],
        { marginBottom: currentMessage?.isLast ? 12 : 0 },
      ]}
      onLayout={onLayout}
    >
      {renderAvatarComponent()}
    </View>
  );
}
