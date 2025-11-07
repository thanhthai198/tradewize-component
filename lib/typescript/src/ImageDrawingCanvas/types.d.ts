export interface IImageDrawingCanvas {
    visible: boolean;
    uriImage: string;
    titleCancel?: string;
    contentCancel?: string;
    txtBtnContinueCancel?: string;
    txtBtnCancelCancel?: string;
    txtBtnDone?: string;
    txtBtnDoneEdit?: string;
    onClose: () => void;
    onSave?: (uri: string) => void;
}
export type Shape = {
    type: 'rect' | 'circle';
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
};
export interface IShapeStartPos {
    x: number;
    y: number;
}
export type HistoryItem = {
    type: 'path' | 'shape';
    pathIndex?: number;
    shapeIndex?: number;
};
export interface PathWithColor {
    path: any;
    color: string;
    isEraser?: boolean;
}
export interface TextItem {
    text: string;
    id: string;
    x: number;
    y: number;
    color: string;
}
export declare const colors: string[];
