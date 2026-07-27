import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface NeuCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  inner?: boolean;
}

/**
 * funcion : "NeuCard"
 * parametros: children (React.ReactNode), style (ViewStyle), inner (boolean)
 * funcionalidad : renderizar una tarjeta neumórfica con sombras suaves elevadas o hundidas
 * retorna: elemento JSX.Element
 */
export const NeuCard: React.FC<NeuCardProps> = ({ children, style, inner = false }) => {
  // definir el estilo de sombras neumórficas oscuras y claras
  return (
    <View style={[styles.outer, inner ? styles.innerShadow : styles.outerShadow, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    backgroundColor: '#1e2530', // fondo neumórfico oscuro premium
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  outerShadow: {
    // sombras neumórficas oscuras adaptadas para fondo #1e2530
    shadowColor: '#0c0f14',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  innerShadow: {
    // simular el hundimiento neumórfico oscuro con bordes y fondo adaptado
    borderWidth: 1.5,
    borderColor: '#12161d',
    backgroundColor: '#161b23',
  },
});
