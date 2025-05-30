import React from 'react';
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Character } from './types';

export default function CharacterModal({ visible, character, onClose }: {
  visible: boolean;
  character: Character | null;
  onClose: () => void;
}) {
  if (!character) return null;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalBg}>
        <View style={styles.modalCard}>
          <Image source={{ uri: character.image }} style={styles.modalImg} />
          <Text style={styles.modalName}>{character.name}</Text>
          <Text style={styles.modalInfo}>Estado: {character.status}</Text>
          <Text style={styles.modalInfo}>Especie: {character.species}</Text>
          <Text style={styles.modalInfo}>Género: {character.gender}</Text>
          <Text style={styles.modalInfo}>Origen: {character.origin?.name}</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: '#0008',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: '85%',
    elevation: 8,
    shadowColor: '#00b5cc55',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  modalImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#00b5cc',
  },
  modalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00b5cc',
    marginBottom: 6,
  },
  modalInfo: {
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  closeBtn: {
    marginTop: 16,
    backgroundColor: '#00b5cc',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
