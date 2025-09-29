import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'limited-photos' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: '- run pod install\n',
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const LimitedPhotos = NativeModules.LimitedPhotos ? NativeModules.LimitedPhotos : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export function getAllowedPhotos() {
  return LimitedPhotos.getAllowedMedia();
}
//# sourceMappingURL=getAllowedPhotos.js.map