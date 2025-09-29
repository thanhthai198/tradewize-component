import React from 'react';
import { type StyleProp, type ViewStyle, type TextStyle } from 'react-native';
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
    buttonStyle?: StyleProp<ViewStyle>;
    /**
     * Custom button text style
     */
    buttonTextStyle?: StyleProp<TextStyle>;
    /**
     * Container style
     */
    style?: StyleProp<ViewStyle>;
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
    /**
     * Whether to show selected images
     */
    isShowSelectedImages?: boolean;
    /**
     * Whether to use camera
     */
    useCamera?: boolean;
    /**
     * Confirm button style
     */
    confirmButtonStyle?: StyleProp<ViewStyle>;
    /**
     * Confirm button text
     */
    confirmButtonText?: string;
    /**
     * Title modal
     */
    titleModal?: string;
    /**
     * Custom button
     */
    customButton?: (showImagePicker: () => void) => React.ReactNode;
}
declare const ImagePickerComponent: React.FC<ImagePickerProps>;
export default ImagePickerComponent;
