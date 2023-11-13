import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';

import globalStyles from '../theme/styles';
import {RoundType} from '../hooks/usePenalties';

interface Props {
  handleRounds: (round: RoundType, type: 'local' | 'visit', res: 0 | 1) => void;
  round: RoundType;
}

const Penalty = ({handleRounds, round}: Props) => {
  const [penl, setPenl] = useState(0);
  const [penv, setPenv] = useState(0);

  const {t} = useTranslation();

  const handlePressL = () => {
    if (penl <= 0) {
      setPenl(1);
      handleRounds(round, 'local', 1);
    } else {
      setPenl(-1);
      handleRounds(round, 'local', 0);
    }
  };
  const handlePressV = () => {
    if (penv <= 0) {
      setPenv(1);
      handleRounds(round, 'visit', 1);
    } else {
      setPenv(-1);
      handleRounds(round, 'visit', 0);
    }
  };

  return (
    <View style={{...styles.buttons, ...globalStyles.row}}>
      <Pressable onPress={handlePressL}>
        <FontAwesomeIcon
          style={[
            globalStyles.icon,
            penl === 0
              ? styles.icon
              : penl === -1
              ? styles.fail
              : styles.success,
          ]}
          size={20}
          icon={faCircle}
        />
      </Pressable>
      <Text>
        {t('UI.round')} {round.round}
      </Text>
      <Pressable onPress={handlePressV}>
        <FontAwesomeIcon
          style={[
            globalStyles.icon,
            penv === 0
              ? styles.icon
              : penv === -1
              ? styles.fail
              : styles.success,
          ]}
          size={20}
          icon={faCircle}
        />
      </Pressable>
    </View>
  );
};

export default Penalty;

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },
  icon: {
    color: '#DDD',
    marginHorizontal: 5,
  },
  fail: {
    color: '#FF0000',
    marginHorizontal: 5,
  },
  success: {
    color: '#00FF00',
    marginHorizontal: 5,
  },
});
