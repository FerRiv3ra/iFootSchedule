import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {AppProvider} from './src/context/AppContext';
import StackNavigation from './src/navigation/StackNavigation';
import {ThemeProvider} from './src/context/ThemeContext';

const AppState = ({children}) => {
  return (
    <AppProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppProvider>
  );
};

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
