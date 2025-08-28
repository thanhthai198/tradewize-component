"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapScrollView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ButtonBase = require("../ButtonBase");
var _ButtonContainerVideo = require("./ButtonContainerVideo");
var _utils = require("../utils");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ArrayType = ['Photo', 'Video'];
const ITEM_WIDTH = 80;
const ITEM_MARGIN = 8;
const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_MARGIN * 2;
const SnapScrollView = props => {
  const {
    mode,
    isCapturing,
    capturePhoto,
    toggleCameraPosition,
    isRecording,
    isPaused,
    isCanPause,
    canStopRecording = false,
    stopRecording,
    startRecording,
    pauseRecording,
    resumeRecording
  } = props;
  const [activeIndex, setActiveIndex] = (0, _react.useState)(0);
  const screenWidth = _reactNative.Dimensions.get('window').width;
  const flatListRef = (0, _react.useRef)(null);
  const lastScrollTime = (0, _react.useRef)(0);
  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();

  // Animation values for stop recording button
  const fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const scaleAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0.8)).current;

  // Handle animation for stop recording button
  (0, _react.useEffect)(() => {
    if (isRecording && isPaused && mode !== 'photo') {
      // Animate in
      _reactNative.Animated.parallel([_reactNative.Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }), _reactNative.Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true
      })]).start();
    } else {
      // Animate out
      _reactNative.Animated.parallel([_reactNative.Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }), _reactNative.Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true
      })]).start();
    }
  }, [isRecording, isPaused, mode, fadeAnim, scaleAnim]);
  const scrollToIndex = index => {
    var _flatListRef$current;
    (_flatListRef$current = flatListRef.current) === null || _flatListRef$current === void 0 || _flatListRef$current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5
    });
    setActiveIndex(index);
  };
  const onScrollEndDrag = event => {
    const now = Date.now();
    if (now - lastScrollTime.current < 300) return; // tránh double trigger
    lastScrollTime.current = now;
    const offsetX = event.nativeEvent.contentOffset.x;
    const rawIndex = offsetX / TOTAL_ITEM_WIDTH;
    const delta = rawIndex - activeIndex;
    let nextIndex = activeIndex;
    if (delta > 0.3) {
      nextIndex = Math.min(activeIndex + 1, ArrayType.length - 1);
    } else if (delta < -0.3) {
      nextIndex = Math.max(activeIndex - 1, 0);
    }
    if (nextIndex !== activeIndex) {
      scrollToIndex(nextIndex);
    } else {
      // nếu không đổi, vẫn snap về đúng vị trí
      scrollToIndex(activeIndex);
    }
  };
  const finalArr = (0, _react.useMemo)(() => {
    if (mode !== 'both') {
      return ArrayType.filter(item => item.toLowerCase() === mode);
    }
    return ArrayType;
  }, [mode]);
  const renderButton = (0, _react.useMemo)(() => {
    if (mode === 'both') {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, activeIndex === 0 ? /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
        style: [styles.captureButton, isCapturing && styles.captureButtonDisabled],
        onPress: capturePhoto,
        disabled: isCapturing
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.captureButtonInner
      })) : /*#__PURE__*/_react.default.createElement(_ButtonContainerVideo.ButtonContainerVideo, {
        isCanPause: isCanPause,
        isPaused: isPaused,
        isRecording: isRecording,
        canStopRecording: canStopRecording,
        pauseRecording: pauseRecording,
        resumeRecording: resumeRecording,
        startRecording: startRecording,
        stopRecording: stopRecording
      }));
    } else if (mode === 'photo') {
      return /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
        style: [styles.captureButton, isCapturing && styles.captureButtonDisabled],
        onPress: capturePhoto,
        disabled: isCapturing
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.captureButtonInner
      }));
    } else {
      return /*#__PURE__*/_react.default.createElement(_ButtonContainerVideo.ButtonContainerVideo, {
        isCanPause: isCanPause,
        isPaused: isPaused,
        isRecording: isRecording,
        canStopRecording: canStopRecording,
        pauseRecording: pauseRecording,
        resumeRecording: resumeRecording,
        startRecording: startRecording,
        stopRecording: stopRecording
      });
    }
  }, [mode, activeIndex, capturePhoto, isCapturing, isRecording, isPaused, startRecording, pauseRecording, resumeRecording, isCanPause, stopRecording, canStopRecording]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.bottomControls,
    // eslint-disable-next-line react-native/no-inline-styles
    {
      paddingBottom: bottom,
      backgroundColor: 'transparent'
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    ref: flatListRef,
    horizontal: true,
    data: finalArr,
    keyExtractor: (_item, index) => index.toString(),
    showsHorizontalScrollIndicator: false,
    scrollEnabled: mode === 'both' && !isRecording,
    onScrollEndDrag: onScrollEndDrag,
    contentContainerStyle: {
      paddingHorizontal: (screenWidth - TOTAL_ITEM_WIDTH) / 2
    },
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
      disabled: mode !== 'both' || isRecording,
      onPress: () => {
        if (index > activeIndex) {
          scrollToIndex(Math.min(activeIndex + 1, ArrayType.length - 1));
        } else if (index < activeIndex) {
          scrollToIndex(Math.max(activeIndex - 1, 0));
        }
      },
      style: styles.item
    }, !isRecording ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.text, activeIndex === index && styles.activeText]
    }, item) : null)
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.captureButtonContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: [styles.stopRecordingButton, {
      opacity: fadeAnim,
      transform: [{
        scale: scaleAnim
      }]
    }]
  }, isCanPause && canStopRecording && /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    style: styles.switchButton,
    onPress: stopRecording
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.stopRecordingButtonInner
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.actionButtonContainer
  }, renderButton), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.switchButtonContainer
  }, /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
    style: styles.switchButton,
    onPress: toggleCameraPosition
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    tintColor: "#FFFFFF",
    source: require('../assets/repeat.png'),
    style: [styles.switchButtonImage, {
      transform: [{
        rotate: '90deg'
      }]
    }]
  })))));
};
exports.SnapScrollView = SnapScrollView;
const styles = _reactNative.StyleSheet.create({
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 16,
    height: (0, _utils.getScreenHeight)() * 0.215
  },
  item: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_MARGIN,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 24
  },
  activeText: {
    color: '#FFEB3B'
  },
  actionButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  captureButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  captureButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FFFFFF'
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  recordButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#FF0000'
  },
  recordButtonInnerActive: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FF0000'
  },
  recordButtonInnerPaused: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#FFD700'
  },
  captureButtonDisabled: {
    opacity: 0.5
  },
  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  stopButtonInner: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF'
  },
  switchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#585753',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  switchButtonImage: {
    width: 32,
    height: 32
  },
  switchButtonContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 24,
    top: 0,
    zIndex: 1
  },
  stopRecordingButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 24,
    top: 0,
    zIndex: 1
  },
  stopRecordingButtonInner: {
    width: 20,
    height: 20,
    backgroundColor: '#FF0000'
  }
});
//# sourceMappingURL=CameraModeSelector.js.map