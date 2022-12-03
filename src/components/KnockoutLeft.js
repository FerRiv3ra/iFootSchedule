import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import globalStyles from '../styles/styles';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';

const KnockoutLeft = ({match, utc}) => {
  const [ko, setKo] = useState({local: false, visit: false});

  useEffect(() => {
    if (match.played) {
      if (match.goll + match.penl > match.golv + match.penv) {
        setKo({
          local: false,
          visit: true,
        });
      } else {
        setKo({
          local: true,
          visit: false,
        });
      }
    }
  }, [match]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.containerMatch}>
          <Image
            style={[styles.logoTeam, ko.local && styles.KO]}
            source={SECTIONS[match.local]?.file}
          />
          <Image
            style={[styles.logoTeam, styles.duplicate]}
            source={SECTIONS[match.local]?.file}
          />
          <Text style={styles.team}>{match.local}</Text>
        </View>
        <View style={styles.containerMatch}>
          <Image
            style={[styles.logoTeam, ko.visit && styles.KO]}
            source={SECTIONS[match.visit]?.file}
          />
          <Image
            style={[styles.logoTeam, styles.duplicate]}
            source={SECTIONS[match.visit]?.file}
          />
          <Text style={styles.team}>{match.visit}</Text>
        </View>
      </View>
      <View style={styles.date}>
        {match.played ? (
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              style={[globalStyles.icon, styles.icon]}
              size={18}
              icon={faCheckCircle}
            />
          </View>
        ) : (
          <View style={styles.badge}>
            <Text style={styles.textDate}>
              {moment(match.date).utc(utc).toLocaleString().slice(4, 10)}
            </Text>
            <Text style={styles.textDate}>
              {moment(match.date).utc(utc).toLocaleString().slice(16, 21)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default KnockoutLeft;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#EEE',
    padding: 8,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    alignItems: 'flex-start',
  },
  containerMatch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    alignSelf: 'center',
    marginLeft: 15,
  },
  textDate: {
    fontSize: 10,
    textAlign: 'center',
  },
  duplicate: {
    position: 'absolute',
    opacity: 0.2,
  },
  logoTeam: {
    width: 20,
    height: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  icon: {
    color: '#47a861',
  },
  iconContainer: {
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  KO: {
    tintColor: 'gray',
  },
});
