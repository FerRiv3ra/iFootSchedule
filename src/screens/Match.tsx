import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import globalStyles from '../theme/styles';
import Penalties from '../components/Penalties';
import ThemeContext from '../context/ThemeContext';
import FooterBannerAd from '../components/FooterBannerAd';
import {RootStackParams} from '../types';
import {CloseButton} from '../components/CloseButton';
import {MatchTeam} from '../components/MatchTeam';
import {useMatch} from '../hooks/useMatch';

interface Props extends StackScreenProps<RootStackParams, 'Match'> {}

const Match = ({route}: Props) => {
  const {match, editing, local} = route.params;

  const {
    date,
    loading,
    penalties,
    saving,
    setPenl,
    setPenv,
    handleGol,
    goll,
    golv,
    prevMatch,
    handleSave,
    handleClose,
  } = useMatch(match, editing);
  const {t} = useTranslation();
  const {mode} = useContext(ThemeContext);

  return (
    <SafeAreaView style={styles.background}>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <View style={globalStyles.whiteContainer}>
          <CloseButton handleClose={handleClose} />

          <Text style={[styles.title, globalStyles[`text-${mode}`]]}>
            {editing && `${t('Match.editing')}`}
            {t('Match.match')}
          </Text>
          <Text style={styles.date}>{date.format('lll')}</Text>
          <Text style={styles.stadium}>{local && local.stadium}</Text>
          <View style={{...styles.match, ...globalStyles.row}}>
            <Text style={styles.team}>{match.local}</Text>
            <MatchTeam
              match={match}
              goles={goll}
              type="local"
              handleGol={handleGol}
            />

            <Text style={{color: '#111111'}}>VRS</Text>

            <MatchTeam
              match={match}
              goles={golv}
              type="visit"
              handleGol={handleGol}
            />
            <Text style={styles.team}>{match.visit}</Text>
          </View>
          {!penalties && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSave}
              disabled={saving}
              style={[
                globalStyles.button,
                styles.btn,
                globalStyles[`bg-${mode}`],
              ]}>
              {saving ? (
                <ActivityIndicator animating={saving} />
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <FontAwesomeIcon
                    style={[globalStyles.icon, {marginHorizontal: 5}]}
                    size={14}
                    color="#FFF"
                    icon={faSave}
                  />
                  <Text style={styles.textStyle}>
                    {!editing &&
                    mode === 'UCL' &&
                    !!prevMatch &&
                    goll + prevMatch?.golv === golv + prevMatch?.goll
                      ? `${t('Match.endTime')}`
                      : `${t('Settings.save')}`}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
      {penalties && (
        <Penalties
          setPenl={setPenl}
          setPenv={setPenv}
          handleSave={handleSave}
        />
      )}
      <FooterBannerAd />
    </SafeAreaView>
  );
};

export default Match;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#EEE',
    flex: 1,
  },
  btn: {
    marginHorizontal: '3%',
    marginVertical: '7%',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  date: {
    textAlign: 'center',
    fontSize: 12,
    color: '#111111',
  },
  stadium: {
    textAlign: 'center',
    fontSize: 14,
    color: 'blue',
  },
  match: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  team: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 18,
    top: 25,
    fontWeight: '700',
  },
});
