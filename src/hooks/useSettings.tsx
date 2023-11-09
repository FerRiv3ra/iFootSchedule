import {useContext, useEffect, useState} from 'react';
import {Alert, Keyboard} from 'react-native';

import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ThemeContext from '../context/ThemeContext';
import useApp from './useApp';
import {ValidLanguages} from '../types';

export const useSettings = () => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [plus, setPlus] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState('');

  const {lang, setLang} = useApp();
  const {t} = useTranslation();
  const {mode} = useContext(ThemeContext);

  useEffect(() => {
    setCurrentLang(lang);
    getUTC();
    setIsLoading(false);
  }, []);

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

  const handleSave = async () => {
    let utc = '';

    if ((plus && Number(hours) > 14) || (!plus && Number(hours) > 11)) {
      Alert.alert('Error', t('Settings.validHours'));
      return;
    }

    if (!['', '00', '30', '45'].includes(minutes)) {
      Alert.alert('Error', t('Settings.validMinutes'));
      return;
    }

    if (!plus && minutes === '45') {
      Alert.alert('Error', t('Settings.zoneError'));
      return;
    }

    if (
      !plus &&
      minutes === '30' &&
      (Number(hours) !== 3 || Number(hours) !== 9)
    ) {
      Alert.alert('Error', t('Settings.zoneError'));
      return;
    }

    if (
      plus &&
      minutes === '30' &&
      (Number(hours) < 3 || Number(hours) > 6) &&
      (Number(hours) < 9 || Number(hours) > 10)
    ) {
      Alert.alert('Error', t('Settings.zoneError'));
      return;
    }

    if (
      plus &&
      minutes === '45' &&
      Number(hours) !== 5 &&
      Number(hours) !== 8 &&
      Number(hours) !== 12
    ) {
      Alert.alert('Error', t('Settings.zoneError'));
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

    setLang(currentLang as ValidLanguages);

    Alert.alert(t('Settings.success'), t('Settings.zoneLangMgs'));
  };

  return {
    isLoading,
    setCurrentLang,
    currentLang,
    setPlus,
    plus,
    mode,
    hours,
    setHours,
    minutes,
    setMinutes,
    handleSave,
  };
};
