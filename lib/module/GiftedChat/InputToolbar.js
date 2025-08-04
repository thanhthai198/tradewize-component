function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Composer } from './Composer';
import { Send } from './Send';
import { Actions } from './Actions';
import Color from './Color';
import { getScreenWidth } from '../utils';
import FastImage from 'react-native-fast-image';
import { formatDurationSmart } from './utils';
export function InputToolbar(props) {
  const {
    renderActions,
    onPressActionButton,
    renderComposer,
    renderSend,
    renderAccessory,
    options,
    optionTintColor,
    icon,
    wrapperStyle,
    containerStyle,
    onPressPickMedia,
    fileMedia,
    onRemoveFile,
    onPressFile
  } = props;
  const actionsFragment = useMemo(() => {
    const props = {
      onPressActionButton,
      options,
      optionTintColor,
      icon,
      wrapperStyle,
      containerStyle,
      onPressPickMedia
    };
    return (renderActions === null || renderActions === void 0 ? void 0 : renderActions(props)) || onPressActionButton && /*#__PURE__*/React.createElement(Actions, props);
  }, [renderActions, onPressActionButton, options, optionTintColor, icon, wrapperStyle, containerStyle, onPressPickMedia]);
  const composerFragment = useMemo(() => {
    return (renderComposer === null || renderComposer === void 0 ? void 0 : renderComposer(props)) || /*#__PURE__*/React.createElement(Composer, _extends({
      ref: props === null || props === void 0 ? void 0 : props.inputRef
    }, props, {
      onPressPickMedia: props.onPressPickMedia
    }));
  }, [renderComposer, props]);
  const renderFileMedia = useMemo(() => {
    if (!(fileMedia !== null && fileMedia !== void 0 && fileMedia.length)) return null;
    return /*#__PURE__*/React.createElement(View, {
      style: styles.previewFile
    }, fileMedia === null || fileMedia === void 0 ? void 0 : fileMedia.map(item => {
      return /*#__PURE__*/React.createElement(TouchableOpacity, {
        onPress: () => {
          onPressFile === null || onPressFile === void 0 || onPressFile(item);
        },
        key: item.id,
        style: [styles.previewFileItem, {
          width: getScreenWidth() * 0.22,
          height: getScreenWidth() * 0.22
        }]
      }, /*#__PURE__*/React.createElement(TouchableOpacity, {
        onPress: () => {
          onRemoveFile === null || onRemoveFile === void 0 || onRemoveFile(item);
        },
        style: [styles.removeFile, {
          width: getScreenWidth() * 0.06,
          height: getScreenWidth() * 0.06
        }]
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.removeFileText
      }, "X")), /*#__PURE__*/React.createElement(FastImage, {
        source: {
          uri: item.thumbnailPreview
        },
        style: styles.previewFileItemImage
      }), item.typeFile === 'video' && /*#__PURE__*/React.createElement(View, {
        style: [styles.iconPlayContainer, {
          width: getScreenWidth() * 0.1,
          height: getScreenWidth() * 0.1,
          top: getScreenWidth() * 0.22 / 2 - getScreenWidth() * 0.1 / 2,
          right: getScreenWidth() * 0.22 / 2 - getScreenWidth() * 0.1 / 2
        }]
      }, /*#__PURE__*/React.createElement(FastImage, {
        source: require('../assets/play.png'),
        style: styles.iconPlay
      })), item.typeFile === 'video' && /*#__PURE__*/React.createElement(View, {
        style: styles.previewFileItemVideo
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.previewFileItemVideoText
      }, formatDurationSmart((item === null || item === void 0 ? void 0 : item.duration) || 0))));
    }));
  }, [fileMedia, onRemoveFile, onPressFile]);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, containerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.primary, props.primaryStyle]
  }, actionsFragment, composerFragment, (renderSend === null || renderSend === void 0 ? void 0 : renderSend(props)) || /*#__PURE__*/React.createElement(Send, props)), renderAccessory && /*#__PURE__*/React.createElement(View, {
    style: [styles.accessory, props.accessoryStyle]
  }, renderAccessory(props)), renderFileMedia);
}
const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Color.defaultColor,
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  accessory: {
    height: 44
  },
  previewFile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8
  },
  previewFileItem: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Color.defaultColor,
    borderWidth: 1,
    borderColor: Color.defaultColor
  },
  previewFileItemImage: {
    width: '100%',
    height: '100%'
  },
  previewFileItemVideo: {
    position: 'absolute',
    bottom: 2,
    right: 4
  },
  previewFileItemVideoText: {
    color: Color.white,
    fontSize: 12,
    fontWeight: 'bold'
  },
  removeFile: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Color.defaultColor,
    borderRadius: 100,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.white
  },
  removeFileText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  iconPlay: {
    width: 24,
    height: 24,
    marginLeft: 4
  },
  iconPlayContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 100
  }
});
//# sourceMappingURL=InputToolbar.js.map