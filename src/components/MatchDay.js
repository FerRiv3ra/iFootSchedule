import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../styles/styles';

const MatchDay = ({match, parent, editing}) => {
  const [utc, setUtc] = useState('+00:00');
  const {local, visit, date} = match;

  const navigator = useNavigation();

  useEffect(() => {
    const getUTC = async () => {
      const utcStg = await AsyncStorage.getItem('UTC');

      if (utcStg) {
        setUtc(utcStg);
      }
    };

    getUTC();
  }, []);

  const handleEdit = () => {
    navigator.navigate('Match', {match, parent, editing});
  };

  return (
    <Pressable disabled={!editing} onPress={handleEdit}>
      <View style={styles.container}>
        <Text style={styles.text}>{local}</Text>
        <Image style={styles.logoTeam} source={SECTIONS[local]?.file} />
        <Text style={styles.hour}>
          {match.played
            ? `${match.goll} - ${match.golv}`
            : `${moment(date).utcOffset(utc).hours()}:00`}
        </Text>
        <Image style={styles.logoTeam} source={SECTIONS[visit]?.file} />
        <Text style={styles.text}>{visit}</Text>
        {editing && (
          <FontAwesomeIcon
            style={[globalStyles.icon, styles.icon]}
            size={18}
            icon={faAngleRight}
          />
        )}
      </View>
    </Pressable>
  );
};

export default MatchDay;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  logoTeam: {
    width: 20,
    height: 20,
    margin: 5,
  },
  hour: {
    textAlign: 'center',
    width: 80,
  },
  text: {
    width: 40,
    marginHorizontal: 5,
  },
  icon: {
    color: '#555',
    position: 'absolute',
    right: 10,
  },
});
