import React from 'react';
import type { PhotoFile, VideoFile } from 'react-native-vision-camera';
export interface CameraProps {
    onPhotoCaptured?: (photo: PhotoFile & {
        size: number;
    }) => void;
    onVideoRecorded?: (video: VideoFile & {
        size: number;
    }) => void;
    onError?: (error: string) => void;
    onClose?: () => void;
    flashMode?: 'off' | 'on';
    mode?: 'photo' | 'video' | 'both';
    audio?: boolean;
    initialZoom?: number;
    isCanPause?: boolean;
    minRecordingTime?: number;
    maxRecordingTime?: number;
}
export declare const CameraComponent: React.FC<CameraProps>;
export default CameraComponent;
