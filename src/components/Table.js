import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TableTeam from './TableTeam';

const Table = ({teams, group}) => {
  const data = teams.filter(team => team.gr === group);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group {group}</Text>
      <View style={styles.containerGroup}>
        <Text style={styles.team}>TEAM</Text>
        <View style={styles.border}>
          <Text style={styles.column}>MP</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>GF</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>GA</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>GD</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>Pts</Text>
        </View>
      </View>
      {data.map((team, index) => (
        <TableTeam key={index} team={team} />
      ))}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  border: {
    borderLeftWidth: 1,
    borderLeftColor: '#DDD',
  },
  container: {
    backgroundColor: '#FFF',
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
  },
  containerGroup: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  column: {
    fontWeight: '800',
    height: 'auto',
    marginTop: 2,
    width: 35,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
    color: '#5a0024',
    fontSize: 18,
  },
  team: {
    fontWeight: '800',
    height: 'auto',
    marginTop: 2,
    width: 150,
  },
});
