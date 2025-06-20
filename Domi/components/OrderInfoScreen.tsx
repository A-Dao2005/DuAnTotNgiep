import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface OrderInfoScreenProps {
  orderTotal: number;
  shippingFee?: number;
  onOrderSubmit?: (info: any) => void;
  onBack?: () => void;
}

const OrderInfoScreen: React.FC<OrderInfoScreenProps> = ({ orderTotal, shippingFee = 30000, onOrderSubmit, onBack }) => {
  const [name, setName] = useState('Nguyen Van A');
  const [phone, setPhone] = useState('0123456789');
  const [address, setAddress] = useState('81 Hoàng Hoa Thám');
  const [note, setNote] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const total = orderTotal + shippingFee;
  const today = new Date();
  const dateStr = today.toLocaleDateString('vi-VN');

  const handleOrder = () => {
    if (onOrderSubmit) {
      onOrderSubmit({ name, phone, address, note, saveInfo });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={{ fontSize: 22 }}>{'←'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Thông tin đơn hàng</Text>
      <Text style={styles.step}>Bước 1 trong 3</Text>
      <View style={styles.progressRow}>
        <View style={styles.progressCircleActive}><Text style={styles.progressIcon}>👤</Text></View>
        <View style={styles.progressLine} />
        <View style={styles.progressCircle}><Text style={styles.progressIcon}>📦</Text></View>
        <View style={styles.progressLine} />
        <View style={styles.progressCircle}><Text style={styles.progressIcon}>✔️</Text></View>
      </View>
      <Text style={styles.sectionTitle}>Nhập thông tin đơn hàng</Text>
      <Text style={styles.sectionNote}>Quý khách vui lòng điền đầy đủ và kiểm tra lại thông tin trước khi đặt hàng</Text>
      <Text style={styles.label}>*Họ và tên người nhận</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>*Số điện thoại</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={styles.label}>*Địa chỉ nhận hàng</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />
      <Text style={styles.label}>Ghi chú (nếu có)</Text>
      <TextInput style={styles.inputArea} value={note} onChangeText={setNote} multiline placeholder="Bất cứ điều gì Quý khách muốn nhắn gửi đến chúng tôi" />
      <View style={styles.checkboxRow}>
        <TouchableOpacity onPress={() => setSaveInfo(v => !v)} style={styles.checkboxCustom}>
          {saveInfo && <View style={styles.checkboxTick} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Nhớ thông tin của tôi</Text>
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

export default OrderInfoScreen;

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
  label: { fontWeight: 'bold', marginTop: 10, marginBottom: 2, color: '#222' },
  input: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee', padding: 10, fontSize: 15 },
  inputArea: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee', padding: 10, fontSize: 15, minHeight: 60, textAlignVertical: 'top' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  checkboxCustom: { width: 20, height: 20, borderWidth: 1, borderColor: '#aaa', borderRadius: 4, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  checkboxTick: { width: 12, height: 12, backgroundColor: '#388e3c', borderRadius: 2 },
  checkboxLabel: { marginLeft: 8, color: '#222', fontSize: 14 },
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