"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _Color = _interopRequireDefault(require("../Color"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = {
  left: _reactNative.StyleSheet.create({
    container: {
      alignItems: 'flex-start'
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: _Color.default.leftBubbleBackground,
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end'
    },
    containerToNext: {
      borderBottomLeftRadius: 3
    },
    containerToPrevious: {
      borderTopLeftRadius: 3
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }
  }),
  right: _reactNative.StyleSheet.create({
    container: {
      alignItems: 'flex-end'
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: _Color.default.defaultBlue,
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end'
    },
    containerToNext: {
      borderBottomRightRadius: 3
    },
    containerToPrevious: {
      borderTopRightRadius: 3
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    }
  }),
  content: _reactNative.StyleSheet.create({
    tick: {
      fontSize: 10,
      backgroundColor: _Color.default.backgroundTransparent,
      color: _Color.default.white
    },
    tickView: {
      flexDirection: 'row',
      marginRight: 10
    },
    username: {
      top: -3,
      left: 0,
      fontSize: 12,
      backgroundColor: _Color.default.backgroundTransparent,
      color: '#aaa'
    },
    usernameView: {
      flexDirection: 'row',
      marginHorizontal: 10
    }
  })
};
var _default = exports.default = styles;
//# sourceMappingURL=styles.js.map