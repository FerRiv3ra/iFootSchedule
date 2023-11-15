import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

import ThemeContext from '../context/ThemeContext';
import {TeamDBInterface} from '../types';
import globalStyles from '../theme/styles';

interface Props {
  team: TeamDBInterface;
  index: number;
}

const TableTeam = ({team, index}: Props) => {
  const {name, p, gf, ga, gd, pts} = team;

  const {mode} = useContext(ThemeContext);

  const borderLeftColor =
    mode === 'UCL'
      ? 'white'
      : index < 4
      ? 'blue'
      : index < 5
      ? 'orange'
      : index < 6 && mode === 'laLiga'
      ? 'green'
      : index < 17
      ? 'white'
      : 'red';

  return (
    <View style={{...styles.container, borderLeftColor, ...globalStyles.row}}>
      <Text style={styles.team}>{name}</Text>
      <View style={styles.border}>
        <Text style={styles.column}>{p}</Text>
      </View>
      <View style={styles.border}>
        <Text style={styles.column}>{gf}</Text>
      </View>
      <View style={styles.border}>
        <Text style={styles.column}>{ga}</Text>
      </View>
      <View style={styles.border}>
        <Text style={styles.column}>{gd}</Text>
      </View>
      <View style={styles.border}>
        <Text style={styles.column}>{pts}</Text>
      </View>
    </View>
  );
};

export default TableTeam;

const styles = StyleSheet.create({
  border: {
    borderLeftWidth: 1,
    borderLeftColor: '#DDD',
  },
  container: {
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingLeft: 3,
    borderLeftWidth: 2,
  },
  column: {
    fontWeight: '600',
    height: 'auto',
    marginTop: 2,
    width: 35,
    textAlign: 'center',
    color: '#111111',
  },
  team: {
    height: 'auto',
    marginTop: 2,
    width: 150,
    color: '#111111',
  },
});
