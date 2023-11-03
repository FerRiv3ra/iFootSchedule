import AsyncStorage from '@react-native-async-storage/async-storage';
import MobileAds, {
  AdsConsent,
  AdsConsentStatus,
} from 'react-native-google-mobile-ads';

export const useAds = () => {
  const loadAdsEngine = async () => {
    const consentInfo = await AdsConsent.requestInfoUpdate();
    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdsConsentStatus.REQUIRED
    ) {
      const {status} = await AdsConsent.showForm();

      await AsyncStorage.setItem('adsStatus', status);
    }

    MobileAds().initialize().then(console.log);
  };

  return {loadAdsEngine};
};
