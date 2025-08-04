"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = exports.error = void 0;
const styleString = color => `color: ${color}; font-weight: bold`;
const headerLog = '%c[react-native-gifted-chat]';
const warning = (...args) => console.log(headerLog, styleString('orange'), ...args);
exports.warning = warning;
const error = (...args) => console.log(headerLog, styleString('red'), ...args);
exports.error = error;
//# sourceMappingURL=logging.js.map