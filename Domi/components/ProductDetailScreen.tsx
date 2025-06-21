import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { productsByCategory } from './HomeMainScreen';

export interface Product {
  name: string;
  price: string;
  img: string;
  description: string;
  rating?: number;
  sold?: number;
}

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onCheckout: (product: Product) => void;
  onBack?: () => void;
  onProductPress?: (product: Product) => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onAddToCart, onCheckout, onBack, onProductPress }) => {
  const [showAdded, setShowAdded] = useState(false);
  const otherProducts = Object.values(productsByCategory).flat().filter((p: any) => p.name !== product.name);
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
            {otherProducts.map((prod: any, idx: number) => (
              <TouchableOpacity key={idx} style={styles.otherCard} onPress={() => onProductPress && onProductPress(prod)}>
                <Image source={{ uri: prod.img }} style={styles.otherImg} />
                <Text style={styles.otherName}>{prod.name}</Text>
                <Text style={styles.otherPrice}>{prod.price}</Text>
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
  productImg: { width: '100%', height: 260, borderRadius: 12, marginTop: 0, marginBottom: 0, resizeMode: 'cover' },
  contentBox: { padding: 16, backgroundColor: '#fff', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  productName: { fontWeight: 'bold', fontSize: 20, color: '#222', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rating: { color: '#FFA000', fontSize: 15, marginRight: 16 },
  sold: { color: '#888', fontSize: 15 },
  productPrice: { color: '#E53935', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  divider: { height: 8, backgroundColor: '#f5f5f5', width: '100%' },
  descBox: { backgroundColor: '#fff', padding: 16, marginTop: 0 },
  descTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: '#222' },
  productDesc: { color: '#444', fontSize: 15, textAlign: 'left' },
  bottomBar: { flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 10, borderTopWidth: 1, borderColor: '#eee', justifyContent: 'space-between' },
  addBtn: { backgroundColor: '#388e3c', borderRadius: 8, padding: 14, flex: 1, marginRight: 8 },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  checkoutBtn: { backgroundColor: '#E53935', borderRadius: 8, padding: 14, flex: 1 },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  toast: { position: 'absolute', bottom: 80, left: 40, right: 40, backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center', zIndex: 100 },
  toastText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  otherBox: { backgroundColor: '#fff', padding: 12, marginTop: 0 },
  otherTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#222' },
  otherRow: { flexDirection: 'row', gap: 10 },
  otherCard: { backgroundColor: '#fff', borderRadius: 10, padding: 8, alignItems: 'center', width: 110, elevation: 2, marginRight: 10 },
  otherImg: { width: 70, height: 70, borderRadius: 8, marginBottom: 5 },
  otherName: { fontWeight: 'bold', fontSize: 13, color: '#222', textAlign: 'center' },
  otherPrice: { color: '#E53935', fontSize: 13, marginTop: 2, textAlign: 'center' },
}); 