import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ProductDetailScreen = ({ product, onAddToCart, onCheckout, onBack, onProductPress, relatedProducts = [], categories = [] }) => {
  const [showAdded, setShowAdded] = useState(false);

  // Nếu product không hợp lệ, trả về thông báo
  if (!product || typeof product !== 'object') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Không tìm thấy sản phẩm!</Text>
        <TouchableOpacity onPress={onBack} style={{ marginTop: 20 }}>
          <Text style={{ color: '#E53935', fontWeight: 'bold' }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Tạm thời ẩn phần sản phẩm khác nếu không có dữ liệu
  const otherProducts = [];

  // Lấy label danh mục từ categories
  const categoryLabel = categories.find(cat => cat.key === product.phanLoai)?.label || product.phanLoai;

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
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tên sản phẩm: </Text>
            {product.name}
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Giá hiện tại: </Text>
            {product.price}
          </Text>
          {product.priceOld ? (
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Giá cũ: </Text>
              {product.priceOld}
            </Text>
          ) : null}
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Đã bán: </Text>
            {product.sold || 0}
          </Text>
          {product.isSale ? (
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Giảm giá: </Text>
              {product.isSale}%
            </Text>
          ) : null}
          {product.isFavorite ? (
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Yêu thích: </Text>
              Có
            </Text>
          ) : null}
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Danh mục: </Text>
            {categoryLabel}
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>Shop: </Text>
            {product.shop}
          </Text>
          {product.description ? (
            <Text style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mô tả: </Text>
              {product.description}
            </Text>
          ) : null}
        </View>
        <View style={styles.divider} />
        {/* Các mặt hàng liên quan */}
        {relatedProducts.length > 0 && (
          <View style={styles.relatedBox}>
            <Text style={styles.relatedTitle}>Các mặt hàng liên quan</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedRow}>
              {relatedProducts.map((prod, idx) => (
                <TouchableOpacity key={prod.id || idx} style={styles.relatedCard} onPress={() => onProductPress && onProductPress(prod)}>
                  <Image source={{ uri: prod.img }} style={styles.relatedImg} />
                  <Text style={styles.relatedName} numberOfLines={2}>{prod.name}</Text>
                  <Text style={styles.relatedPrice}>{prod.price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
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
  detailRow: { fontSize: 15, color: '#444', marginBottom: 4 },
  detailLabel: { fontWeight: 'bold', color: '#222' },
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
  relatedBox: { backgroundColor: '#fff', padding: 12, marginTop: 8 },
  relatedTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#222' },
  relatedRow: { flexDirection: 'row', paddingHorizontal: 8 },
  relatedCard: {
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
  relatedImg: { width: 60, height: 60, borderRadius: 8, marginBottom: 5, resizeMode: 'cover' },
  relatedName: { fontWeight: 'bold', fontSize: 13, color: '#222', textAlign: 'center' },
  relatedPrice: { color: '#E53935', fontSize: 13, fontWeight: 'bold', textAlign: 'center' },
});
