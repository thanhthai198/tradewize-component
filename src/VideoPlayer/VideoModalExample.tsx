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
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
    source: string;
    subtitle: { [key: string]: string };
  } | null>(null);

  const videos: {
    id: string;
    title: string;
    source: string;
    subtitle: { [key: string]: string };
  }[] = [
    {
      id: '1',
      title: 'Sample MP4 Video',
      source:
        'https://vz-88b9f9c3-e13.b-cdn.net/dc9106b5-c945-4f13-98c0-4595dc7c7236/playlist.m3u8',
      subtitle: {
        es: 'https://thanhthai198.github.io/my_cdn/subtitle/interview/es.vtt',
        en: 'https://thanhthai198.github.io/my_cdn/subtitle/interview/en.vtt',
      },
    },
    {
      id: '2',
      title: 'YouTube Video',
      source: 'https://www.youtube.com/watch?v=xsXYb6Oi2-w',
      subtitle: {
        es: 'https://thanhthai198.github.io/my_cdn/subtitle/videoTest/es.vtt',
      },
    },
    {
      id: '3',
      title: 'Another Sample Video',
      source:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      subtitle: {
        es: 'https://thanhthai198.github.io/my_cdn/subtitle/videoTest/es.vtt',
        en: 'https://thanhthai198.github.io/my_cdn/subtitle/videoTest/en.vtt',
      },
    },
  ];

  const openVideoModal = (video: (typeof videos)[0]) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const closeVideoModal = () => {
    setModalVisible(false);
    setSelectedVideo(null);
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
        subtitle={selectedVideo?.subtitle || {}}
        source={selectedVideo?.source || ''}
        // source={{
        //   en: 'https://vz-88b9f9c3-e13.b-cdn.net/dc9106b5-c945-4f13-98c0-4595dc7c7236/playlist.m3u8',
        //   es: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        // }}
        title="Video Player"
        autoPlay={true}
        // onError={(error) => console.error('Video error:', error)}
        onLoad={() => console.log('Video loaded')}
        onEnd={() => console.log('Video ended')}
        initialSubtitle="en"
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
