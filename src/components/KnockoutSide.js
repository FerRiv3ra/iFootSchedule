import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import globalStyles from '../styles/styles';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';
import useApp from '../hooks/useApp';

const KnockoutSide = ({match, utc, left = false}) => {
  const [ko, setKo] = useState({local: false, visit: false});
  const [prevMatch, setPrevMatch] = useState({});

  const {mode} = useContext(ThemeContext);
  const {matchesPlayedC, matchesC} = useApp();

  useEffect(() => {
    setPrevMatch(matchesC.filter(m => match.visit === m.local)[0]);

    if (match.played && matchesPlayedC > 8) {
      if (
        match.goll + match.penl + prevMatch.golv >
        match.golv + match.penv + prevMatch.goll
      ) {
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
    <View
      style={{
        ...styles.container,
        alignItems: left ? 'flex-start' : 'flex-end',
        flexDirection: left ? 'row' : 'row-reverse',
      }}>
      <View>
        <View
          style={{
            ...styles.containerMatch,
            flexDirection: left ? 'row' : 'row-reverse',
          }}>
          <Image
            style={[styles.logoTeam, ko.local && styles.KO]}
            source={SECTIONS[mode][match.local]?.file}
          />
          <Image
            style={[styles.logoTeam, styles.duplicate]}
            source={SECTIONS[mode][match.local]?.file}
          />
          <Text>
            {(match.played || !!prevMatch) && !left && (
              <Text style={{fontSize: 10}}>
                ({match.goll + prevMatch.golv || 0}){' '}
              </Text>
            )}
            {match.local}
            {(match.played || !!prevMatch) && left && (
              <Text style={{fontSize: 10}}>
                {' '}
                ({match.goll + prevMatch.golv || 0})
              </Text>
            )}
          </Text>
        </View>
        <View
          style={{
            ...styles.containerMatch,
            flexDirection: left ? 'row' : 'row-reverse',
          }}>
          <Image
            style={[styles.logoTeam, ko.visit && styles.KO]}
            source={SECTIONS[mode][match.visit]?.file}
          />
          <Image
            style={[styles.logoTeam, styles.duplicate]}
            source={SECTIONS[mode][match.visit]?.file}
          />
          <Text>
            {(match.played || !!prevMatch) && !left && (
              <Text style={{fontSize: 10}}>
                ({match.golv + prevMatch.goll || 0}){' '}
              </Text>
            )}
            {match.visit}
            {(match.played || !!prevMatch) && left && (
              <Text style={{fontSize: 10}}>
                {' '}
                ({match.golv + prevMatch.goll || 0})
              </Text>
            )}
          </Text>
        </View>
      </View>
      <View
        style={{
          ...styles.date,
          marginLeft: left ? 15 : 0,
          marginRight: left ? 0 : 15,
        }}>
        {match.played ? (
          <View style={styles.iconContainer}>
            <FontAwesomeIcon
              style={[globalStyles.icon, styles.icon]}
              size={18}
              icon={faCheckCircle}
            />
          </View>
        ) : (
          <View
            style={{
              ...styles.badge,
              alignSelf: left ? 'flex-start' : 'flex-end',
            }}>
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

export default KnockoutSide;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#EEE',
    padding: 8,
    borderRadius: 50,
  },
  container: {
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  containerMatch: {
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
