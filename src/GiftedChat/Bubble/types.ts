import type React from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { QuickRepliesProps } from '../QuickReplies';
import type { MessageTextProps } from '../MessageText';
import type { TimeProps } from '../Time';
import type {
  User,
  IMessage,
  LeftRightStyle,
  Reply,
  Omit,
  MessageVideoProps,
  MessageAudioProps,
  FileMessage,
} from '../types';

export type RenderCustomMessageFileProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageVideoProps<TMessage>;

export type RenderMessageAudioProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageAudioProps<TMessage>;

export type RenderMessageTextProps<TMessage extends IMessage> = Omit<
  BubbleProps<TMessage>,
  'containerStyle' | 'wrapperStyle'
> &
  MessageTextProps<TMessage>;

export interface BubbleProps<TMessage extends IMessage> {
  user?: User;
  touchableProps?: object;
  renderUsernameOnMessage?: boolean;
  isCustomViewBottom?: boolean;
  inverted?: boolean;
  position: 'left' | 'right';
  currentMessage: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  optionTitles?: string[];
  containerStyle?: LeftRightStyle<ViewStyle>;
  wrapperStyle?: LeftRightStyle<ViewStyle>;
  textStyle?: LeftRightStyle<TextStyle>;
  bottomContainerStyle?: LeftRightStyle<ViewStyle>;
  tickStyle?: StyleProp<TextStyle>;
  containerToNextStyle?: LeftRightStyle<ViewStyle>;
  containerToPreviousStyle?: LeftRightStyle<ViewStyle>;
  usernameStyle?: TextStyle;
  quickReplyStyle?: StyleProp<ViewStyle>;
  quickReplyTextStyle?: StyleProp<TextStyle>;
  quickReplyContainerStyle?: StyleProp<ViewStyle>;
  isReaction?: boolean;
  onPress?(context?: unknown, message?: unknown): void;
  onLongPress?(context?: unknown, message?: unknown): void;
  onQuickReply?(replies: Reply[]): void;
  renderCustomMessageFile?(
    props: RenderCustomMessageFileProps<TMessage>
  ): React.ReactNode;
  renderMessageAudio?(
    props: RenderMessageAudioProps<TMessage>
  ): React.ReactNode;
  renderMessageText?(props: RenderMessageTextProps<TMessage>): React.ReactNode;
  renderCustomView?(bubbleProps: BubbleProps<TMessage>): React.ReactNode;
  renderTime?(timeProps: TimeProps<TMessage>): React.ReactNode;
  renderTicks?(currentMessage: TMessage): React.ReactNode;
  renderUsername?(user?: TMessage['user']): React.ReactNode;
  renderQuickReplySend?(): React.ReactNode;
  renderQuickReplies?(
    quickReplies: QuickRepliesProps<TMessage>
  ): React.ReactNode;
  onPressFile?(image: FileMessage): void;
  onLongPressReaction?(
    message: TMessage,
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
      pageX: number;
      pageY: number;
    }
  ): void;
}
