"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_FORMAT = exports.TEST_ID = exports.MIN_COMPOSER_HEIGHT = exports.MAX_COMPOSER_HEIGHT = exports.DEFAULT_PLACEHOLDER = exports.DATE_FORMAT = void 0;
var _reactNative = require("react-native");
const MIN_COMPOSER_HEIGHT = exports.MIN_COMPOSER_HEIGHT = _reactNative.Platform.select({
  ios: 33,
  android: 41,
  web: 34,
  windows: 34
});
const MAX_COMPOSER_HEIGHT = exports.MAX_COMPOSER_HEIGHT = 200;
const DEFAULT_PLACEHOLDER = exports.DEFAULT_PLACEHOLDER = 'Aa';
const DATE_FORMAT = exports.DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = exports.TIME_FORMAT = 'LT';
const TEST_ID = exports.TEST_ID = {
  WRAPPER: 'GC_WRAPPER',
  LOADING_WRAPPER: 'GC_LOADING_CONTAINER',
  SEND_TOUCHABLE: 'GC_SEND_TOUCHABLE'
};
//# sourceMappingURL=Constant.js.map