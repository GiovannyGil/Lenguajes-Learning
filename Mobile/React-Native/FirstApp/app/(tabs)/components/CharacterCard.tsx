import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import type { Character } from './types';

export default function CharacterCard({ item, onPress }: { item: Character; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>{item.species} - {item.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 18,
    padding: 12,
    elevation: 2,
    shadowColor: '#00b5cc33',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#00b5cc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  info: {
    color: '#00b5cc',
    fontSize: 14,
    fontWeight: '600',
  },
});
