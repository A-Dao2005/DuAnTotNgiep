import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ProfileScreenProps {
  user?: {
    name: string;
    id: string;
    phone: string;
    email: string;
    address: string;
  };
  onLogout?: () => void;
  onEditProfile?: () => void;
  onGoOrder?: () => void;
  onGoSupport?: () => void;
  onBack?: () => void;
  onChangePassword?: () => void;
  onFeedback?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user = {
    name: 'Nguyen Van A',
    id: '123456789',
    phone: '09876543210',
    email: 'hello@gmail.com',
    address: '81 Hoàng Hoa Thám',
  },
  onLogout,
  onEditProfile,
  onGoOrder,
  onGoSupport,
  onBack,
  onChangePassword,
  onFeedback,
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={{ fontSize: 22 }}>{'←'}</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchText}>Tìm kiếm...</Text>
        </View>
      </View>
      <View style={styles.profileBox}>
        <View style={styles.profileRow}>
          <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.hello}>Xin chào, <Text style={{ color: '#E53935' }}>{user.name}</Text></Text>
            <TouchableOpacity onPress={onEditProfile}>
              <Text style={styles.editText}>Chỉnh sửa thông tin cá nhân</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Tên người dùng: <Text style={styles.infoValue}>{user.name}</Text></Text>
          <Text style={styles.infoText}>ID Tài khoản: <Text style={styles.infoValue}>{user.id}</Text></Text>
          <Text style={styles.infoText}>Số điện thoại: <Text style={styles.infoValue}>{user.phone}</Text></Text>
          <Text style={styles.infoText}>Email: <Text style={styles.infoValue}>{user.email}</Text></Text>
          <Text style={styles.infoText}>Thông tin giao hàng: <Text style={styles.infoValue}>{user.address}</Text></Text>
        </View>
        <TouchableOpacity style={styles.actionBtn} onPress={onChangePassword}>
          <Text style={styles.actionBtnText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onFeedback}>
          <Text style={styles.actionBtnText}>Ý kiến phản hồi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogoutConfirm(true)}>
          <Text style={styles.logoutBtnText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Đơn mua</Text>
        <View style={styles.orderRow}>
          <TouchableOpacity style={styles.orderBtn}><Text style={styles.orderBtnText}>Chờ xác nhận</Text></TouchableOpacity>
          <TouchableOpacity style={styles.orderBtn}><Text style={styles.orderBtnText}>Chờ lấy hàng</Text></TouchableOpacity>
          <TouchableOpacity style={styles.orderBtn}><Text style={styles.orderBtnText}>Đang giao hàng</Text></TouchableOpacity>
          <TouchableOpacity style={styles.orderBtn}><Text style={styles.orderBtnText}>Đã giao hàng</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Hỗ trợ</Text>
        <TouchableOpacity style={styles.supportBtn} onPress={onGoSupport}>
          <Text style={styles.supportBtnText}>Liên hệ hỗ trợ/góp ý tư vấn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportBtn}><Text style={styles.supportBtnText}>Thông tin về MGF</Text></TouchableOpacity>
      </View>
      {showLogoutConfirm && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>Bạn có chắc chắn muốn đăng xuất?</Text>
            <View style={styles.confirmRow}>
              <TouchableOpacity style={styles.confirmBtn} onPress={() => { setShowLogoutConfirm(false); onLogout && onLogout(); }}>
                <Text style={styles.confirmBtnText}>Đăng xuất</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowLogoutConfirm(false)}>
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', padding: 12 },
  backBtn: { position: 'absolute', top: 16, left: 12, zIndex: 10, backgroundColor: '#fff', borderRadius: 20, padding: 4 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: '#eee' },
  searchIcon: { fontSize: 16, marginRight: 6 },
  searchText: { color: '#888', fontSize: 14 },
  profileBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 14 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12, borderWidth: 1, borderColor: '#eee' },
  hello: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  editText: { color: '#388e3c', fontSize: 13, marginTop: 2 },
  infoBox: { marginBottom: 10 },
  infoText: { color: '#222', fontSize: 14, marginBottom: 2 },
  infoValue: { color: '#E53935', fontWeight: 'bold' },
  actionBtn: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 10, marginBottom: 6 },
  actionBtnText: { color: '#222', fontSize: 14 },
  logoutBtn: { backgroundColor: '#fff0f0', borderRadius: 8, padding: 10, marginTop: 6 },
  logoutBtnText: { color: '#E53935', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  sectionBox: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 14 },
  sectionTitle: { fontWeight: 'bold', fontSize: 15, color: '#222', marginBottom: 8 },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  orderBtn: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 10, flex: 1, marginHorizontal: 2 },
  orderBtnText: { color: '#222', fontSize: 13, textAlign: 'center' },
  supportBtn: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 10, marginBottom: 6 },
  supportBtnText: { color: '#222', fontSize: 14 },
  confirmOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center', zIndex: 100 },
  confirmBox: { backgroundColor: '#fff', borderRadius: 12, padding: 24, alignItems: 'center', width: 280 },
  confirmText: { color: '#222', fontSize: 16, marginBottom: 18, textAlign: 'center' },
  confirmRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  confirmBtn: { backgroundColor: '#B71C1C', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 18, marginRight: 10 },
  confirmBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  cancelBtn: { backgroundColor: '#eee', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 18 },
  cancelBtnText: { color: '#222', fontWeight: 'bold', fontSize: 15 },
}); 