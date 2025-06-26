import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface EditProfileScreenProps {
  user?: {
    name: string;
    phone: string;
    email: string;
    address: string;
    avatar?: string;
  };
  onBack?: () => void;
  onSave?: (user: { name: string; phone: string; email: string; address: string; avatar?: string }) => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user = { name: '', phone: '', email: '', address: '', avatar: undefined }, onBack, onSave }) => {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [avatar, setAvatar] = useState(user.avatar || 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg');
  const [success, setSuccess] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền bị từ chối', 'Bạn cần cấp quyền truy cập thư viện ảnh để thay đổi ảnh đại diện.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      if (onSave) onSave({ name, phone, email, address, avatar });
      if (onBack) onBack();
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={{ fontSize: 22 }}>{'←'}</Text>
      </TouchableOpacity>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={styles.changeAvatarText}>Sửa ảnh</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.hello}>Chỉnh sửa thông tin cá nhân</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nhập họ tên" />
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Nhập số điện thoại" keyboardType="phone-pad" />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Nhập email" keyboardType="email-address" />
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Nhập địa chỉ" />
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>LƯU THÔNG TIN</Text>
      </TouchableOpacity>
      {success && (
        <View style={styles.toastSuccess}>
          <Text style={styles.toastIcon}>✅</Text>
          <Text style={styles.toastText}>Cập nhật thành công</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', padding: 16 },
  backBtn: { position: 'absolute', top: 16, left: 12, zIndex: 10, backgroundColor: '#fff', borderRadius: 20, padding: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 18 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12, borderWidth: 1, borderColor: '#eee' },
  changeAvatarText: { color: '#388e3c', fontSize: 12, textAlign: 'center', marginTop: 2 },
  hello: { fontWeight: 'bold', fontSize: 17, color: '#222' },
  inputContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 18 },
  label: { color: '#222', marginBottom: 4, marginLeft: 4, fontSize: 14 },
  input: { backgroundColor: '#FFF8DC', borderRadius: 8, borderWidth: 1, borderColor: '#eee', padding: 10, fontSize: 15, marginBottom: 10 },
  saveBtn: { backgroundColor: '#388e3c', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' },
  toastSuccess: { position: 'absolute', top: '40%', left: 20, right: 20, backgroundColor: '#1B5E20', borderRadius: 12, padding: 18, alignItems: 'center', flexDirection: 'row', zIndex: 100 },
  toastIcon: { fontSize: 28, color: '#fff', marginRight: 10 },
  toastText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default EditProfileScreen; 