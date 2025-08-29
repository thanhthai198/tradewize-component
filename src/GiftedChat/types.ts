import { type StyleProp, type ViewStyle } from 'react-native';

export type { ActionsProps } from './Actions';
export type { AvatarProps } from './Avatar';
export type { BubbleProps } from './Bubble';
export type { ComposerProps } from './Composer';
export type { DayProps } from './Day';
export type { GiftedAvatarProps } from './GiftedAvatar';
export type { InputToolbarProps } from './InputToolbar';
export type { LoadEarlierProps } from './LoadEarlier';
export type { MessageProps } from './Message';
export type { MessageContainerProps } from './MessageContainer';
export type { MessageTextProps } from './MessageText';
export type { QuickRepliesProps } from './QuickReplies';
export type { SendProps } from './Send';
export type { SystemMessageProps } from './SystemMessage';
export type { TimeProps } from './Time';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface LeftRightStyle<T> {
  left?: StyleProp<T>;
  right?: StyleProp<T>;
}

type renderFunction = (x: unknown) => React.ReactNode;

export interface User {
  _id: string | number;
  name?: string;
  avatar?: string | number | renderFunction;
}

export interface Reply {
  title: string;
  value: string;
  messageId?: number | string;
}

export interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: Reply[];
  keepIt?: boolean;
}

export interface FileMessage {
  clientId?: string;
  uri: string;
  id?: string;
  size?: number;
  name?: string;
  fileExtension?: string;
  typeFile?: 'image' | 'video';
  thumbnailPreview?: string;
  isLoading?: boolean;
  width?: number;
  height?: number;
  duration?: number;
  progress?: number;
  mine?: string;
  url?: string;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  file?: FileMessage[];
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
  isLast?: boolean;
  reactionEmoji?: { id: string; reaction: string; reactionType: string }[];
  messageReply?: IMessage;
  isSending?: boolean;
  errorMessage?: string;
  isShowName?: boolean;
}

export type IChatMessage = IMessage;

export interface MessageVideoProps<TMessage extends IMessage> {
  currentMessage: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  videoStyle?: StyleProp<ViewStyle>;
  videoProps?: object;
}

export interface MessageAudioProps<TMessage extends IMessage> {
  currentMessage: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  audioStyle?: StyleProp<ViewStyle>;
  audioProps?: object;
}
