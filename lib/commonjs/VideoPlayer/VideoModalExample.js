"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoModalExample = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _VideoModal = require("./VideoModal");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const VideoModalExample = () => {
  const [modalVisible, setModalVisible] = (0, _react.useState)(false);
  const [selectedVideo, setSelectedVideo] = (0, _react.useState)(null);
  const videos = [{
    id: '1',
    title: 'Sample MP4 Video',
    source: 'https://vz-61273662-7e2.b-cdn.net/7b7bad11-089b-4f5f-8dd7-086385c6eda9/playlist.m3u8',
    subtitle: {
      es: 'https://thanhthai198.github.io/my_cdn/subtitle/videoTest/es.vtt',
      en: 'https://thanhthai198.github.io/my_cdn/subtitle/videoTest/en.vtt'
    }
  }, {
    id: '2',
    title: 'YouTube Video',
    source: 'https://www.youtube.com/watch?v=xsXYb6Oi2-w',
    subtitle: {
      es: 'https://thanhthai198.github.io/my_cdn/subtitle/videoTest/es.vtt'
    }
  }, {
    id: '3',
    title: 'Another Sample Video',
    source: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    subtitle: {
      es: 'https://thanhthai198.github.io/my_cdn/subtitle/videoTest/es.vtt',
      en: 'https://thanhthai198.github.io/my_cdn/subtitle/videoTest/en.vtt'
    }
  }];
  const openVideoModal = video => {
    setSelectedVideo(video);
    setModalVisible(true);
  };
  const closeVideoModal = () => {
    setModalVisible(false);
    setSelectedVideo(null);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, "Video Modal Example"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.videoList
  }, videos.map(video => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    key: video.id,
    style: styles.videoItem,
    onPress: () => openVideoModal(video)
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.videoTitle
  }, video.title), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.videoSource
  }, video.source)))), /*#__PURE__*/_react.default.createElement(_VideoModal.VideoModal, {
    visible: modalVisible,
    onClose: closeVideoModal,
    subtitle: (selectedVideo === null || selectedVideo === void 0 ? void 0 : selectedVideo.subtitle) || {},
    source: (selectedVideo === null || selectedVideo === void 0 ? void 0 : selectedVideo.source) || '',
    title: "Video Player",
    autoPlay: true
    // onError={(error) => console.error('Video error:', error)}
    ,
    onLoad: () => console.log('Video loaded'),
    onEnd: () => console.log('Video ended'),
    initialSubtitle: "en"
  }));
};
exports.VideoModalExample = VideoModalExample;
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333'
  },
  videoList: {
    gap: 12
  },
  videoItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  videoSource: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace'
  }
});
//# sourceMappingURL=VideoModalExample.js.map