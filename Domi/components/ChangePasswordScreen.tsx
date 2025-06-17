import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface ChangePasswordScreenProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ onBack, onSuccess }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [reNewPass, setReNewPass] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    setError('');
    if (!oldPass || !newPass || !reNewPass) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (newPass !== reNewPass) {
      setError('Mật khẩu mới không khớp');
      return;
    }
    // Giả lập đổi mật khẩu thành công
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={{ fontSize: 22 }}>{'←'}</Text>
      </TouchableOpacity>
      <View style={styles.headerRow}>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
        <View>
          <Text style={styles.hello}>Xin chào, <Text style={{ color: '#E53935' }}>Nguyen Van A</Text></Text>
          <Text style={styles.editText}>Chỉnh sửa thông tin cá nhân</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Đổi mật khẩu</Text>
      <TextInput style={styles.input} placeholder="*Mật khẩu cũ" secureTextEntry value={oldPass} onChangeText={setOldPass} />
      <TextInput style={styles.input} placeholder="*Mật khẩu mới" secureTextEntry value={newPass} onChangeText={setNewPass} />
      <TextInput style={styles.input} placeholder="*Nhập lại mật khẩu mới" secureTextEntry value={reNewPass} onChangeText={setReNewPass} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.btn} onPress={handleChangePassword}>
        <Text style={styles.btnText}>ĐỔI MẬT KHẨU</Text>
      </TouchableOpacity>
      <View style={styles.supportBox}>
        <Text style={styles.sectionTitle}>Hỗ trợ</Text>
        <TouchableOpacity style={styles.supportBtn}><Text style={styles.supportBtnText}>Liên hệ hỗ trợ giúp tư vấn</Text></TouchableOpacity>
        <TouchableOpacity style={styles.supportBtn}><Text style={styles.supportBtnText}>Thông tin về MGF</Text></TouchableOpacity>
      </View>
      {success && (
        <View style={styles.toastSuccess}>
          <Text style={styles.toastIcon}>✅</Text>
          <Text style={styles.toastText}>Đổi mật khẩu thành công</Text>
        </View>
      )}
    </View>
  );
};

export default ChangePasswordScreen;

import { Image } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', padding: 16 },
  backBtn: { position: 'absolute', top: 16, left: 12, zIndex: 10, backgroundColor: '#fff', borderRadius: 20, padding: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 18 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12, borderWidth: 1, borderColor: '#eee' },
  hello: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  editText: { color: '#388e3c', fontSize: 13, marginTop: 2 },
  sectionTitle: { fontWeight: 'bold', fontSize: 15, color: '#B71C1C', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee', padding: 10, fontSize: 15, marginBottom: 10 },
  btn: { backgroundColor: '#B71C1C', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' },
  error: { color: '#B71C1C', marginBottom: 8, marginTop: -6 },
  supportBox: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginTop: 30 },
  supportBtn: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 10, marginBottom: 6 },
  supportBtnText: { color: '#222', fontSize: 14 },
  toastSuccess: { position: 'absolute', top: '40%', left: 20, right: 20, backgroundColor: '#1B5E20', borderRadius: 12, padding: 18, alignItems: 'center', flexDirection: 'row', zIndex: 100 },
  toastIcon: { fontSize: 28, color: '#fff', marginRight: 10 },
  toastText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 