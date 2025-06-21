import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

type LoginScreenProps = {
  navigation?: {
    navigate: (screen: string) => void;
  };
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground source={{ uri: 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' }} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>ĐĂNG NHẬP</Text>
        <Text style={styles.subtitle}>Vui lòng đăng nhập để tiếp tục quá trình mua hàng!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tài khoản</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="0123456789"
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="******"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate && navigation.navigate('HomeMain')}>
          <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate && navigation.navigate('Register')}>
            <Text style={styles.linkText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

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