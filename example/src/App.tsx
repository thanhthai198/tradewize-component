import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from '../../src/GiftedChat';
import React from 'react';

export default function App() {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages([
      {
        isLast: true,
        _id: 55551,
        text: 'dfdf',
        createdAt: new Date('2025-07-30T10:00:00.000Z'),
        user: {
          _id: 1,
          name: 'React Native',
        },
      },
      {
        _id: 2,
        text: 'Th',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 3,
        text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 4,
        text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
        createdAt: new Date(),
        file: [
          {
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            typeFile: 'video',
          },
          {
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            typeFile: 'video',
          },
          {
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            typeFile: 'video',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
        ],
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 23,
        text: 'Th',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native1',
        },
      },
      {
        _id: 1222,
        text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
        createdAt: new Date('2025-07-30T10:00:00.000Z'),
        reactionEmoji: '👍',
        file: [
          {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKWlc2q33w1V9avPpwb0afullg-AZyOjSlA&s',
            typeFile: 'image',
          },
        ],
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: any) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(messages: any) => onSend(messages)}
          user={{
            _id: 1,
          }}
          alwaysShowSend
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentView: {
    flex: 1,
    padding: 16,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});
