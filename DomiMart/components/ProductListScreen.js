import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProductListScreen = ({ products, onProductPress, onBack }) => {
  const [search, setSearch] = useState('');
  const productsWithSold = products.map((p) => ({
    ...p,
    sold: p.sold ?? Math.floor(Math.random() * 1000 + 1),
    priceOld: p.priceOld ?? '',
    isSale: p.isSale ?? '',
    isFavorite: p.isFavorite ?? false,
    shop: p.shop ?? 'DomiMart',
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
          <TouchableOpacity style={styles.categoryProductCard} onPress={() => onProductPress(item)}>
            {item.isSale ? (
              <View style={styles.saleTag}>
                <Text style={styles.saleTagText}>-{item.isSale}%</Text>
              </View>
            ) : null}
            {item.isFavorite ? (
              <View style={styles.favoriteTag}>
                <Text style={styles.favoriteTagText}>Yêu thích</Text>
              </View>
            ) : null}
            <Image source={{ uri: item.img }} style={styles.categoryProductImg} />
            <Text style={styles.categoryProductName} numberOfLines={2}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Text style={styles.categoryProductPrice}>{item.price}</Text>
              {item.priceOld ? (
                <Text style={styles.oldPrice}>{item.priceOld}</Text>
              ) : null}
            </View>
            <Text style={styles.soldText}>Đã bán {item.sold >= 1000 ? (item.sold/1000).toFixed(1) + 'k' : item.sold}</Text>
            <Text style={styles.shopText}>{item.shop}</Text>
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
  categoryProductCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    width: '47%',
    marginBottom: 16,
    elevation: 2,
    marginHorizontal: '1.5%',
  },
  categoryProductImg: {
    width: '90%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  categoryProductName: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryProductPrice: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  oldPrice: {
    color: '#888',
    fontSize: 13,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  soldText: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
  },
  shopText: {
    color: '#1976D2',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 2,
  },
  saleTag: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FF5252',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  saleTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#FF9800',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  favoriteTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
