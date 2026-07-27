import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121820', // fondo oscuro premium general
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    padding: 24,
    maxWidth: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#f8fafc', // blanco hueso para legibilidad
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#8a95a5',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '500',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 10,
  },
  navButton: {
    marginVertical: 12,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#1e2530',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#61dafb', // azul cian brillante para acentuar en oscuro
  },
});
