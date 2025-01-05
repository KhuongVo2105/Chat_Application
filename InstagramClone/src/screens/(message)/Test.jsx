import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

const ChatMessage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([
    {id: 1, text: 'Hello!', time: '10:00 AM', recalled: false},
    {id: 2, text: 'How are you?', time: '10:05 AM', recalled: false},
  ]);

  const handleRecallMessage = id => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? {...msg, recalled: true} : msg)),
    );
    setShowOptions(false); // Đóng bảng tùy chọn
  };

  return (
    <View style={styles.container}>
      {messages.map(msg => (
        <TouchableOpacity
          key={msg.id}
          style={styles.messageContainer}
          onPress={() => setSelectedMessage(msg.id)}>
          <Text
            style={[styles.messageText, msg.recalled && styles.recalledText]}>
            {msg.recalled ? 'Tin nhắn đã thu hồi' : msg.text}
          </Text>

          {/* Hiển thị nút ba chấm nếu tin nhắn được chọn */}
          {selectedMessage === msg.id && !msg.recalled && (
            <TouchableOpacity
              style={styles.dotButton}
              onPress={() => setShowOptions(true)}>
              <Text style={styles.dotText}>⋮</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}

      {/* Modal hiển thị bảng nhỏ */}
      <Modal
        visible={showOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.optionsContainer}>
            <Text style={styles.optionText}>
              Thời gian:{' '}
              {messages.find(msg => msg.id === selectedMessage)?.time}
            </Text>
            <TouchableOpacity
              style={styles.recallButton}
              onPress={() => handleRecallMessage(selectedMessage)}>
              <Text style={styles.recallText}>Thu hồi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
  },
  recalledText: {
    fontStyle: 'italic',
    color: 'gray',
  },
  dotButton: {
    padding: 5,
  },
  dotText: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  recallButton: {
    backgroundColor: '#ff6666',
    padding: 10,
    borderRadius: 5,
  },
  recallText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatMessage;
