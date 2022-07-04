import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {heightScale, withScale} from '../helper/scale';
import useApp from '../hooks/useApp';
import SECTIONS from '../helper/selectImg';

const Champion = () => {
  const {getChampion_p} = useApp();
  const [champion, setChampion] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setChampion(getChampion_p());
    setLoading(false);
  }, []);

  if (loading) return <ActivityIndicator animating={loading} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Champion World Cup Qatar 2022</Text>
      <Animatable.View animation="zoomIn" delay={500} duration={3000}>
        <Animatable.Image
          animation="pulse"
          delay={500}
          duration={2000}
          iterationCount="infinite"
          style={styles.logo}
          source={require('../assets/logoWcup.png')}
        />
      </Animatable.View>
      <Animatable.View animation="zoomIn" delay={500} duration={3000}>
        <Animatable.Image
          animation="flash"
          delay={500}
          duration={2000}
          iterationCount="infinite"
          style={styles.logoTeam}
          source={SECTIONS[champion.short_name]?.file}
        />
      </Animatable.View>
      <Animatable.Text
        animation={'rubberBand'}
        duration={3000}
        iterationCount="infinite"
        style={[styles.title, styles.name]}>
        {champion.name}
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
    color: '#5a0024',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
  },
});
