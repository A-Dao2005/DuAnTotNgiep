import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface RegisterScreenProps {
  onRegister?: (username: string, password: string, email: string) => void;
  onLogin?: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerBtn} onPress={() => onRegister && onRegister(username, password, email)}>
        <Text style={styles.registerBtnText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogin}>
        <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontWeight: 'bold', fontSize: 22, color: '#B71C1C', marginBottom: 24 },
  input: { width: '100%', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, fontSize: 15, borderWidth: 1, borderColor: '#eee', marginBottom: 12 },
  registerBtn: { backgroundColor: '#388e3c', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 40, marginBottom: 12 },
  registerBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loginText: { color: '#1976D2', fontSize: 14 },
});

export default RegisterScreen; 