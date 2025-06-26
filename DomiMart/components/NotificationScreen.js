import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const initialNotifications = [
  {
    id: '1',
    title: 'Đơn hàng X123xxx của bạn đang trên đường...',
    content: '',
    time: 'Th 3',
    unread: true,
    type: 'order',
  },
  {
    id: '2',
    title: 'Mật khẩu vừa được thay đổi thành công.',
    content: '',
    time: 'CN',
    unread: false,
    type: 'password',
  },
  {
    id: '3',
    title: 'Cập nhật thông tin cá nhân!',
    content: '',
    time: '20 Thg 10',
    unread: false,
    type: 'profile',
  },
  {
    id: '4',
    title: 'Đã thêm 2 sản phẩm vào giỏ hàng.',
    content: '',
    time: 'Hôm nay',
    unread: true,
    type: 'cart',
  },
];

const NotificationScreen = ({ onBack }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAll = () => {
    setNotifications([]);
    setShowConfirm(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={{ fontSize: 22 }}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity onPress={() => setShowConfirm(true)} style={styles.trashBtn}>
          <AntDesign name="delete" size={24} color="#222" />
        </TouchableOpacity>
      </View>
      <View style={styles.userRow}>
        <Text style={styles.userName}>Xin chào, <Text style={{ color: '#E53935' }}>Nguyen Van A</Text></Text>
        <View style={styles.avatar} />
      </View>
      <View style={styles.listBox}>
        {notifications.length === 0 ? (
          <Text style={styles.noNoti}>không có thông báo nào hiển thị</Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.notiItem}>
                <Text style={styles.notiTitle}>
                  {item.title}
                  {item.unread && <Text style={styles.dot}> •</Text>}
                </Text>
                <Text style={styles.notiTime}>{item.time}</Text>
              </View>
            )}
          />
        )}
      </View>
      {showConfirm && (
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>Xóa hết tất cả thông báo?</Text>
            <Text style={styles.confirmDesc}>Các thông báo sẽ bị xóa vĩnh viễn</Text>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleDeleteAll}>
              <Text style={styles.confirmBtnText}>Xóa tất cả</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowConfirm(false)}>
              <Text style={styles.cancelBtnText}>Giữ lại tất cả</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F5E3', padding: 0 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 4 },
  headerTitle: { fontWeight: 'bold', fontSize: 22, color: '#B71C1C' },
  trashBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 4 },
  userRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 8 },
  userName: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee' },
  listBox: { backgroundColor: '#fff', borderRadius: 12, margin: 16, padding: 10, flex: 1 },
  notiItem: { borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 10 },
  notiTitle: { color: '#222', fontWeight: 'bold', fontSize: 15 },
  dot: { color: '#E53935', fontSize: 18 },
  notiTime: { color: '#888', fontSize: 12, marginTop: 2 },
  noNoti: { color: '#888', textAlign: 'center', marginTop: 40 },
  confirmOverlay: { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-end', alignItems: 'center' },
  confirmBox: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, width: '100%', alignItems: 'center' },
  confirmTitle: { fontWeight: 'bold', fontSize: 18, color: '#222', marginBottom: 8 },
  confirmDesc: { color: '#888', fontSize: 14, marginBottom: 18 },
  confirmBtn: { backgroundColor: '#B71C1C', borderRadius: 8, paddingVertical: 14, alignItems: 'center', width: '100%', marginBottom: 10 },
  confirmBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelBtn: { backgroundColor: '#eee', borderRadius: 8, paddingVertical: 14, alignItems: 'center', width: '100%' },
  cancelBtnText: { color: '#222', fontWeight: 'bold', fontSize: 16 },
});

export default NotificationScreen; 