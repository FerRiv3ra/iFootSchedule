const {Platform} = require('react-native');
const {TestIds} = require('react-native-google-mobile-ads');

const adUnit = (type = 'BANNER') => {
  let adUnitId = '';
  if (type === 'BANNER') {
    adUnitId = __DEV__
      ? TestIds.BANNER
      : Platform.OS === 'ios'
      ? 'ca-app-pub-3087410415589963/6846729662'
      : 'ca-app-pub-3087410415589963/7165846759';
  } else {
    adUnitId = __DEV__
      ? TestIds.INTERSTITIAL
      : Platform.OS === 'ios'
      ? 'ca-app-pub-3087410415589963/6889578805'
      : 'ca-app-pub-3087410415589963/6150216357';
  }

  return adUnitId;
};

module.exports = {adUnit};
