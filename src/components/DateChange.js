import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../theme/styles';
import useApp from '../hooks/useApp';
import language from '../helpers';
import ThemeContext from '../context/ThemeContext';

const DateChange = ({setCurrentDay, today}) => {
  const date = moment('2022-01-01').add(today - 1, 'days');

  const {matchesPlayed_p, lang} = useApp();
  const {mode} = useContext(ThemeContext);

  const handleChange = type => {
    let limit;
    if (matchesPlayed_p < 48) {
      limit = 325 + Math.floor(matchesPlayed_p / 4);
    } else if (matchesPlayed_p < 56) {
      limit = 313 + Math.floor(matchesPlayed_p / 2);
    } else if (matchesPlayed_p < 60) {
      limit = 315 + Math.floor(matchesPlayed_p / 2);
    } else if (matchesPlayed_p < 62) {
      limit = 287 + matchesPlayed_p;
    } else if (matchesPlayed_p < 63) {
      limit = 351;
    } else {
      limit = 352;
    }

    const dat = date.dayOfYear();
    if (type === 'add') {
      if (dat >= limit) {
        Alert.alert(language[lang].info, `${language[lang].errorChangeDay}`);
        return;
      } else {
        setCurrentDay(today + 1);
      }
    } else {
      if (dat <= 324) {
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
            style={[globalStyles.icon, globalStyles[`text-${mode}`]]}
            size={18}
            icon={faAngleLeft}
          />
        </View>
      </Pressable>
      <Text style={styles.date}>{date.format('lll').slice(0, 12)}</Text>
      <Pressable onPress={() => handleChange('add')}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            style={[globalStyles.icon, globalStyles[`text-${mode}`]]}
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
    color: '#111111',
  },
  icon: {
    padding: 3,
  },
});
