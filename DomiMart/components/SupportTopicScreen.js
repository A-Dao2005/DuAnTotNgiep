import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const topics = [
  'Chính sách đổi trả sản phẩm',
  'Chính sách giao hàng',
  'Thông tin nước mắm MGF',
  'Thông tin về MGF',
];

const SupportTopicScreen = ({ onBack, onSelectTopic }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
      <Text style={{ fontSize: 22 }}>{'←'}</Text>
    </TouchableOpacity>
    <Text style={styles.title}>Bạn cần hỗ trợ vấn đề gì?</Text>
    <Text style={styles.desc}>
      Cảm ơn Quý khách đã quan tâm đến sản phẩm của MGF. Chúng tôi giải đáp bất cứ thắc mắc/yêu cầu nào nếu Quý khách cần.
    </Text>
    {topics.map((topic, idx) => (
      <TouchableOpacity key={idx} style={styles.topicBtn} onPress={() => onSelectTopic && onSelectTopic(topic)}>
        <Text style={styles.topicText}>{topic}</Text>
      </TouchableOpacity>
    ))}
    <Text style={styles.hotlineTitle}>Trò chuyện với nhân viên tư vấn</Text>
    <Text style={styles.hotline}>Hotline: 0123456789</Text>
    <Text style={styles.addressTitle}>Địa chỉ showroom MGF</Text>
    <Text style={styles.address}>93/42 Hoàng Hoa Thám, Phường 6, Bình Thạnh, TP. Hồ Chí Minh, Việt Nam</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F5E3', padding: 16 },
  backBtn: { position: 'absolute', top: 16, left: 12, zIndex: 10, backgroundColor: '#fff', borderRadius: 20, padding: 4 },
  title: { fontWeight: 'bold', fontSize: 17, color: '#B71C1C', marginTop: 40, marginBottom: 8 },
  desc: { color: '#222', fontSize: 13, marginBottom: 10 },
  topicBtn: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#eee' },
  topicText: { color: '#222', fontSize: 15 },
  hotlineTitle: { color: '#B71C1C', fontWeight: 'bold', marginTop: 18 },
  hotline: { color: '#B71C1C', fontWeight: 'bold', marginBottom: 8 },
  addressTitle: { color: '#222', fontWeight: 'bold' },
  address: { color: '#222', fontSize: 13 },
});

export default SupportTopicScreen;
