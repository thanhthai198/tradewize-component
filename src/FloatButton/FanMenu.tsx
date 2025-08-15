import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { getDirection } from './utils';
import type { MenuItem } from './type';

interface FanMenuProps {
  visible: boolean;
  onClose: () => void;
  items: MenuItem[];
  position?: { x: number; y: number };
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  itemBackgroundColor?: string;
  iconColor?: string;
  mainButtonSize?: number;
  // mainButtonColor?: string;
  // mainButtonIcon?: string;
  minEdgeDistance: number;
}

const FanMenu: React.FC<FanMenuProps> = ({
  visible,
  onClose,
  items,
  position,
  radius = 20,
  startAngle = 90, // Start from top
  endAngle = 270, // End at bottom
  itemBackgroundColor = '#007AFF',
  iconColor = '#FFFFFF',
  mainButtonSize = 60,
  // mainButtonColor = '#007AFF',
  // mainButtonIcon = '×',
  minEdgeDistance = 16,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const mainButtonAnim = useRef(new Animated.Value(0)).current;
  const itemAnims = useRef<Animated.Value[]>([]).current;

  // Initialize item animations
  useEffect(() => {
    itemAnims.length = 0;
    items.forEach(() => {
      itemAnims.push(new Animated.Value(0));
    });
  }, [items, itemAnims]);

  useEffect(() => {
    if (visible) {
      // Animate backdrop
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Animate main button
      Animated.spring(mainButtonAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();

      // Animate menu items with staggered delay
      const itemAnimations = itemAnims.map((anim, index) =>
        Animated.spring(anim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          delay: index * 80,
          useNativeDriver: true,
        })
      );

      Animated.parallel(itemAnimations).start();
    } else {
      // Reverse animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(mainButtonAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        ...itemAnims.map((anim) =>
          Animated.timing(anim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          })
        ),
      ]).start();
    }
  }, [visible, fadeAnim, mainButtonAnim, itemAnims]);

  const handleBackdropPress = () => {
    onClose();
  };

  const getItemPosition = (index: number) => {
    if (!position) return { x: 0, y: 0 };

    const locationDirection = getDirection(position);

    const totalItems = items.length;

    let finaleStartAngle = startAngle;
    let finaleEndAngle = endAngle;

    if (totalItems < 3 && locationDirection.horizontal === 'right') {
      if (locationDirection.vertical === 'bottom') {
        finaleStartAngle = 270;
        finaleEndAngle = 180;
      } else {
        finaleStartAngle = 90;
        finaleEndAngle = 180;
      }
    } else {
      if (locationDirection.vertical === 'bottom') {
        finaleStartAngle = 270;
        finaleEndAngle = 0;
      } else {
        finaleStartAngle = 90;
        finaleEndAngle = 0;
      }
    }

    const angleStep =
      (finaleEndAngle - finaleStartAngle) / (totalItems - 1 || 1);
    const angle = finaleStartAngle + index * angleStep;
    const angleRad = (angle * Math.PI) / 180;
    const rx = position.x - minEdgeDistance * 0.3;
    const ry = position.y + mainButtonSize * 1.5;

    // Calculate position relative to main button center
    const x = rx + radius * Math.cos(angleRad);
    const y = ry + radius * Math.sin(angleRad);

    return { x, y };
  };

  const handleItemPress = (item: MenuItem) => {
    item.onPress();
    onClose();
  };

  // const handleMainButtonPress = () => {
  //   onClose();
  // };

  return (
    <Modal
      isVisible={visible}
      style={{ margin: 0 }}
      onBackdropPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={200}
      backdropOpacity={0.3}
      backdropColor="rgba(0, 0, 0, 0.3)"
      useNativeDriver={true}
    >
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdropTouchable}
          onPress={handleBackdropPress}
          activeOpacity={1}
        >
          {/* Main Button - The central anchor */}
          {/* {position && (
            <Animated.View
              style={[
                styles.mainButton,
                {
                  width: mainButtonSize + minEdgeDistance * 0.3,
                  height: mainButtonSize + minEdgeDistance * 0.3,
                  left: position.x - minEdgeDistance * 0.3,
                  top: position.y + mainButtonSize,
                  backgroundColor: mainButtonColor,
                  borderRadius: mainButtonSize / 2 + minEdgeDistance * 0.3,
                  transform: [{ scale: mainButtonAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.mainButtonTouchable}
                onPress={handleMainButtonPress}
                activeOpacity={0.8}
              >
                <Text style={styles.mainButtonText}>{mainButtonIcon}</Text>
              </TouchableOpacity>
            </Animated.View>
          )} */}

          {/* Menu Items - fanning out from main button */}
          {items.map((item, index) => {
            const itemPos = getItemPosition(index);
            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.menuItem,
                  {
                    width: mainButtonSize,
                    height: mainButtonSize,
                    left: itemPos.x + mainButtonSize * 0.135,
                    top: itemPos.y - mainButtonSize / 2,
                    backgroundColor: item.color || itemBackgroundColor,
                    borderRadius: mainButtonSize / 2,
                    transform: [
                      { scale: itemAnims[index] || new Animated.Value(0) },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.menuItemTouchable}
                  onPress={() => handleItemPress(item)}
                  activeOpacity={0.8}
                >
                  {item?.renderIcon ? (
                    item?.renderIcon
                  ) : (
                    <Image
                      source={
                        item?.icon
                          ? item?.icon
                          : require('./assets/setting.png')
                      }
                      style={styles.menuItemIcon}
                      tintColor={iconColor}
                    />
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backdropTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainButton: {
    position: 'absolute',
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
  mainButtonTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  mainButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  menuItem: {
    position: 'absolute',
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
  menuItemTouchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 24,
    height: 24,
  },
});

export default FanMenu;
