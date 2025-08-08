import { StyleSheet, View } from 'react-native';
import Color from './Color';
import { type FileMessage, type IMessage } from './types';
import { MessageFile } from './MessageFile';
import { MessageText } from './MessageText';
import { getScreenWidth } from '../utils';
import React from 'react';

interface MessageReplyProps {
  messageReply: IMessage;
  onPressFile?: (
    file: FileMessage,
    isShowAll?: boolean,
    arrMedia?: IMessage
  ) => void;
  onSaveThumbnail?: (file: FileMessage[]) => void;
}

export function MessageReply({
  messageReply,
  onPressFile,
  onSaveThumbnail,
}: MessageReplyProps) {
  return (
    <View style={styles.container}>
      {messageReply?.file?.length && (
        <MessageFile
          onPressFile={onPressFile}
          onSaveThumbnail={onSaveThumbnail}
          currentMessage={messageReply}
          messageWidth={{ width: getScreenWidth() * 0.9, _id: '1' }}
        />
      )}
      {!messageReply?.text && <View style={styles.space} />}
      {messageReply?.text && (
        <MessageText
          currentMessage={messageReply}
          position="left"
          customTextStyle={{ color: Color.black }}
        />
      )}
      <View style={styles.space} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.leftBubbleBackground,
    minWidth: getScreenWidth() * 0.12,
    borderRadius: 16,
    marginBottom: -4,
  },
  space: {
    height: 4,
  },
});
