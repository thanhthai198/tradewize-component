import { Dimensions } from 'react-native';

const getScreenWidth = () => {
  return Dimensions.get('window').width;
};

const getScreenHeight = () => {
  return Dimensions.get('window').height;
};

export { getScreenWidth, getScreenHeight };
