import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import Matches from '../screens/Matches';

import Match from '../screens/Match';
import PlayedMatches from '../screens/PlayedMatches';
import Countdown from '../screens/Countdown';
import {RootStackParams} from '../types/navigator';

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
