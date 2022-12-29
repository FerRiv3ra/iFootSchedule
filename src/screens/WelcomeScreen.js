import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import * as Animatable from 'react-native-animatable';

import globalStyles from '../styles/styles';
import {heightScale, withScale} from '../helper/scale';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faFutbol} from '@fortawesome/free-solid-svg-icons';
import {useFocusEffect} from '@react-navigation/native';

import ModalSettings from '../components/ModalSettings';
import useApp from '../hooks/useApp';
import language from '../helper/translate';
import gradientSelector from '../helper/gradientSelector';
import Carousel from 'react-native-snap-carousel';
import {leaguesData} from '../data/leaguesData';
import CardLeague from '../components/CardLeague';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GradientBackground from '../components/GradientBackground';
import ThemeContext from '../context/ThemeContext';

const WelcomeScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {generateNextMatches, lang} = useApp();
  const {setMainColors, setMode, mode} = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  const {width} = Dimensions.get('window');

  const callback = useCallback(() => {
    generate();
  }, []);

  useFocusEffect(callback);

  const generate = async () => {
    await generateNextMatches();
  };

  const selectGradient = index => {
    setMainColors(gradientSelector(leaguesData[index].id));
    setMode(leaguesData[index].id);
  };

  const navigate = () => {
    navigation.navigate(mode === 'FWC' ? 'Countdown' : 'Matches');
  };

  return (
    <GradientBackground>
      <Pressable onPress={() => setModalVisible(true)} style={styles.icon}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#FFF', zIndex: 99}]}
          size={26}
          icon={faCog}
        />
      </Pressable>
      <View style={{...styles.containerPet, marginTop: top + 50}}>
        <Carousel
          data={leaguesData}
          renderItem={({item}) => <CardLeague item={item} />}
          sliderWidth={width < 500 ? width : 500}
          itemWidth={width < 500 ? width - 110 : 490}
          inactiveSlideOpacity={0.9}
          onSnapToItem={selectGradient}
        />
      </View>

      <Animatable.View animation={'fadeInUpBig'} delay={1000}>
        <Pressable
          onPress={navigate}
          style={[globalStyles.button, globalStyles.white, styles.btnUp]}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#000'}]}
            size={16}
            icon={faFutbol}
          />
          <Text style={globalStyles.textBtn}> {language[lang].matches}</Text>
        </Pressable>
      </Animatable.View>

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
    </GradientBackground>
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
  btnUp: {
    marginHorizontal: '3%',
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  btnDown: {
    borderBottomRightRadius: 20,
    marginHorizontal: '3%',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
});

export default WelcomeScreen;
