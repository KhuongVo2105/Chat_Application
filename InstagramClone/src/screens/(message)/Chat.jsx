import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import {
  Button,
  TextInput,
  FlatList,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import SockJS from 'sockjs-client';

import { TextEncoder, TextDecoder } from 'text-encoding';
import { useNavigation } from '@react-navigation/native';
import ENDPOINTS from '../../config/endpoints';
import {
  Avatar,
  Caption,
  IconButton,
  Title,
  useTheme,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const Chat = ({ route }) => {
  const { userIdSend, userIdTo, avatarTo, nameTo, status } = route.params; // Nhận userId và receiverId từ màn hình trước ( route.params)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const theme = useTheme();

  // Kết nối WebSocket
  useEffect(() => {
    const socket = new SockJS(ENDPOINTS.CHAT.SOCKJS);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe('/topic/messages', message => {
          const receivedMessage = JSON.parse(message.body);
          console.log('[WebSocket] Received message:', receivedMessage);
          setMessages(prevMessages => [...prevMessages, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      onStompError: error => {
        console.error('Stomp error:', error);
      },
    });
    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [userIdSend, userIdTo]);

  // Lấy tin nhắn trước đó từ API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let response;
        if (status == false) {
          response = await fetch(
            `${ENDPOINTS.CHAT.MESSAGE}/${userIdSend}/${userIdTo}`,
          );
        } else {
          response = await fetch(
            `${ENDPOINTS.CHAT.USER_CONVERSATIONS}/${userIdSend}/${userIdTo}`,
          );
        }
        const data = await response.json();
        setMessages(data); // Lưu tin nhắn vào state
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [status, userIdSend, userIdTo]);

  // Gửi tin nhắn qua WebSocket
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        userIdSend: userIdSend,
        userIdTo: userIdTo,
        content: newMessage,
        type: status,
      };
      setMessages(prevMessages => {
        if (Array.isArray(prevMessages)) {
          return [...prevMessages, message];
        } else {
          console.error('prevMessages is not an array:', prevMessages);
          return [message]; // Trả về một mảng mới chỉ chứa message
        }
      });
      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
      setNewMessage('');
    }
  };

  // Render mỗi tin nhắn
  const renderItem = ({ item }) => (
    <View
      style={[
        item.userIdSend === userIdSend
          ? { justifyContent: 'flex-end', alignSelf: 'flex-end' }
          : { justifyContent: 'flex-start', alignSelf: 'flex-start' },
      ]}>
      {item.userIdSend !== userIdSend &&
        (status === false ? (
          <Avatar.Image source={{ uri: avatarTo }} size={40} />
        ) : (
          <Avatar.Image source={{ uri: item.avatar }} size={40} />
        ))}
      <View
        style={[
          {
            maxWidth: '70%',
            padding: 10,
            borderRadius: 10,
            marginTop: 15,
            marginBottom: 15,
            backgroundColor: item.userIdSend === userIdSend ? '#3e99fd' : '#85b0c4',
          },
        ]}>
        <Text style={{ color: '#111111', fontSize: 16 }}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: 'space-between' }}>
      {/* messages */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1, padding: 10 }}
      />

      <View
        className="flex flex-row items-center"
      >
        <Pressable>

        </Pressable>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn ..."
        />
        <Pressable onPress={sendMessage}>
          <Ionicons name="send" size={30} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;