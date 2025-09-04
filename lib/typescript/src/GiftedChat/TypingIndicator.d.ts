import React from 'react';
import { type ViewStyle } from 'react-native';
type Props = {
    isTyping: boolean;
    size?: number;
    speed?: number;
    dotColor?: string;
    bubbleColor?: string;
    style?: ViewStyle | ViewStyle[];
};
declare const TypingIndicator: ({ size, speed, dotColor, bubbleColor, style, isTyping, }: Props) => React.JSX.Element;
export default TypingIndicator;
