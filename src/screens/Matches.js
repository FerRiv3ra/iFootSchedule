import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import useApp from '../hooks/useApp';
import Table from '../components/Table';
import NextMatch from '../components/NextMatch';
import MatchesDay from '../components/MatchesDay';
import globalStyles from '../styles/styles';
import {useFocusEffect} from '@react-navigation/native';
import Champion from '../components/Champion';
import Knockouts from '../components/Knockouts';
import language from '../helper/translate';
import WaitingDraw from './WaitingDraw';
import ThemeContext from '../context/ThemeContext';
import FooterBannerAd from '../components/FooterBannerAd';

const Matches = ({navigation}) => {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const parent = 'Matches';

  const [loading, setLoading] = useState(true);
  const [playedGames, setPlayedGames] = useState(0);
  const {
    DBLoading,
    getMatchesToday,
    todayMatches,
    getPendingMatches,
    pendingMatches,
    getNextMatch,
    nextMatch,
    matchesPlayed,
    matchesPlayedC,
    lang,
  } = useApp();
  const {mode} = useContext(ThemeContext);

  const totalMatches = mode === 'UCL' ? 125 : 64;

  const focusEffect = useCallback(() => {
    setLoading(true);
    getNextMatch(mode);
    getPendingMatches(mode);
    getMatchesToday(mode);
    if (mode === 'UCL') {
      setPlayedGames(matchesPlayedC);
    } else {
      setPlayedGames(matchesPlayed);
    }
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
        {mode === 'UCL' ? (
          <View style={styles.match}>
            <Text style={[styles.titleMatch, globalStyles[`text-${mode}`]]}>
              {`${language[lang].round16}`}
            </Text>
            <Knockouts />
          </View>
        ) : (
          <ScrollView horizontal>
            <Table group={mode} />
          </ScrollView>
        )}
        {nextMatch && nextMatch._id ? (
          <View style={styles.match}>
            <Text style={[styles.titleMatch, globalStyles[`text-${mode}`]]}>
              {`${language[lang].nextMatch}`}
            </Text>
            <NextMatch
              nextMatch={nextMatch}
              pendingMatches={pendingMatches}
              todayMatches={todayMatches}
              parent={mode}
            />
          </View>
        ) : mode === 'UCL' && !nextMatch ? (
          loading ? (
            <ActivityIndicator animating={loading} />
          ) : (
            <View style={styles.match}>
              <Text style={[styles.waiting, globalStyles[`text-${mode}`]]}>
                {language[lang].waitingDraw}
              </Text>
              <WaitingDraw />
            </View>
          )
        ) : (
          <Champion parent={mode} />
        )}
        {loading ? (
          <ActivityIndicator animating={loading} />
        ) : (
          todayMatches.length > 0 &&
          playedGames < totalMatches && (
            <View style={styles.match}>
              <Text style={[styles.titleMatch, globalStyles[`text-${mode}`]]}>
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
              <Text style={[styles.titleMatch, globalStyles[`text-${mode}`]]}>
                {language[lang].pendingMatches}
              </Text>
              <MatchesDay matchData={pendingMatches} parent={parent} />
            </View>
          )
        )}
        {playedGames > 0 && !!nextMatch && (
          <Pressable onPress={handleMatchesPlayed} style={styles.matchesPlayed}>
            <Text style={[globalStyles.textCenter, {color: '#111111'}]}>
              {language[lang].editPlayed}
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={goBack}
          style={[globalStyles.button, globalStyles[`bg-${mode}`], styles.btn]}>
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
            {language[lang].goHome}
          </Text>
        </Pressable>
      </ScrollView>
      <FooterBannerAd />
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
  waiting: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 14,
  },
});
