"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;
var _reactNative = require("react-native");
const styles = exports.styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  containerContent: {
    flex: 1
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  txtClose: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'semibold',
    lineHeight: 24
  },
  btnClose: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  layoutCanvas: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end'
  },
  btnCanvas: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgCanvas: {
    width: 20,
    height: 20
  },
  txtCanvasMore: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    height: _reactNative.Dimensions.get('window').height * 0.1
  },
  btnEaser: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  btnEaserImage: {
    width: 20,
    height: 20
  },
  btnColor: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    marginRight: 8
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray'
  },
  txtUndo: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20
  },
  txtDone: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20
  },
  footerDraw: {
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  textInputOverlay: {
    left: 0,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 10,
    width: _reactNative.Dimensions.get('window').width,
    position: 'absolute'
  },
  movableBox: {
    position: 'absolute',
    borderRadius: 10
  },
  textOverlay: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 10,
    maxWidth: _reactNative.Dimensions.get('window').width
  },
  dimOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 5
  },
  btnDone: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginLeft: 'auto'
  }
});
//# sourceMappingURL=styles.js.map