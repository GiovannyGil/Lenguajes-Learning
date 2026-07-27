import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { NeuCard } from './NeuCard';

interface NeuButtonProps {
  onPress: () => void;
  title?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * funcion : "NeuButton"
 * parametros: onPress (función), title (string), children (React.ReactNode), style (ViewStyle), textStyle (TextStyle)
 * funcionalidad : renderizar un botón neumórfico interactivo que se hunde al ser presionado
 * retorna: elemento JSX.Element
 */
export const NeuButton: React.FC<NeuButtonProps> = ({ onPress, title, children, style, textStyle }) => {
  const [isPressed, setIsPressed] = useState(false);

  // manejar el evento de presionar el botón
  const handlePressIn = () => {
    setIsPressed(true);
  };

  // manejar la liberación del botón
  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <NeuCard inner={isPressed} style={[styles.btn, style]}>
        {children ? (
          children
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </NeuCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 4,
  },
  text: {
    color: '#3b5998',
    fontWeight: '600',
    fontSize: 16,
  },
});
