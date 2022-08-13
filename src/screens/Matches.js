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
import React, {useCallback, useState} from 'react';
import useApp from '../hooks/useApp';
import Table from '../components/Table';
import NextMatch from '../components/NextMatch';
import moment from 'moment';
import MatchesDay from '../components/MatchesDay';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import globalStyles from '../styles/styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Champion from '../components/Champion';
import Knockouts from '../components/Knockouts';
import language from '../helper/translate';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-3087410415589963/6846729662'
  : 'ca-app-pub-3087410415589963/7165846759';

const Matches = () => {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const parent = 'Matches';
  const today = moment().dayOfYear();

  const [loading, setLoading] = useState(true);
  const {
    DBLoading,
    teams,
    getMatchesToday,
    todayMatches,
    getPendingMatches,
    pendingMatches,
    getNextMatch,
    nextMatch,
    getChampion,
    matchesPlayed,
    matches,
    lang,
  } = useApp();
  const navigation = useNavigation();

  const focusEffect = useCallback(() => {
    setLoading(true);
    getNextMatch();
    getPendingMatches(today);
    getMatchesToday(today);
    setLoading(false);
  }, [DBLoading]);

  useFocusEffect(focusEffect);

  const handleMatchesPlayed = () => {
    navigation.navigate('PlayedMatches', {parent: 'Matches'});
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {matchesPlayed >= 48 ? (
          <View style={styles.match}>
            <Text style={styles.titleMatch}>
              {matchesPlayed < 56
                ? `${language[lang].round16}`
                : matchesPlayed < 60
                ? `${language[lang].quarter}`
                : matchesPlayed < 62
                ? 'Semi Final'
                : 'Final'}
            </Text>
            <Knockouts data={matches} matchesPlayed={matchesPlayed} />
          </View>
        ) : (
          <ScrollView horizontal={true}>
            {groups.map((group, index) => (
              <Table key={index} teams={teams} group={group} />
            ))}
          </ScrollView>
        )}
        {nextMatch && nextMatch.id ? (
          <View style={styles.match}>
            <Text style={styles.titleMatch}>
              {matchesPlayed < 48
                ? `${language[lang].nextMatch}`
                : matchesPlayed < 56
                ? `${language[lang].round16}`
                : matchesPlayed < 60
                ? `${language[lang].quarter}`
                : matchesPlayed < 62
                ? 'Semi Final'
                : matchesPlayed < 63
                ? `${language[lang].thirdPlace}`
                : 'Final'}
            </Text>
            <NextMatch
              nextMatch_p={nextMatch}
              pendingMatches={pendingMatches}
              todayMatches={todayMatches}
              parent={parent}
            />
          </View>
        ) : (
          <Champion getChampion={getChampion} />
        )}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          todayMatches.length > 0 &&
          matchesPlayed < 64 && (
            <View style={styles.match}>
              <Text style={styles.titleMatch}>
                {language[lang].todayMatches}
              </Text>
              <MatchesDay matchData={todayMatches} parent={parent} />
            </View>
          )
        )}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          pendingMatches.length > 0 && (
            <View style={styles.match}>
              <Text style={styles.titleMatch}>
                {language[lang].pendingMatches}
              </Text>
              <MatchesDay matchData={pendingMatches} parent={parent} />
            </View>
          )
        )}
        {matchesPlayed > 0 && matchesPlayed <= 48 && (
          <Pressable onPress={handleMatchesPlayed} style={styles.matchesPlayed}>
            <Text style={globalStyles.textCenter}>
              {language[lang].editPlayed}
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={goBack}
          style={[globalStyles.button, globalStyles.primary, styles.btn]}>
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
            {language[lang].goHome}
          </Text>
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

export default Matches;

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
