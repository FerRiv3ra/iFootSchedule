import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import globalStyles from '../theme/styles';
import {MatchDBInterface} from '../types';
import {KnockoutImage} from './KnockoutImage';
import {KnockoutName} from './KnockoutName';
import {useKnockoutSide} from '../hooks/useKnockoutSide';

interface Props {
  match: MatchDBInterface;
  utc: string;
  left?: boolean;
}

const KnockoutSide = ({match, utc, left = false}: Props) => {
  const {ko, mode, prevMatch} = useKnockoutSide(match);
  const flexDirection = left ? 'row' : 'row-reverse';

  return (
    <View
      style={{
        ...styles.container,
        alignItems: left ? 'flex-start' : 'flex-end',
        flexDirection,
      }}>
      <View>
        <View
          style={{
            ...styles.containerMatch,
            flexDirection,
          }}>
          <KnockoutImage mode={mode} match={match} ko={ko.local} local />
          <KnockoutName match={match} prevMatch={prevMatch} left={left} local />
        </View>
        <View
          style={{
            ...styles.containerMatch,
            flexDirection,
          }}>
          <KnockoutImage mode={mode} match={match} ko={ko.visit} />
          <KnockoutName match={match} prevMatch={prevMatch} left={left} />
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
              style={globalStyles.icon}
              size={18}
              color="#47A861"
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
              {moment(match.date).utcOffset(utc).toLocaleString().slice(4, 10)}
            </Text>
            <Text style={styles.textDate}>
              {moment(match.date).utcOffset(utc).toLocaleString().slice(16, 21)}
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
  iconContainer: {
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
});
