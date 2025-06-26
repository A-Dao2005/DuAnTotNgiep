import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const RegisterSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký thành công</Text>
      <View style={styles.iconWrapper}>
        <View style={styles.circle}>
          <MaterialIcons name="check" size={80} color="#fff" />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation?.navigate && navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Tiếp tục đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#bdbdbd',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    left: 10,
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#00D12E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF6C00',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 60,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
