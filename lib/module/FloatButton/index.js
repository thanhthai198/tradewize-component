function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity, PanResponder, Animated, StyleSheet, Image } from 'react-native';
import Popup from './Popup';
import FanMenu from './FanMenu';
import { getScreenHeight, getScreenWidth } from '../utils';
import { getDirection } from './utils';
const MIN_EDGE_DISTANCE = 16;
export const FloatButton = ({
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
  const pan = useRef(new Animated.ValueXY()).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isDragging, setIsDragging] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [fanMenuVisible, setFanMenuVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({
    x: 0,
    y: 0
  });
  const [rotateDirection, setRotateDirection] = useState(['0deg', '-180deg']);
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: fanMenuVisible ? 1 : 0,
      // 1 = 180°, 0 = 0°
      duration: 400,
      useNativeDriver: false
    }).start();
  }, [fanMenuVisible, rotateAnim]);

  // Set initial position
  useEffect(() => {
    if (initialPosition) {
      pan.setValue(initialPosition);
      setButtonPosition(initialPosition);
    } else {
      // Default position: bottom right corner
      const defaultPos = {
        x: getScreenWidth() - size - MIN_EDGE_DISTANCE,
        y: getScreenHeight() - size - getScreenHeight() * 0.25
      };
      pan.setValue(defaultPos);
      setButtonPosition(defaultPos);
    }
  }, [initialPosition, size, pan]);

  // Set rotate direction
  useEffect(() => {
    const {
      horizontal,
      vertical
    } = getDirection(buttonPosition);
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
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDragging(true);
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
      pan.setValue({
        x: 0,
        y: 0
      });
    },
    onPanResponderMove: Animated.event([null, {
      dx: pan.x,
      dy: pan.y
    }], {
      useNativeDriver: false
    }),
    onPanResponderRelease: () => {
      setIsDragging(false);
      pan.flattenOffset();

      // Snap to edges if near screen boundaries
      const newX = pan.x._value;
      const newY = pan.y._value;
      let finalX = newX;
      let finalY = newY;

      // Snap to left or right edge
      if (newX < getScreenWidth() / 2) {
        finalX = minEdgeDistance;
      } else {
        finalX = getScreenWidth() - size - minEdgeDistance;
      }

      // Ensure button stays within screen bounds
      if (finalY < yAxisStartLimit) {
        finalY = yAxisStartLimit;
      } else if (finalY > getScreenHeight() - size - yAxisStartLimit - yAxisEndLimit) {
        finalY = getScreenHeight() - size - yAxisStartLimit - yAxisEndLimit;
      }
      const finalPosition = {
        x: finalX,
        y: finalY
      };
      setButtonPosition(finalPosition);
      Animated.spring(pan, {
        toValue: finalPosition,
        useNativeDriver: false,
        tension: 100,
        friction: 8
      }).start();
    }
  })).current;
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: rotateDirection
  });
  const handlePress = () => {
    if (!isDragging) {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Animated.View, _extends({
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
  }, panResponder.panHandlers), /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.button, {
      width: size,
      height: size,
      backgroundColor,
      borderRadius: size / 2
    }],
    onPress: handlePress,
    activeOpacity: 0.8
  }, children || /*#__PURE__*/React.createElement(Image, {
    tintColor: iconColor,
    style: styles.defaultIcon,
    source: icon ? icon : require('./assets/setting.png')
  }))), showPopup && popupContent && /*#__PURE__*/React.createElement(Popup, {
    visible: popupVisible,
    onClose: handlePopupClose,
    position: buttonPosition,
    width: popupWidth,
    height: popupHeight,
    backgroundColor: popupBackgroundColor,
    borderRadius: popupBorderRadius
  }, popupContent), showFanMenu && menuItems.length > 0 && /*#__PURE__*/React.createElement(FanMenu, {
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
const styles = StyleSheet.create({
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