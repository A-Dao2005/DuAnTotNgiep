import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { productsByCategory } from './HomeMainScreen';

const ProductDetailScreen = ({ product, onAddToCart, onCheckout, onBack, onProductPress }) => {
  const [showAdded, setShowAdded] = useState(false);

  const otherProducts = Object.values(productsByCategory)
    .flat()
    .filter((p) => p.name !== product.name);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1200);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={{ fontSize: 22 }}>{'←'}</Text>
        </TouchableOpacity>
        <Image source={{ uri: product.img }} style={styles.productImg} />
        <View style={styles.contentBox}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.rating}>⭐ {product.rating ?? 4}</Text>
            <Text style={styles.sold}>{product.sold ? `${product.sold} đã bán` : ''}</Text>
          </View>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.descBox}>
          <Text style={styles.descTitle}>Chi tiết sản phẩm</Text>
          <Text style={styles.productDesc}>{product.description}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.otherBox}>
          <Text style={styles.otherTitle}>Sản phẩm khác</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.otherRow}>
            {otherProducts.map((prod, idx) => (
              <TouchableOpacity key={idx} style={styles.otherCard} onPress={() => onProductPress && onProductPress(prod)}>
                {prod.isSale && (
                  <View style={styles.saleTag}>
                    <Text style={styles.saleTagText}>-{prod.isSale}%</Text>
                  </View>
                )}
                {prod.isFavorite && (
                  <View style={styles.favoriteTag}>
                    <Text style={styles.favoriteTagText}>Yêu thích</Text>
                  </View>
                )}
                <Image source={{ uri: prod.img }} style={styles.otherImg} />
                <Text style={styles.otherName} numberOfLines={2}>{prod.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.otherPrice}>{prod.price}</Text>
                  {prod.priceOld && (
                    <Text style={styles.oldPrice}>{prod.priceOld}</Text>
                  )}
                </View>
                <Text style={styles.soldText}>Đã bán {prod.sold >= 1000 ? (prod.sold/1000).toFixed(1) + 'k' : prod.sold}</Text>
                <Text style={styles.shopText}>{prod.shop}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => onCheckout(product)}>
          <Text style={styles.checkoutBtnText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>

      {showAdded && (
        <View style={styles.toast}>
          <AntDesign name="checkcircle" size={20} color="#fff" style={{ marginBottom: 4 }} />
          <Text style={styles.toastText}>Đã thêm vào giỏ hàng!</Text>
        </View>
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC' },
  backBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 10, alignSelf: 'flex-start', margin: 12, position: 'absolute', zIndex: 10 },
  productImg: { width: '100%', height: 260, borderRadius: 12, resizeMode: 'cover' },
  contentBox: { padding: 16, backgroundColor: '#fff', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  productName: { fontWeight: 'bold', fontSize: 20, color: '#222', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rating: { color: '#FFA000', fontSize: 15, marginRight: 16 },
  sold: { color: '#888', fontSize: 15 },
  productPrice: { color: '#E53935', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  divider: { height: 8, backgroundColor: '#f5f5f5', width: '100%' },
  descBox: { backgroundColor: '#fff', padding: 16 },
  descTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: '#222' },
  productDesc: { color: '#444', fontSize: 15, textAlign: 'left' },
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'space-between',
  },
  addBtn: { backgroundColor: '#388e3c', borderRadius: 8, padding: 14, flex: 1, marginRight: 8 },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  checkoutBtn: { backgroundColor: '#E53935', borderRadius: 8, padding: 14, flex: 1 },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  toast: {
    position: 'absolute',
    bottom: 80,
    left: 40,
    right: 40,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 100,
  },
  toastText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  otherBox: { backgroundColor: '#fff', padding: 12 },
  otherTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#222' },
  otherRow: { flexDirection: 'row', paddingHorizontal: 8 },
  otherCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    width: 120,
    elevation: 2,
    marginRight: 8,
    marginLeft: 0,
    position: 'relative',
  },
  otherImg: { width: 60, height: 60, borderRadius: 8, marginBottom: 5, resizeMode: 'cover' },
  otherName: { fontWeight: 'bold', fontSize: 13, color: '#222', textAlign: 'center' },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  otherPrice: {
    color: '#E53935',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  oldPrice: {
    color: '#888',
    fontSize: 11,
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  soldText: {
    color: '#888',
    fontSize: 11,
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
  },
  shopText: {
    color: '#1976D2',
    fontSize: 11,
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
