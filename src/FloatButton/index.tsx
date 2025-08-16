import React, { useRef, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  PanResponder,
  Animated,
  StyleSheet,
  Image,
  type StyleProp,
  type ImageStyle,
} from 'react-native';
import Popup from './Popup';
import FanMenu from './FanMenu';
import { getScreenHeight, getScreenWidth } from 'tradewize';
import { getDirection } from './utils';
import type { MenuItem } from './type';

interface FloatButtonProps {
  onPress?: () => void;
  children?: React.ReactNode;
  size?: number;
  backgroundColor?: string;
  initialPosition?: { x: number; y: number };
  style?: any;
  icon?: any;
  iconColor?: string;
  isPlusEdgeDistance?: boolean;
  // Popup props
  showPopup?: boolean;
  popupContent?: React.ReactNode;
  popupWidth?: number;
  popupHeight?: number;
  popupBackgroundColor?: string;
  popupBorderRadius?: number;
  onPopupClose?: () => void;
  // Fan Menu props
  showFanMenu?: boolean;
  menuItems?: MenuItem[];
  menuRadius?: number;
  menuStartAngle?: number;
  menuEndAngle?: number;
  menuItemBackgroundColor?: string;
  menuItemIconColor?: string;
  styleIconItem?: StyleProp<ImageStyle>;
  onMenuClose?: () => void;
  // Main button props for fan menu
  mainButtonSize?: number;
  mainButtonColor?: string;
  mainButtonIcon?: string;
  // Minimum distance from screen edges
  minEdgeDistance?: number;
  // Y axis limit
  yAxisEndLimit?: number;
  yAxisStartLimit?: number;
}

const MIN_EDGE_DISTANCE = 16;
const DRAG_THRESHOLD = 10; // Minimum distance to consider as drag
const TAP_DELAY = 200; // Maximum time to consider as tap

export const FloatButton: React.FC<FloatButtonProps> = ({
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
  yAxisStartLimit = 50,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [isDragging, setIsDragging] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [fanMenuVisible, setFanMenuVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [rotateDirection, setRotateDirection] = useState<string[]>([
    '0deg',
    '-180deg',
  ]);

  // Add refs for better drag detection
  const startPosition = useRef({ x: 0, y: 0 });
  const startTime = useRef(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: fanMenuVisible ? 1 : 0, // 1 = 180°, 0 = 0°
      duration: 400,
      useNativeDriver: false,
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
        y: getScreenHeight() - size - getScreenHeight() * 0.25,
      };
      pan.setValue(defaultPos);
      setButtonPosition(defaultPos);
    }
  }, [initialPosition, size, pan]);

  // Set rotate direction
  useEffect(() => {
    const { horizontal, vertical } = getDirection(buttonPosition);
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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        // Only start pan responder if movement exceeds threshold
        return (
          Math.abs(gestureState.dx) > DRAG_THRESHOLD ||
          Math.abs(gestureState.dy) > DRAG_THRESHOLD
        );
      },
      onPanResponderGrant: (_evt, gestureState) => {
        startPosition.current = { x: gestureState.x0, y: gestureState.y0 };
        startTime.current = Date.now();
        hasMoved.current = false;
        setIsDragging(false);

        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        const distance = Math.sqrt(
          Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2)
        );

        if (distance > DRAG_THRESHOLD) {
          hasMoved.current = true;
          setIsDragging(true);
        }

        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: (_evt, gestureState) => {
        const endTime = Date.now();
        const timeDiff = endTime - startTime.current;
        const distance = Math.sqrt(
          Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2)
        );

        // If it's a quick tap with minimal movement, don't consider it as drag
        if (timeDiff < TAP_DELAY && distance < DRAG_THRESHOLD) {
          setIsDragging(false);
          hasMoved.current = false;
        }

        pan.flattenOffset();

        // Only snap to edges if we actually dragged
        if (hasMoved.current) {
          // Snap to edges if near screen boundaries
          const newX = (pan.x as any)._value;
          const newY = (pan.y as any)._value;

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
          } else if (
            finalY >
            getScreenHeight() - size - yAxisStartLimit - yAxisEndLimit
          ) {
            finalY = getScreenHeight() - size - yAxisStartLimit - yAxisEndLimit;
          }

          const finalPosition = { x: finalX, y: finalY };
          setButtonPosition(finalPosition);

          Animated.spring(pan, {
            toValue: finalPosition,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }).start();
        }

        // Reset drag state after a short delay
        setTimeout(() => {
          setIsDragging(false);
          hasMoved.current = false;
        }, 100);
      },
    })
  ).current;

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: rotateDirection,
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

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { rotate },
            ],
          },
          style,
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              width: size,
              height: size,
              backgroundColor,
              borderRadius: size / 2,
            },
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
          delayPressIn={0}
          delayPressOut={0}
        >
          {children || (
            <Image
              tintColor={iconColor}
              style={styles.defaultIcon}
              source={icon ? icon : require('./assets/setting.png')}
            />
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Popup */}
      {showPopup && popupContent && (
        <Popup
          visible={popupVisible}
          onClose={handlePopupClose}
          position={buttonPosition}
          width={popupWidth}
          height={popupHeight}
          backgroundColor={popupBackgroundColor}
          borderRadius={popupBorderRadius}
        >
          {popupContent}
        </Popup>
      )}

      {/* Fan Menu */}
      {showFanMenu && menuItems.length > 0 && (
        <FanMenu
          visible={fanMenuVisible}
          onClose={handleFanMenuClose}
          items={menuItems}
          position={buttonPosition}
          radius={menuRadius}
          startAngle={menuStartAngle}
          endAngle={menuEndAngle}
          itemBackgroundColor={menuItemBackgroundColor}
          iconColor={menuItemIconColor}
          mainButtonSize={mainButtonSize}
          // mainButtonColor={mainButtonColor}
          // mainButtonIcon={mainButtonIcon}
          minEdgeDistance={minEdgeDistance}
          isPlusEdgeDistance={isPlusEdgeDistance}
          stylesIcon={styleIconItem}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  defaultIcon: {
    width: 24,
    height: 24,
  },
});
