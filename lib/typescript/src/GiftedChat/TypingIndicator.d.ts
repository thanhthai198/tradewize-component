import React from 'react';
import { type ViewStyle } from 'react-native';
type Props = {
    size?: number;
    speed?: number;
    dotColor?: string;
    bubbleColor?: string;
    style?: ViewStyle | ViewStyle[];
};
declare const TypingIndicator: ({ size, speed, dotColor, bubbleColor, style, }: Props) => React.JSX.Element;
export default TypingIndicator;
