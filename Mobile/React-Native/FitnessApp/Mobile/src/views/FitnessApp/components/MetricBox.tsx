import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface MetricBoxProps {
  label: string;
  value: string;
  unit?: string;
  color?: string;
}

const MetricBox: React.FC<MetricBoxProps> = ({ label, value, unit = '', color = '#111827' }) => {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}{unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metricBox: {
    width: (width - 42) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  metricLabel: {
    color: '#6B7280',
    fontSize: 11,
    marginBottom: 6,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
});


export default MetricBox;
