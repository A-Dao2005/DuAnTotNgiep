import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Nếu bạn dùng React Navigation, props sẽ có navigation
// Nếu không, có thể bỏ navigation và props

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>CHÀO MỪNG BẠN ĐẾN VỚI</Text>
      <Text style={styles.logo}>DOMI</Text>
      <Image
        source={require('../assets/icon.png')} // Đổi sang ảnh bạn muốn
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation?.navigate && navigation.navigate('Register')}
      >
        <Text style={styles.registerButtonText}>ĐĂNG KÝ THÀNH VIÊN MỚI</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Bạn đã có tài khoản rồi?</Text>
        <TouchableOpacity onPress={() => navigation?.navigate && navigation.navigate('Login')}>
          <Text style={styles.loginLink}> ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    color: '#A52A2A',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    fontSize: 14,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 30,
  },
  image: {
    width: 220,
    height: 150,
    marginBottom: 40,
  },
  registerButton: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#A52A2A',
    fontSize: 14,
  },
  loginLink: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
