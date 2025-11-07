import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  PanResponder,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Canvas,
  Path,
  Skia,
  useImage,
  Image as SkiaImage,
  useCanvasRef,
  type SkPath,
  Group,
  Rect,
  Circle,
} from '@shopify/react-native-skia';
import {
  colors,
  type HistoryItem,
  type IImageDrawingCanvas,
  type IShapeStartPos,
  type PathWithColor,
  type Shape,
  type TextItem,
} from './types';
import ViewShot from 'react-native-view-shot';

const IMG_WIDTH = Dimensions.get('window').width;
const IMG_HEIGHT = Dimensions.get('window').width;
const fontSize = 22;

const ImageDrawingCanvas = (props: IImageDrawingCanvas) => {
  const {
    visible,
    uriImage,
    onClose,
    onSave,
    titleCancel = 'Huỷ bỏ chỉnh sửa',
    contentCancel = 'Bạn có chắc muốn huỷ bỏ tất cả chỉnh sửa?',
    txtBtnContinueCancel = 'Tiếp tục',
    txtBtnCancelCancel = 'Huỷ bỏ',
    txtBtnDone = 'Hoàn thành',
    txtBtnDoneEdit = 'Xong',
  } = props;

  // Hooks phải được gọi trước early return
  const canvasRef = useCanvasRef();
  const image = useImage(uriImage);

  // Lưu trữ Animated values cho mỗi text
  const textAnimationsRef = useRef<Map<string, Animated.ValueXY>>(new Map());
  const viewShotRef = useRef<ViewShot>(null);

  const [mode, setMode] = useState<'draw' | 'text' | 'rect' | 'circle' | null>(
    null
  );
  const [paths, setPaths] = useState<PathWithColor[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [shapeStartPos, setShapeStartPos] = useState<IShapeStartPos | null>(
    null
  );

  const [colorDraw, setColorDraw] = useState<string>(colors[0] || '');

  const [showTextInput, setShowTextInput] = useState(false);
  const [currentInputText, setCurrentInputText] = useState<string>('');
  const [inputText, setInputText] = useState<TextItem[]>([]);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editingTextValue, setEditingTextValue] = useState<string>('');
  const [colorText, setColorText] = useState<string>(colors[0] || '');

  const clipPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addRect({ x: 0, y: 0, width: IMG_WIDTH, height: IMG_HEIGHT });
    return path;
  }, []);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;

    const lastItem = history[history.length - 1];

    if (lastItem?.type === 'path') {
      setPaths((prev) => prev.slice(0, -1));
    } else if (lastItem?.type === 'shape') {
      setShapes((prev) => prev.slice(0, -1));
    }

    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  const handleDoneDraw = useCallback(() => {
    setMode(null);
  }, []);

  const handleCapture = useCallback(async () => {
    try {
      if (viewShotRef.current?.capture) {
        const uri = await viewShotRef.current.capture();
        // Có thể return uri này hoặc gọi callback
        return Platform.OS === 'ios' ? `file://${uri}` : uri;
      }
      return null;
    } catch (error) {
      console.error('Error capturing image:', error);
      return null;
    }
  }, []);

  const createPanResponder = (
    textId: string,
    textContent: string,
    textColor: string
  ) => {
    let hasMovedRef = false;

    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        hasMovedRef = false;
        const panValue = textAnimationsRef.current.get(textId);
        if (panValue) {
          panValue.setOffset({
            x: (panValue.x as any)._value,
            y: (panValue.y as any)._value,
          });
          panValue.setValue({ x: 0, y: 0 });
        }
      },
      onPanResponderMove: (_, gestureState) => {
        // Nếu di chuyển quá 5px thì coi như đang kéo
        if (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5) {
          hasMovedRef = true;
        }

        const panValue = textAnimationsRef.current.get(textId);
        if (panValue && hasMovedRef) {
          Animated.event([null, { dx: panValue.x, dy: panValue.y }], {
            useNativeDriver: false,
          })(_, gestureState);
        }
      },
      onPanResponderRelease: () => {
        const panValue = textAnimationsRef.current.get(textId);

        if (!hasMovedRef) {
          // Nếu không có movement, đây là tap -> mở edit mode
          setMode('text');
          setEditingTextId(textId);
          setEditingTextValue(textContent);
          setColorText(textColor);
          if (panValue) {
            // Reset về vị trí cũ
            panValue.setValue({ x: 0, y: 0 });
            panValue.flattenOffset();
          }
        } else if (panValue) {
          // Nếu có movement, lưu vị trí mới
          panValue.flattenOffset();
          setInputText((prev) =>
            prev.map((item) =>
              item.id === textId
                ? {
                    ...item,
                    x: (panValue.x as any)._value,
                    y: (panValue.y as any)._value,
                  }
                : item
            )
          );
        }
      },
    });
  };

  useEffect(() => {
    if (!showTextInput && currentInputText?.length > 0) {
      const newId = Date.now().toString();
      setCurrentInputText('');
      setInputText((prev) => [
        ...prev,
        {
          text: currentInputText,
          id: newId,
          x: -IMG_WIDTH / 2,
          y: -IMG_HEIGHT / 2,
          color: colorText,
        },
      ]);
      // Tạo Animated value mới cho text này
      textAnimationsRef.current.set(
        newId,
        new Animated.ValueXY({
          x: -IMG_WIDTH / 2,
          y: -IMG_HEIGHT / 2,
        })
      );
    }
  }, [currentInputText, showTextInput, colorText]);

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
          const { locationX, locationY } = e.nativeEvent;

          if (mode === 'draw') {
            const p = Skia.Path.Make();
            p.moveTo(locationX, locationY);
            setCurrentPath(p);
          } else if (mode === 'rect' || mode === 'circle') {
            // Only set start position, wait for move to create shape
            setShapeStartPos({ x: locationX, y: locationY });
          }
        },
        onPanResponderMove: (e) => {
          const { locationX, locationY } = e.nativeEvent;

          if (mode === 'draw' && currentPath) {
            const newPath = currentPath.copy();
            newPath.lineTo(locationX, locationY);
            setCurrentPath(newPath);
          } else if ((mode === 'rect' || mode === 'circle') && shapeStartPos) {
            if (mode === 'rect') {
              setCurrentShape({
                type: 'rect',
                x: Math.min(shapeStartPos.x, locationX),
                y: Math.min(shapeStartPos.y, locationY),
                width: Math.abs(locationX - shapeStartPos.x),
                height: Math.abs(locationY - shapeStartPos.y),
              });
            } else {
              const radius = Math.sqrt(
                Math.pow(locationX - shapeStartPos.x, 2) +
                  Math.pow(locationY - shapeStartPos.y, 2)
              );
              setCurrentShape({
                type: 'circle',
                x: shapeStartPos.x,
                y: shapeStartPos.y,
                radius: radius,
              });
            }
          }
        },
        onPanResponderRelease: () => {
          if (mode === 'draw' && currentPath) {
            setPaths((prev) => {
              const newPaths = [
                ...prev,
                { path: currentPath, color: colorDraw },
              ];
              setHistory((h) => [
                ...h,
                { type: 'path', pathIndex: newPaths.length - 1 },
              ]);
              return newPaths;
            });
            setCurrentPath(null);
          } else if ((mode === 'rect' || mode === 'circle') && currentShape) {
            // Batch state updates to prevent UI flickering
            const shapeToAdd = currentShape;
            setCurrentShape(null);
            setShapeStartPos(null);
            setShapes((prev) => {
              const newShapes = [...prev, shapeToAdd];
              setHistory((h) => [
                ...h,
                { type: 'shape', shapeIndex: newShapes.length - 1 },
              ]);
              return newShapes;
            });
          }
        },
      }),
    [mode, currentPath, currentShape, shapeStartPos, colorDraw]
  );

  const renderHeaderControls = useMemo(() => {
    if (mode === 'draw') {
      return (
        <View style={styles.headerControls}>
          <TouchableOpacity
            style={styles.btnClose}
            onPress={paths?.length > 0 ? handleUndo : undefined}
          >
            {paths?.length > 0 && <Text style={styles.txtUndo}>Hoàn tác</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnClose} onPress={handleDoneDraw}>
            <Text style={styles.txtDone}>{txtBtnDoneEdit}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (mode === 'text') {
      return (
        <View style={[styles.headerControls, { justifyContent: 'flex-end' }]}>
          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => {
              handleDoneDraw();
              Keyboard.dismiss();
            }}
          >
            <Text style={styles.txtDone}>{txtBtnDoneEdit}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.headerControls}>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            Alert.alert(titleCancel, contentCancel, [
              {
                text: txtBtnContinueCancel,
                style: 'cancel',
              },
              {
                text: txtBtnCancelCancel,
                style: 'destructive',
                onPress: () => {
                  onClose();
                  setPaths([]);
                  setCurrentPath(null);
                  setShapes([]);
                  setCurrentShape(null);
                  setShapeStartPos(null);
                  setColorDraw(colors[0] || '');
                  setInputText([]);
                  setHistory([]);
                  // Xóa tất cả animations
                  textAnimationsRef.current.clear();
                },
              },
            ]);
          }}
        >
          <Text style={styles.txtClose}>X</Text>
        </TouchableOpacity>

        <View style={styles.layoutCanvas}>
          <TouchableOpacity
            onPress={() => {
              setMode('draw');
              setShowTextInput(false);
            }}
            style={styles.btnCanvas}
          >
            <Image
              tintColor={'white'}
              source={require('./assets/line.png')}
              style={[styles.imgCanvas, { transform: [{ rotate: '45deg' }] }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setMode('text');
              setShowTextInput(true);
              setColorText(colors[0] || '');
            }}
            style={styles.btnCanvas}
          >
            <Text style={styles.txtCanvasMore}>Aa</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnCanvas}>
            <Image
              tintColor={'white'}
              source={require('./assets/crop.png')}
              style={styles.imgCanvas}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.btnCanvas}
            onPress={async () => {
              const uri = await handleCapture();
              if (uri && onSave) {
                onSave(uri);
              }
            }}
          >
            <Image
              tintColor={'white'}
              source={require('./assets/download.png')}
              style={styles.imgCanvas}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }, [
    mode,
    handleUndo,
    handleDoneDraw,
    onClose,
    contentCancel,
    paths?.length,
    titleCancel,
    txtBtnCancelCancel,
    txtBtnContinueCancel,
    txtBtnDoneEdit,
  ]);

  const renderFooterControls = useMemo(() => {
    if (mode === 'draw') {
      return (
        <View style={styles.footerDraw}>
          {/* <TouchableOpacity style={[styles.btnEaser]}>
            <Image
              tintColor={'white'}
              source={require('./assets/eraser_white.png')}
              style={styles.btnEaserImage}
            />
          </TouchableOpacity> */}

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {colors.map((color) => (
              <TouchableOpacity
                onPress={() => {
                  setColorDraw(color);
                }}
                key={color}
                style={[
                  styles.btnColor,
                  colorDraw === color && { padding: 2, borderColor: 'white' },
                ]}
              >
                <View
                  style={[
                    styles.colorDot,
                    { backgroundColor: color },
                    colorDraw === color && { borderWidth: 0 },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    }

    if (mode === 'text') {
      return (
        <View style={styles.footerDraw}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {colors.map((color) => (
              <TouchableOpacity
                onPress={() => {
                  setColorText(color);
                }}
                key={color}
                style={[
                  styles.btnColor,
                  colorText === color && { padding: 2, borderColor: 'white' },
                ]}
              >
                <View
                  style={[
                    styles.colorDot,
                    { backgroundColor: color },
                    colorText === color && { borderWidth: 0 },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.footerDraw}>
        <TouchableOpacity
          style={styles.btnDone}
          onPress={async () => {
            const uri = await handleCapture();
            if (uri && onSave) {
              onSave(uri);
            }
            handleDoneDraw();
            onClose();
            setPaths([]);
            setCurrentPath(null);
            setShapes([]);
            setCurrentShape(null);
            setShapeStartPos(null);
            setColorDraw(colors[0] || '');
            setInputText([]);
            setHistory([]);
            // Xóa tất cả animations
            textAnimationsRef.current.clear();
          }}
        >
          <Text style={[styles.txtDone, { color: 'black' }]}>{txtBtnDone}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [
    mode,
    colorDraw,
    colorText,
    handleCapture,
    onSave,
    onClose,
    handleDoneDraw,
    txtBtnDone,
  ]);

  if (!visible) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          handleDoneDraw();
        }}
      >
        <View style={styles.containerContent}>
          {renderHeaderControls}

          <ViewShot
            style={{ flex: 1 }}
            ref={viewShotRef}
            options={{
              format: 'jpg',
              quality: 0.9,
            }}
          >
            <View style={styles.canvasContainer}>
              <Canvas
                ref={canvasRef as any}
                style={{ width: IMG_WIDTH, height: IMG_HEIGHT }}
                {...pan.panHandlers}
              >
                <Group clip={clipPath}>
                  {/* Image nền */}
                  {image && (
                    <SkiaImage
                      image={image}
                      x={0}
                      y={0}
                      width={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      fit="cover"
                    />
                  )}

                  {/* Nét vẽ */}
                  {paths.map((pathWithColor, i) => (
                    <Path
                      key={`path-${i}`}
                      path={pathWithColor.path}
                      color={pathWithColor.color}
                      style="stroke"
                      strokeWidth={4}
                    />
                  ))}
                  {currentPath && (
                    <Path
                      path={currentPath}
                      color={colorDraw}
                      style="stroke"
                      strokeWidth={4}
                    />
                  )}

                  {/* Hình vẽ */}
                  {shapes.map((shape, i) => {
                    if (shape.type === 'rect' && shape.width && shape.height) {
                      return (
                        <Rect
                          key={`rect-${i}`}
                          x={shape.x}
                          y={shape.y}
                          width={shape.width}
                          height={shape.height}
                          color="green"
                          style="stroke"
                          strokeWidth={3}
                        />
                      );
                    }
                    if (shape.type === 'circle' && shape.radius) {
                      return (
                        <Circle
                          key={`circle-${i}`}
                          cx={shape.x}
                          cy={shape.y}
                          r={shape.radius}
                          color="blue"
                          style="stroke"
                          strokeWidth={3}
                        />
                      );
                    }
                    return <React.Fragment key={`empty-${i}`} />;
                  })}

                  {/* Hình đang kéo */}
                  {currentShape?.type === 'rect' &&
                    currentShape.width &&
                    currentShape.height && (
                      <Rect
                        x={currentShape.x}
                        y={currentShape.y}
                        width={currentShape.width}
                        height={currentShape.height}
                        color="green"
                        style="stroke"
                        strokeWidth={3}
                        opacity={1}
                      />
                    )}
                  {currentShape?.type === 'circle' && currentShape.radius && (
                    <Circle
                      cx={currentShape.x}
                      cy={currentShape.y}
                      r={currentShape.radius}
                      color="blue"
                      style="stroke"
                      strokeWidth={3}
                      opacity={1}
                    />
                  )}
                </Group>
              </Canvas>

              {(mode === 'text' || inputText.length > 0) && (
                <View>
                  {inputText?.map((element) => {
                    // Lấy hoặc tạo animation value cho text này
                    if (!textAnimationsRef.current.has(element.id)) {
                      textAnimationsRef.current.set(
                        element.id,
                        new Animated.ValueXY({ x: element.x, y: element.y })
                      );
                    }
                    const panValue = textAnimationsRef.current.get(element.id);
                    const panResponder = createPanResponder(
                      element.id,
                      element.text,
                      element.color
                    );
                    const isEditing = editingTextId === element.id;

                    return (
                      <Animated.View
                        key={element.id}
                        {...(!isEditing ? panResponder.panHandlers : {})}
                        style={[
                          styles.movableBox,
                          {
                            transform: panValue?.getTranslateTransform() ?? [],
                          },
                        ]}
                      >
                        {isEditing ? (
                          <TextInput
                            style={[
                              styles.textOverlay,
                              { color: colorText, fontSize },
                            ]}
                            value={editingTextValue}
                            onChangeText={setEditingTextValue}
                            selectionColor={colorText}
                            autoFocus
                            multiline
                            onBlur={() => {
                              // Lưu text và màu mới khi mất focus
                              setInputText((prev) =>
                                prev.map((item) =>
                                  item.id === element.id
                                    ? {
                                        ...item,
                                        text: editingTextValue,
                                        color: colorText,
                                      }
                                    : item
                                )
                              );
                              setMode(null);
                              setEditingTextId(null);
                              setEditingTextValue('');
                            }}
                          />
                        ) : (
                          <Text
                            style={[
                              styles.textOverlay,
                              { color: element.color, fontSize },
                            ]}
                          >
                            {element.text}
                          </Text>
                        )}
                      </Animated.View>
                    );
                  })}
                </View>
              )}

              {showTextInput && (
                <>
                  <View style={styles.dimOverlay} pointerEvents="none" />
                  <TextInput
                    key={colorText}
                    style={[
                      styles.textInputOverlay,
                      {
                        fontSize,
                        top: IMG_HEIGHT / 2,
                        color: colorText,
                      },
                    ]}
                    value={currentInputText}
                    onChangeText={setCurrentInputText}
                    selectionColor={colorText}
                    autoFocus
                    onFocus={() => setShowTextInput(true)}
                    onBlur={() => setShowTextInput(false)}
                    multiline
                  />
                </>
              )}
            </View>
          </ViewShot>

          <View style={styles.footer}>{renderFooterControls}</View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ImageDrawingCanvas;
