function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Image, Keyboard, PanResponder, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Canvas, Path, Skia, useImage, Image as SkiaImage, useCanvasRef, Group, Rect, Circle } from '@shopify/react-native-skia';
import { colors } from './types';
import ViewShot from 'react-native-view-shot';
const IMG_WIDTH = Dimensions.get('window').width;
const IMG_HEIGHT = Dimensions.get('window').width;
const fontSize = 22;
const ImageDrawingCanvas = props => {
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
    txtBtnDoneEdit = 'Xong'
  } = props;

  // Hooks phải được gọi trước early return
  const canvasRef = useCanvasRef();
  const image = useImage(uriImage);

  // Lưu trữ Animated values cho mỗi text
  const textAnimationsRef = useRef(new Map());
  const viewShotRef = useRef(null);
  const [mode, setMode] = useState(null);
  const [paths, setPaths] = useState([]);
  const [history, setHistory] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [currentPath, setCurrentPath] = useState(null);
  const [currentShape, setCurrentShape] = useState(null);
  const [shapeStartPos, setShapeStartPos] = useState(null);
  const [colorDraw, setColorDraw] = useState(colors[0] || '');
  const [showTextInput, setShowTextInput] = useState(false);
  const [currentInputText, setCurrentInputText] = useState('');
  const [inputText, setInputText] = useState([]);
  const [editingTextId, setEditingTextId] = useState(null);
  const [editingTextValue, setEditingTextValue] = useState('');
  const [colorText, setColorText] = useState(colors[0] || '');
  const clipPath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addRect({
      x: 0,
      y: 0,
      width: IMG_WIDTH,
      height: IMG_HEIGHT
    });
    return path;
  }, []);
  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const lastItem = history[history.length - 1];
    if ((lastItem === null || lastItem === void 0 ? void 0 : lastItem.type) === 'path') {
      setPaths(prev => prev.slice(0, -1));
    } else if ((lastItem === null || lastItem === void 0 ? void 0 : lastItem.type) === 'shape') {
      setShapes(prev => prev.slice(0, -1));
    }
    setHistory(prev => prev.slice(0, -1));
  }, [history]);
  const handleDoneDraw = useCallback(() => {
    setMode(null);
  }, []);
  const handleCapture = useCallback(async () => {
    try {
      var _viewShotRef$current;
      if ((_viewShotRef$current = viewShotRef.current) !== null && _viewShotRef$current !== void 0 && _viewShotRef$current.capture) {
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
  const createPanResponder = (textId, textContent, textColor) => {
    let hasMovedRef = false;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        hasMovedRef = false;
        const panValue = textAnimationsRef.current.get(textId);
        if (panValue) {
          panValue.setOffset({
            x: panValue.x._value,
            y: panValue.y._value
          });
          panValue.setValue({
            x: 0,
            y: 0
          });
        }
      },
      onPanResponderMove: (_, gestureState) => {
        // Nếu di chuyển quá 5px thì coi như đang kéo
        if (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5) {
          hasMovedRef = true;
        }
        const panValue = textAnimationsRef.current.get(textId);
        if (panValue && hasMovedRef) {
          Animated.event([null, {
            dx: panValue.x,
            dy: panValue.y
          }], {
            useNativeDriver: false
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
            panValue.setValue({
              x: 0,
              y: 0
            });
            panValue.flattenOffset();
          }
        } else if (panValue) {
          // Nếu có movement, lưu vị trí mới
          panValue.flattenOffset();
          setInputText(prev => prev.map(item => item.id === textId ? {
            ...item,
            x: panValue.x._value,
            y: panValue.y._value
          } : item));
        }
      }
    });
  };
  useEffect(() => {
    if (!showTextInput && (currentInputText === null || currentInputText === void 0 ? void 0 : currentInputText.length) > 0) {
      const newId = Date.now().toString();
      setCurrentInputText('');
      setInputText(prev => [...prev, {
        text: currentInputText,
        id: newId,
        x: -IMG_WIDTH / 2,
        y: -IMG_HEIGHT / 2,
        color: colorText
      }]);
      // Tạo Animated value mới cho text này
      textAnimationsRef.current.set(newId, new Animated.ValueXY({
        x: -IMG_WIDTH / 2,
        y: -IMG_HEIGHT / 2
      }));
    }
  }, [currentInputText, showTextInput, colorText]);
  const pan = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: e => {
      const {
        locationX,
        locationY
      } = e.nativeEvent;
      if (mode === 'draw') {
        const p = Skia.Path.Make();
        p.moveTo(locationX, locationY);
        setCurrentPath(p);
      } else if (mode === 'rect' || mode === 'circle') {
        // Only set start position, wait for move to create shape
        setShapeStartPos({
          x: locationX,
          y: locationY
        });
      }
    },
    onPanResponderMove: e => {
      const {
        locationX,
        locationY
      } = e.nativeEvent;
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
            height: Math.abs(locationY - shapeStartPos.y)
          });
        } else {
          const radius = Math.sqrt(Math.pow(locationX - shapeStartPos.x, 2) + Math.pow(locationY - shapeStartPos.y, 2));
          setCurrentShape({
            type: 'circle',
            x: shapeStartPos.x,
            y: shapeStartPos.y,
            radius: radius
          });
        }
      }
    },
    onPanResponderRelease: () => {
      if (mode === 'draw' && currentPath) {
        setPaths(prev => {
          const newPaths = [...prev, {
            path: currentPath,
            color: colorDraw
          }];
          setHistory(h => [...h, {
            type: 'path',
            pathIndex: newPaths.length - 1
          }]);
          return newPaths;
        });
        setCurrentPath(null);
      } else if ((mode === 'rect' || mode === 'circle') && currentShape) {
        // Batch state updates to prevent UI flickering
        const shapeToAdd = currentShape;
        setCurrentShape(null);
        setShapeStartPos(null);
        setShapes(prev => {
          const newShapes = [...prev, shapeToAdd];
          setHistory(h => [...h, {
            type: 'shape',
            shapeIndex: newShapes.length - 1
          }]);
          return newShapes;
        });
      }
    }
  }), [mode, currentPath, currentShape, shapeStartPos, colorDraw]);
  const renderHeaderControls = useMemo(() => {
    if (mode === 'draw') {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.headerControls
      }, /*#__PURE__*/React.createElement(TouchableOpacity, {
        style: styles.btnClose,
        onPress: (paths === null || paths === void 0 ? void 0 : paths.length) > 0 ? handleUndo : undefined
      }, (paths === null || paths === void 0 ? void 0 : paths.length) > 0 && /*#__PURE__*/React.createElement(Text, {
        style: styles.txtUndo
      }, "Ho\xE0n t\xE1c")), /*#__PURE__*/React.createElement(TouchableOpacity, {
        style: styles.btnClose,
        onPress: handleDoneDraw
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.txtDone
      }, txtBtnDoneEdit)));
    }
    if (mode === 'text') {
      return /*#__PURE__*/React.createElement(View, {
        style: [styles.headerControls, {
          justifyContent: 'flex-end'
        }]
      }, /*#__PURE__*/React.createElement(TouchableOpacity, {
        style: styles.btnClose,
        onPress: () => {
          handleDoneDraw();
          Keyboard.dismiss();
        }
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.txtDone
      }, txtBtnDoneEdit)));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.headerControls
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: styles.btnClose,
      onPress: () => {
        Alert.alert(titleCancel, contentCancel, [{
          text: txtBtnContinueCancel,
          style: 'cancel'
        }, {
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
          }
        }]);
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.txtClose
    }, "X")), /*#__PURE__*/React.createElement(View, {
      style: styles.layoutCanvas
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => {
        setMode('draw');
        setShowTextInput(false);
      },
      style: styles.btnCanvas
    }, /*#__PURE__*/React.createElement(Image, {
      tintColor: 'white',
      source: require('./assets/line.png'),
      style: [styles.imgCanvas, {
        transform: [{
          rotate: '45deg'
        }]
      }]
    })), /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => {
        setMode('text');
        setShowTextInput(true);
        setColorText(colors[0] || '');
      },
      style: styles.btnCanvas
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.txtCanvasMore
    }, "Aa"))));
  }, [mode, handleUndo, handleDoneDraw, onClose, contentCancel, paths === null || paths === void 0 ? void 0 : paths.length, titleCancel, txtBtnCancelCancel, txtBtnContinueCancel, txtBtnDoneEdit]);
  const renderFooterControls = useMemo(() => {
    if (mode === 'draw') {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.footerDraw
      }, /*#__PURE__*/React.createElement(ScrollView, {
        horizontal: true,
        showsHorizontalScrollIndicator: false
      }, colors.map(color => /*#__PURE__*/React.createElement(TouchableOpacity, {
        onPress: () => {
          setColorDraw(color);
        },
        key: color,
        style: [styles.btnColor, colorDraw === color && {
          padding: 2,
          borderColor: 'white'
        }]
      }, /*#__PURE__*/React.createElement(View, {
        style: [styles.colorDot, {
          backgroundColor: color
        }, colorDraw === color && {
          borderWidth: 0
        }]
      })))));
    }
    if (mode === 'text') {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.footerDraw
      }, /*#__PURE__*/React.createElement(ScrollView, {
        horizontal: true,
        showsHorizontalScrollIndicator: false
      }, colors.map(color => /*#__PURE__*/React.createElement(TouchableOpacity, {
        onPress: () => {
          setColorText(color);
        },
        key: color,
        style: [styles.btnColor, colorText === color && {
          padding: 2,
          borderColor: 'white'
        }]
      }, /*#__PURE__*/React.createElement(View, {
        style: [styles.colorDot, {
          backgroundColor: color
        }, colorText === color && {
          borderWidth: 0
        }]
      })))));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.footerDraw
    }, /*#__PURE__*/React.createElement(TouchableOpacity, {
      style: styles.btnDone,
      onPress: async () => {
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
      }
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.txtDone, {
        color: 'black'
      }]
    }, txtBtnDone)));
  }, [mode, colorDraw, colorText, handleCapture, onSave, onClose, handleDoneDraw, txtBtnDone]);
  if (!visible) {
    return null;
  }
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => {
      Keyboard.dismiss();
      handleDoneDraw();
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.containerContent
  }, renderHeaderControls, /*#__PURE__*/React.createElement(ViewShot, {
    style: {
      flex: 1
    },
    ref: viewShotRef,
    options: {
      format: 'jpg',
      quality: 0.9
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.canvasContainer
  }, /*#__PURE__*/React.createElement(Canvas, _extends({
    ref: canvasRef,
    style: {
      width: IMG_WIDTH,
      height: IMG_HEIGHT
    }
  }, pan.panHandlers), /*#__PURE__*/React.createElement(Group, {
    clip: clipPath
  }, image && /*#__PURE__*/React.createElement(SkiaImage, {
    image: image,
    x: 0,
    y: 0,
    width: IMG_WIDTH,
    height: IMG_HEIGHT,
    fit: "cover"
  }), paths.map((pathWithColor, i) => /*#__PURE__*/React.createElement(Path, {
    key: `path-${i}`,
    path: pathWithColor.path,
    color: pathWithColor.color,
    style: "stroke",
    strokeWidth: 4
  })), currentPath && /*#__PURE__*/React.createElement(Path, {
    path: currentPath,
    color: colorDraw,
    style: "stroke",
    strokeWidth: 4
  }), shapes.map((shape, i) => {
    if (shape.type === 'rect' && shape.width && shape.height) {
      return /*#__PURE__*/React.createElement(Rect, {
        key: `rect-${i}`,
        x: shape.x,
        y: shape.y,
        width: shape.width,
        height: shape.height,
        color: "green",
        style: "stroke",
        strokeWidth: 3
      });
    }
    if (shape.type === 'circle' && shape.radius) {
      return /*#__PURE__*/React.createElement(Circle, {
        key: `circle-${i}`,
        cx: shape.x,
        cy: shape.y,
        r: shape.radius,
        color: "blue",
        style: "stroke",
        strokeWidth: 3
      });
    }
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: `empty-${i}`
    });
  }), (currentShape === null || currentShape === void 0 ? void 0 : currentShape.type) === 'rect' && currentShape.width && currentShape.height && /*#__PURE__*/React.createElement(Rect, {
    x: currentShape.x,
    y: currentShape.y,
    width: currentShape.width,
    height: currentShape.height,
    color: "green",
    style: "stroke",
    strokeWidth: 3,
    opacity: 1
  }), (currentShape === null || currentShape === void 0 ? void 0 : currentShape.type) === 'circle' && currentShape.radius && /*#__PURE__*/React.createElement(Circle, {
    cx: currentShape.x,
    cy: currentShape.y,
    r: currentShape.radius,
    color: "blue",
    style: "stroke",
    strokeWidth: 3,
    opacity: 1
  }))), (mode === 'text' || inputText.length > 0) && /*#__PURE__*/React.createElement(View, null, inputText === null || inputText === void 0 ? void 0 : inputText.map(element => {
    // Lấy hoặc tạo animation value cho text này
    if (!textAnimationsRef.current.has(element.id)) {
      textAnimationsRef.current.set(element.id, new Animated.ValueXY({
        x: element.x,
        y: element.y
      }));
    }
    const panValue = textAnimationsRef.current.get(element.id);
    const panResponder = createPanResponder(element.id, element.text, element.color);
    const isEditing = editingTextId === element.id;
    return /*#__PURE__*/React.createElement(Animated.View, _extends({
      key: element.id
    }, !isEditing ? panResponder.panHandlers : {}, {
      style: [styles.movableBox, {
        transform: (panValue === null || panValue === void 0 ? void 0 : panValue.getTranslateTransform()) ?? []
      }]
    }), isEditing ? /*#__PURE__*/React.createElement(TextInput, {
      style: [styles.textOverlay, {
        color: colorText,
        fontSize
      }],
      value: editingTextValue,
      onChangeText: setEditingTextValue,
      selectionColor: colorText,
      autoFocus: true,
      multiline: true,
      onBlur: () => {
        // Lưu text và màu mới khi mất focus
        setInputText(prev => prev.map(item => item.id === element.id ? {
          ...item,
          text: editingTextValue,
          color: colorText
        } : item));
        setMode(null);
        setEditingTextId(null);
        setEditingTextValue('');
      }
    }) : /*#__PURE__*/React.createElement(Text, {
      style: [styles.textOverlay, {
        color: element.color,
        fontSize
      }]
    }, element.text));
  })), showTextInput && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.dimOverlay,
    pointerEvents: "none"
  }), /*#__PURE__*/React.createElement(TextInput, {
    key: colorText,
    style: [styles.textInputOverlay, {
      fontSize,
      top: IMG_HEIGHT / 2,
      color: colorText
    }],
    value: currentInputText,
    onChangeText: setCurrentInputText,
    selectionColor: colorText,
    autoFocus: true,
    onFocus: () => setShowTextInput(true),
    onBlur: () => setShowTextInput(false),
    multiline: true
  })))), /*#__PURE__*/React.createElement(View, {
    style: styles.footer
  }, renderFooterControls))));
};
export default ImageDrawingCanvas;
//# sourceMappingURL=index.js.map