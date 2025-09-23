import React from 'react';
export interface ImagePickerProps {
    /**
     * Callback function called when image is selected
     */
    onImageSelected?: (image: ImageData) => void;
    /**
     * Callback function called when there's an error
     */
    onError?: (error: string) => void;
    /**
     * Whether to show crop interface
     */
    enableCrop?: boolean;
    /**
     * Crop width
     */
    cropWidth?: number;
    /**
     * Crop height
     */
    cropHeight?: number;
    /**
     * Maximum file size in bytes
     */
    maxFileSize?: number;
    /**
     * Image quality (0-1)
     */
    quality?: number;
    /**
     * Whether to include base64 data
     */
    includeBase64?: boolean;
    /**
     * Custom button text
     */
    buttonText?: string;
    /**
     * Custom button style
     */
    buttonStyle?: any;
    /**
     * Custom text style
     */
    textStyle?: any;
    /**
     * Whether to show preview
     */
    showPreview?: boolean;
    /**
     * Preview image style
     */
    previewStyle?: any;
    /**
     * Whether to allow multiple selection
     */
    multiple?: boolean;
    /**
     * Maximum number of images when multiple is true
     */
    maxFiles?: number;
    /**
     * Whether to compress image
     */
    compress?: boolean;
    /**
     * Compression quality (0-1)
     */
    compressQuality?: number;
    /**
     * Whether to show loading indicator
     */
    showLoading?: boolean;
    /**
     * Custom loading component
     */
    loadingComponent?: React.ReactNode;
    /**
     * Whether to show action sheet
     */
    showActionSheet?: boolean;
    /**
     * Custom action sheet options
     */
    actionSheetOptions?: {
        title?: string;
        options?: string[];
        cancelButtonIndex?: number;
        destructiveButtonIndex?: number;
    };
}
export interface ImageData {
    uri: string;
    width: number;
    height: number;
    mime: string;
    size: number;
    filename?: string;
    path: string;
    data?: string;
}
export declare const ImagePickerComponent: React.FC<ImagePickerProps>;
export default ImagePickerComponent;
