import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import FiltersBar from './components/FiltersBar';
import type { Character } from './components/types';

const API_URL = 'https://rickandmortyapi.com/api/character';

export default function RickAndMortyApp() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selected, setSelected] = useState<Character | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchCharacters = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    let url = `${API_URL}/?page=${reset ? 1 : page}`;
    if (search) url += `&name=${encodeURIComponent(search)}`;
    if (status) url += `&status=${status}`;
    if (gender) url += `&gender=${gender}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) {
        setCharacters([]);
        setHasMore(false);
      } else {
        setCharacters(reset ? data.results : [...characters, ...data.results]);
        setHasMore(Boolean(data.info?.next));
        setPage(reset ? 2 : page + 1);
      }
    } catch {
      setCharacters([]);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters(true);
    // eslint-disable-next-line
  }, [search, status, gender]);

  const handleLoadMore = () => {
    if (hasMore && !loading) fetchCharacters();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty Explorer</Text>
      <FiltersBar
        search={search}
        setSearch={t => { setSearch(t); setPage(1); }}
        status={status}
        setStatus={s => { setStatus(s); setPage(1); }}
        gender={gender}
        setGender={g => { setGender(g); setPage(1); }}
      />
      {loading && characters.length === 0 ? (
        <ActivityIndicator size="large" color="#00b5cc" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <CharacterCard item={item} onPress={() => { setSelected(item); setModalVisible(true); }} />
          )}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{ paddingBottom: 120 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={loading && hasMore ? <ActivityIndicator size="small" color="#00b5cc" /> : null}
        />
      )}
      <CharacterModal
        visible={modalVisible}
        character={selected}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafd',
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b5cc',
    alignSelf: 'center',
    marginBottom: 10,
    letterSpacing: 1.2,
  },
});
