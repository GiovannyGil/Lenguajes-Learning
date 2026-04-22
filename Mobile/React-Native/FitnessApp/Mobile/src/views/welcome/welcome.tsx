import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, COLORS } from './welcome.styles';
import { useWelcomeLogic } from './welcome.logic';
import { Ionicons } from '@expo/vector-icons';

const WelcomeView: React.FC = () => {
  const { handleGetStarted } = useWelcomeLogic();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Image */}
      <Image 
        source={require('../../../assets/welcome_bg.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Rutina{"\n"}
            <Text style={styles.highlight}>Personalizada</Text>
          </Text>
          
          <Text style={styles.subtitle}>
            Entrenamiento inteligente para resultados reales
          </Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Empezar</Text>
            <Ionicons name="arrow-forward" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeView;
