import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

import globalStyles from '../styles/styles';
import {heightScale, withScale} from '../helper/scale';
import {useNavigation} from '@react-navigation/native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import useApp from '../hooks/useApp';
import language from '../helper/translate';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-3087410415589963/6846729662'
  : 'ca-app-pub-3087410415589963/7165846759';

const Countdown = () => {
  const today = moment();
  const start = moment([2022, 10, 21, 0, 0, 0]);
  const diffDays = start.diff(today, 'days');
  const diffHours = start.diff(today, 'hours', true) % 24;
  const diffMins =
    (start.diff(today, 'minutes', true) % 1440) - Math.floor(diffHours) * 60;

  const [days, setDays] = useState(diffDays);
  const [hours, setHours] = useState(diffHours);
  const [minutes, setMinutes] = useState(diffMins);
  const navigation = useNavigation();
  const {lang} = useApp();

  const timerRef = useRef(diffMins);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        timerRef.current = 59;
        if (hours < 0) {
          setHours(23);
          setDays(days - 1);
        } else {
          setHours(hours - 1);
        }
        setMinutes(59);
      } else {
        setMinutes(timerRef.current);
      }
    }, 1000 * 60);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#5a0024', '#5a0024', '#5a0024', '#000']}
      style={globalStyles.flex}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <SafeAreaView style={styles.view}>
        <Animatable.View animation="zoomIn" delay={500} duration={3000}>
          <Image
            style={styles.logo}
            source={require('../assets/logoWcup.png')}
          />
        </Animatable.View>
        <View>
          {lang === 'ES' && (
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
            {days} {language[lang].days}
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={1500}
            style={styles.dayCounter}>
            {Math.floor(hours)} {language[lang].hours}
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={2000}
            style={styles.dayCounter}>
            {Math.round(minutes)} {language[lang].minutes}
          </Animatable.Text>
          {lang === 'EN' && (
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
            <Text style={globalStyles.textBtn}>{language[lang].goHome}</Text>
          </Pressable>
        </Animatable.View>
      </SafeAreaView>
      <View style={styles.ads}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  ads: {
    alignItems: 'center',
  },
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
    bottom: 20,
  },
  dayCounter: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 26,
    textTransform: 'uppercase',
  },
});
