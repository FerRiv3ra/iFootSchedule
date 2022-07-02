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

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-3087410415589963~5920374428'
  : 'ca-app-pub-3087410415589963~7233456098';

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

  console.log(today);

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
            source={require('../assets/logo2cup.png')}
          />
        </Animatable.View>
        <View>
          <Animatable.Text
            animation="fadeInUp"
            delay={1000}
            style={styles.dayCounter}>
            {days} Days
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={1500}
            style={styles.dayCounter}>
            {Math.floor(hours)} Hours
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={2000}
            style={styles.dayCounter}>
            {Math.round(minutes)} Minutes
          </Animatable.Text>
          <Animatable.View animation="fadeInUp" delay={2500}>
            <Animatable.Text
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
              style={[styles.dayCounter, {marginTop: 15, fontSize: 40}]}>
              Letf
            </Animatable.Text>
          </Animatable.View>
        </View>
        <Animatable.View animation="fadeInUp" delay={3000}>
          <Pressable
            onPress={goBack}
            style={[globalStyles.button, globalStyles.white, styles.btn]}>
            <Text style={globalStyles.textBtn}>Go Home</Text>
          </Pressable>
        </Animatable.View>
      </SafeAreaView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </LinearGradient>
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
