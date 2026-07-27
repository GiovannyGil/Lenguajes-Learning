import React from 'react';
import { Text, View } from 'react-native';
import { NeuButton } from '../../components/NeuButton';
import { styles } from './style';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'finanzas' | 'fitness') => void;
}

/**
 * funcion : "HomeView"
 * parametros: onNavigate (función para navegar a otros módulos)
 * funcionalidad : renderizar la página de inicio central unificada en estilo neumórfico obteniendo datos del hook e importando estilos
 * retorna: elemento JSX.Element
 */
export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  // renderizar la interfaz simplificada con dos botones limpios
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>PersonalApp</Text>
        <Text style={styles.subtitle}>Tu Centro de Control Personal</Text>

        <View style={styles.buttonWrapper}>
          <NeuButton
            title="💰 Finanzas Premium"
            onPress={() => onNavigate('finanzas')}
            style={styles.navButton}
            textStyle={styles.navButtonText}
          />
          <NeuButton
            title="🏋️‍♂️ MeloFit Tracker"
            onPress={() => onNavigate('fitness')}
            style={styles.navButton}
            textStyle={styles.navButtonText}
          />
        </View>
      </View>
    </View>
  );
};
