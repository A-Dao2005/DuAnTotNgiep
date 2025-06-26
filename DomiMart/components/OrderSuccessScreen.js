import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OrderSuccessScreen = ({ onGoHome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>🎉</Text>
      </View>
      <Text style={styles.title}>Đặt hàng thành công!</Text>
      <Text style={styles.desc}>
        Cảm ơn bạn đã mua hàng tại Domi Mart. Đơn hàng của bạn đã được ghi nhận và sẽ sớm được xử lý.
      </Text>
      <TouchableOpacity style={styles.btn} onPress={onGoHome}>
        <Text style={styles.btnText}>Về trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconBox: {
    backgroundColor: '#c8e6c9',
    borderRadius: 60,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#388e3c',
    marginBottom: 12,
    textAlign: 'center',
  },
  desc: {
    color: '#222',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});
