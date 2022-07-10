import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import useApp from '../hooks/useApp';
import Table from '../components/Table';
import NextMatch from '../components/NextMatch';
import moment from 'moment';
import MatchesDay from '../components/MatchesDay';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import globalStyles from '../styles/styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Champion from '../components/Champion';
import DateChange from '../components/DateChange';
import AsyncStorage from '@react-native-async-storage/async-storage';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-3087410415589963~5920374428'
  : 'ca-app-pub-3087410415589963~7233456098';

const Playground = () => {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const parent = 'Playground';
  const [today, setToday] = useState(moment('2022-11-21').dayOfYear());

  const [loading, setLoading] = useState(true);
  const {
    DBLoading,
    teams_p,
    getChampion_p,
    getMatchesToday_p,
    todayMatches_p,
    getPendingMatches_p,
    pendingMatches_p,
    getNextMatch_p,
    nextMatch_p,
    matchesPlayed_p,
  } = useApp();
  const navigation = useNavigation();

  useEffect(() => {
    const getCurrentDay = async () => {
      const currentDay = await AsyncStorage.getItem('currentDay');

      if (currentDay) {
        setToday(Number(currentDay));
      }
    };

    getCurrentDay();
  }, []);

  const focusEffect = useCallback(() => {
    setLoading(true);
    getNextMatch_p();
    getPendingMatches_p(today);
    getMatchesToday_p(today);
    setLoading(false);
  }, [today, DBLoading]);

  useFocusEffect(focusEffect);

  const setCurrentDay = async day => {
    await AsyncStorage.setItem('currentDay', day.toString());
    setToday(day);
  };

  const handleMatchesPlayed = () => {
    navigation.navigate('PlayedMatches', {parent: 'Playground'});
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <DateChange setCurrentDay={setCurrentDay} today={today} />
      <ScrollView>
        <ScrollView horizontal={true}>
          {groups.map((group, index) => (
            <Table key={index} teams={teams_p} group={group} />
          ))}
        </ScrollView>
        {nextMatch_p && nextMatch_p.id ? (
          <View style={styles.match}>
            <Text style={styles.titleMatch}>
              {matchesPlayed_p < 48
                ? 'Next Match'
                : matchesPlayed_p < 56
                ? 'Round of 16'
                : matchesPlayed_p < 60
                ? 'Quarter Final'
                : matchesPlayed_p < 62
                ? 'Semi Final'
                : matchesPlayed_p < 63
                ? 'Third place'
                : 'Final'}
            </Text>
            <NextMatch
              nextMatch_p={nextMatch_p}
              pendingMatches={pendingMatches_p}
              todayMatches={todayMatches_p}
              parent={parent}
            />
          </View>
        ) : (
          <Champion getChampion={getChampion_p} />
        )}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          todayMatches_p.length > 0 &&
          matchesPlayed_p < 64 && (
            <View style={styles.match}>
              <Text style={styles.titleMatch}>Today Matches</Text>
              <MatchesDay matchData={todayMatches_p} parent={parent} />
            </View>
          )
        )}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          pendingMatches_p.length > 0 && (
            <View style={styles.match}>
              <Text style={styles.titleMatch}>Pending Matches</Text>
              <MatchesDay matchData={pendingMatches_p} parent={parent} />
            </View>
          )
        )}
        {matchesPlayed_p > 0 && matchesPlayed_p <= 48 && (
          <Pressable onPress={handleMatchesPlayed} style={styles.matchesPlayed}>
            <Text style={globalStyles.textCenter}>Edit Matches Played</Text>
          </Pressable>
        )}
        <Pressable
          onPress={goBack}
          style={[globalStyles.button, globalStyles.primary, styles.btn]}>
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>Go Home</Text>
        </Pressable>
      </ScrollView>
      <View style={globalStyles.ads}>
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

export default Playground;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: '3%',
    marginVertical: '7%',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    bottom: 20,
  },
  container: {
    backgroundColor: '#EEE',
    flex: 1,
  },
  match: {
    backgroundColor: '#FFF',
    padding: 10,
    margin: 8,
    borderRadius: 10,
  },
  matchesPlayed: {
    padding: 5,
  },
  titleMatch: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
    color: '#5a0024',
    fontSize: 18,
  },
});
