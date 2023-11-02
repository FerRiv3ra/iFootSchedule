import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {AppProvider} from './src/context/AppContext';
import StackNavigation from './src/navigation/StackNavigation';
import {ThemeProvider} from './src/context/ThemeContext';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/translate/i18nConfig';

const AppState = ({children}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AppProvider>
    </I18nextProvider>
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
