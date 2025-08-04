"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _utils = require("../../utils");
var _default = exports.default = _reactNative.StyleSheet.create({
  contentContainer: {
    overflow: 'hidden'
  },
  headerImageViewer: {
    height: (0, _utils.getScreenHeight)() * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textHeaderImageViewer: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'semibold'
  }
});
//# sourceMappingURL=styles.js.map