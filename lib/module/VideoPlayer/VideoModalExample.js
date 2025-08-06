import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { VideoModal } from './VideoModal';
export const VideoModalExample = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videos = [{
    id: '1',
    title: 'Sample MP4 Video',
    source: 'https://vz-61273662-7e2.b-cdn.net/7b7bad11-089b-4f5f-8dd7-086385c6eda9/playlist.m3u8',
    subtitle: {
      es: 'https://thanhthai198.github.io/my_cdn/subtitle/interview/es.vtt',
      en: 'https://thanhthai198.github.io/my_cdn/subtitle/interview/en.vtt'
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
  return /*#__PURE__*/React.createElement(SafeAreaView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, "Video Modal Example"), /*#__PURE__*/React.createElement(View, {
    style: styles.videoList
  }, videos.map(video => /*#__PURE__*/React.createElement(TouchableOpacity, {
    key: video.id,
    style: styles.videoItem,
    onPress: () => openVideoModal(video)
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.videoTitle
  }, video.title), /*#__PURE__*/React.createElement(Text, {
    style: styles.videoSource
  }, video.source)))), /*#__PURE__*/React.createElement(VideoModal, {
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
const styles = StyleSheet.create({
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