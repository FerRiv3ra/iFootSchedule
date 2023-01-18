import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import globalStyles from '../styles/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClose,
  faMinus,
  faPlus,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from '../hooks/useApp';
import language from '../helper/translate';
import SegmentedControl from './SegmentedControl';
import ThemeContext from '../context/ThemeContext';
import FooterBannerAd from './FooterBannerAd';

const ModalSettings = ({setModalVisible}) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [plus, setPlus] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState('');

  const {lang, setLang} = useApp();
  const {mode} = useContext(ThemeContext);

  useEffect(() => {
    const getUTC = async () => {
      const utc = await AsyncStorage.getItem('UTC');

      if (utc) {
        if (utc[0] === '+') {
          setPlus(true);
        } else {
          setPlus(false);
        }
        if (utc.slice(1, 3) !== '00') {
          setHours(utc.slice(1, 3));
          setMinutes(utc.slice(4, 6));
        }
      }
    };

    setCurrentLang(lang);

    getUTC();
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    let utc = '';

    if ((plus && Number(hours) > 14) || (!plus && Number(hours) > 11)) {
      Alert.alert('Error', language[currentLang].validHours);
      return;
    }

    if (!['', '00', '30', '45'].includes(minutes)) {
      Alert.alert('Error', language[currentLang].validMinutes);
      return;
    }

    if (!plus && minutes === '45') {
      Alert.alert('Error', language[currentLang].zoneError);
      return;
    }

    if (
      !plus &&
      minutes === '30' &&
      (Number(hours) !== 3 || Number(hours) !== 9)
    ) {
      Alert.alert('Error', language[currentLang].zoneError);
      return;
    }

    if (
      plus &&
      minutes === '30' &&
      (Number(hours) < 3 || Number(hours) > 6) &&
      (Number(hours) < 9 || Number(hours) > 10)
    ) {
      Alert.alert('Error', language[currentLang].zoneError);
      return;
    }

    if (
      plus &&
      minutes === '45' &&
      Number(hours) !== 5 &&
      Number(hours) !== 8 &&
      Number(hours) !== 12
    ) {
      Alert.alert('Error', language[currentLang].zoneError);
      return;
    }

    if (plus || !hours) {
      utc += '+';
    } else {
      utc += '-';
    }

    if (!hours) {
      utc += '00';
    } else {
      if (hours.length === 1) {
        utc += `0${hours}`;
      } else {
        utc += hours;
      }
    }

    utc += ':';

    if (minutes === '') {
      utc += '00';
    } else {
      utc += minutes;
    }

    Keyboard.dismiss();

    await AsyncStorage.setItem('UTC', utc);
    await AsyncStorage.setItem('lang', currentLang);

    setLang(currentLang);

    Alert.alert(
      language[currentLang].success,
      language[currentLang].zoneLangMgs,
    );
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  if (isLoading) return <ActivityIndicator animating={isLoading} />;

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{language[lang].chooseLang}</Text>
        <SegmentedControl
          values={[
            {key: `🇬🇧 ${language[lang].english}`, value: 'EN'},
            {key: `🇪🇸 ${language[lang].spanish}`, value: 'ES'},
          ]}
          onChange={setCurrentLang}
          selectedIndex={currentLang === 'EN' ? 0 : 1}
        />

        <Text style={styles.modalText}>{language[lang].zoneTime}</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{alignSelf: 'center'}}
            onPress={() => setPlus(!plus)}>
            <FontAwesomeIcon
              style={[globalStyles.icon]}
              size={16}
              icon={plus ? faPlus : faMinus}
            />
          </Pressable>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={hours}
            onChangeText={setHours}
            placeholder="HH"
            maxLength={2}
          />
          <Text style={styles.points}>:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={minutes}
            onChangeText={setMinutes}
            placeholder="MM"
            maxLength={2}
          />
        </View>
        <Pressable
          style={[styles.button, globalStyles[`bg-${mode}`]]}
          onPress={handleSave}>
          <FontAwesomeIcon
            style={[globalStyles.icon, styles.icon]}
            size={14}
            icon={faSave}
          />
          <Text style={styles.textStyle}>{language[lang].save}</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={[styles.button, globalStyles[`bg-${mode}`], styles.close]}
          onPress={handleClose}>
          <FontAwesomeIcon
            style={[globalStyles.icon]}
            size={14}
            icon={faClose}
          />
          <Text style={{color: '#111111'}}>{language[lang].close}</Text>
        </Pressable>
      </View>
      <FooterBannerAd />
    </View>
  );
};

export default ModalSettings;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    flexDirection: 'row',
  },
  close: {
    backgroundColor: '#FFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#111111',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#AAA',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    color: '#111111',
  },
  points: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#111111',
  },
  icon: {
    color: '#FFF',
    marginHorizontal: 5,
  },
});
