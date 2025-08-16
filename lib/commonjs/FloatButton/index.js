"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloatButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Popup = _interopRequireDefault(require("./Popup"));
var _FanMenu = _interopRequireDefault(require("./FanMenu"));
var _tradewize = require("tradewize");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MIN_EDGE_DISTANCE = 16;
const DRAG_THRESHOLD = 10; // Minimum distance to consider as drag
const TAP_DELAY = 200; // Maximum time to consider as tap

const FloatButton = ({
  onPress,
  children,
  size = 60,
  backgroundColor = '#007AFF',
  initialPosition,
  style,
  icon,
  iconColor = '#FFFFFF',
  isPlusEdgeDistance = false,
  // Popup props
  showPopup = false,
  popupContent,
  popupWidth = 200,
  popupHeight = 150,
  popupBackgroundColor = '#FFFFFF',
  popupBorderRadius = 12,
  onPopupClose,
  // Fan Menu props
  showFanMenu = false,
  menuItems = [],
  menuRadius = 90,
  menuStartAngle = 90,
  menuEndAngle = 270,
  menuItemBackgroundColor = '#007AFF',
  menuItemIconColor,
  onMenuClose,
  styleIconItem,
  // Main button props for fan menu
  mainButtonSize = 60,
  // mainButtonColor = '#007AFF',
  // mainButtonIcon = '+',
  // Minimum distance from screen edges
  minEdgeDistance = 16,
  // Y axis limit
  yAxisEndLimit = 50,
  yAxisStartLimit = 50
}) => {
  const pan = (0, _react.useRef)(new _reactNative.Animated.ValueXY()).current;
  const rotateAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const [isDragging, setIsDragging] = (0, _react.useState)(false);
  const [popupVisible, setPopupVisible] = (0, _react.useState)(false);
  const [fanMenuVisible, setFanMenuVisible] = (0, _react.useState)(false);
  const [buttonPosition, setButtonPosition] = (0, _react.useState)({
    x: 0,
    y: 0
  });
  const [rotateDirection, setRotateDirection] = (0, _react.useState)(['0deg', '-180deg']);

  // Add refs for better drag detection
  const startPosition = (0, _react.useRef)({
    x: 0,
    y: 0
  });
  const startTime = (0, _react.useRef)(0);
  const hasMoved = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    _reactNative.Animated.timing(rotateAnim, {
      toValue: fanMenuVisible ? 1 : 0,
      // 1 = 180°, 0 = 0°
      duration: 400,
      useNativeDriver: false
    }).start();
  }, [fanMenuVisible, rotateAnim]);

  // Set initial position
  (0, _react.useEffect)(() => {
    if (initialPosition) {
      pan.setValue(initialPosition);
      setButtonPosition(initialPosition);
    } else {
      // Default position: bottom right corner
      const defaultPos = {
        x: (0, _tradewize.getScreenWidth)() - size - MIN_EDGE_DISTANCE,
        y: (0, _tradewize.getScreenHeight)() - size - (0, _tradewize.getScreenHeight)() * 0.25
      };
      pan.setValue(defaultPos);
      setButtonPosition(defaultPos);
    }
  }, [initialPosition, size, pan]);

  // Set rotate direction
  (0, _react.useEffect)(() => {
    const {
      horizontal,
      vertical
    } = (0, _utils.getDirection)(buttonPosition);
    if (horizontal === 'right' && vertical === 'bottom') {
      setRotateDirection(['0deg', '-180deg']);
    } else if (horizontal === 'right' && vertical === 'top') {
      setRotateDirection(['-180deg', '0deg']);
    } else if (horizontal === 'left' && vertical === 'bottom') {
      setRotateDirection(['0deg', '-180deg']);
    } else if (horizontal === 'left' && vertical === 'top') {
      setRotateDirection(['-180deg', '0deg']);
    }
  }, [buttonPosition, rotateAnim]);
  const panResponder = (0, _react.useRef)(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_evt, gestureState) => {
      // Only start pan responder if movement exceeds threshold
      return Math.abs(gestureState.dx) > DRAG_THRESHOLD || Math.abs(gestureState.dy) > DRAG_THRESHOLD;
    },
    onPanResponderGrant: (_evt, gestureState) => {
      startPosition.current = {
        x: gestureState.x0,
        y: gestureState.y0
      };
      startTime.current = Date.now();
      hasMoved.current = false;
      setIsDragging(false);
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
      pan.setValue({
        x: 0,
        y: 0
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      const distance = Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2));
      if (distance > DRAG_THRESHOLD) {
        hasMoved.current = true;
        setIsDragging(true);
      }
      _reactNative.Animated.event([null, {
        dx: pan.x,
        dy: pan.y
      }], {
        useNativeDriver: false
      })(evt, gestureState);
    },
    onPanResponderRelease: (_evt, gestureState) => {
      const endTime = Date.now();
      const timeDiff = endTime - startTime.current;
      const distance = Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2));

      // If it's a quick tap with minimal movement, don't consider it as drag
      if (timeDiff < TAP_DELAY && distance < DRAG_THRESHOLD) {
        setIsDragging(false);
        hasMoved.current = false;
      }
      pan.flattenOffset();

      // Only snap to edges if we actually dragged
      if (hasMoved.current) {
        // Snap to edges if near screen boundaries
        const newX = pan.x._value;
        const newY = pan.y._value;
        let finalX = newX;
        let finalY = newY;

        // Snap to left or right edge
        if (newX < (0, _tradewize.getScreenWidth)() / 2) {
          finalX = minEdgeDistance;
        } else {
          finalX = (0, _tradewize.getScreenWidth)() - size - minEdgeDistance;
        }

        // Ensure button stays within screen bounds
        if (finalY < yAxisStartLimit) {
          finalY = yAxisStartLimit;
        } else if (finalY > (0, _tradewize.getScreenHeight)() - size - yAxisStartLimit - yAxisEndLimit) {
          finalY = (0, _tradewize.getScreenHeight)() - size - yAxisStartLimit - yAxisEndLimit;
        }
        const finalPosition = {
          x: finalX,
          y: finalY
        };
        setButtonPosition(finalPosition);
        _reactNative.Animated.spring(pan, {
          toValue: finalPosition,
          useNativeDriver: false,
          tension: 100,
          friction: 8
        }).start();
      }

      // Reset drag state after a short delay
      setTimeout(() => {
        setIsDragging(false);
        hasMoved.current = false;
      }, 100);
    }
  })).current;
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: rotateDirection
  });
  const handlePress = () => {
    console.log('isDragging', isDragging);
    console.log('hasMoved', hasMoved.current);
    if (!isDragging && !hasMoved.current) {
      if (showFanMenu && menuItems.length > 0) {
        setFanMenuVisible(true);
      } else if (showPopup && popupContent) {
        setPopupVisible(true);
      } else if (onPress) {
        onPress();
      }
    }
  };
  const handlePopupClose = () => {
    setPopupVisible(false);
    if (onPopupClose) {
      onPopupClose();
    }
  };
  const handleFanMenuClose = () => {
    setFanMenuVisible(false);
    if (onMenuClose) {
      onMenuClose();
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({
    style: [styles.container, {
      width: size,
      height: size,
      transform: [{
        translateX: pan.x
      }, {
        translateY: pan.y
      }, {
        rotate
      }]
    }, style]
  }, panResponder.panHandlers), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [styles.button, {
      width: size,
      height: size,
      backgroundColor,
      borderRadius: size / 2
    }],
    onPress: handlePress,
    activeOpacity: 0.8,
    delayPressIn: 0,
    delayPressOut: 0
  }, children || /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    tintColor: iconColor,
    style: styles.defaultIcon,
    source: icon ? icon : require('./assets/setting.png')
  }))), showPopup && popupContent && /*#__PURE__*/_react.default.createElement(_Popup.default, {
    visible: popupVisible,
    onClose: handlePopupClose,
    position: buttonPosition,
    width: popupWidth,
    height: popupHeight,
    backgroundColor: popupBackgroundColor,
    borderRadius: popupBorderRadius
  }, popupContent), showFanMenu && menuItems.length > 0 && /*#__PURE__*/_react.default.createElement(_FanMenu.default, {
    visible: fanMenuVisible,
    onClose: handleFanMenuClose,
    items: menuItems,
    position: buttonPosition,
    radius: menuRadius,
    startAngle: menuStartAngle,
    endAngle: menuEndAngle,
    itemBackgroundColor: menuItemBackgroundColor,
    iconColor: menuItemIconColor,
    mainButtonSize: mainButtonSize
    // mainButtonColor={mainButtonColor}
    // mainButtonIcon={mainButtonIcon}
    ,
    minEdgeDistance: minEdgeDistance,
    isPlusEdgeDistance: isPlusEdgeDistance,
    stylesIcon: styleIconItem
  }));
};
exports.FloatButton = FloatButton;
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  defaultIcon: {
    width: 24,
    height: 24
  }
});
//# sourceMappingURL=index.js.map