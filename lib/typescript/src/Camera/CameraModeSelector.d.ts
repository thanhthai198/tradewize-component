import { type GestureResponderEvent } from 'react-native';
interface SnapScrollViewProps {
    mode: 'photo' | 'video' | 'both';
    isCapturing?: boolean;
    isRecording?: boolean;
    isPaused?: boolean;
    stopRecording?: ((event: GestureResponderEvent) => void) | undefined;
    startRecording?: ((event: GestureResponderEvent) => void) | undefined;
    pauseRecording?: ((event: GestureResponderEvent) => void) | undefined;
    resumeRecording?: ((event: GestureResponderEvent) => void) | undefined;
    capturePhoto?: ((event: GestureResponderEvent) => void) | undefined;
    toggleCameraPosition?: ((event: GestureResponderEvent) => void) | undefined;
}
export declare const SnapScrollView: (props: SnapScrollViewProps) => import("react/jsx-runtime").JSX.Element;
export {};
