import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';

interface SupportChatScreenProps {
  onBack?: () => void;
  topic?: string | null;
}

const SupportChatScreen: React.FC<SupportChatScreenProps> = ({ onBack, topic }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any[]>([]);

  useEffect(() => {
    const msgs = [];
    if (topic) {
      msgs.push({ from: 'user', text: topic });
    }
    msgs.push({
      from: 'system',
      text: 'Cảm ơn bạn đã liên hệ với MGF. Chúng tôi gửi bạn thông tin về MGF, vui lòng truy cập Website của chúng tôi để biết thêm chi tiết chính xác và đầy đủ nhất: Website MGF: mgfvn.com',
    });
    setChat(msgs);
  }, [topic]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChat([...chat, { from: 'user', text: message }]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={{ fontSize: 22 }}>{'←'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Bạn cần hỗ trợ vấn đề gì?</Text>
      <View style={styles.chatBox}>
        <Text style={styles.userTag}>Xin chào, Nguyen Van A</Text>
        {chat.map((msg, idx) => (
          <View key={idx} style={msg.from === 'system' ? styles.systemMsg : styles.userMsg}>
            <Text style={styles.msgText}>
              {msg.text.includes('mgfvn.com') ? (
                <>
                  {msg.text.split('mgfvn.com')[0]}
                  <Text style={{ color: '#1976D2' }} onPress={() => Linking.openURL('https://sunhouse.com.vn/pic/thumb/large/product/0(112).jpg')}>mgfvn.com</Text>
                </>
              ) : (
                msg.text
              )}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Nhập tin nhắn"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: '#fff', fontSize: 22 }}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F5E3', padding: 16 },
  backBtn: { position: 'absolute', top: 16, left: 12, zIndex: 10, backgroundColor: '#fff', borderRadius: 20, padding: 4 },
  title: { fontWeight: 'bold', fontSize: 17, color: '#B71C1C', marginTop: 40, marginBottom: 8 },
  chatBox: { marginVertical: 20 },
  userTag: { backgroundColor: '#388e3c', color: '#fff', alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 8 },
  systemMsg: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 8, alignSelf: 'flex-start' },
  userMsg: { backgroundColor: '#e3f2fd', borderRadius: 8, padding: 10, marginBottom: 8, alignSelf: 'flex-end' },
  msgText: { color: '#222', fontSize: 14 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginTop: 'auto', marginBottom: 10 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#eee', paddingHorizontal: 16, paddingVertical: 8, fontSize: 15 },
  sendBtn: { backgroundColor: '#388e3c', borderRadius: 20, padding: 10, marginLeft: 8 },
});

export default SupportChatScreen; 