import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClose,
  faMinus,
  faPlus,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';

import globalStyles from '../theme/styles';
import SegmentedControl from './SegmentedControl';
import FooterBannerAd from './FooterBannerAd';
import {useSettings} from '../hooks/useSettings';

interface Props {
  setModalVisible: (visible: boolean) => void;
}

const ModalSettings = ({setModalVisible}: Props) => {
  const {
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
  } = useSettings();
  const {t} = useTranslation();

  const handleClose = () => {
    setModalVisible(false);
  };

  if (isLoading) return <ActivityIndicator animating={isLoading} />;

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{t('Settings.chooseLang')}</Text>
        <SegmentedControl
          values={[
            {key: `🇬🇧 ${t('Settings.english')}`, value: 'en'},
            {key: `🇪🇸 ${t('Settings.spanish')}`, value: 'es'},
          ]}
          onChange={setCurrentLang}
          selectedIndex={currentLang === 'en' ? 0 : 1}
        />

        <Text style={styles.modalText}>{t('Settings.zoneTime')}</Text>
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
          <Text style={styles.textStyle}>{t('Settings.save')}</Text>
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
          <Text style={{color: '#111111'}}>{t('Settings.close')}</Text>
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
