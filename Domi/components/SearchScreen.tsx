import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const allProducts = [
  { name: 'Bộ dao kéo cao cấp', price: '225,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  { name: 'Bộ dụng cụ 5 món', price: '180,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  { name: 'Bộ dao kéo Nhật', price: '320,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  { name: 'Dao thái đa năng', price: '120,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  { name: 'Chảo chống dính', price: '250,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  { name: 'Bộ nồi chảo bếp', price: '500,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
];

interface SearchScreenProps {
  onBack?: () => void;
  onProductPress?: (product: any) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onProductPress }) => {
  const [query, setQuery] = useState('');
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

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
      <FlatList
        data={filtered}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemBox} onPress={() => onProductPress && onProductPress(item)}>
            <Image source={{ uri: item.img }} style={styles.itemImg} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noResult}>Không tìm thấy sản phẩm phù hợp</Text>}
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