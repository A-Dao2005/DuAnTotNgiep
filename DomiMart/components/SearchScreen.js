import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SearchScreen = ({ onBack, onProductPress }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`http://192.168.2.4:5000/api/products/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(
          data.map(item => ({
            id: item._id,
            name: item.tenSanPham,
            price: item.giaSanPham,
            img: item.img || item.image,
          }))
        );
      } catch (error) {
        console.error('Lỗi tìm kiếm sản phẩm:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce 300ms
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={{ fontSize: 22 }}>{'←'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm sản phẩm..."
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>
      {loading && <Text style={{ textAlign: 'center', color: '#888' }}>Đang tìm kiếm...</Text>}
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemBox} onPress={() => onProductPress && onProductPress(item)}>
            <Image source={{ uri: item.img }} style={styles.itemImg} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={!loading && query.trim() !== '' ? <Text style={styles.noResult}>Không tìm thấy sản phẩm phù hợp</Text> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', padding: 12 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 4, marginRight: 8 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 8, fontSize: 15, borderWidth: 1, borderColor: '#eee' },
  itemBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 8 },
  itemImg: { width: 50, height: 50, borderRadius: 8 },
  itemName: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  itemPrice: { color: '#E53935', fontWeight: 'bold', fontSize: 14 },
  noResult: { color: '#888', textAlign: 'center', marginTop: 30 },
});

export default SearchScreen;
