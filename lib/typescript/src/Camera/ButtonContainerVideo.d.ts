import { type GestureResponderEvent } from 'react-native';
interface ButtonContainerVideoProps {
    isRecording?: boolean;
    isPaused?: boolean;
    resumeRecording?: ((event: GestureResponderEvent) => void) | undefined;
    pauseRecording?: ((event: GestureResponderEvent) => void) | undefined;
    startRecording?: ((event: GestureResponderEvent) => void) | undefined;
}
export declare const ButtonContainerVideo: ({ isRecording, isPaused, resumeRecording, pauseRecording, startRecording, }: ButtonContainerVideoProps) => import("react/jsx-runtime").JSX.Element;
export {};
