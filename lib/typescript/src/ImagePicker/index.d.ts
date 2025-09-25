import React from 'react';
import { type Image as PickerImage } from 'react-native-image-crop-picker';
export interface ImagePickerProps {
    /**
     * Callback function called when an image is selected
     */
    onImageSelected?: (image: PickerImage | PickerImage[]) => void;
    /**
     * Callback function called when there's an error
     */
    onError?: (error: any) => void;
    /**
     * Maximum number of images that can be selected (for multiple selection)
     */
    multiple?: boolean;
    /**
     * Maximum number of images that can be selected
     */
    maxFiles?: number;
    /**
     * Whether to show crop options
     */
    cropping?: boolean;
    /**
     * Crop rectangle width
     */
    width?: number;
    /**
     * Crop rectangle height
     */
    height?: number;
    /**
     * Minimum image dimensions
     */
    minWidth?: number;
    minHeight?: number;
    /**
     * Maximum image dimensions
     */
    maxWidth?: number;
    maxHeight?: number;
    /**
     * Image format
     */
    includeBase64?: boolean;
    /**
     * Include EXIF data
     */
    includeExif?: boolean;
    /**
     * Media type to pick
     */
    mediaType?: 'photo' | 'video' | 'any';
    /**
     * Custom button text
     */
    buttonText?: string;
    /**
     * Custom button style
     */
    buttonStyle?: any;
    /**
     * Custom button text style
     */
    buttonTextStyle?: any;
    /**
     * Container style
     */
    style?: any;
    /**
     * Whether to show action sheet for source selection
     */
    showActionSheet?: boolean;
    /**
     * Custom action sheet options
     */
    actionSheetOptions?: string[];
    /**
     * Whether to compress images
     */
    compressImageQuality?: number;
    /**
     * Force JPEG format
     */
    forceJpg?: boolean;
    /**
     * Disable the component
     */
    disabled?: boolean;
}
declare const ImagePickerComponent: React.FC<ImagePickerProps>;
export default ImagePickerComponent;
