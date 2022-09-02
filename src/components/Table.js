import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TableTeam from './TableTeam';
import useApp from '../hooks/useApp';
import language from '../helper/translate';
import globalStyles from '../styles/styles';

const Table = ({teams, group}) => {
  const data = teams.filter(team => team.group === group);

  const {lang, uiMode} = useApp();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles[`text-${uiMode}`]]}>
        {language[lang].group} {group}
      </Text>
      <View style={styles.containerGroup}>
        <Text style={styles.team}>{language[lang].team}</Text>
        <View style={styles.border}>
          <Text style={styles.column}>{language[lang].mp}</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>GF</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>{language[lang].ga}</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>{language[lang].gd}</Text>
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
    color: '#111111',
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 18,
  },
  team: {
    fontWeight: '800',
    height: 'auto',
    marginTop: 2,
    width: 150,
    color: '#111111',
  },
});
