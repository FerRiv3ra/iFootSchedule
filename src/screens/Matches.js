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

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-3087410415589963~5920374428'
  : 'ca-app-pub-3087410415589963~7233456098';

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
    matchesPlayed,
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

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ScrollView horizontal={true}>
          {groups.map((group, index) => (
            <Table key={index} teams={teams} group={group} />
          ))}
        </ScrollView>
        {nextMatch.id ? (
          <View style={styles.match}>
            <Text style={styles.titleMatch}>
              {matchesPlayed < 48
                ? 'Next Match'
                : matchesPlayed < 56
                ? 'Round 16'
                : matchesPlayed < 60
                ? 'Quarter Final'
                : matchesPlayed < 62
                ? 'Semi Final'
                : matchesPlayed < 63
                ? 'Third place'
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
          <Champion />
        )}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          todayMatches.length > 0 &&
          matchesPlayed < 64 && (
            <View style={styles.match}>
              <Text style={styles.titleMatch}>Today Matches</Text>
              <MatchesDay todayMatches_p={todayMatches} parent={parent} />
            </View>
          )
        )}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          pendingMatches.length > 0 && (
            <View style={styles.match}>
              <Text style={styles.titleMatch}>Pending Matches</Text>
              <MatchesDay
                pendingMatches_p={pendingMatches}
                parent={parent}
                pending={true}
              />
            </View>
          )
        )}
        <Pressable
          onPress={goBack}
          style={[globalStyles.button, globalStyles.primary, styles.btn]}>
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>Go Home</Text>
        </Pressable>
      </ScrollView>
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

export default Matches;

const styles = StyleSheet.create({
  ads: {
    position: 'absolute',
    bottom: 0,
  },
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
  titleMatch: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
    color: '#5a0024',
    fontSize: 18,
  },
});
