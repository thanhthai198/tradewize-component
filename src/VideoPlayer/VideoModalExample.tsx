import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { VideoModal } from './VideoModal';

export const VideoModalExample: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  const videos = [
    {
      id: '1',
      title: 'Sample MP4 Video',
      source: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    },
    {
      id: '2',
      title: 'YouTube Video',
      source: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: '3',
      title: 'Another Sample Video',
      source:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
  ];

  const openVideoModal = (video: (typeof videos)[0]) => {
    setSelectedVideo(video.source);
    setModalVisible(true);
  };

  const closeVideoModal = () => {
    setModalVisible(false);
    setSelectedVideo('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Video Modal Example</Text>

      <View style={styles.videoList}>
        {videos.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoItem}
            onPress={() => openVideoModal(video)}
          >
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoSource}>{video.source}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <VideoModal
        visible={modalVisible}
        onClose={closeVideoModal}
        source={selectedVideo}
        title="Video Player"
        autoPlay={true}
        onError={(error) => console.error('Video error:', error)}
        onLoad={() => console.log('Video loaded')}
        onEnd={() => console.log('Video ended')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  videoList: {
    gap: 12,
  },
  videoItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  videoSource: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
});
