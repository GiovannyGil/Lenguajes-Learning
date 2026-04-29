import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#4ADE80', // Vibrant Green
  secondary: '#22C55E', // Deep Green
  white: '#FFFFFF',
  text: '#111827',
  textLight: '#6B7280',
  overlay: 'rgba(0, 0, 0, 0.3)',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Darker overlay for better text contrast
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Glass effect
    borderRadius: 45,
    paddingVertical: 50,
    paddingHorizontal: 25,
    gap: 25,
    width: '90%',
    maxWidth: 360,
    alignItems: 'center',
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  title: {
    fontSize: 28, // Reduced from 36 to fit 'Personalizada'
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  highlight: {
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 35,
    paddingHorizontal: 15,
    fontWeight: '500',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    letterSpacing: 0.5,
  },
});
