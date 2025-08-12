/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useRef, useState } from 'react';
import type { JSX } from 'react';
import {
  findNodeHandle,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';

import { useChatContext } from '../GiftedChatContext';
import { QuickReplies } from '../QuickReplies';
import { MessageText } from '../MessageText';
import { MessageAudio } from '../MessageAudio';
import { Time } from '../Time';

import { isSameUser, isSameDay } from '../utils';
import type { FileMessage, IMessage } from '../types';
import type { BubbleProps } from './types';

import stylesCommon from '../styles';
import styles from './styles';
import { MessageFile } from '../MessageFile';
import Color from '../Color';
import { MessageReply } from '../MessageReply';
import { ButtonBase } from '../../ButtonBase';
import { MaterialIndicator } from '../../IndicatorsMaster';
import FastImage from 'react-native-fast-image';

export * from './types';

const Bubble = <TMessage extends IMessage = IMessage>(
  props: BubbleProps<TMessage>
): JSX.Element => {
  const {
    currentMessage,
    nextMessage,
    position,
    // containerToNextStyle,
    previousMessage,
    containerToPreviousStyle,
    onQuickReply,
    renderQuickReplySend,
    quickReplyStyle,
    quickReplyTextStyle,
    quickReplyContainerStyle,
    containerStyle,
    wrapperStyle,
    bottomContainerStyle,
    onPressFile,
    onLongPressReaction,
  } = props;

  const context = useChatContext();
  const [messageWidth, setMessageWidth] = useState<{
    width: number;
    _id: string;
  } | null>(null);
  const innerRef = useRef<View>(null);
  const refArrThumbnail = useRef<FileMessage[]>([]);

  const onPress = useCallback(() => {
    if (props.onPress) props.onPress(context, currentMessage);
  }, [context, props, currentMessage]);

  const onLongPress = useCallback(() => {
    const { onLongPress, optionTitles } = props;

    if (onLongPress) {
      onLongPress(context, currentMessage);
      return;
    }

    if (!optionTitles?.length) return;

    const options = optionTitles;
    const cancelButtonIndex = options.length - 1;

    (context as any).actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex: number) => {
        console.log('onLongPress', { buttonIndex });
      }
    );
  }, [currentMessage, context, props]);

  const onLongPressItem = useCallback(() => {
    try {
      if (innerRef.current) {
        const node = findNodeHandle(innerRef.current);
        if (node) {
          UIManager.measure(
            node,
            (
              x: number,
              y: number,
              width: number,
              height: number,
              pageX: number,
              pageY: number
            ) => {
              const message = {
                ...currentMessage,
                file: refArrThumbnail?.current,
              };

              onLongPressReaction?.(message, {
                x,
                y,
                width,
                height,
                pageX,
                pageY,
              });
            }
          );
        }
      }
    } catch (error) {
      console.log('onLongPressItem', error);
    }
  }, [currentMessage, onLongPressReaction]);

  // const styledBubbleToNext = useCallback(() => {
  //   if (
  //     currentMessage &&
  //     nextMessage &&
  //     position &&
  //     isSameUser(currentMessage, nextMessage) &&
  //     isSameDay(currentMessage, nextMessage)
  //   )
  //     return [styles[position].containerToNext, containerToNextStyle?.[position]];

  //   return null;
  // }, [currentMessage, nextMessage, position, containerToNextStyle]);

  const styledBubbleToPrevious = useCallback(() => {
    if (
      currentMessage &&
      previousMessage &&
      position &&
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    )
      return [
        styles[position].containerToPrevious,
        containerToPreviousStyle && containerToPreviousStyle[position],
      ];

    return null;
  }, [currentMessage, previousMessage, position, containerToPreviousStyle]);

  const renderQuickReplies = useCallback(() => {
    if (currentMessage?.quickReplies) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { containerStyle, wrapperStyle, ...quickReplyProps } = props;

      if (props.renderQuickReplies)
        return props.renderQuickReplies(quickReplyProps);

      return (
        <QuickReplies
          currentMessage={currentMessage}
          onQuickReply={onQuickReply}
          renderQuickReplySend={renderQuickReplySend}
          quickReplyStyle={quickReplyStyle}
          quickReplyTextStyle={quickReplyTextStyle}
          quickReplyContainerStyle={quickReplyContainerStyle}
          nextMessage={nextMessage}
        />
      );
    }

    return null;
  }, [
    currentMessage,
    onQuickReply,
    renderQuickReplySend,
    quickReplyStyle,
    quickReplyTextStyle,
    quickReplyContainerStyle,
    nextMessage,
    props,
  ]);

  const onSaveThumbnail = useCallback((file: FileMessage[]) => {
    refArrThumbnail.current = file;
  }, []);

  const renderMessageText = useCallback(() => {
    if (currentMessage?.text) {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        containerStyle,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        wrapperStyle,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        optionTitles,
        ...messageTextProps
      } = props;

      if (props.renderMessageText)
        return props.renderMessageText(messageTextProps);

      return <MessageText {...messageTextProps} />;
    }
    return null;
  }, [props, currentMessage]);

  const renderMessageFile = useCallback(() => {
    if (!currentMessage?.file) return null;

    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      containerStyle,
      wrapperStyle,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...messageFileProps
    } = props;

    if (props.renderCustomMessageFile)
      return props.renderCustomMessageFile(messageFileProps);

    return (
      <MessageFile
        onLongPressFile={onLongPressItem}
        onSaveThumbnail={onSaveThumbnail}
        onPressFile={onPressFile}
        messageWidth={messageWidth}
        {...messageFileProps}
      />
    );
  }, [
    currentMessage,
    props,
    messageWidth,
    onPressFile,
    onSaveThumbnail,
    onLongPressItem,
  ]);

  const renderMessageAudio = useCallback(() => {
    if (!currentMessage?.audio) return null;

    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      containerStyle,
      wrapperStyle,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...messageAudioProps
    } = props;

    if (props.renderMessageAudio)
      return props.renderMessageAudio(messageAudioProps);

    return <MessageAudio />;
  }, [props, currentMessage]);

  const renderTicks = useCallback(() => {
    const { renderTicks, user } = props;

    if (renderTicks && currentMessage) return renderTicks(currentMessage);

    if (user && currentMessage?.user && currentMessage.user._id !== user._id)
      return null;

    if (
      currentMessage &&
      (currentMessage.sent || currentMessage.received || currentMessage.pending)
    )
      return (
        <View style={styles.content.tickView}>
          {!!currentMessage.sent && (
            <Text style={[styles.content.tick, props.tickStyle]}>{'✓'}</Text>
          )}
          {!!currentMessage.received && (
            <Text style={[styles.content.tick, props.tickStyle]}>{'✓'}</Text>
          )}
          {!!currentMessage.pending && (
            <Text style={[styles.content.tick, props.tickStyle]}>{'🕓'}</Text>
          )}
        </View>
      );

    return null;
  }, [props, currentMessage]);

  const renderTime = useCallback(() => {
    if (currentMessage?.createdAt) {
      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        containerStyle,
        wrapperStyle,
        textStyle,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...timeProps
      } = props;

      if (props.renderTime) return props.renderTime(timeProps);

      return <Time {...timeProps} />;
    }
    return null;
  }, [props, currentMessage]);

  const renderUsername = useCallback(() => {
    const { user, renderUsername } = props;

    if (props.renderUsernameOnMessage && currentMessage) {
      if (user && currentMessage.user._id === user._id) return null;

      if (renderUsername) return renderUsername(currentMessage.user);

      return (
        <View style={styles.content.usernameView}>
          <Text style={[styles.content.username, props.usernameStyle]}>
            {'~ '}
            {currentMessage.user.name}
          </Text>
        </View>
      );
    }

    return null;
  }, [currentMessage, props]);

  const renderCustomView = useCallback(() => {
    if (props.renderCustomView) return props.renderCustomView(props);

    return null;
  }, [props]);

  const renderReactionEmoji = useCallback(() => {
    if (currentMessage?.reactionEmoji) {
      return (
        <View
          style={{
            backgroundColor: Color.white,
            position: 'absolute',
            width: 32,
            height: 20,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Color.leftBubbleBackground,
            bottom: -30,
            zIndex: 10,
            right: 2,
          }}
        >
          <Text>{currentMessage.reactionEmoji}</Text>
        </View>
      );
    }
    return null;
  }, [currentMessage]);

  const renderBubbleContent = useCallback(() => {
    return (
      <View>
        {!props.isCustomViewBottom && renderCustomView()}
        {renderMessageFile()}
        {renderMessageAudio()}
        {renderMessageText()}
        {renderReactionEmoji()}
        {props.isCustomViewBottom && renderCustomView()}
      </View>
    );
  }, [
    renderCustomView,
    renderMessageAudio,
    renderMessageText,
    props.isCustomViewBottom,
    renderMessageFile,
    renderReactionEmoji,
  ]);

  const renderMessageReply = useCallback(() => {
    if (currentMessage?.messageReply) {
      return (
        <MessageReply
          messageReply={currentMessage?.messageReply}
          onSaveThumbnail={onSaveThumbnail}
          onPressFile={onPressFile}
        />
      );
    }
    return null;
  }, [currentMessage, onSaveThumbnail, onPressFile]);

  return (
    <View
      style={[
        stylesCommon.fill,
        styles[position].container,
        containerStyle && containerStyle[position],
        { marginBottom: currentMessage?.isLast ? 32 : 8, maxWidth: '90%' },
      ]}
      onLayout={(e) => {
        if (currentMessage?._id) {
          setMessageWidth({
            width: e.nativeEvent.layout.width,
            _id: currentMessage?._id.toString(),
          });
        }
      }}
    >
      {renderMessageReply()}
      <View
        style={[
          styles[position].wrapper,
          // styledBubbleToNext(),
          styledBubbleToPrevious(),
          wrapperStyle && wrapperStyle[position],
        ]}
      >
        <TouchableWithoutFeedback
          onPress={onPress}
          onLongPress={onLongPress}
          {...props.touchableProps}
        >
          <ButtonBase onLongPress={onLongPressItem}>
            <View ref={innerRef}>
              {renderBubbleContent()}
              <View
                style={[
                  styles[position].bottom,
                  bottomContainerStyle?.[position],
                ]}
              >
                {renderUsername()}
                {renderTime()}
                {renderTicks()}
              </View>
            </View>
          </ButtonBase>
        </TouchableWithoutFeedback>
      </View>
      {renderQuickReplies()}
      {currentMessage?.isSending && (
        <View
          style={{
            height: 16,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 8,
          }}
        >
          <MaterialIndicator
            color={Color.defaultColor}
            size={12}
            animationDuration={6000}
          />
        </View>
      )}
      {currentMessage?.errorMessage && !currentMessage?.isSending && (
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <FastImage
            source={require('../../assets/warning.png')}
            style={{ width: 12, height: 12 }}
          />
          <Text
            style={{ fontSize: 12, fontWeight: '500', color: Color.alizarin }}
          >
            {currentMessage?.errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Bubble;
