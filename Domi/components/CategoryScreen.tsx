import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const categories = [
  { key: 'hot', label: 'Nổi bật', color: 'black' },
  { key: 'knife', label: 'dao kéo', color: 'black' },
  { key: 'pan', label: 'chảo bếp', color: 'black' },
];

const productsByCategory: Record<string, { name: string; price: string; img: string }[]> = {
  hot: [
    { name: 'Bộ dao kéo cao cấp', price: '225,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
    { name: 'Bộ dụng cụ 5 món', price: '180,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  ],
  knife: [
    { name: 'Bộ dao kéo Nhật', price: '320,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
    { name: 'Dao thái đa năng', price: '120,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  ],
  pan: [
    { name: 'Chảo chống dính', price: '250,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
    { name: 'Bộ nồi chảo bếp', price: '500,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' },
  ],
};

const CategoryScreen: React.FC = () => {
  const [selected, setSelected] = useState('hot');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh mục sản phẩm</Text>
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.categoryBtn, selected === cat.key && { backgroundColor: cat.color }]}
            onPress={() => setSelected(cat.key)}
          >
            <Text style={[styles.categoryBtnText, selected === cat.key && { color: '#fff' }]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.productsRow} showsVerticalScrollIndicator={false}>
        {productsByCategory[selected].map((prod, idx) => (
          <View style={styles.productCard} key={idx}>
            <Image source={{ uri: prod.img }} style={styles.productImg} />
            <Text style={styles.productName}>{prod.name}</Text>
            <Text style={styles.productPrice}>{prod.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryBtn: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#eee',
  },
  categoryBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 140,
    elevation: 2,
    margin: 8,
  },
  productImg: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
  },
  productPrice: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 2,
  },
}); 