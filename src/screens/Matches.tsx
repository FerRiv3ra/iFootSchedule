import {Text, View, SafeAreaView, ScrollView, Pressable} from 'react-native';
import React from 'react';

import {useTranslation} from 'react-i18next';

import Table from '../components/Table';
import globalStyles from '../theme/styles';
import Knockouts from '../components/Knockouts';
import FooterBannerAd from '../components/FooterBannerAd';
import {useMatches} from '../hooks/useMatches';
import {matchStyles} from '../theme/matchStyles';
import {MatchesCard} from '../components/MatchesCard';

const Matches = () => {
  const {
    loading,
    playedGames,
    nextMatch,
    totalMatches,
    mode,
    todayMatches,
    pendingMatches,
    handleMatchesPlayed,
    goBack,
    getComponent,
  } = useMatches();
  const {t} = useTranslation();

  return (
    <SafeAreaView style={matchStyles.container}>
      <ScrollView>
        {mode === 'UCL' ? (
          <View style={matchStyles.match}>
            <Text
              style={[matchStyles.titleMatch, globalStyles[`text-${mode}`]]}>
              {`${t('Match.round16')}`}
            </Text>
            <Knockouts />
          </View>
        ) : (
          <ScrollView horizontal>
            <Table group={mode} />
          </ScrollView>
        )}

        {getComponent(mode, loading, nextMatch)}

        {todayMatches.length > 0 && playedGames < totalMatches && (
          <MatchesCard
            title={t('Match.todayMatches')}
            matchData={todayMatches}
            loading={loading}
          />
        )}
        {pendingMatches.length > 0 && (
          <MatchesCard
            title={t('Match.pendingMatches')}
            matchData={pendingMatches}
            loading={loading}
          />
        )}
        {playedGames > 0 && !!nextMatch && (
          <Pressable
            onPress={handleMatchesPlayed}
            style={matchStyles.matchesPlayed}>
            <Text style={[globalStyles.textCenter, {color: '#111111'}]}>
              {t('Match.editPlayed')}
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={goBack}
          style={[
            globalStyles.button,
            globalStyles[`bg-${mode}`],
            matchStyles.btn,
          ]}>
          <Text style={[globalStyles.textBtn, {color: '#FFF'}]}>
            {t('Match.goHome')}
          </Text>
        </Pressable>
      </ScrollView>
      <FooterBannerAd />
    </SafeAreaView>
  );
};

export default Matches;
