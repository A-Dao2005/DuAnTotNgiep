import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const paymentMethods = [
  { key: 'cod', label: 'Thanh toán khi nhận hàng', icon: 'COD' },
  { key: 'momo', label: 'Ví điện tử MoMo', icon: 'momo' },
  { key: 'zalopay', label: 'Zalopay', icon: 'zalo' },
  { key: 'vnpay', label: 'Ứng dụng ngân hàng di động (VNPAY)', icon: 'vnpay' },
  { key: 'credit', label: 'Thẻ tín dụng/thẻ ghi nợ', icon: 'credit' },
  { key: 'atm', label: 'Thẻ ATM nội địa', icon: 'atm' },
];

const OrderPaymentScreen = ({ orderTotal, shippingFee = 30000, onOrderSubmit, onBack }) => {
  const [selected, setSelected] = useState('cod');
  const total = orderTotal + shippingFee;
  const today = new Date();
  const dateStr = today.toLocaleDateString('vi-VN');

  const handleOrder = () => {
    if (onOrderSubmit) onOrderSubmit(selected);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={{ fontSize: 22 }}>{'←'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Thông tin đơn hàng</Text>
      <Text style={styles.step}>Bước 2 trong 3</Text>
      <View style={styles.progressRow}>
        <View style={styles.progressCircle}><Text style={styles.progressIcon}>👤</Text></View>
        <View style={styles.progressLine} />
        <View style={styles.progressCircleActive}><Text style={styles.progressIcon}>💳</Text></View>
        <View style={styles.progressLine} />
        <View style={styles.progressCircle}><Text style={styles.progressIcon}>✔️</Text></View>
      </View>
      <Text style={styles.sectionTitle}>Chọn phương thức thanh toán</Text>
      <Text style={styles.sectionNote}>Mẹo: thông tin bảo mật và quyền riêng tư của quý khách luôn được bảo vệ!</Text>
      <View style={styles.paymentBox}>
        {paymentMethods.map((pm) => (
          <TouchableOpacity
            key={pm.key}
            style={[styles.paymentRow, selected === pm.key && styles.paymentRowActive]}
            onPress={() => setSelected(pm.key)}
          >
            <View style={styles.paymentIcon}><Text>{pm.icon}</Text></View>
            <Text style={styles.paymentLabel}>{pm.label}</Text>
            <View style={styles.radioOuter}>{selected === pm.key && <View style={styles.radioInner} />}</View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.orderBox}>
        <Text style={styles.orderTitle}>Tổng đơn hàng</Text>
        <Text style={styles.orderDate}>Ngày đặt hàng {dateStr}</Text>
        <View style={styles.orderRow}><Text style={styles.orderLabel}>Tổng phụ</Text><Text style={styles.orderValue}>{orderTotal.toLocaleString()}đ</Text></View>
        <View style={styles.orderRow}><Text style={styles.orderLabel}>Chiết khấu</Text><Text style={styles.orderValue}>0đ</Text></View>
        <View style={styles.orderRow}><Text style={styles.orderLabel}>Giảm giá</Text><Text style={styles.orderValue}>0đ</Text></View>
        <View style={styles.orderRow}><Text style={styles.orderLabel}>Phí vận chuyển</Text><Text style={styles.orderValue}>{shippingFee.toLocaleString()}đ</Text></View>
        <View style={styles.orderRow}><Text style={styles.orderLabelBold}>Tổng</Text><Text style={styles.orderValueBold}>{total.toLocaleString()}đ</Text></View>
      </View>
      <TouchableOpacity style={styles.orderBtn} onPress={handleOrder}>
        <Text style={styles.orderBtnText}>ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OrderPaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', padding: 16 },
  backBtn: { marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 22, color: '#388e3c', textAlign: 'center', marginBottom: 2 },
  step: { color: '#888', textAlign: 'center', marginBottom: 10 },
  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  progressCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  progressCircleActive: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#c8e6c9', alignItems: 'center', justifyContent: 'center' },
  progressIcon: { fontSize: 18 },
  progressLine: { width: 30, height: 2, backgroundColor: '#eee' },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, color: '#222', marginTop: 10 },
  sectionNote: { color: '#388e3c', fontSize: 13, marginBottom: 10 },
  paymentBox: { backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 10 },
  paymentRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  paymentRowActive: { backgroundColor: '#e3f2fd' },
  paymentIcon: { width: 40, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  paymentLabel: { flex: 1, fontSize: 15, color: '#222' },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#388e3c', alignItems: 'center', justifyContent: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#388e3c' },
  orderBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 18, marginBottom: 10 },
  orderTitle: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  orderDate: { color: '#888', fontSize: 13, marginBottom: 8 },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  orderLabel: { color: '#388e3c', fontSize: 14 },
  orderValue: { color: '#222', fontSize: 14 },
  orderLabelBold: { color: '#222', fontWeight: 'bold', fontSize: 15 },
  orderValueBold: { color: '#E53935', fontWeight: 'bold', fontSize: 16 },
  orderBtn: { backgroundColor: '#FF9800', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  orderBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase' },
});
