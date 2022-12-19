import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import Matches from './src/screens/Matches';
import {AppProvider} from './src/context/AppContext';

import Match from './src/screens/Match';
import PlayedMatches from './src/screens/PlayedMatches';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              title: 'Welcome Screen',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Matches"
            component={Matches}
            options={{
              title: 'Matches',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Match"
            component={Match}
            options={{
              title: 'Match',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PlayedMatches"
            component={PlayedMatches}
            options={{
              title: 'PlayedMatches',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
