import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import FloatButton from './index';
const FloatButtonDemo = () => {
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
  const handleMenuAction = action => {
    Alert.alert('Menu Action', `Bạn đã chọn: ${action}`);
  };

  // Menu items for different fan menus
  const quickActionsMenu = [{
    id: '1',
    // icon: '👤',
    label: 'Profile',
    onPress: () => handleMenuAction('Profile'),
    color: '#4ECDC4'
  }, {
    id: '2',
    // icon: '☁️',
    label: 'Upload',
    onPress: () => handleMenuAction('Upload'),
    color: '#4ECDC4'
  }
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

  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, "Float Button Demo"), /*#__PURE__*/React.createElement(FloatButton, {
    onPress: handlePress,
    size: 60,
    backgroundColor: "#007AFF",
    showFanMenu: true,
    menuItems: quickActionsMenu,
    menuItemBackgroundColor: "#4ECDC4",
    mainButtonSize: 60,
    mainButtonColor: "#007AFF",
    mainButtonIcon: "\xD7",
    onMenuClose: handleMenuClose
  }));
};

// const { width: screenWidth, height: screenHeight } =
//   require('react-native').Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    color: '#333'
  },
  customIcon: {
    fontSize: 30
  },
  smallIcon: {
    fontSize: 20
  },
  popupContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  popupText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12
  },
  popupButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  popupButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  }
});
export default FloatButtonDemo;
//# sourceMappingURL=demo.js.map