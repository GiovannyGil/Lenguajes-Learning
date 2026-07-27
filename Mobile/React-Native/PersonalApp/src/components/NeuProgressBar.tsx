import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NeuCard } from './NeuCard';

interface NeuProgressBarProps {
  progress: number; // valor entre 0 y 1
  label?: string;
  color?: string;
}

/**
 * funcion : "NeuProgressBar"
 * parametros: progress (número de 0 a 1), label (string), color (string)
 * funcionalidad : renderizar una barra de progreso neumórfica para metas y proporciones
 * retorna: elemento JSX.Element
 */
export const NeuProgressBar: React.FC<NeuProgressBarProps> = ({ progress, label, color = '#3b5998' }) => {
  const percentage = Math.min(Math.max(progress * 100, 0), 100);

  // limitar el progreso entre 0 y 100 por ciento
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <NeuCard inner={true} style={styles.barContainer}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
      </NeuCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 13,
    color: '#5a6b82',
    marginBottom: 4,
    fontWeight: '500',
  },
  barContainer: {
    padding: 0,
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 0,
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
});
