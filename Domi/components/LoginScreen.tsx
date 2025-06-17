import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface LoginScreenProps {
  onLogin?: (username: string, password: string) => void;
  onRegister?: () => void;
  onForgotPassword?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => onLogin && onLogin(username, password)}>
        <Text style={styles.loginBtnText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRegister}>
        <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 22, color: '#B71C1C', marginBottom: 24 },
  input: { width: '100%', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, fontSize: 15, borderWidth: 1, borderColor: '#eee', marginBottom: 12 },
  loginBtn: { backgroundColor: '#E53935', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 40, marginBottom: 12 },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  forgotText: { color: '#388e3c', fontSize: 14, marginBottom: 8 },
  registerText: { color: '#1976D2', fontSize: 14 },
});

export default LoginScreen; 