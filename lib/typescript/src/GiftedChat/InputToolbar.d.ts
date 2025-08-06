import React from 'react';
import { TextInput, type StyleProp, type ViewStyle } from 'react-native';
import { type ComposerProps } from './Composer';
import { type SendProps } from './Send';
import { type ActionsProps } from './Actions';
import { type FileMessage, type IMessage } from './types';
export interface InputToolbarProps<TMessage extends IMessage> {
    options?: {
        [key: string]: () => void;
    };
    optionTintColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    primaryStyle?: StyleProp<ViewStyle>;
    accessoryStyle?: StyleProp<ViewStyle>;
    renderAccessory?(props: InputToolbarProps<TMessage>): React.ReactNode;
    renderActions?(props: ActionsProps): React.ReactNode;
    renderSend?(props: SendProps<TMessage>): React.ReactNode;
    renderComposer?(props: ComposerProps): React.ReactNode;
    onPressActionButton?(): void;
    icon?: () => React.ReactNode;
    wrapperStyle?: StyleProp<ViewStyle>;
    inputRef?: React.RefObject<TextInput>;
    onPressPickMedia?: (type: 'camera' | 'pick') => void;
    fileMedia?: FileMessage[];
    onRemoveFile?: (file: FileMessage) => void;
    onPressFile?: (file: FileMessage) => void;
    messageReaction?: IMessage & {
        isReply: boolean;
    };
    clearMessageReaction?: () => void;
    labelReaction?: string;
    onFocusInput?: () => void;
    onBlurInput?: () => void;
}
export declare function InputToolbar<TMessage extends IMessage = IMessage>(props: InputToolbarProps<TMessage>): React.JSX.Element;
