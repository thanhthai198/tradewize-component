"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("../Color"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = _reactNative.StyleSheet.create({
  containerAlignTop: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  emptyChatContainer: {
    transform: [{
      scaleY: -1
    }]
  },
  scrollToBottomStyle: {
    opacity: 0.8,
    position: 'absolute',
    right: 10,
    bottom: 30,
    zIndex: 999,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: _Color.default.white,
    shadowColor: _Color.default.black,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 1
  }
});
//# sourceMappingURL=styles.js.map