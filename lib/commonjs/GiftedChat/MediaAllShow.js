"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaAllShow = MediaAllShow;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeModal = _interopRequireDefault(require("react-native-modal"));
var _tradewize = require("tradewize");
var _Color = _interopRequireDefault(require("./Color"));
var _blur = require("@react-native-community/blur");
var _MessageFile = require("./MessageFile");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MediaAllShow({
  isVisible,
  onClose,
  fileMediaAll,
  onPressFile
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    isVisible: isVisible,
    onBackdropPress: onClose,
    style: styles.modal,
    backdropOpacity: 0
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: _reactNative.StyleSheet.absoluteFill,
    onPress: onClose
  }, /*#__PURE__*/_react.default.createElement(_blur.BlurView, {
    pointerEvents: "none",
    style: _reactNative.StyleSheet.absoluteFill,
    blurType: "dark",
    blurAmount: 10,
    reducedTransparencyFallbackColor: "black"
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.content
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.scrollView
  }, /*#__PURE__*/_react.default.createElement(_MessageFile.MessageFile, {
    onPressFile: onPressFile,
    isShowAll: true,
    currentMessage: fileMediaAll || {},
    messageWidth: {
      width: (0, _tradewize.getScreenWidth)(),
      _id: ''
    }
  })))));
}
const styles = _reactNative.StyleSheet.create({
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
    height: (0, _tradewize.getScreenHeight)() * 0.5,
    paddingBottom: 48,
    backgroundColor: _Color.default.white,
    alignItems: 'center'
  },
  header: {
    height: 8,
    backgroundColor: _Color.default.defaultColor,
    borderRadius: 12,
    width: 60,
    marginTop: 12,
    marginBottom: 8
  },
  scrollView: {
    flex: 1,
    backgroundColor: _Color.default.white
  },
  contentScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=MediaAllShow.js.map