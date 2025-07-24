// VideoPlayerExample.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { VideoPlayer } from './index';

const VideoPlayerExample: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videoExamples = [
    {
      title: 'YouTube Video',
      source: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Rick Astley - Never Gonna Give You Up',
    },
    {
      title: 'MP4 Video (Big Buck Bunny)',
      source:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Big Buck Bunny (Sample MP4)',
    },
    {
      title: 'MP4 Video (Elephants Dream)',
      source:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Elephants Dream (Sample MP4)',
    },
    {
      title: 'MP4 Video (For Bigger Blazes)',
      source:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'For Bigger Blazes (Sample MP4)',
    },
    {
      title: 'Another YouTube Video',
      source: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      description: 'PSY - GANGNAM STYLE',
    },
  ];

  const handleVideoError = (error: any) => {
    Alert.alert(
      'Video Error',
      `Error playing video: ${error?.error || 'Unknown error'}`
    );
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
  };

  const handleVideoEnd = () => {
    console.log('Video ended');
  };

  const handleVideoProgress = (progress: any) => {
    console.log('Video progress:', progress);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>VideoPlayer Component Examples</Text>

      {/* Video Controls */}
      <View style={styles.controls}>
        <Text style={styles.sectionTitle}>Video Controls</Text>
        <View style={styles.buttonContainer}>
          {videoExamples.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                currentVideo === index && styles.activeButton,
              ]}
              onPress={() => setCurrentVideo(index)}
            >
              <Text
                style={[
                  styles.buttonText,
                  currentVideo === index && styles.activeButtonText,
                ]}
              >
                {video.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Current Video */}
      <View style={styles.videoSection}>
        <Text style={styles.sectionTitle}>
          {videoExamples[currentVideo]?.title}
        </Text>
        <Text style={styles.description}>
          {videoExamples[currentVideo]?.description}
        </Text>

        <VideoPlayer
          source={videoExamples[currentVideo]?.source || ''}
          height={250}
          width="100%"
          autoPlay={false}
          loop={false}
          muted={false}
          onError={handleVideoError}
          onLoad={handleVideoLoad}
          onEnd={handleVideoEnd}
          onProgress={handleVideoProgress}
          style={styles.videoPlayer}
        />
      </View>

      {/* Auto-play Example */}
      <View style={styles.videoSection}>
        <Text style={styles.sectionTitle}>Auto-play Example (Muted)</Text>
        <VideoPlayer
          source="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          height={200}
          width="100%"
          autoPlay={true}
          loop={true}
          muted={true}
          onError={handleVideoError}
          style={styles.videoPlayer}
        />
      </View>

      {/* Custom Styled Video */}
      <View style={styles.videoSection}>
        <Text style={styles.sectionTitle}>Custom Styled Video</Text>
        <VideoPlayer
          source="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          height={180}
          width="90%"
          autoPlay={false}
          loop={false}
          muted={false}
          onError={handleVideoError}
          style={styles.customVideoPlayer}
        />
      </View>

      {/* Usage Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.sectionTitle}>Usage Instructions</Text>
        <Text style={styles.instructionText}>
          • Supports both YouTube URLs and direct MP4 links{'\n'}• YouTube URLs
          are automatically detected and handled{'\n'}• MP4 videos use
          react-native-video for playback{'\n'}• Includes loading states and
          error handling{'\n'}• Supports auto-play, loop, and mute options{'\n'}
          • Provides callbacks for load, error, end, and progress events
        </Text>
      </View>
    </ScrollView>
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
    marginBottom: 20,
    color: '#333',
  },
  controls: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  activeButtonText: {
    color: '#fff',
  },
  videoSection: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  videoPlayer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  customVideoPlayer: {
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  instructions: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
});

export default VideoPlayerExample;
