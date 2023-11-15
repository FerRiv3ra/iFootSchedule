import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';

import TableTeam from './TableTeam';
import useApp from '../hooks/useApp';
import globalStyles from '../theme/styles';
import ThemeContext from '../context/ThemeContext';
import {TeamDBInterface} from '../types';

interface Props {
  group: string;
}

const Table = ({group}: Props) => {
  const [data, setData] = useState<TeamDBInterface[]>([]);

  const {mode} = useContext(ThemeContext);
  const {t} = useTranslation();
  const {teams} = useApp();

  useEffect(() => {
    if (mode === 'UCL') {
      setData(teams.filter(t => t.group === group));
    } else {
      setData(teams);
    }
  }, [teams]);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles[`text-${mode}`]]}>
        {mode === 'UCL'
          ? `${t('Table.group')} ${group}`
          : mode === 'laLiga'
          ? 'La Liga'
          : 'Premier League'}
      </Text>
      <View style={{...styles.containerGroup, ...globalStyles.row}}>
        <Text style={styles.team}>{t('Table.team')}</Text>
        <View style={styles.border}>
          <Text style={styles.column}>{t('Table.mp')}</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>{t('Table.gf')}</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>{t('Table.ga')}</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>{t('Table.gd')}</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.column}>{t('Table.pts')}</Text>
        </View>
      </View>
      {data.map((team, index) => (
        <TableTeam key={index} team={team} index={index} />
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
    marginLeft: 5,
    width: 150,
    color: '#111111',
  },
});
