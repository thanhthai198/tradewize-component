import React from 'react';
import type { PhotoFile, VideoFile } from 'react-native-vision-camera';
export interface CameraProps {
    onPhotoCaptured?: (photo: PhotoFile) => void;
    onVideoRecorded?: (video: VideoFile) => void;
    onError?: (error: string) => void;
    onClose?: () => void;
    flashMode?: 'off' | 'on';
    mode?: 'photo' | 'video' | 'both';
    audio?: boolean;
    initialZoom?: number;
}
export declare const CameraComponent: React.FC<CameraProps>;
export default CameraComponent;
