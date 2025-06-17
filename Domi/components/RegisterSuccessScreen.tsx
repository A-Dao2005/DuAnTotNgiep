import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RegisterSuccessScreenProps {
  onLogin?: () => void;
}

const RegisterSuccessScreen: React.FC<RegisterSuccessScreenProps> = ({ onLogin }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Đăng ký thành công!</Text>
    <Text style={styles.desc}>Bạn đã đăng ký tài khoản thành công. Vui lòng đăng nhập để tiếp tục.</Text>
    <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
      <Text style={styles.loginBtnText}>Đăng nhập</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 22, color: '#388e3c', marginBottom: 16 },
  desc: { color: '#222', fontSize: 15, marginBottom: 24, textAlign: 'center' },
  loginBtn: { backgroundColor: '#E53935', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 40 },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default RegisterSuccessScreen; 