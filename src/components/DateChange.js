import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../styles/styles';
import useApp from '../hooks/useApp';

const DateChange = ({setCurrentDay, today}) => {
  const date = moment('2022-01-01').add(today - 1, 'days');

  const {matchesPlayed_p} = useApp();

  const handleChange = type => {
    let limit;
    if (matchesPlayed_p < 48) {
      limit = 325 + Math.floor(matchesPlayed_p / 4);
    } else if (matchesPlayed_p < 56) {
      limit = 342;
    } else if (matchesPlayed_p < 62) {
      limit = 350;
    } else {
      limit = 352;
    }

    const dat = date.dayOfYear();
    if (type === 'add') {
      if (dat >= limit) {
        return;
      } else {
        setCurrentDay(today + 1);
      }
    } else {
      if (dat <= 325) {
        return;
      } else {
        setCurrentDay(today - 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleChange('min')}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#5a0024'}]}
            size={18}
            icon={faAngleLeft}
          />
        </View>
      </Pressable>
      <Text style={styles.date}>{date.format('lll').slice(0, 12)}</Text>
      <Pressable onPress={() => handleChange('add')}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            style={[globalStyles.icon, {color: '#5a0024'}]}
            size={18}
            icon={faAngleRight}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default DateChange;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  date: {
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  icon: {
    padding: 3,
  },
});
