import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import * as Animatable from 'react-native-animatable';
import {useTranslation} from 'react-i18next';

import {heightScale, withScale} from '../helpers';
import useApp from '../hooks/useApp';
import globalStyles from '../theme/styles';
import ThemeContext from '../context/ThemeContext';
import {ChampTeamDBInterface, TeamDBInterface, MatchMode} from '../types';
import {getImage, getTitle} from '../helpers';

interface Props {
  parent: MatchMode;
}

const Champion = ({parent}: Props) => {
  const [champion, setChampion] = useState<
    TeamDBInterface | ChampTeamDBInterface
  >();
  const [loading, setLoading] = useState(true);

  const {getChampion} = useApp();
  const {t} = useTranslation();
  const {mode} = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    setChampion(getChampion(parent));
    setLoading(false);
  }, []);

  if (loading) return <ActivityIndicator animating={loading} />;

  console.log(champion);
  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles[`text-${mode}`]]}>
        {`${t('UI.championMessage')} ${getTitle('trophy', mode)}`}
      </Text>
      <Animatable.View animation="zoomIn" delay={500} duration={3000}>
        <Animatable.Image
          animation="pulse"
          delay={500}
          duration={2000}
          iterationCount="infinite"
          style={styles.logo}
          source={getImage('trophy', mode)}
        />
      </Animatable.View>
      <Animatable.View animation="zoomIn" delay={500} duration={3000}>
        <Animatable.Image
          animation="flash"
          delay={500}
          duration={2000}
          iterationCount="infinite"
          style={styles.logoTeam}
          source={getImage(mode, champion?.short_name!)}
        />
      </Animatable.View>
      <Animatable.Text
        animation={'rubberBand'}
        duration={3000}
        iterationCount="infinite"
        style={[styles.title, globalStyles[`text-${mode}`], styles.name]}>
        {champion?.name}
      </Animatable.Text>
    </View>
  );
};

export default Champion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    height: heightScale(120),
    width: withScale(75),
    alignSelf: 'center',
    position: 'relative',
    top: 10,
  },
  logoTeam: {
    width: 180,
    height: 180,
    margin: 30,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
  },
});
