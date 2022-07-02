import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import globalStyles from '../styles/styles';
import {heightScale, withScale} from '../helper/scale';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDice, faFutbol} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const [today, setToday] = useState(null);
  const [start, setStart] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    setToday(new Date());
    setStart(new Date(2022, 10, 21, 0, 0, 0));
  }, []);

  const handleMatch = () => {
    if (today >= start) {
      navigation.navigate('Matches');
    } else {
      navigation.navigate('Countdown');
    }
  };

  const goToPlayGround = () => {
    navigation.navigate('Playground');
  };

  return (
    <LinearGradient
      colors={['#5a0024', '#5a0024', '#5a0024', '#000']}
      style={globalStyles.flex}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={[globalStyles.flex, globalStyles.center]}>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.containerPet}>
          <Image style={styles.logoPet} source={require('../assets/pet.png')} />
        </Animatable.View>
        <Animatable.View animation={'fadeInRightBig'} delay={1000}>
          <Pressable
            onPress={handleMatch}
            style={[globalStyles.button, globalStyles.white, styles.btnUp]}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#000'}]}
              size={16}
              icon={faFutbol}
            />
            <Text style={globalStyles.textBtn}> Matches</Text>
          </Pressable>
        </Animatable.View>
        <Animatable.View animation={'fadeInLeftBig'} delay={1000}>
          <Pressable
            onPress={goToPlayGround}
            style={[globalStyles.button, globalStyles.white, styles.btnDown]}>
            <FontAwesomeIcon
              style={[globalStyles.icon, {color: '#000'}]}
              size={18}
              icon={faDice}
            />
            <Text style={globalStyles.textBtn}> Playground</Text>
          </Pressable>
        </Animatable.View>
      </View>
      <Animatable.View
        animation={'rubberBand'}
        duration={3000}
        iterationCount={3}
        style={styles.containerImg}>
        <Image
          style={styles.logoView}
          source={require('../assets/logocup.png')}
        />
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logoView: {
    height: heightScale(30),
    width: withScale(225),
  },
  logoPet: {
    height: heightScale(200),
    width: withScale(230),
  },
  containerImg: {
    alignSelf: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 30,
  },
  containerPet: {
    alignSelf: 'center',
    padding: 10,
    position: 'absolute',
    top: 30,
  },
  btnUp: {
    marginHorizontal: '3%',
    marginBottom: 2,
    borderTopLeftRadius: 20,
  },
  btnDown: {
    marginHorizontal: '3%',
    borderBottomRightRadius: 20,
  },
});

export default WelcomeScreen;
