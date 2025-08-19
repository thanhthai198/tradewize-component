import React from 'react';
import { type GestureResponderEvent } from 'react-native';
interface ButtonContainerVideoProps {
    isRecording?: boolean;
    isPaused?: boolean;
    isCanPause?: boolean;
    canStopRecording?: boolean;
    resumeRecording?: ((event: GestureResponderEvent) => void) | undefined;
    pauseRecording?: ((event: GestureResponderEvent) => void) | undefined;
    startRecording?: ((event: GestureResponderEvent) => void) | undefined;
    stopRecording?: ((event: GestureResponderEvent) => void) | undefined;
}
export declare const ButtonContainerVideo: ({ isRecording, isPaused, isCanPause, canStopRecording, resumeRecording, pauseRecording, startRecording, stopRecording, }: ButtonContainerVideoProps) => React.JSX.Element;
export {};
