import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

import useApp from '../hooks/useApp';
import MatchesDay from '../components/MatchesDay';
import globalStyles from '../styles/styles';
import {useNavigation} from '@react-navigation/native';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-3087410415589963/6846729662'
  : 'ca-app-pub-3087410415589963/7165846759';

const PlayedMatches = ({route}) => {
  const {parent} = route.params;

  const {matches, matches_p, DBLoading} = useApp();
  const [dataMatches, setDataMatches] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (parent === 'Playground') {
      setDataMatches(matches_p.filter(match => match.id <= 48 && match.played));
    } else {
      setDataMatches(matches.filter(match => match.id <= 48 && match.played));
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
            <Text style={styles.titleMatch}>Matches Played</Text>
            <MatchesDay
              matchData={dataMatches}
              parent={parent}
              editing={true}
            />
          </View>

          <Text style={styles.info}>
            * You can edit before distributing round of 16.
          </Text>
          <Pressable
            onPress={goBack}
            style={[globalStyles.button, globalStyles.primary, styles.btn]}>
            <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>Go Back</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
      <View style={globalStyles.ads}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
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
    color: '#5a0024',
    fontSize: 18,
    padding: 5,
  },
});
