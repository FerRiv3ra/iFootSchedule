import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import {getImage} from '../helpers';
import ThemeContext from '../context/ThemeContext';
import globalStyles from '../theme/styles';
import {MatchDBInterface} from '../types';

type MatchType = 'local' | 'visit';

interface Props {
  match: MatchDBInterface;
  goles: number;
  type: MatchType;
  handleGol: (team: MatchType, type: 'add' | 'sub') => void;
}

export const MatchTeam = ({match, goles, type, handleGol}: Props) => {
  const {mode} = useContext(ThemeContext);

  return (
    <View>
      <Image
        style={styles.logoTeam}
        source={getImage(mode, type === 'local' ? match.local : match.visit)}
      />
      <View style={{...styles.match, ...globalStyles.row}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleGol(type, 'sub')}>
          <View style={styles.btnContainer}>
            <FontAwesomeIcon
              style={{
                ...globalStyles.icon,
                ...globalStyles[`text-${mode}`],
              }}
              size={18}
              icon={faMinusCircle}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.goals}>{goles}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleGol(type, 'add')}>
          <View style={styles.btnContainer}>
            <FontAwesomeIcon
              style={{
                ...globalStyles.icon,
                ...globalStyles[`text-${mode}`],
              }}
              size={18}
              icon={faPlusCircle}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    padding: 5,
  },
  goals: {
    borderColor: '#EEE',
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
    color: '#111111',
  },
  logoTeam: {
    width: 80,
    height: 80,
    margin: 10,
  },
  match: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
