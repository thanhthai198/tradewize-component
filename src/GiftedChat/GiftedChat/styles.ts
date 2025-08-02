import { StyleSheet } from 'react-native';
import { getScreenHeight } from '../../utils';

export default StyleSheet.create({
  contentContainer: {
    overflow: 'hidden',
  },
  headerImageViewer: {
    height: getScreenHeight() * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textHeaderImageViewer: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'semibold',
  },
});
