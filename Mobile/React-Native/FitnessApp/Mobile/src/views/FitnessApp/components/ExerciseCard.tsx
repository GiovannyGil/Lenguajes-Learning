import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Exercise } from '../constants/routines';

interface ExerciseCardProps {
  exercise: Exercise;
  isDone: boolean;
  onPress: () => void;
  onToggle: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isDone, onPress, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isDone && styles.containerDone]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.gifContainer}>
        <Image 
          source={{ 
            uri: exercise.gif,
            headers: { Referer: 'https://fitnessprogramer.com/' },
            cache: 'reload'
          }} 
          style={[styles.gifImage, isDone && { opacity: 0.3 }]} 
          resizeMode="contain"
        />


      </View>
      <View style={styles.info}>
        <Text style={[styles.name, isDone && styles.textDone]}>{exercise.n}</Text>
        <View style={styles.detailsRow}>
          <Icon name="clock-outline" size={14} color="#9CA3AF" />
          <Text style={styles.series}>{exercise.s}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.checkBtn, isDone && styles.checkBtnActive]} 
        onPress={onToggle}
      >
        <Icon 
          name={isDone ? "check-bold" : "plus"} 
          size={18} 
          color={isDone ? "#fff" : "#9CA3AF"} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  containerDone: {
    backgroundColor: '#F9FAFB',
    borderColor: 'transparent',
    opacity: 0.7,
  },
  gifContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F3F4F6', // Slightly darker for better visibility
    borderRadius: 16,
    marginLeft: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  gifImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },


  info: {
    flex: 1,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  series: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '600',
  },
  textDone: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  checkBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  checkBtnActive: {
    backgroundColor: '#4ADE80',
    borderColor: '#4ADE80',
  },
});


export default ExerciseCard;
