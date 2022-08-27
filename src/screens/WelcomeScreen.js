import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import globalStyles from '../styles/styles';
import {heightScale, withScale} from '../helper/scale';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faDice, faFutbol} from '@fortawesome/free-solid-svg-icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import ModalSettings from '../components/ModalSettings';
import useApp from '../hooks/useApp';
import language from '../helper/translate';
import gradientSelector from '../helper/gradientSelector';

const WelcomeScreen = () => {
  const [today, setToday] = useState(null);
  const [start, setStart] = useState(null);
  const [utc, setUtc] = useState('+00:00');
  const [modalVisible, setModalVisible] = useState(false);

  const {
    generateNextMatches,
    generateNextMatches_p,
    matchesPlayed_p,
    lang,
    uiMode,
  } = useApp();
  const navigation = useNavigation();

  useEffect(() => {
    const setUTC = async () => {
      const utcStg = await AsyncStorage.getItem('UTC');

      if (!utcStg) {
        await AsyncStorage.setItem('UTC', '+00:00');
      } else {
        setUtc(utcStg);
      }
    };
    setToday(moment().utcOffset(utc));
    setStart(moment([2022, 10, 21, 0, 0, 0]));

    setUTC();
  }, []);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const callback = useCallback(() => {
    forceUpdate();
    const generate = async () => {
      await generateNextMatches();
      await generateNextMatches_p();
    };

    generate();
  }, [matchesPlayed_p]);

  useFocusEffect(callback);

  const handleMatch = () => {
    if (uiMode === 'WCF') {
      if (today >= start) {
        navigation.navigate('Matches');
      } else {
        navigation.navigate('Countdown');
      }
    } else {
      navigation.navigate('Matches');
    }
  };

  const goToPlayGround = () => {
    if (uiMode === 'UCL') {
      Alert.alert(language[lang].info, language[lang].msgPlayground);
      return;
    }
    navigation.navigate('Playground');
  };

  return (
    <LinearGradient
      colors={gradientSelector(uiMode)}
      style={globalStyles.flex}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={[globalStyles.flex, globalStyles.center]}>
        <Pressable onPress={() => setModalVisible(true)} style={styles.icon}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#FFF'}]}
            size={26}
            icon={faCog}
          />
        </Pressable>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.containerPet}>
          <Image
            style={styles.logoPet}
            source={require('../assets/logoIFS.png')}
          />
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
            <Text style={globalStyles.textBtn}> {language[lang].matches}</Text>
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
            <Text style={globalStyles.textBtn}>
              {' '}
              {language[lang].playground}
            </Text>
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
          source={require('../assets/logoText.png')}
        />
      </Animatable.View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ModalSettings setModalVisible={setModalVisible} />
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logoView: {
    height: 82,
    width: 260,
  },
  logoPet: {
    height: heightScale(170),
    width: withScale(180),
  },
  containerImg: {
    alignSelf: 'center',
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
  icon: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
});

export default WelcomeScreen;
