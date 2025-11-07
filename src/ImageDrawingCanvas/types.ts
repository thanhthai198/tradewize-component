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
  path: any; // SkPath type from Skia
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

export const colors = [
  '#FFFFFF',
  '#000000',
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#33FFF2',
  '#F3FF33',
  '#FF8C33',
  '#8C33FF',
  '#33FF8C',
  '#FF3333',
  '#33A1FF',
  '#A1FF33',
  '#FF33F6',
  '#33FFD1',
  '#FFD133',
  '#FF6633',
  '#6633FF',
  '#33FF66',
  '#FF3366',
  '#3366FF',
  '#66FF33',
  '#FF33CC',
  '#33CCFF',
  '#CCFF33',
  '#FF9933',
  '#9933FF',
  '#33FF99',
  '#FF3399',
];
