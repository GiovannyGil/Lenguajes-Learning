import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface UserData {
  goal: string;
  weight: string;
  height: string;
  fat: string;
  water: string;
  muscle: string;
  visceral: string;
  freeFatMass: string;
  bmr: string;
  imc: string;
}

interface DataModalProps {
  visible: boolean;
  onClose: () => void;
  data: UserData;
  onSave: (newData: UserData) => void;
}

const DataModal: React.FC<DataModalProps> = ({ visible, onClose, data, onSave }) => {
  const [form, setForm] = useState(data);

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  const renderInput = (label: string, value: string, key: keyof UserData, keyboard: 'default' | 'numeric' = 'numeric', half: boolean = false) => (
    <View style={[styles.inputGroup, half && { width: '48%' }]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        keyboardType={keyboard}
        onChangeText={(text) => setForm({ ...form, [key]: text })}
        placeholderTextColor="#555"
      />
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.overlay}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Actualizar Perfil</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#111827" />
            </TouchableOpacity>

          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {renderInput('Meta u Objetivo', form.goal, 'goal', 'default')}
            
            <View style={styles.row}>
              {renderInput('Peso (kg)', form.weight, 'weight', 'numeric', true)}
              {renderInput('Altura (cm)', form.height, 'height', 'numeric', true)}
            </View>

            <View style={styles.row}>
              {renderInput('Grasa (%)', form.fat, 'fat', 'numeric', true)}
              {renderInput('Agua (%)', form.water, 'water', 'numeric', true)}
            </View>

            <View style={styles.row}>
              {renderInput('Músculo (%)', form.muscle, 'muscle', 'numeric', true)}
              {renderInput('Visceral', form.visceral, 'visceral', 'numeric', true)}
            </View>

            <View style={styles.row}>
              {renderInput('M. sin Grasa', form.freeFatMass, 'freeFatMass', 'numeric', true)}
              {renderInput('Metabolismo', form.bmr, 'bmr', 'numeric', true)}
            </View>
            
            <View style={{ height: 20 }} />
          </ScrollView>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 28,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 18,
    color: '#111827',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: '#4ADE80',
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
});


export default DataModal;
