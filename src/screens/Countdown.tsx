import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React from 'react';

import * as Animatable from 'react-native-animatable';

import globalStyles from '../theme/styles';
import {heightScale, withScale} from '../helper/scale';
import GradientBackground from '../components/GradientBackground';
import FooterBannerAd from '../components/FooterBannerAd';
import i18n from '../translate/i18nConfig';
import {useCountDownScreen} from '../hooks/useCountDownScreen';

const Countdown = () => {
  const {language, t} = i18n;
  const {days, hours, minutes, goBack} = useCountDownScreen();

  return (
    <GradientBackground>
      <SafeAreaView style={styles.view}>
        <Animatable.View animation="zoomIn" delay={500} duration={3000}>
          <Image style={styles.logo} source={require('../assets/FWC26.png')} />
        </Animatable.View>
        <View>
          {language === 'es' && (
            <Animatable.View animation="fadeInUp" delay={2500}>
              <Animatable.Text
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={[styles.dayCounter, {marginTop: 15, fontSize: 40}]}>
                Faltan
              </Animatable.Text>
            </Animatable.View>
          )}
          <Animatable.Text
            animation="fadeInUp"
            delay={1000}
            style={styles.dayCounter}>
            {days} {t('CountDown.days')}
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={1500}
            style={styles.dayCounter}>
            {Math.floor(hours)} {t('CountDown.hours')}
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={2000}
            style={styles.dayCounter}>
            {Math.round(minutes)} {t('CountDown.minutes')}
          </Animatable.Text>
          {language === 'EN' && (
            <Animatable.View animation="fadeInUp" delay={2500}>
              <Animatable.Text
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={[styles.dayCounter, {marginTop: 15, fontSize: 40}]}>
                Left
              </Animatable.Text>
            </Animatable.View>
          )}
        </View>
        <Animatable.View animation="fadeInUp" delay={3000}>
          <Pressable
            onPress={goBack}
            style={[globalStyles.button, globalStyles.white, styles.btn]}>
            <Text style={globalStyles.textBtn}>{t('CountDown.goHome')}</Text>
          </Pressable>
        </Animatable.View>
      </SafeAreaView>
      <FooterBannerAd />
    </GradientBackground>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    height: heightScale(210),
    width: withScale(120),
    alignSelf: 'center',
    position: 'relative',
    top: 10,
  },
  btn: {
    marginHorizontal: '3%',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'relative',
    bottom: 35,
  },
  dayCounter: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 26,
    textTransform: 'uppercase',
  },
});
