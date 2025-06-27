import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

const categories = [
  { key: 'hot', label: 'Nổi bật', color: 'black' },
  { key: 'knife', label: 'Dao kéo', color: 'black' },
  { key: 'pan', label: 'Chảo bếp', color: 'black' },
];

const productsByCategory = {
  hot: [
    { name: 'Bộ dao kéo cao cấp', price: '225,000 VND', priceOld: '300,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 1200, isSale: 25, isFavorite: true, shop: 'DomiMart' },
    { name: 'Bộ dụng cụ 5 món', price: '180,000 VND', priceOld: '220,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 800, isSale: 18, isFavorite: false, shop: 'DomiMart' },
  ],
  knife: [
    { name: 'Bộ dao kéo Nhật', price: '320,000 VND', priceOld: '400,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 950, isSale: 20, isFavorite: true, shop: 'DomiMart' },
    { name: 'Dao thái đa năng', price: '120,000 VND', priceOld: '150,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 600, isSale: 20, isFavorite: false, shop: 'DomiMart' },
  ],
  pan: [
    { name: 'Chảo chống dính', price: '250,000 VND', priceOld: '300,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 500, isSale: 17, isFavorite: false, shop: 'DomiMart' },
    { name: 'Bộ nồi chảo bếp', price: '500,000 VND', priceOld: '600,000 VND', img: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg', sold: 300, isSale: 17, isFavorite: true, shop: 'DomiMart' },
  ],
};

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 6;
const CARD_HORIZONTAL_PADDING = 8;
const CARD_WIDTH = (screenWidth - CARD_HORIZONTAL_PADDING * 2 - CARD_MARGIN * 2) / 2;

const CategoryScreen = () => {
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
          <View style={styles.categoryProductCard} key={idx}>
            {/* Nhãn SALE góc phải */}
            {prod.isSale && (
              <View style={styles.saleTag}>
                <Text style={styles.saleTagText}>-{prod.isSale}%</Text>
              </View>
            )}
            {/* Nhãn yêu thích góc trái */}
            {prod.isFavorite && (
              <View style={styles.favoriteTag}>
                <Text style={styles.favoriteTagText}>Yêu thích</Text>
              </View>
            )}
            <Image source={{ uri: prod.img }} style={styles.categoryProductImg} />
            <Text style={styles.categoryProductName} numberOfLines={2}>{prod.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Text style={styles.categoryProductPrice}>{prod.price}</Text>
              {prod.priceOld && (
                <Text style={styles.oldPrice}>{prod.priceOld}</Text>
              )}
            </View>
            <Text style={styles.soldText}>Đã bán {prod.sold >= 1000 ? (prod.sold/1000).toFixed(1) + 'k' : prod.sold}</Text>
            <Text style={styles.shopText}>{prod.shop}</Text>
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
  categoryProductCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    width: CARD_WIDTH,
    marginBottom: 16,
    elevation: 2,
    marginHorizontal: CARD_MARGIN,
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