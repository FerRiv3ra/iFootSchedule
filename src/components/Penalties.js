import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useContext, useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';

import globalStyles from '../theme/styles';
import Penalty from './Penalty';
import useApp from '../hooks/useApp';
import {language} from '../helpers';
import ThemeContext from '../context/ThemeContext';

const Penalties = ({setPenl, setPenv, handleSave}) => {
  const [canSave, setCanSave] = useState(false);
  const [rounds, setRounds] = useState([
    {
      round: 1,
      local: 'p',
      visit: 'p',
    },
    {
      round: 2,
      local: 'p',
      visit: 'p',
    },
    {
      round: 3,
      local: 'p',
      visit: 'p',
    },
    {
      round: 4,
      local: 'p',
      visit: 'p',
    },
    {
      round: 5,
      local: 'p',
      visit: 'p',
    },
  ]);

  const {lang} = useApp();
  const {mode} = useContext(ThemeContext);

  const handleRounds = (round, type, res) => {
    setRounds(
      rounds.map(roundN => {
        if (roundN.round === round.round) {
          roundN[type] = res;
        }

        return roundN;
      }),
    );

    const total = rounds.reduce(
      (complete, roundM) => {
        if (roundM.local !== 'p' && roundM.visit !== 'p') {
          complete.total += 1;
          complete.goll += roundM.local;
          complete.golv += roundM.visit;
        }

        return complete;
      },
      {total: 0, goll: 0, golv: 0},
    );

    if (
      total.total >= 3 &&
      (total.goll - 3 >= total.golv || total.golv - 3 >= total.goll)
    ) {
      setCanSave(true);
    } else if (
      total.total >= 4 &&
      (total.goll - 2 >= total.golv || total.golv - 3 >= total.goll)
    ) {
      setCanSave(true);
    } else if (total.total >= 5 && total.goll !== total.golv) {
      setCanSave(true);

      if (rounds.length > 5) {
        setRounds(rounds.filter(roundM => roundM.round !== rounds.length));
      }
    } else {
      if (
        total.total >= 5 &&
        total.goll === total.golv &&
        round.local !== 'p' &&
        round.visit !== 'p'
      ) {
        setRounds([
          ...rounds,
          {
            round: rounds.length + 1,
            local: 'p',
            visit: 'p',
          },
        ]);
        setCanSave(false);
      }
    }

    setPenl(total.goll);
    setPenv(total.golv);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, globalStyles[`text-${mode}`]]}>
        {language[lang].penalties}
      </Text>
      {rounds.map(round => (
        <Penalty key={round.round} handleRounds={handleRounds} round={round} />
      ))}
      <Pressable
        onPress={handleSave}
        disabled={!canSave}
        style={[
          globalStyles.button,
          styles.btn,
          canSave && globalStyles[`bg-${mode}`],
        ]}>
        <FontAwesomeIcon
          style={[globalStyles.icon, styles.icon]}
          size={14}
          icon={faSave}
        />
        <Text style={styles.textStyle}>{language[lang].save}</Text>
      </Pressable>
    </View>
  );
};

export default Penalties;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: '3%',
    marginVertical: '7%',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#DDD',
    marginVertical: 20,
  },
  container: {
    backgroundColor: '#FFF',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    color: '#FFF',
    marginHorizontal: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
