import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import useApp from '../hooks/useApp';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';

const NextMatch = () => {
  const [loading, setLoading] = useState(true);
  const {getNextMatch_p, nextMatch_p} = useApp();

  useEffect(() => {
    setLoading(true);
    getNextMatch_p();
    setLoading(false);
  }, []);

  // TODO: Agregar zona horaria a almacenamiento
  const date = moment(nextMatch_p.dat).utcOffset(0);

  return (
    <View>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <View>
          <View style={styles.container}>
            <Text style={styles.team}>{nextMatch_p.local}</Text>
            <Image
              style={styles.logoTeam}
              source={SECTIONS[nextMatch_p.local]?.file}
            />
            <Text>VRS</Text>
            <Image
              style={styles.logoTeam}
              source={SECTIONS[nextMatch_p.visit]?.file}
            />
            <Text style={styles.team}>{nextMatch_p.visit}</Text>
          </View>
          <Text style={styles.date}>{date.format('lll')}</Text>
        </View>
      )}
    </View>
  );
};

export default NextMatch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logoTeam: {
    width: 40,
    height: 40,
    margin: 10,
  },
  team: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    textAlign: 'center',
    fontSize: 16,
  },
});
