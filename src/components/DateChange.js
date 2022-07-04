import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../styles/styles';

const DateChange = ({setToday, today}) => {
  const date = moment('2022-01-01').add(today - 1, 'days');

  const handleChange = type => {
    // Max 352
    // Min 325
    const dat = date.dayOfYear();
    if (type === 'add') {
      if (dat >= 352) {
        return;
      } else {
        setToday(today + 1);
      }
    } else {
      if (dat <= 325) {
        return;
      } else {
        setToday(today - 1);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleChange('min')}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#5a0024'}]}
          size={18}
          icon={faMinusCircle}
        />
      </Pressable>
      <Text style={styles.date}>{date.format('lll').slice(0, 12)}</Text>
      <Pressable onPress={() => handleChange('add')}>
        <FontAwesomeIcon
          style={[globalStyles.icon, {color: '#5a0024'}]}
          size={18}
          icon={faPlusCircle}
        />
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
});
