import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const guideLineBaseWith = 370;
const guideLineBaseHeight = 650;

const withScale = (size: number) => (width / guideLineBaseWith) * size; //with
const heightScale = (size: number) => (height / guideLineBaseHeight) * size; //height

export {withScale, heightScale};
