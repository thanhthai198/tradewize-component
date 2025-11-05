import React from 'react';
import type { ViewStyle, DimensionValue } from 'react-native';
export interface VideoPlayerProps {
    source: string;
    height?: number;
    width?: DimensionValue;
    style?: ViewStyle;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    showControls?: boolean;
    progressUpdateInterval?: number;
    rate?: number;
    onError?: (error: any, loading: boolean) => void;
    onLoad?: (loading: boolean) => void;
    onEnd?: () => void;
    onProgress?: (progress: {
        currentTime: number;
        playableDuration: number;
        seekableDuration: number;
    }) => void;
    onPlayingChange?: (isPlaying: boolean) => void;
}
export declare const VideoPlayer: React.FC<VideoPlayerProps>;
export { VideoModal } from './VideoModal';
