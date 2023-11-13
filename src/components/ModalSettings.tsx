import {
  Pressable,
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
import {modalStyles} from '../theme/modalStyles';

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
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalView}>
        <Text style={modalStyles.modalText}>{t('Settings.chooseLang')}</Text>
        <SegmentedControl
          values={[
            {key: `🇬🇧 ${t('Settings.english')}`, value: 'en'},
            {key: `🇪🇸 ${t('Settings.spanish')}`, value: 'es'},
          ]}
          onChange={setCurrentLang}
          selectedIndex={currentLang === 'en' ? 0 : 1}
        />

        <Text style={modalStyles.modalText}>{t('Settings.zoneTime')}</Text>
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
            style={modalStyles.input}
            keyboardType="number-pad"
            value={hours}
            onChangeText={setHours}
            placeholder="HH"
            maxLength={2}
          />
          <Text style={modalStyles.points}>:</Text>
          <TextInput
            style={modalStyles.input}
            keyboardType="number-pad"
            value={minutes}
            onChangeText={setMinutes}
            placeholder="MM"
            maxLength={2}
          />
        </View>
        <Pressable
          style={[modalStyles.button, globalStyles[`bg-${mode}`]]}
          onPress={handleSave}>
          <FontAwesomeIcon
            style={[globalStyles.icon, modalStyles.icon]}
            size={14}
            icon={faSave}
          />
          <Text style={modalStyles.textStyle}>{t('Settings.save')}</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={[
            modalStyles.button,
            globalStyles[`bg-${mode}`],
            modalStyles.close,
          ]}
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
