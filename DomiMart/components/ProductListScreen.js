import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProductListScreen = ({ products, onProductPress, onBack }) => {
  const [search, setSearch] = useState('');
  const productsWithSold = products.map((p) => ({
    ...p,
    sold: p.sold ?? Math.floor(Math.random() * 1000 + 1),
  }));
  const filteredProducts = productsWithSold.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={{ fontSize: 22 }}>{'←'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => onProductPress(item)}>
            <Image source={{ uri: item.img }} style={styles.productImg} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.rating}>⭐ {item.rating ?? 4}</Text>
              <Text style={styles.sold}>{item.sold} đã bán</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    padding: 12,
    paddingTop: 32,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginRight: 8,
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flex: 0.9,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 6,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  productImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    textAlign: 'center',
  },
  productPrice: {
    color: '#E53935',
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  rating: {
    color: '#FFA000',
    fontSize: 13,
  },
  sold: {
    color: '#888',
    fontSize: 13,
  },
});
