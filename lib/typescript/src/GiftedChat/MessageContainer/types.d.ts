import React, { type Component, type RefObject } from 'react';
import { type FlatListProps, type StyleProp, type ViewStyle } from 'react-native';
import { type LoadEarlierProps } from '../LoadEarlier';
import { type MessageProps } from '../Message';
import { type User, type IMessage, type Reply, type DayProps, type FileMessage } from '../types';
import { type ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/hook/commonTypes';
import { type FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import { type AnimateProps } from 'react-native-reanimated';
export type ListViewProps<TMessage extends IMessage = IMessage> = Partial<FlatListProps<TMessage>>;
export type AnimatedList<TMessage> = Component<AnimateProps<FlatListProps<TMessage>>, unknown, unknown> & FlatList<FlatListProps<TMessage>>;
export interface MessageContainerProps<TMessage extends IMessage = IMessage> {
    forwardRef?: RefObject<AnimatedList<TMessage>>;
    messages?: TMessage[];
    isTyping?: boolean;
    user?: User;
    listViewProps?: ListViewProps;
    inverted?: boolean;
    loadEarlier?: boolean;
    alignTop?: boolean;
    isScrollToBottomEnabled?: boolean;
    scrollToBottomStyle?: StyleProp<ViewStyle>;
    invertibleScrollViewProps?: object;
    extraData?: object;
    scrollToBottomOffset?: number;
    renderChatEmpty?(): React.ReactNode;
    renderFooter?(props: MessageContainerProps<TMessage>): React.ReactNode;
    renderMessage?(props: MessageProps<TMessage>): React.ReactElement;
    renderDay?(props: DayProps): React.ReactNode;
    renderLoadEarlier?(props: LoadEarlierProps): React.ReactNode;
    renderTypingIndicator?(): React.ReactNode;
    scrollToBottomComponent?(): React.ReactNode;
    onLoadEarlier?(): void;
    onQuickReply?(replies: Reply[]): void;
    infiniteScroll?: boolean;
    isLoadingEarlier?: boolean;
    handleOnScroll?(event: ReanimatedScrollEvent): void;
    onPressFile?(file: FileMessage): void;
    onLongPressReaction?(message: TMessage, position: {
        x: number;
        y: number;
        width: number;
        height: number;
        pageX: number;
        pageY: number;
    }): void;
}
export interface State {
    showScrollBottom: boolean;
    hasScrolled: boolean;
}
interface ViewLayout {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type DaysPositions = {
    [key: string]: ViewLayout & {
        createdAt: number;
    };
};
export {};
