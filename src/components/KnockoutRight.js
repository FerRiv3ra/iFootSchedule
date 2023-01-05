import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import globalStyles from '../styles/styles';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';

const KnockoutRight = ({match, utc}) => {
  const [ko, setKo] = useState({local: false, visit: false});

  const {mode} = useContext(ThemeContext);

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
      <View>
        <View style={styles.containerMatch}>
          <Text style={styles.team}>{match.local}</Text>
          <Image
            style={[styles.logoTeam, ko.local && styles.KO]}
            source={SECTIONS[mode][match.local]?.file}
          />
          <Image
            style={[styles.logoTeam, styles.duplicate]}
            source={SECTIONS[mode][match.local]?.file}
          />
        </View>
        <View style={styles.containerMatch}>
          <Text style={styles.team}>{match.visit}</Text>
          <Image
            style={[styles.logoTeam, ko.visit && styles.KO]}
            source={SECTIONS[mode][match.visit]?.file}
          />
          <Image
            style={[styles.logoTeam, styles.duplicate]}
            source={SECTIONS[mode][match.visit]?.file}
          />
        </View>
      </View>
    </View>
  );
};

export default KnockoutRight;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#EEE',
    padding: 8,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    alignItems: 'flex-end',
  },
  containerMatch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  date: {
    flex: 1,
    alignSelf: 'center',
    marginRight: 15,
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
    position: 'relative',
    right: 0,
  },
  icon: {
    color: '#47a861',
  },
  iconContainer: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  KO: {
    tintColor: 'gray',
  },
});

// container: {
//   borderTopWidth: 1,
//   borderTopColor: '#DDD',
//   alignItems: 'flex-end',
//   paddingRight: 3,
// },

// logoTeam: {
//   width: 20,
//   height: 20,
//   marginVertical: 5,
//   marginHorizontal: 10,
//   position: 'relative',
//   right: 0,
// },
// KO: {
//   tintColor: 'gray',
// },
