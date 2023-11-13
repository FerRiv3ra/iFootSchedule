import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';

import globalStyles from '../theme/styles';
import Penalty from './Penalty';
import {usePenalties} from '../hooks/usePenalties';

interface Props {
  setPenl: (penal: number) => void;
  setPenv: (penal: number) => void;
  handleSave: () => Promise<void>;
}

const Penalties = ({setPenl, setPenv, handleSave}: Props) => {
  const {canSave, rounds, mode, handleRounds} = usePenalties(setPenl, setPenv);
  const {t} = useTranslation();

  return (
    <View style={globalStyles.whiteContainer}>
      <Text style={[styles.title, globalStyles[`text-${mode}`]]}>
        {t('UI.penalties')}
      </Text>
      {rounds.map(round => (
        <Penalty key={round.round} handleRounds={handleRounds} round={round} />
      ))}
      <Pressable
        onPress={handleSave}
        disabled={!canSave}
        style={[
          globalStyles.button,
          styles.btn,
          canSave && globalStyles[`bg-${mode}`],
        ]}>
        <FontAwesomeIcon
          style={[globalStyles.icon, styles.icon]}
          size={14}
          icon={faSave}
        />
        <Text style={styles.textStyle}>{t('Settings.save')}</Text>
      </Pressable>
    </View>
  );
};

export default Penalties;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: '3%',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#DDD',
    marginVertical: 20,
  },
  icon: {
    color: '#FFF',
    marginHorizontal: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
