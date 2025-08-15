import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import FloatButton from './index';

const FloatButtonDemo: React.FC = () => {
  // const [popupCount, setPopupCount] = useState(0);

  const handlePress = () => {
    Alert.alert('Float Button', 'Button được nhấn!');
  };

  // const handlePopupClose = () => {
  //   console.log('Popup đã đóng');
  // };

  // const handlePopupAction = () => {
  //   setPopupCount((prev) => prev + 1);
  //   Alert.alert('Action', 'Bạn đã thực hiện hành động!');
  // };

  const handleMenuClose = () => {
    console.log('Fan Menu đã đóng');
  };

  const handleMenuAction = (action: string) => {
    Alert.alert('Menu Action', `Bạn đã chọn: ${action}`);
  };

  // Menu items for different fan menus
  const quickActionsMenu = [
    {
      id: '1',
      // icon: '👤',
      label: 'Profile',
      onPress: () => handleMenuAction('Profile'),
      color: '#4ECDC4',
    },
    {
      id: '2',
      // icon: '☁️',
      label: 'Upload',
      onPress: () => handleMenuAction('Upload'),
      color: '#4ECDC4',
    },
    // {
    //   id: '3',
    //   icon: '🗺️',
    //   label: 'Map',
    //   onPress: () => handleMenuAction('Map'),
    //   color: '#4ECDC4',
    // },
    // {
    //   id: '4',
    //   icon: '❓',
    //   label: 'Help',
    //   onPress: () => handleMenuAction('Help'),
    //   color: '#4ECDC4',
    // },
  ];

  // const socialMenu = [
  //   {
  //     id: '1',
  //     icon: '📘',
  //     label: 'Facebook',
  //     onPress: () => handleMenuAction('Facebook'),
  //     color: '#3B5998',
  //   },
  //   {
  //     id: '2',
  //     icon: '📷',
  //     label: 'Instagram',
  //     onPress: () => handleMenuAction('Instagram'),
  //     color: '#E4405F',
  //   },
  //   {
  //     id: '3',
  //     icon: '🐦',
  //     label: 'Twitter',
  //     onPress: () => handleMenuAction('Twitter'),
  //     color: '#1DA1F2',
  //   },
  //   {
  //     id: '4',
  //     icon: '💼',
  //     label: 'LinkedIn',
  //     onPress: () => handleMenuAction('LinkedIn'),
  //     color: '#0077B5',
  //   },
  // ];

  // const toolsMenu = [
  //   {
  //     id: '1',
  //     icon: '📊',
  //     label: 'Analytics',
  //     onPress: () => handleMenuAction('Analytics'),
  //     color: '#9B59B6',
  //   },
  //   {
  //     id: '2',
  //     icon: '⚙️',
  //     label: 'Settings',
  //     onPress: () => handleMenuAction('Settings'),
  //     color: '#34495E',
  //   },
  //   {
  //     id: '3',
  //     icon: '🔍',
  //     label: 'Search',
  //     onPress: () => handleMenuAction('Search'),
  //     color: '#F39C12',
  //   },
  //   {
  //     id: '4',
  //     icon: '📁',
  //     label: 'Files',
  //     onPress: () => handleMenuAction('Files'),
  //     color: '#27AE60',
  //   },
  //   {
  //     id: '5',
  //     icon: '💬',
  //     label: 'Chat',
  //     onPress: () => handleMenuAction('Chat'),
  //     color: '#E74C3C',
  //   },
  // ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Float Button Demo</Text>

      {/* Default Float Button */}
      {/* <FloatButton onPress={handlePress} /> */}

      {/* Float Button with Simple Popup */}
      {/* <FloatButton
        onPress={handlePress}
        size={80}
        backgroundColor="#FF6B6B"
        iconColor="#FFFFFF"
        initialPosition={{ x: 20, y: 100 }}
        showPopup={true}
        popupContent={
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Thông báo</Text>
            <Text style={styles.popupText}>Đây là nội dung popup đơn giản</Text>
          </View>
        }
        onPopupClose={handlePopupClose}
      /> */}

      {/* Float Button with Interactive Popup */}
      {/* <FloatButton
        onPress={handlePress}
        size={70}
        backgroundColor="#4ECDC4"
        initialPosition={{ x: screenWidth - 90, y: 200 }}
        showPopup={true}
        popupContent={
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Menu</Text>
            <Text style={styles.popupText}>Số lần nhấn: {popupCount}</Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={handlePopupAction}
            >
              <Text style={styles.popupButtonText}>Thực hiện</Text>
            </TouchableOpacity>
          </View>
        }
        popupWidth={250}
        popupHeight={180}
        popupBackgroundColor="#F8F9FA"
        onPopupClose={handlePopupClose}
      >
        <Text style={styles.customIcon}>🎯</Text>
      </FloatButton> */}

      {/* Float Button with Fan Menu - Like the image */}
      <FloatButton
        onPress={handlePress}
        size={60}
        backgroundColor="#007AFF"
        showFanMenu={true}
        menuItems={quickActionsMenu}
        menuItemBackgroundColor="#4ECDC4"
        mainButtonSize={60}
        mainButtonColor="#007AFF"
        mainButtonIcon="×"
        onMenuClose={handleMenuClose}
      />

      {/* Float Button with Fan Menu - Social */}
      {/* <FloatButton
        onPress={handlePress}
        size={65}
        backgroundColor="#9B59B6"
        iconColor="#FFFFFF"
        initialPosition={{ x: screenWidth / 2 - 32.5, y: 500 }}
        showFanMenu={true}
        menuItems={socialMenu}
        menuRadius={130}
        menuItemSize={50}
        menuStartAngle={-90}
        menuEndAngle={90}
        onMenuClose={handleMenuClose}
      >
        <Text style={styles.customIcon}>📱</Text>
      </FloatButton> */}

      {/* Float Button with Fan Menu - Tools (5 items) */}
      {/* <FloatButton
        onPress={handlePress}
        size={70}
        backgroundColor="#E67E22"
        iconColor="#FFFFFF"
        initialPosition={{ x: screenWidth / 2 - 35, y: 600 }}
        showFanMenu={true}
        menuItems={toolsMenu}
        menuRadius={150}
        menuItemSize={55}
        menuStartAngle={-120}
        menuEndAngle={120}
        onMenuClose={handleMenuClose}
      >
        <Text style={styles.customIcon}>🛠️</Text>
      </FloatButton> */}
    </View>
  );
};

// const { width: screenWidth, height: screenHeight } =
//   require('react-native').Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    color: '#333',
  },
  customIcon: {
    fontSize: 30,
  },
  smallIcon: {
    fontSize: 20,
  },
  popupContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  popupText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  popupButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  popupButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FloatButtonDemo;
