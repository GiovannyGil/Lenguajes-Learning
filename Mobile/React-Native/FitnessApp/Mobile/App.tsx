import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navegation/AppNavigator';
import { AppProvider } from './src/context/AppContext';

const theme = createTheme({
  lightColors: {
    primary: '#4ADE80',
  },
  mode: 'light',
});

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <AppNavigator />
          </ThemeProvider>
        </SafeAreaProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
