import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TableTeam = ({team}) => {
  const {name, p, gf, ga, gd, pts} = team;
  return (
    <View style={styles.container}>
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
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
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
