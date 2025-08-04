import Color from './Color';
import { View, Text } from 'react-native';
export function MessageAudio() {
  return /*#__PURE__*/React.createElement(View, {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: Color.alizarin,
      fontWeight: '600'
    }
  }, 'Audio is not implemented by GiftedChat.'), /*#__PURE__*/React.createElement(Text, {
    style: {
      color: Color.alizarin,
      fontWeight: '600'
    }
  }, '\nYou need to provide your own implementation by using renderMessageAudio prop.'));
}
//# sourceMappingURL=MessageAudio.js.map