import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {getImage} from '../helpers/getDataTeam';
import {MatchMode, MatchDBInterface} from '../types';

interface Props {
  mode: MatchMode;
  match: MatchDBInterface;
  ko: boolean;
  local?: boolean;
}

export const KnockoutImage = ({mode, match, ko, local = false}: Props) => {
  return (
    <View>
      <Image
        style={[styles.logoTeam, ko && styles.KO]}
        source={getImage(mode, local ? match.local : match.visit)}
      />
      <Image
        style={[styles.logoTeam, styles.duplicate]}
        source={getImage(mode, local ? match.local : match.visit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  duplicate: {
    position: 'absolute',
    opacity: 0.2,
  },
  logoTeam: {
    width: 20,
    height: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  KO: {
    tintColor: 'gray',
  },
});
