import Color from './Color';
import { View, Text } from 'react-native';

export function MessageAudio() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ color: Color.alizarin, fontWeight: '600' }}>
        {'Audio is not implemented by GiftedChat.'}
      </Text>
      <Text style={{ color: Color.alizarin, fontWeight: '600' }}>
        {
          '\nYou need to provide your own implementation by using renderMessageAudio prop.'
        }
      </Text>
    </View>
  );
}
