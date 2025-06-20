import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface CartScreenProps {
  cart: { product: any; quantity: number }[];
  onBack?: () => void;
  onCheckout?: () => void;
  onRemoveItem?: (productName: string) => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ cart, onBack, onCheckout, onRemoveItem }) => {
  const [cartState, setCartState] = useState(cart);
  const [showRemoved, setShowRemoved] = useState(false);
  const total = cartState.reduce((sum, item) => {
    const price = Number(item.product.price.replace(/[^\d]/g, ''));
    return sum + price * item.quantity;
  }, 0);

  const handleChangeQty = (idx: number, delta: number) => {
    setCartState(prev => {
      const newQty = prev[idx].quantity + delta;
      if (newQty <= 0) {
        // Xóa sản phẩm nếu số lượng về 0
        return prev.filter((_, i) => i !== idx);
      }
      return prev.map((item, i) => i === idx ? { ...item, quantity: newQty } : item);
    });
  };

  const handleRemove = (idx: number) => {
    const removedProduct = cartState[idx]?.product?.name;
    setCartState(prev => prev.filter((_, i) => i !== idx));
    if (removedProduct && typeof onRemoveItem === 'function') {
      onRemoveItem(removedProduct);
    }
    setShowRemoved(true);
    setTimeout(() => setShowRemoved(false), 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <AntDesign name="arrowleft" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>GIỎ HÀNG</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {cartState.length === 0 ? (
          <Text style={styles.empty}>Giỏ hàng trống</Text>
        ) : (
          cartState.map((item, idx) => {
            const price = Number(item.product.price.replace(/[^\d]/g, ''));
            const itemTotal = price * item.quantity;
            return (
              <View key={idx} style={styles.itemBox}>
                <Image source={{ uri: item.product.img }} style={styles.itemImg} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  <Text style={styles.itemPrice}>Giá: {price.toLocaleString()}đ</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <TouchableOpacity onPress={() => handleChangeQty(idx, -1)} style={styles.qtyBtn}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemQty}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleChangeQty(idx, 1)} style={styles.qtyBtn}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRemove(idx)} style={styles.removeBtn}>
                      <AntDesign name="delete" size={20} color="#E53935" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemTotal}>Thành tiền: {itemTotal.toLocaleString()}đ</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>TỔNG THANH TOÁN</Text>
        <Text style={styles.totalValue}>{total.toLocaleString()}đ</Text>
        <TouchableOpacity style={styles.payBtn} disabled={cartState.length === 0} onPress={onCheckout}>
          <Text style={styles.payBtnText}>THANH TOÁN</Text>
        </TouchableOpacity>
      </View>
      {showRemoved && (
        <View style={styles.toast}>
          <AntDesign name="checkcircle" size={20} color="#fff" style={{ marginBottom: 4 }} />
          <Text style={styles.toastText}>Xóa sản phẩm thành công!</Text>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#FFF8DC',
  },
  backBtn: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#222',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
  itemBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  itemPrice: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
  itemQty: {
    color: '#222',
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    backgroundColor: '#FFF8DC',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 15,
  },
  totalValue: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 22,
    marginVertical: 8,
  },
  payBtn: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 10,
    opacity: 1,
  },
  payBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  qtyBtn: {
    backgroundColor: '#eee',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 6,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  removeBtn: {
    marginLeft: 10,
    backgroundColor: '#fff0f0',
    borderRadius: 6,
    padding: 4,
  },
  itemTotal: {
    color: '#4E342E',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
  },
  toast: { position: 'absolute', bottom: 80, left: 40, right: 40, backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center', zIndex: 100 },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 