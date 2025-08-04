import { type StyleProp, type ImageStyle, type TextStyle } from 'react-native';
import { type User } from './types';
export interface GiftedAvatarProps {
    user?: User;
    avatarStyle?: StyleProp<ImageStyle>;
    textStyle?: StyleProp<TextStyle>;
    onPress?: (props: GiftedAvatarProps) => void;
    onLongPress?: (props: GiftedAvatarProps) => void;
}
export declare function GiftedAvatar(props: GiftedAvatarProps): import("react/jsx-runtime").JSX.Element;
