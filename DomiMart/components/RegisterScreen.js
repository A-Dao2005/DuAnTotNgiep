import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [hoTen, setHoTen] = useState('');
  const [email, setEmail] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [reMatKhau, setReMatKhau] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const handleRegister = async () => {
    setError(null);
    
    // Validation
    if (!hoTen || !email || !soDienThoai || !matKhau || !reMatKhau) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    if (!validatePhone(soDienThoai)) {
      setError('Số điện thoại không hợp lệ (10-11 số)');
      return;
    }

    if (matKhau.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (matKhau !== reMatKhau) {
      setError('Mật khẩu nhập lại không khớp');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.2.4:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hoTen,
          email,
          soDienThoai,
          matKhau
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Thành công',
          'Đăng ký thành công!',
          [
            {
              text: 'OK',
              onPress: () => navigation?.navigate && navigation.navigate('RegisterSuccess')
            }
          ]
        );
      } else {
        setError(data.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      setError('Lỗi kết nối, vui lòng thử lại sau');
    } finally {
      setLoading(false);
    }
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
            value={hoTen}
            onChangeText={setHoTen}
            placeholder="Nguyen Van A"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="example@gmail.com"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={soDienThoai}
            onChangeText={setSoDienThoai}
            placeholder="0123456789"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={styles.input}
            value={matKhau}
            onChangeText={setMatKhau}
            placeholder="Tối thiểu 6 ký tự"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nhập lại Mật khẩu</Text>
          <TextInput
            style={styles.input}
            value={reMatKhau}
            onChangeText={setReMatKhau}
            placeholder="******"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ'}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}

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
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
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