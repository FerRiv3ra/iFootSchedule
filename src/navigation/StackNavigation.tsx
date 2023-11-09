import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {
  WelcomeScreen,
  Matches,
  Match,
  PlayedMatches,
  Countdown,
} from '../screens';
import {RootStackParams} from '../types';

const Stack = createStackNavigator<RootStackParams>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Matches" component={Matches} />
      <Stack.Screen name="Match" component={Match} />
      <Stack.Screen name="PlayedMatches" component={PlayedMatches} />
      <Stack.Screen name="Countdown" component={Countdown} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
