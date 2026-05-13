import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Exercise } from '../constants/routines';

const { height } = Dimensions.get('window');

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <Modal visible={!!exercise} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.handle} />
          
          <View style={styles.header}>
            <Text style={styles.title}>{exercise.n}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={24} color="#111827" />
            </TouchableOpacity>

          </View>

          <View style={styles.gifContainer}>
            <Image 
              source={{ 
                uri: exercise.gif,
                headers: { Referer: 'https://fitnessprogramer.com/' },
                cache: 'reload'
              }} 
              style={styles.gif}
              resizeMode="contain"
            />

          </View>

          <View style={styles.details}>
            <View style={styles.infoRow}>
              <Icon name="clock-fast" size={20} color="#3d5afe" />
              <Text style={styles.seriesLabel}>Series y Repeticiones:</Text>
              <Text style={styles.seriesValue}>{exercise.s}</Text>
            </View>
            
            <View style={styles.descBox}>
              <Text style={styles.descTitle}>Instrucciones:</Text>
              <Text style={styles.descText}>
                Mantén una postura controlada. Enfócate en la conexión mente-músculo y exhala durante el esfuerzo.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.actionBtn} onPress={onClose}>
            <Text style={styles.actionBtnText}>¡Entendido!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 28,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    minHeight: height * 0.65,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    flex: 1,
    marginRight: 10,
    letterSpacing: -0.5,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#F3F4F6',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  gif: {
    width: '100%',
    height: '100%',
  },
  details: {
    gap: 24,
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  seriesLabel: {
    color: '#166534',
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
    fontWeight: '600',
  },
  seriesValue: {
    color: '#166534',
    fontSize: 18,
    fontWeight: '800',
  },
  descBox: {
  },
  descTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  descText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
    fontWeight: '500',
  },
  actionBtn: {
    backgroundColor: '#4ADE80',
    height: 64,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
});


export default ExerciseModal;
