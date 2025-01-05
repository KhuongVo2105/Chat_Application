/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootLayout from './src/screens/_layout';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { lightScheme } from './src/config/lightScheme';
import { darkScheme } from './src/config/darkScheme';
import { useColorScheme } from 'react-native';

const App = () => {
  return <RootLayout />;
};

  const LightScheme = {
    ...MD3LightTheme,
    colors: lightScheme
  }

  const DarkScheme = {
    ...MD3DarkTheme,
    colors: darkScheme
  }

  const colorScheme = useColorScheme()

  const theme = colorScheme === 'dark' ? DarkScheme : LightScheme

  return (
    <PaperProvider theme={theme}>
      <RootLayout />
    </PaperProvider>
  );
}

export default App;
