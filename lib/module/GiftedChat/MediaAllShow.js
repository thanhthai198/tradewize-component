import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { getScreenHeight, getScreenWidth } from 'tradewize';
import Color from './Color';
import { BlurView } from '@react-native-community/blur';
import { MessageFile } from './MessageFile';
export function MediaAllShow({
  isVisible,
  onClose,
  fileMediaAll,
  onPressFile
}) {
  return /*#__PURE__*/React.createElement(Modal, {
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    isVisible: isVisible,
    onBackdropPress: onClose,
    style: styles.modal,
    backdropOpacity: 0
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: StyleSheet.absoluteFill,
    onPress: onClose
  }, /*#__PURE__*/React.createElement(BlurView, {
    pointerEvents: "none",
    style: StyleSheet.absoluteFill,
    blurType: "dark",
    blurAmount: 10,
    reducedTransparencyFallbackColor: "black"
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.content
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }), /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.scrollView
  }, /*#__PURE__*/React.createElement(MessageFile, {
    onPressFile: onPressFile,
    isShowAll: true,
    currentMessage: fileMediaAll || {},
    messageWidth: {
      width: getScreenWidth(),
      _id: ''
    }
  })))));
}
const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  content: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: getScreenHeight() * 0.5,
    paddingBottom: 48,
    backgroundColor: Color.white,
    alignItems: 'center'
  },
  header: {
    height: 8,
    backgroundColor: Color.defaultColor,
    borderRadius: 12,
    width: 60,
    marginTop: 12,
    marginBottom: 8
  },
  scrollView: {
    flex: 1,
    backgroundColor: Color.white
  },
  contentScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=MediaAllShow.js.map