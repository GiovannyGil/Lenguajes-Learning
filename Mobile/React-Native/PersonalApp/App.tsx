import React, { useState } from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeView } from './src/views/home/HomeView';
import { FinanzasView } from './src/views/modules/finaciero/FinanzasView';
import { FitnessView } from './src/views/modules/fitness/FitnessView';

/**
 * funcion : "App"
 * parametros: ninguno
 * funcionalidad : actuar como punto de entrada de la aplicación y coordinar la navegación principal
 * retorna: elemento JSX.Element
 */
function App() {
  const [currentView, setCurrentView] = useState<'home' | 'finanzas' | 'fitness'>('home');

  // renderizar la vista correspondiente según el estado de navegación
  const renderCurrentView = () => {
    switch (currentView) {
      case 'finanzas':
        return <FinanzasView onBack={() => setCurrentView('home')} />;
      case 'fitness':
        return <FitnessView onBack={() => setCurrentView('home')} />;
      case 'home':
      default:
        return <HomeView onNavigate={(view) => setCurrentView(view)} />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#e0e8f6" />
      <SafeAreaView style={styles.container}>
        {renderCurrentView()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e8f6',
  },
});

export default App;

