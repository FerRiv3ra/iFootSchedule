import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ThemeContext from '../context/ThemeContext';
import useApp from '../hooks/useApp';
import language from '../helper/translate';
import {calculatePosibility} from '../helper/calculatePosibility';

const Probability = ({shortLocal, shortVisit, long = false}) => {
  const [local, setLocal] = useState({});
  const [visit, setVisit] = useState({});

  const {laLiga, premier, lang} = useApp();
  const {mode} = useContext(ThemeContext);

  useEffect(() => {
    if (mode === 'laLiga') {
      setLocal(laLiga.filter(team => team.short_name === shortLocal)[0]);
      setVisit(laLiga.filter(team => team.short_name === shortVisit)[0]);
    }

    if (mode === 'premier') {
      setLocal(premier.filter(team => team.short_name === shortLocal)[0]);
      setVisit(premier.filter(team => team.short_name === shortVisit)[0]);
    }
  }, []);

  const {posLocal, posVisit, posDraw} = calculatePosibility(
    local.last,
    visit.last,
  );

  return (
    <View
      style={{
        marginBottom: long ? 8 : 3,
      }}>
      {long && (
        <View>
          <Text style={{...styles.title}}>{language[lang].winProbability}</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={{...styles.team, textAlign: 'left'}}>
              {local.name}
            </Text>
            <Text style={{...styles.team, textAlign: 'center'}}>
              {language[lang].draw}
            </Text>
            <Text style={{...styles.team, textAlign: 'right'}}>
              {visit.name}
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: long ? 14 : 11}}>{Math.round(posLocal)}%</Text>
        <Text style={{fontSize: long ? 14 : 11}}>
          {100 - Math.round(posLocal) - Math.round(posVisit)}%
        </Text>
        <Text style={{fontSize: long ? 14 : 11}}>{Math.round(posVisit)}%</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: `${posLocal}%`,
            height: long ? 8 : 3,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            width: `${posDraw}%`,
            height: long ? 8 : 3,
            backgroundColor: 'orange',
          }}
        />
        <View
          style={{
            width: `${posVisit}%`,
            height: long ? 8 : 3,
            backgroundColor: 'blue',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  team: {
    width: '33.3%',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default Probability;
