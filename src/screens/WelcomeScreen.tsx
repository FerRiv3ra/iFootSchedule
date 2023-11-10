import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Carousel from 'react-native-snap-carousel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {StackScreenProps} from '@react-navigation/stack';

import globalStyles from '../theme/styles';

import ModalSettings from '../components/ModalSettings';
import {leaguesData} from '../data/leaguesData';
import CardLeague from '../components/CardLeague';
import GradientBackground from '../components/GradientBackground';
import ThemeContext from '../context/ThemeContext';
import {MatchMode, RootStackParams} from '../types';
import MainButton from '../components/MainButton';

interface Props extends StackScreenProps<RootStackParams, 'WelcomeScreen'> {}

const WelcomeScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {setMainColors, setMode, mode} = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  const {width} = Dimensions.get('window');

  const selectGradient = (index: number) => {
    setMainColors(leaguesData[index].gradient);
    setMode(leaguesData[index].id as MatchMode);
  };

  const navigate = () => {
    navigation.navigate(mode === 'FWC' ? 'Countdown' : 'Matches');
  };

  return (
    <GradientBackground>
      <Pressable onPress={() => setModalVisible(true)} style={styles.icon}>
        <FontAwesomeIcon
          style={{...globalStyles.icon, zIndex: 99}}
          color="#FFF"
          size={26}
          icon={faCog}
        />
      </Pressable>
      <View style={{marginTop: top + 50}}>
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
        <MainButton
          title="UI.matches"
          onPress={navigate}
          icon="faFutbol"
          style={{backgroundColor: '#FFF'}}
        />
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
  icon: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
});

export default WelcomeScreen;
