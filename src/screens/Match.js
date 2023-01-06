import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  BannerAd,
  BannerAdSize,
  AdEventType,
  InterstitialAd,
} from 'react-native-google-mobile-ads';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClose,
  faMinusCircle,
  faPlusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SECTIONS from '../helper/selectImg';

import globalStyles from '../styles/styles';
import useApp from '../hooks/useApp';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import Penalties from '../components/Penalties';
import language from '../helper/translate';
import {adUnit} from '../helper/adUnit';
import ThemeContext from '../context/ThemeContext';
import {getUTC} from '../helper/getUTC';

const interstitial = InterstitialAd.createForAdRequest(adUnit('INTERSTITIAL'), {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['football', 'world cup', 'sports'],
});

const Match = ({route}) => {
  const {match, editing, local} = route.params;

  const [date, setDate] = useState(moment(match.date).utcOffset(0));
  const [loading, setLoading] = useState(true);
  const [penalties, setPenalties] = useState(false);
  const [saving, setSaving] = useState(false);
  const [played, setPlayed] = useState(0);
  const [goll, setGoll] = useState(0);
  const [golv, setGolv] = useState(0);
  const [penl, setPenl] = useState(0);
  const [penv, setPenv] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();
  const {saveMatch, DBLoading, lang} = useApp();
  const {mode} = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    getUTC().then(value => value && setUtc(value));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (match.played) {
      setGoll(match.goll);
      setGolv(match.golv);
    }
  }, []);

  const focusEffect = useCallback(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [DBLoading]);

  useFocusEffect(focusEffect);

  const handleLocal = type => {
    if (type === 'add') {
      setGoll(goll + 1);
    } else {
      if (goll === 0) {
        return;
      } else {
        setGoll(goll - 1);
      }
    }
  };

  const handleVisit = type => {
    if (type === 'add') {
      setGolv(golv + 1);
    } else {
      if (golv === 0) {
        return;
      } else {
        setGolv(golv - 1);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const limit = mode === 'UCL' ? 96 : 48;
    const matchSave = {
      date: match.date,
      goll,
      golv,
      id: match._id,
      local: match.local,
      penl,
      penv,
      played: true,
      visit: match.visit,
    };

    if (
      match.id > limit &&
      matchSave.goll === matchSave.golv &&
      matchSave.penl === 0 &&
      matchSave.penv === 0
    ) {
      setPenalties(true);
      setSaving(false);
      return;
    }

    if (loaded) {
      // interstitial.show();
    }

    await saveMatch(matchSave, mode, editing);

    if (match.id === limit) {
      navigation.dispatch(StackActions.replace('WelcomeScreen'));
    } else {
      navigation.goBack();
    }
    setSaving(false);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.background}>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <View style={styles.container}>
          <View style={styles.close}>
            <Pressable onPress={handleClose}>
              <FontAwesomeIcon
                style={[globalStyles.icon, globalStyles[`text-${mode}`]]}
                size={18}
                icon={faClose}
              />
            </Pressable>
          </View>
          <Text style={[styles.title, globalStyles[`text-${mode}`]]}>
            {editing && `${language[lang].editing}`}
            {language[lang].match}
          </Text>
          <Text style={styles.date}>{date.format('lll')}</Text>
          {mode === 'UCL' && (
            <Text style={styles.stadium}>{local && local.stadium}</Text>
          )}
          <View style={styles.match}>
            <Text style={styles.team}>{match.local}</Text>
            <View>
              <Image
                style={styles.logoTeam}
                source={SECTIONS[mode][match.local]?.file}
              />
              <View style={styles.match}>
                <Pressable onPress={() => handleLocal('min')}>
                  <View style={styles.btnContainer}>
                    <FontAwesomeIcon
                      style={[globalStyles.icon, globalStyles[`text-${mode}`]]}
                      size={18}
                      icon={faMinusCircle}
                    />
                  </View>
                </Pressable>
                <Text style={styles.goals}>{goll}</Text>
                <Pressable onPress={() => handleLocal('add')}>
                  <View style={styles.btnContainer}>
                    <FontAwesomeIcon
                      style={[globalStyles.icon, globalStyles[`text-${mode}`]]}
                      size={18}
                      icon={faPlusCircle}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
            <Text style={{color: '#111111'}}>VRS</Text>
            <View>
              <Image
                style={styles.logoTeam}
                source={SECTIONS[mode][match.visit]?.file}
              />
              <View style={styles.match}>
                <Pressable onPress={() => handleVisit('min')}>
                  <View style={styles.btnContainer}>
                    <FontAwesomeIcon
                      style={[globalStyles.icon, globalStyles[`text-${mode}`]]}
                      size={18}
                      icon={faMinusCircle}
                    />
                  </View>
                </Pressable>
                <Text style={styles.goals}>{golv}</Text>
                <Pressable onPress={() => handleVisit('add')}>
                  <View style={styles.btnContainer}>
                    <FontAwesomeIcon
                      style={[globalStyles.icon, globalStyles[`text-${mode}`]]}
                      size={18}
                      icon={faPlusCircle}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
            <Text style={styles.team}>{match.visit}</Text>
          </View>
          {!penalties && (
            <Pressable
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
                    style={[
                      globalStyles.icon,
                      {color: '#FFF', marginHorizontal: 5},
                    ]}
                    size={14}
                    icon={faSave}
                  />
                  <Text style={styles.textStyle}>
                    {played < 48 || editing || (played >= 48 && goll !== golv)
                      ? `${language[lang].save}`
                      : `${language[lang].endTime}`}
                  </Text>
                </View>
              )}
            </Pressable>
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
      <View style={globalStyles.ads}>
        <BannerAd
          unitId={adUnit()}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
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
  btnContainer: {
    padding: 5,
  },
  container: {
    backgroundColor: '#FFF',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  close: {
    position: 'relative',
    width: 40,
    height: 40,
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 50,
    left: 10,
    top: 10,
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
  goals: {
    borderColor: '#EEE',
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
    color: '#111111',
  },
  icon: {
    marginHorizontal: 5,
  },
  iconSave: {
    color: '#FFF',
    marginHorizontal: 5,
  },
  logoTeam: {
    width: 80,
    height: 80,
    margin: 10,
  },
  match: {
    flexDirection: 'row',
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
