import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import useApp from '../hooks/useApp';
import MatchesDay from '../components/MatchesDay';
import globalStyles from '../theme/styles';
import {useNavigation} from '@react-navigation/native';
import language from '../helper/translate';
import ThemeContext from '../context/ThemeContext';
import FooterBannerAd from '../components/FooterBannerAd';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../types/navigator';

interface Props extends StackScreenProps<RootStackParams, 'PlayedMatches'> {}

const PlayedMatches = ({route}: Props) => {
  // TODO: Finalizar esta pantalla
  const {parent} = route.params;

  const [dataMatches, setDataMatches] = useState([]);

  const {matchesC, laLigaMatches, premierMatches, DBLoading, lang} = useApp();
  const {mode} = useContext(ThemeContext);

  const navigation = useNavigation();

  useEffect(() => {
    if (mode === 'laLiga') {
      setDataMatches(laLigaMatches.filter(match => match.played));
    } else if (mode === 'UCL') {
      setDataMatches(matchesC.filter(match => match.played));
    } else {
      setDataMatches(premierMatches.filter(match => match.played));
    }
  }, [DBLoading]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={[styles.titleMatch, globalStyles[`text-${mode}`]]}>
              {language[lang].matchPlayed}
            </Text>
            <MatchesDay
              matchData={dataMatches}
              parent={parent}
              editing={true}
            />
          </View>
          <Pressable
            onPress={goBack}
            style={[
              globalStyles.button,
              globalStyles[`bg-${mode}`],
              styles.btn,
            ]}>
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
              {language[lang].goBack}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
      <FooterBannerAd />
    </View>
  );
};

export default PlayedMatches;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: 5,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 80,
    marginTop: 10,
  },
  container: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    margin: 5,
    fontSize: 12,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  titleMatch: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 18,
    padding: 5,
  },
});