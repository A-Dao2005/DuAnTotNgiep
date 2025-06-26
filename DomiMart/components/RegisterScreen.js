import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    setError(null);
    if (!name || !password || !rePassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (password !== rePassword) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }
    navigation?.navigate && navigation.navigate('RegisterSuccess');
  };

  return (
    <ImageBackground source={{ uri: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>ĐĂNG KÝ</Text>
        <Text style={styles.subtitle}>Vui lòng điền đầy đủ thông tin để tạo tài khoản mới!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nguyen Van A"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="0123456789"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nhập lại Mật khẩu</Text>
          <TextInput
            style={styles.input}
            value={rePassword}
            onChangeText={setRePassword}
            placeholder="******"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
        {error && <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text>}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Bạn có tài khoản rồi? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate && navigation.navigate('Login')}>
            <Text style={styles.linkText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    marginTop: 40,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#FFF8DC',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#1976D2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  bottomText: {
    color: '#fff',
    fontSize: 14,
  },
  linkText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
