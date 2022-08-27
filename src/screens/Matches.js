import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import useApp from '../hooks/useApp';
import Table from '../components/Table';
import NextMatch from '../components/NextMatch';
import moment from 'moment';
import MatchesDay from '../components/MatchesDay';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import globalStyles from '../styles/styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Champion from '../components/Champion';
import Knockouts from '../components/Knockouts';
import language from '../helper/translate';
import {adUnit} from '../helper/adUnit';

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
    uiMode,
  } = useApp();
  const navigation = useNavigation();

  const limitGroups = uiMode === 'UCL' ? 96 : 48;
  const limitRound16 = uiMode === 'UCL' ? 112 : 56;
  const limitQuarter = uiMode === 'UCL' ? 120 : 60;
  const limitSemis = uiMode === 'UCL' ? 124 : 62;
  const totalMatches = uiMode === 'UCL' ? 125 : 64;

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
        {matchesPlayed >= limitGroups ? (
          <View style={styles.match}>
            <Text style={[styles.titleMatch, globalStyles[`text-${uiMode}`]]}>
              {matchesPlayed < limitRound16
                ? `${language[lang].round16}`
                : matchesPlayed < limitQuarter
                ? `${language[lang].quarter}`
                : matchesPlayed < limitSemis
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
            <Text style={[styles.titleMatch, globalStyles[`text-${uiMode}`]]}>
              {matchesPlayed < limitGroups
                ? `${language[lang].nextMatch}`
                : matchesPlayed < limitRound16
                ? `${language[lang].round16}`
                : matchesPlayed < limitQuarter
                ? `${language[lang].quarter}`
                : matchesPlayed < limitSemis
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
          matchesPlayed < totalMatches && (
            <View style={styles.match}>
              <Text style={[styles.titleMatch, globalStyles[`text-${uiMode}`]]}>
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
              <Text style={[styles.titleMatch, globalStyles[`text-${uiMode}`]]}>
                {language[lang].pendingMatches}
              </Text>
              <MatchesDay matchData={pendingMatches} parent={parent} />
            </View>
          )
        )}
        {matchesPlayed > 0 && matchesPlayed < limitGroups && (
          <Pressable onPress={handleMatchesPlayed} style={styles.matchesPlayed}>
            <Text style={globalStyles.textCenter}>
              {language[lang].editPlayed}
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={goBack}
          style={[
            globalStyles.button,
            globalStyles[`bg-${uiMode}`],
            styles.btn,
          ]}>
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
            {language[lang].goHome}
          </Text>
        </Pressable>
      </ScrollView>
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
    fontSize: 18,
  },
});
