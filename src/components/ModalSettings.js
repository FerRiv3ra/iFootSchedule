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
import React, {useEffect, useState} from 'react';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import globalStyles from '../styles/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClose,
  faMinus,
  faPlus,
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from '../hooks/useApp';
import language from '../helper/translate';
import SegmentedControl from './SegmentedControl';
import {adUnit} from '../helper/adUnit';

const ModalSettings = ({setModalVisible}) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [plus, setPlus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState('');
  const [mode, setMode] = useState('');

  const {restorePlayground, lang, setLang, uiMode, setUiMode} = useApp();

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
    setMode(uiMode);

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
    await AsyncStorage.setItem('uiMode', mode);

    setLang(currentLang);
    setUiMode(mode);

    Alert.alert(
      language[currentLang].success,
      language[currentLang].zoneLangMgs,
    );
  };

  const handleDelete = async () => {
    const restore = async () => {
      setLoading(true);
      await restorePlayground();

      await AsyncStorage.setItem('currentDay', '325');

      setLoading(false);
      Alert.alert(
        language[currentLang].success,
        language[currentLang].successMessage,
      );
    };

    Alert.alert(
      language[currentLang].confirm,
      language[currentLang].confirmMessage,
      [
        {text: language[currentLang].cancel},
        {text: language[currentLang].confirmDelete, onPress: () => restore()},
      ],
    );
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  if (isLoading) return <ActivityIndicator animating={isLoading} />;

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{language[lang].chooseMode}</Text>
        <SegmentedControl
          values={[
            {key: 'World Cup', value: 'WCF'},
            {key: 'Champios League', value: 'UCL'},
          ]}
          onChange={setMode}
          selectedIndex={mode === 'WCF' ? 0 : 1}
        />
        <Text style={styles.modalText}>{language[lang].chooseLang}</Text>
        <SegmentedControl
          values={[
            {key: language[lang].english, value: 'EN'},
            {key: language[lang].spanish, value: 'ES'},
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

        <Text style={[styles.modalText, {marginTop: 10}]}>
          {language[lang].deletePlayground}
        </Text>
        <Pressable
          style={[styles.button, globalStyles[`bg-${mode}`]]}
          disabled={loading}
          onPress={handleDelete}>
          <FontAwesomeIcon
            style={[globalStyles.icon, styles.icon]}
            size={14}
            icon={faTrash}
          />
          <Text style={styles.textStyle}>{language[lang].delete}</Text>
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
          <Text>{language[lang].close}</Text>
        </Pressable>
      </View>
      <View style={globalStyles.ads}>
        <BannerAd
          unitId={adUnit()}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#AAA',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  points: {
    alignSelf: 'center',
    fontSize: 18,
  },
  icon: {
    color: '#FFF',
    marginHorizontal: 5,
  },
});
