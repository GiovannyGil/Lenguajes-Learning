import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ThemeProvider, createTheme, Button, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const theme = createTheme({
  lightColors: {
    primary: '#007AFF',
  },
  darkColors: {
    primary: '#007AFF',
  },
  mode: 'light',
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <Text h1 style={styles.title}>Fitness App</Text>
          <Text style={styles.subtitle}>¡Bienvenido a tu entrenamiento!</Text>
          
          <Button
            title="Empezar"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            raised
          />
          
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    borderRadius: 25,
    height: 50,
  },
});
