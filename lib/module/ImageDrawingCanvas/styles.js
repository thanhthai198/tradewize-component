import { Dimensions, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'black'
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
    height: Dimensions.get('window').height * 0.1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
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
    width: Dimensions.get('window').width,
    position: 'absolute',
    maxHeight: 100
  },
  movableBox: {
    position: 'absolute',
    borderRadius: 10
  },
  textOverlay: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 10,
    maxWidth: Dimensions.get('window').width
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
  },
  colorSelected: {
    padding: 2,
    borderColor: 'white',
    borderWidth: 2
  }
});
//# sourceMappingURL=styles.js.map