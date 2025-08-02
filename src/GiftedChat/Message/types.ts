import { type LayoutChangeEvent, type ViewStyle } from 'react-native';
import { type AvatarProps } from '../Avatar';
import { type SystemMessageProps } from '../SystemMessage';
import { type DayProps } from '../Day';
import {
  type IMessage,
  type User,
  type LeftRightStyle,
  type FileMessage,
} from '../types';
import { type BubbleProps } from '../Bubble';

export interface MessageProps<TMessage extends IMessage> {
  showUserAvatar?: boolean;
  position: 'left' | 'right';
  currentMessage: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  user: User;
  inverted?: boolean;
  containerStyle?: LeftRightStyle<ViewStyle>;
  renderBubble?(props: BubbleProps<TMessage>): React.ReactNode;
  renderDay?(props: DayProps): React.ReactNode;
  renderSystemMessage?(props: SystemMessageProps<TMessage>): React.ReactNode;
  renderAvatar?(props: AvatarProps<TMessage>): React.ReactNode;
  shouldUpdateMessage?(
    props: MessageProps<IMessage>,
    nextProps: MessageProps<IMessage>
  ): boolean;
  onPressFile?(file: FileMessage): void;
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
  onMessageLayout?(event: LayoutChangeEvent): void;
}
