import { Actions } from '../Actions';
import { Avatar } from '../Avatar';
import Bubble from '../Bubble';
import { Composer } from '../Composer';
import { Day } from '../Day';
import { GiftedAvatar } from '../GiftedAvatar';
import { InputToolbar } from '../InputToolbar';
import { LoadEarlier } from '../LoadEarlier';
import Message from '../Message';
import MessageContainer from '../MessageContainer';
import { MessageText } from '../MessageText';
import { type IMessage } from '../types';
import { Send } from '../Send';
import { SystemMessage } from '../SystemMessage';
import { Time } from '../Time';
import * as utils from '../utils';
import { type GiftedChatProps } from './types';
declare function GiftedChatWrapper<TMessage extends IMessage = IMessage>(props: GiftedChatProps<TMessage>): import("react/jsx-runtime").JSX.Element;
declare namespace GiftedChatWrapper {
    var append: <TMessage extends IMessage>(currentMessages: TMessage[] | undefined, messages: TMessage[], inverted?: boolean) => TMessage[];
    var prepend: <TMessage extends IMessage>(currentMessages: TMessage[] | undefined, messages: TMessage[], inverted?: boolean) => TMessage[];
}
export * from '../types';
export { GiftedChatWrapper as GiftedChat, Actions, Avatar, Bubble, SystemMessage, MessageText, Composer, Day, InputToolbar, LoadEarlier, Message, MessageContainer, Send, Time, GiftedAvatar, utils, };
