"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllowedPhotos = getAllowedPhotos;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'limited-photos' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: '- run pod install\n',
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const LimitedPhotos = _reactNative.NativeModules.LimitedPhotos ? _reactNative.NativeModules.LimitedPhotos : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function getAllowedPhotos() {
  return LimitedPhotos.getAllowedMedia();
}
//# sourceMappingURL=getAllowedPhotos.js.map