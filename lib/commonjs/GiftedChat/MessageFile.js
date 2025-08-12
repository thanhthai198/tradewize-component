"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageFile = MessageFile;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _utils = require("./utils");
var _reactNativeFastImage = _interopRequireDefault(require("react-native-fast-image"));
var _Color = _interopRequireDefault(require("./Color"));
var _reactNativeCircularProgress = require("react-native-circular-progress");
var _utils2 = require("../utils");
var _ButtonBase = require("../ButtonBase");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const GAP_MEDIA = 3;
function MessageFile({
  onPressFile,
  messageWidth,
  currentMessage,
  isReaction,
  onLayout,
  onSaveThumbnail,
  isShowAll,
  onLongPressFile
}) {
  const [arrMedia, setArrMedia] = (0, _react.useState)((currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.file) || []);

  // eslint-disable-next-line react/no-unstable-nested-components
  const MediaItem = /*#__PURE__*/(0, _react.memo)(({
    item,
    index
  }) => {
    const sizeMedia = Number(messageWidth === null || messageWidth === void 0 ? void 0 : messageWidth.width) / 4.65 - GAP_MEDIA * 3.65;
    const sizeMediaShowAll = Number(messageWidth === null || messageWidth === void 0 ? void 0 : messageWidth.width) / 4 - GAP_MEDIA * 3;
    const size = isShowAll ? sizeMediaShowAll : sizeMedia < (0, _utils2.getScreenWidth)() * 0.1 ? (0, _utils2.getScreenWidth)() * 0.15 : sizeMedia;
    const raw = item === null || item === void 0 ? void 0 : item.progress;
    const progressNum = Number(raw);
    const safeProgress = Number.isFinite(progressNum) ? Math.max(0, Math.min(100, progressNum)) : 0;
    const safeSize = Number.isFinite(size) ? size : 120;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_ButtonBase.ButtonBase, {
      onLongPress: onLongPressFile,
      onPress: () => onPressFile === null || onPressFile === void 0 ? void 0 : onPressFile(item, (arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.length) > 8 && index === 7, {
        ...currentMessage,
        file: arrMedia
      }),
      disabled: isReaction || (item === null || item === void 0 ? void 0 : item.isLoading) && (item === null || item === void 0 ? void 0 : item.typeFile) === 'video',
      style: [styles.mediaItem, {
        width: size,
        height: size
      }]
    }, ((item === null || item === void 0 ? void 0 : item.thumbnailPreview) || (item === null || item === void 0 ? void 0 : item.uri) || (item === null || item === void 0 ? void 0 : item.url)) && /*#__PURE__*/_react.default.createElement(_reactNativeFastImage.default, {
      source: {
        uri: (item === null || item === void 0 ? void 0 : item.thumbnailPreview) || (item === null || item === void 0 ? void 0 : item.uri) || (item === null || item === void 0 ? void 0 : item.url),
        priority: _reactNativeFastImage.default.priority.low
      },
      style: styles.image
    }), (item === null || item === void 0 ? void 0 : item.typeFile) === 'video' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.playIcon, (safeProgress <= 0 || safeProgress >= 100 || (item === null || item === void 0 ? void 0 : item.isLoading)) && {
        width: sizeMedia * 0.5,
        height: sizeMedia * 0.5,
        borderRadius: sizeMedia * 0.5 / 2
      }]
    }, item !== null && item !== void 0 && item.isLoading ? /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "small",
      color: _Color.default.defaultBlue
    }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (safeProgress <= 0 || safeProgress >= 100) && /*#__PURE__*/_react.default.createElement(_reactNativeFastImage.default, {
      source: require('./assets/play.png'),
      resizeMode: _reactNativeFastImage.default.resizeMode.cover,
      style: [styles.iconPlay, {
        width: sizeMedia * 0.5 / 2,
        height: sizeMedia * 0.5 / 2
      }]
    }))), (arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.length) > 8 && index === 7 && !isShowAll && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.reactionIcon
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.reactionIconText
    }, "+ ", (arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.length) - 8 > 99 ? '99+' : (arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.length) - 8))), !(item !== null && item !== void 0 && item.isLoading) && safeProgress > 0 && safeProgress < 100 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.progress, {
        width: safeSize,
        height: safeSize
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNativeCircularProgress.AnimatedCircularProgress, {
      size: safeSize * 0.3,
      width: 3,
      fill: safeProgress,
      tintColor: _Color.default.white,
      backgroundColor: _Color.default.defaultColor
    })));
  }, (prev, next) => {
    // So sánh shallow để tránh render lại khi không cần thiết
    return prev.item.uri === next.item.uri && prev.item.thumbnailPreview === next.item.thumbnailPreview && prev.item.progress === next.item.progress && prev.item.isLoading === next.item.isLoading;
  });
  (0, _react.useEffect)(() => {
    const fetchData = async () => {
      try {
        const {
          file
        } = currentMessage;
        const getFileComplete = file === null || file === void 0 ? void 0 : file.filter(item => item.uri);
        if (!getFileComplete) return;

        // isLoading: true cho video
        const newArrMediaLoading = getFileComplete.map(item => {
          if (item.typeFile === 'video') {
            const isLoading = !(item !== null && item !== void 0 && item.thumbnailPreview);
            return {
              ...item,
              isLoading
            };
          }
          return item;
        });
        setArrMedia(newArrMediaLoading);

        // Lấy danh sách video để generate thumbnail
        const arrVideo = getFileComplete.filter(item => item.typeFile === 'video');
        const result = await (0, _utils.generateThumbnails)(arrVideo); // generate tất cả video một lần

        const newArrMedia = getFileComplete.map(item => {
          if (item.typeFile === 'video') {
            var _result$find;
            // Tìm thumbnail tương ứng theo vị trí trong arrVideo
            const videoIndex = arrVideo.findIndex(v => v.uri === item.uri);
            const path = result === null || result === void 0 || (_result$find = result.find(res => (res === null || res === void 0 ? void 0 : res.index) === videoIndex)) === null || _result$find === void 0 ? void 0 : _result$find.path;
            // isLoading: false cho video
            return {
              ...item,
              thumbnailPreview: path,
              isLoading: false
            };
          }
          return item; // Không phải video thì giữ nguyên
        });
        onSaveThumbnail === null || onSaveThumbnail === void 0 || onSaveThumbnail(newArrMedia);
        setArrMedia(newArrMedia);
      } catch (error) {
        console.log('error fetchData media', error);
      }
    };
    fetchData();
  }, [currentMessage, onSaveThumbnail]);
  const arrMediaShow = isShowAll ? arrMedia : arrMedia === null || arrMedia === void 0 ? void 0 : arrMedia.slice(0, 8);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    onLayout: onLayout,
    style: [styles.container, {
      gap: GAP_MEDIA
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: arrMediaShow || [],
    renderItem: ({
      item,
      index
    }) => /*#__PURE__*/_react.default.createElement(MediaItem, {
      item: item,
      index: index
    }),
    keyExtractor: item => {
      var _item$uri;
      return item === null || item === void 0 || (_item$uri = item.uri) === null || _item$uri === void 0 ? void 0 : _item$uri.toString();
    },
    numColumns: 4,
    scrollEnabled: false,
    onLayout: onLayout,
    contentContainerStyle: styles.container,
    columnWrapperStyle: {
      gap: GAP_MEDIA
    },
    initialNumToRender: 4,
    maxToRenderPerBatch: 4,
    windowSize: 5,
    removeClippedSubviews: true
  }));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 8,
    marginBottom: 4
  },
  mediaItem: {
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4
  },
  playIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  iconPlay: {
    marginLeft: 4
  },
  image: {
    width: '100%',
    height: '100%'
  },
  reactionIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reactionIconText: {
    color: _Color.default.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
});
//# sourceMappingURL=MessageFile.js.map