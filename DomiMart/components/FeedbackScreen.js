import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { UserContext } from '../UserContext';

interface FeedbackScreenProps {
  onBack?: () => void;
}

const API_URL = 'http://192.168.2.4:5000/api/feedback'; // Đổi thành domain backend của bạn nếu cần

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onBack }) => {
  const { user } = useContext(UserContext);
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setError('');
    if (!feedback.trim()) {
      setError('Vui lòng nhập ý kiến phản hồi.');
      return;
    }
    if (!user || !user._id || !user.name) {
      setError('Không xác định được thông tin người dùng.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          userName: user.name,
          content: feedback.trim(),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFeedback('');
        setTimeout(() => {
          setSuccess(false);
          if (onBack) onBack();
        }, 1500);
      } else {
        setError(data.message || 'Gửi phản hồi thất bại.');
      }
    } catch (err) {
      setError('Không thể kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={{ fontSize: 22 }}>{'←'}</Text>
      </TouchableOpacity>
      <View style={styles.headerRow}>
        <Image source={{ uri: user?.avatar || 'https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg' }} style={styles.avatar} />
        <View>
          <Text style={styles.hello}>Xin chào, <Text style={{ color: '#E53935' }}>{user?.name || 'Người dùng'}</Text></Text>
          <Text style={styles.editText}>Chỉnh sửa thông tin cá nhân</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Ý kiến phản hồi</Text>
      <Text style={styles.sectionDesc}>Cảm nhận của quý khách sau khi trải nghiệm sản phẩm của chúng tôi. Hãy để lại lời góp ý, MGF chúng tôi sẽ cải thiện và phát triển tốt hơn. Xin cảm ơn bạn!</Text>
      <TextInput
        style={styles.textArea}
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Nhập ý kiến của bạn..."
        multiline
        numberOfLines={5}
        editable={!loading}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={[styles.btn, (loading || !feedback.trim()) && styles.btnDisabled]} onPress={handleSend} disabled={loading || !feedback.trim()}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>GỬI</Text>}
      </TouchableOpacity>
      <View style={styles.supportBox}>
        <Text style={styles.sectionTitle}>Hỗ trợ</Text>
        <TouchableOpacity style={styles.supportBtn}><Text style={styles.supportBtnText}>Liên hệ hỗ trợ giúp tư vấn</Text></TouchableOpacity>
        <TouchableOpacity style={styles.supportBtn}><Text style={styles.supportBtnText}>Thông tin về MGF</Text></TouchableOpacity>
      </View>
      {success && (
        <View style={styles.toastSuccess}>
          <Text style={styles.toastIcon}>✅</Text>
          <Text style={styles.toastText}>Gửi ý kiến thành công</Text>
        </View>
      )}
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F5E3', padding: 16 },
  backBtn: { position: 'absolute', top: 16, left: 12, zIndex: 10, backgroundColor: '#fff', borderRadius: 20, padding: 4 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 18 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12, borderWidth: 1, borderColor: '#eee' },
  hello: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  editText: { color: '#388e3c', fontSize: 13, marginTop: 2 },
  sectionTitle: { fontWeight: 'bold', fontSize: 15, color: '#B71C1C', marginBottom: 8, marginTop: 10 },
  sectionDesc: { color: '#222', fontSize: 13, marginBottom: 10 },
  textArea: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#eee', padding: 10, fontSize: 15, minHeight: 80, textAlignVertical: 'top', marginBottom: 10 },
  btn: { backgroundColor: '#B71C1C', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  btnDisabled: { backgroundColor: '#ccc' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' },
  supportBox: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginTop: 30 },
  supportBtn: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 10, marginBottom: 6 },
  supportBtnText: { color: '#222', fontSize: 14 },
  toastSuccess: { position: 'absolute', top: '40%', left: 20, right: 20, backgroundColor: '#1B5E20', borderRadius: 12, padding: 18, alignItems: 'center', flexDirection: 'row', zIndex: 100 },
  toastIcon: { fontSize: 28, color: '#fff', marginRight: 10 },
  toastText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  errorText: { color: '#B71C1C', marginBottom: 8, marginTop: -4, fontSize: 13 },
}); 