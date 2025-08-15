import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: { x: number; y: number };
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

const Popup: React.FC<PopupProps> = ({
  visible,
  onClose,
  children,
  position,
  width = 200,
  height = 150,
  backgroundColor = '#FFFFFF',
  borderRadius = 12,
  shadowColor = '#000',
  shadowOpacity = 0.25,
  shadowRadius = 10,
  elevation = 8,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const handleBackdropPress = () => {
    onClose();
  };

  // Calculate position to center popup at button position
  const getPopupPosition = () => {
    if (!position) {
      return {
        left: screenWidth / 2 - width / 2,
        top: screenHeight / 2 - height / 2,
      };
    }

    // Center popup at button position
    let left = position.x - width / 2;
    let top = position.y - height / 2;

    // Ensure popup doesn't go off screen
    if (left < 10) left = 10;
    if (left + width > screenWidth - 10) left = screenWidth - width - 10;
    if (top < 50) top = 50;
    if (top + height > screenHeight - 50) top = screenHeight - height - 50;

    return { left, top };
  };

  const popupPosition = getPopupPosition();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
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
          activeOpacity={1}
          onPress={handleBackdropPress}
        >
          <Animated.View
            style={[
              styles.popup,
              {
                width,
                height,
                backgroundColor,
                borderRadius,
                left: popupPosition.left,
                top: popupPosition.top,
                shadowColor,
                shadowOpacity,
                shadowRadius,
                elevation,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  popup: {
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Popup;
