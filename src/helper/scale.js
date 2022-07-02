import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const guideLineBaseWith = 370;
const guideLineBaseHeight = 650;

const withScale = size => (width / guideLineBaseWith) * size; //with
const heightScale = size => (height / guideLineBaseHeight) * size; //height
const paddingScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor; //padding

export {withScale, heightScale, paddingScale};
