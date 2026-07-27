import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { NeuCard } from './NeuCard';

interface NeuInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

/**
 * funcion : "NeuInput"
 * parametros: containerStyle (ViewStyle), textInputProps (TextInputProps)
 * funcionalidad : renderizar un input de texto neumórfico hundido
 * retorna: elemento JSX.Element
 */
export const NeuInput: React.FC<NeuInputProps> = ({ containerStyle, ...props }) => {
  // renderizar el input con estilo hundido neumórfico
  return (
    <NeuCard inner={true} style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor="#8a95a5"
        style={styles.input}
        {...props}
      />
    </NeuCard>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  input: {
    height: 40,
    color: '#2e3846',
    fontSize: 15,
  },
});
