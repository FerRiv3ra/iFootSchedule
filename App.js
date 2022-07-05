import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import mobileAds, {MaxAdContentRating} from 'react-native-google-mobile-ads';

import WelcomeScreen from './src/screens/WelcomeScreen';
import Matches from './src/screens/Matches';
import Countdown from './src/screens/Countdown';
import Playground from './src/screens/Playground';
import {AppProvider} from './src/context/AppContext';
import {initDatabase} from './src/config/dbConfig';
import Match from './src/screens/Match';

const Stack = createStackNavigator();

mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['8FF93031-A624-4B94-BB90-4A0F47427A2D'],
  })
  .then(() => {});

mobileAds()
  .initialize()
  .then(adapterStatuses => {});

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
            name="Countdown"
            component={Countdown}
            options={{
              title: 'Countdown',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Playground"
            component={Playground}
            options={{
              title: 'Playground',
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
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
