"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = require("./styles");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativeSkia = require("@shopify/react-native-skia");
var _types = require("./types");
var _reactNativeViewShot = _interopRequireDefault(require("react-native-view-shot"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const IMG_WIDTH = _reactNative.Dimensions.get('window').width;
const IMG_HEIGHT = _reactNative.Dimensions.get('window').width;
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
  const canvasRef = (0, _reactNativeSkia.useCanvasRef)();
  const image = (0, _reactNativeSkia.useImage)(uriImage);

  // Lưu trữ Animated values cho mỗi text
  const textAnimationsRef = (0, _react.useRef)(new Map());
  const viewShotRef = (0, _react.useRef)(null);
  const [mode, setMode] = (0, _react.useState)(null);
  const [paths, setPaths] = (0, _react.useState)([]);
  const [history, setHistory] = (0, _react.useState)([]);
  const [shapes, setShapes] = (0, _react.useState)([]);
  const [currentPath, setCurrentPath] = (0, _react.useState)(null);
  const [currentShape, setCurrentShape] = (0, _react.useState)(null);
  const [shapeStartPos, setShapeStartPos] = (0, _react.useState)(null);
  const [colorDraw, setColorDraw] = (0, _react.useState)(_types.colors[0] || '');
  const [showTextInput, setShowTextInput] = (0, _react.useState)(false);
  const [currentInputText, setCurrentInputText] = (0, _react.useState)('');
  const [inputText, setInputText] = (0, _react.useState)([]);
  const [editingTextId, setEditingTextId] = (0, _react.useState)(null);
  const [editingTextValue, setEditingTextValue] = (0, _react.useState)('');
  const [colorText, setColorText] = (0, _react.useState)(_types.colors[0] || '');
  const clipPath = (0, _react.useMemo)(() => {
    const path = _reactNativeSkia.Skia.Path.Make();
    path.addRect({
      x: 0,
      y: 0,
      width: IMG_WIDTH,
      height: IMG_HEIGHT
    });
    return path;
  }, []);
  const handleUndo = (0, _react.useCallback)(() => {
    if (history.length === 0) return;
    const lastItem = history[history.length - 1];
    if ((lastItem === null || lastItem === void 0 ? void 0 : lastItem.type) === 'path') {
      setPaths(prev => prev.slice(0, -1));
    } else if ((lastItem === null || lastItem === void 0 ? void 0 : lastItem.type) === 'shape') {
      setShapes(prev => prev.slice(0, -1));
    }
    setHistory(prev => prev.slice(0, -1));
  }, [history]);
  const handleDoneDraw = (0, _react.useCallback)(() => {
    setMode(null);
  }, []);
  const handleCapture = (0, _react.useCallback)(async () => {
    try {
      var _viewShotRef$current;
      if ((_viewShotRef$current = viewShotRef.current) !== null && _viewShotRef$current !== void 0 && _viewShotRef$current.capture) {
        const uri = await viewShotRef.current.capture();
        // Có thể return uri này hoặc gọi callback
        return _reactNative.Platform.OS === 'ios' ? `file://${uri}` : uri;
      }
      return null;
    } catch (error) {
      console.error('Error capturing image:', error);
      return null;
    }
  }, []);
  const createPanResponder = (textId, textContent, textColor) => {
    let hasMovedRef = false;
    return _reactNative.PanResponder.create({
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
          _reactNative.Animated.event([null, {
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
  (0, _react.useEffect)(() => {
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
      textAnimationsRef.current.set(newId, new _reactNative.Animated.ValueXY({
        x: -IMG_WIDTH / 2,
        y: -IMG_HEIGHT / 2
      }));
    }
  }, [currentInputText, showTextInput, colorText]);
  const pan = (0, _react.useMemo)(() => _reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: e => {
      const {
        locationX,
        locationY
      } = e.nativeEvent;
      if (mode === 'draw') {
        const p = _reactNativeSkia.Skia.Path.Make();
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
  const renderHeaderControls = (0, _react.useMemo)(() => {
    const hasDrawing = (paths === null || paths === void 0 ? void 0 : paths.length) > 0 || (shapes === null || shapes === void 0 ? void 0 : shapes.length) > 0 || (inputText === null || inputText === void 0 ? void 0 : inputText.length) > 0;
    if (mode === 'draw') {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.styles.headerControls
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _styles.styles.btnClose,
        onPress: (paths === null || paths === void 0 ? void 0 : paths.length) > 0 ? handleUndo : undefined
      }, (paths === null || paths === void 0 ? void 0 : paths.length) > 0 && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: _styles.styles.txtUndo
      }, "Ho\xE0n t\xE1c")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _styles.styles.btnClose,
        onPress: handleDoneDraw
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: _styles.styles.txtDone
      }, txtBtnDoneEdit)));
    }
    if (mode === 'text') {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.styles.headerControls, {
          justifyContent: 'flex-end'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _styles.styles.btnClose,
        onPress: () => {
          handleDoneDraw();
          _reactNative.Keyboard.dismiss();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: _styles.styles.txtDone
      }, txtBtnDoneEdit)));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.headerControls
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: _styles.styles.btnClose,
      onPress: () => {
        if (hasDrawing) {
          _reactNative.Alert.alert(titleCancel, contentCancel, [{
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
              setColorDraw(_types.colors[0] || '');
              setInputText([]);
              setHistory([]);
              // Xóa tất cả animations
              textAnimationsRef.current.clear();
            }
          }]);
        } else {
          onClose();
          setPaths([]);
          setCurrentPath(null);
          setShapes([]);
          setCurrentShape(null);
          setShapeStartPos(null);
          setColorDraw(_types.colors[0] || '');
          setInputText([]);
          setHistory([]);
          // Xóa tất cả animations
          textAnimationsRef.current.clear();
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: _styles.styles.txtClose
    }, "X")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.layoutCanvas
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: () => {
        setMode('draw');
        setShowTextInput(false);
      },
      style: _styles.styles.btnCanvas
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      tintColor: 'white',
      source: require('./assets/line.png'),
      style: [_styles.styles.imgCanvas, {
        transform: [{
          rotate: '45deg'
        }]
      }]
    })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: () => {
        setMode('text');
        setShowTextInput(true);
        setColorText(_types.colors[0] || '');
      },
      style: _styles.styles.btnCanvas
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: _styles.styles.txtCanvasMore
    }, "Aa"))));
  }, [paths === null || paths === void 0 ? void 0 : paths.length, shapes === null || shapes === void 0 ? void 0 : shapes.length, inputText === null || inputText === void 0 ? void 0 : inputText.length, mode, handleUndo, handleDoneDraw, txtBtnDoneEdit, titleCancel, contentCancel, txtBtnContinueCancel, txtBtnCancelCancel, onClose]);
  const renderFooterControls = (0, _react.useMemo)(() => {
    if (mode === 'draw') {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.styles.footerDraw
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true,
        showsHorizontalScrollIndicator: false
      }, _types.colors.map(color => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: () => {
          setColorDraw(color);
        },
        key: color,
        style: [_styles.styles.btnColor, colorDraw === color && {
          padding: 2,
          borderColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.styles.colorDot, {
          backgroundColor: color
        }, colorDraw === color && {
          borderWidth: 0
        }]
      })))));
    }
    if (mode === 'text') {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.styles.footerDraw
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true,
        showsHorizontalScrollIndicator: false
      }, _types.colors.map(color => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: () => {
          setColorText(color);
        },
        key: color,
        style: [_styles.styles.btnColor, colorText === color && {
          padding: 2,
          borderColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.styles.colorDot, {
          backgroundColor: color
        }, colorText === color && {
          borderWidth: 0
        }]
      })))));
    }
    const hasDrawing = (paths === null || paths === void 0 ? void 0 : paths.length) > 0 || (shapes === null || shapes === void 0 ? void 0 : shapes.length) > 0 || (inputText === null || inputText === void 0 ? void 0 : inputText.length) > 0;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.footerDraw
    }, hasDrawing && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: _styles.styles.btnDone,
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
        setColorDraw(_types.colors[0] || '');
        setInputText([]);
        setHistory([]);
        // Xóa tất cả animations
        textAnimationsRef.current.clear();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [_styles.styles.txtDone, {
        color: 'black'
      }]
    }, txtBtnDone)));
  }, [mode, txtBtnDone, colorDraw, colorText, paths.length, shapes.length, inputText.length, handleDoneDraw, onClose, handleCapture, onSave]);
  if (!visible) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, {
    style: _styles.styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => {
      _reactNative.Keyboard.dismiss();
      handleDoneDraw();
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.containerContent
  }, renderHeaderControls, /*#__PURE__*/_react.default.createElement(_reactNativeViewShot.default, {
    style: {
      flex: 1
    },
    ref: viewShotRef,
    options: {
      format: 'jpg',
      quality: 0.9
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.canvasContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Canvas, _extends({
    ref: canvasRef,
    style: {
      width: IMG_WIDTH,
      height: IMG_HEIGHT
    }
  }, pan.panHandlers), /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Group, {
    clip: clipPath
  }, image && /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Image, {
    image: image,
    x: 0,
    y: 0,
    width: IMG_WIDTH,
    height: IMG_HEIGHT,
    fit: "cover"
  }), paths.map((pathWithColor, i) => /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Path, {
    key: `path-${i}`,
    path: pathWithColor.path,
    color: pathWithColor.color,
    style: "stroke",
    strokeWidth: 4
  })), currentPath && /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Path, {
    path: currentPath,
    color: colorDraw,
    style: "stroke",
    strokeWidth: 4
  }), shapes.map((shape, i) => {
    if (shape.type === 'rect' && shape.width && shape.height) {
      return /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Rect, {
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
      return /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Circle, {
        key: `circle-${i}`,
        cx: shape.x,
        cy: shape.y,
        r: shape.radius,
        color: "blue",
        style: "stroke",
        strokeWidth: 3
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: `empty-${i}`
    });
  }), (currentShape === null || currentShape === void 0 ? void 0 : currentShape.type) === 'rect' && currentShape.width && currentShape.height && /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Rect, {
    x: currentShape.x,
    y: currentShape.y,
    width: currentShape.width,
    height: currentShape.height,
    color: "green",
    style: "stroke",
    strokeWidth: 3,
    opacity: 1
  }), (currentShape === null || currentShape === void 0 ? void 0 : currentShape.type) === 'circle' && currentShape.radius && /*#__PURE__*/_react.default.createElement(_reactNativeSkia.Circle, {
    cx: currentShape.x,
    cy: currentShape.y,
    r: currentShape.radius,
    color: "blue",
    style: "stroke",
    strokeWidth: 3,
    opacity: 1
  }))), (mode === 'text' || inputText.length > 0) && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, inputText === null || inputText === void 0 ? void 0 : inputText.map(element => {
    // Lấy hoặc tạo animation value cho text này
    if (!textAnimationsRef.current.has(element.id)) {
      textAnimationsRef.current.set(element.id, new _reactNative.Animated.ValueXY({
        x: element.x,
        y: element.y
      }));
    }
    const panValue = textAnimationsRef.current.get(element.id);
    const panResponder = createPanResponder(element.id, element.text, element.color);
    const isEditing = editingTextId === element.id;
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({
      key: element.id
    }, !isEditing ? panResponder.panHandlers : {}, {
      style: [_styles.styles.movableBox, {
        transform: (panValue === null || panValue === void 0 ? void 0 : panValue.getTranslateTransform()) ?? []
      }]
    }), isEditing ? /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
      style: [_styles.styles.textOverlay, {
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
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [_styles.styles.textOverlay, {
        color: element.color,
        fontSize
      }]
    }, element.text));
  })), showTextInput && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.dimOverlay,
    pointerEvents: "none"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    key: colorText,
    style: [_styles.styles.textInputOverlay, {
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
  })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _styles.styles.footer
  }, renderFooterControls))));
};
var _default = exports.default = ImageDrawingCanvas;
//# sourceMappingURL=index.js.map