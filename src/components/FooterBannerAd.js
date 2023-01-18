import {View} from 'react-native';
import React from 'react';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {adUnit} from '../helper/adUnit';
import globalStyles from '../styles/styles';

const FooterBannerAd = () => {
  return (
    <View style={globalStyles.ads}>
      <BannerAd
        unitId={adUnit()}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export default FooterBannerAd;
