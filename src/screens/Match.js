import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Match = ({route}) => {
  const {match} = route.params;

  console.log(match);
  return (
    <View>
      <Text>Match</Text>
    </View>
  );
};

export default Match;

const styles = StyleSheet.create({});
