import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
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
import {useNavigation} from '@react-navigation/native';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-3087410415589963~5920374428'
  : 'ca-app-pub-3087410415589963~7233456098';

const Match = ({route}) => {
  const {match, parent} = route.params;

  const [date, setDate] = useState(moment(match.dat).utcOffset(0));
  const [loading, setLoading] = useState(true);
  const [newGame, setNewGame] = useState(true);
  const [goll, setGoll] = useState(0);
  const [golv, setGolv] = useState(0);

  const navigation = useNavigation();
  const {saveMatch} = useApp();

  useEffect(() => {
    setLoading(true);
    const getUTC = async () => {
      const utc = await AsyncStorage.getItem('UTC');

      if (utc) {
        setDate(moment(match.dat).utcOffset(utc));
      }
    };

    if (match.played === 'true') {
      setGoll(match.goll);
      setGolv(match.golv);
      setNewGame(false);
    }

    getUTC();
    setLoading(false);
  }, []);

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
    if (newGame) {
      const matchSave = {
        dat: match.dat,
        goll,
        golv,
        id: match.id,
        local: match.local,
        penl: match.penl,
        penv: match.penv,
        played: true,
        visit: match.visit,
      };

      await saveMatch(matchSave, parent);
    }

    navigation.goBack();
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
                style={[globalStyles.icon, styles.primary]}
                size={18}
                icon={faClose}
              />
            </Pressable>
          </View>
          <Text style={styles.title}>Match</Text>
          <Text style={styles.date}>{date.format('lll')}</Text>
          <View style={styles.match}>
            <Text style={styles.team}>{match.local}</Text>
            <View>
              <Image
                style={styles.logoTeam}
                source={SECTIONS[match.local]?.file}
              />
              <View style={styles.match}>
                <Pressable
                  disabled={!newGame}
                  onPress={() => handleLocal('min')}>
                  <FontAwesomeIcon
                    style={[
                      globalStyles.icon,
                      styles.icon,
                      newGame && styles.primary,
                    ]}
                    size={18}
                    icon={faMinusCircle}
                  />
                </Pressable>
                <Text style={styles.goals}>{goll}</Text>
                <Pressable
                  disabled={!newGame}
                  onPress={() => handleLocal('add')}>
                  <FontAwesomeIcon
                    style={[
                      globalStyles.icon,
                      styles.icon,
                      newGame && styles.primary,
                    ]}
                    size={18}
                    icon={faPlusCircle}
                  />
                </Pressable>
              </View>
            </View>
            <Text>VRS</Text>
            <View>
              <Image
                style={styles.logoTeam}
                source={SECTIONS[match.visit]?.file}
              />
              <View style={styles.match}>
                <Pressable
                  disabled={!newGame}
                  onPress={() => handleVisit('min')}>
                  <FontAwesomeIcon
                    style={[
                      globalStyles.icon,
                      styles.icon,
                      newGame && styles.primary,
                    ]}
                    size={18}
                    icon={faMinusCircle}
                  />
                </Pressable>
                <Text style={styles.goals}>{golv}</Text>
                <Pressable
                  disabled={!newGame}
                  onPress={() => handleVisit('add')}>
                  <FontAwesomeIcon
                    style={[
                      globalStyles.icon,
                      styles.icon,
                      newGame && styles.primary,
                    ]}
                    size={18}
                    icon={faPlusCircle}
                  />
                </Pressable>
              </View>
            </View>
            <Text style={styles.team}>{match.visit}</Text>
          </View>
          <Pressable
            onPress={handleSave}
            disabled={!newGame}
            style={[
              globalStyles.button,
              styles.btn,
              newGame && globalStyles.primary,
            ]}>
            <FontAwesomeIcon
              style={[
                globalStyles.icon,
                styles.icon,
                newGame && styles.primarySave,
              ]}
              size={14}
              icon={faSave}
            />
            <Text style={styles.textStyle}>Save</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.ads}>
        <BannerAd
          unitId={adUnitId}
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
  ads: {
    position: 'absolute',
    bottom: 0,
  },
  background: {
    backgroundColor: '#EEE',
    flex: 1,
  },
  btn: {
    marginHorizontal: '3%',
    marginVertical: '7%',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#EEE',
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
  },
  goals: {
    borderColor: '#EEE',
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
  },
  icon: {
    color: '#DDD',
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
  primary: {
    color: '#5a0024',
  },
  team: {
    fontSize: 16,
    fontWeight: '600',
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  title: {
    color: '#5a0024',
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 18,
    top: 25,
    fontWeight: '700',
  },
});
