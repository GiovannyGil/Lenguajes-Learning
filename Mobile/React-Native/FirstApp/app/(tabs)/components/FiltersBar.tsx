import React from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FiltersBarProps {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
}

export default function FiltersBar({ search, setSearch, status, setStatus, gender, setGender }: FiltersBarProps) {
  return (
    <View style={styles.filters}>
      <TextInput
        style={styles.input}
        placeholder="Buscar personaje..."
        value={search}
        onChangeText={t => setSearch(t)}
        placeholderTextColor="#aaa"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.filterRow}
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', minWidth: '100%' }}
        keyboardShouldPersistTaps="handled"
      >
        {['', 'alive', 'dead', 'unknown'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.chip, status === s && styles.chipActive]}
            onPress={() => setStatus(s)}>
            <Text style={[styles.chipText, status === s && styles.chipTextActive]}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Todos'}</Text>
          </TouchableOpacity>
        ))}
        {['', 'male', 'female', 'genderless', 'unknown'].map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.chip, gender === g && styles.chipActive]}
            onPress={() => setGender(g)}>
            <Text style={[styles.chipText, gender === g && styles.chipTextActive]}>{g ? g.charAt(0).toUpperCase() + g.slice(1) : 'Cualquier género'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#222',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  chip: {
    backgroundColor: '#e0f7fa',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 4,
  },
  chipActive: {
    backgroundColor: '#00b5cc',
  },
  chipText: {
    color: '#00b5cc',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chipTextActive: {
    color: '#fff',
  },
});
