import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { Button, TextInput, FlatList, Text, View, KeyboardAvoidingView, Platform, StyleSheet, Image, TouchableOpacity, Modal, Pressable, } from 'react-native';
import SockJS from 'sockjs-client';
import { TextEncoder, TextDecoder } from 'text-encoding';
import ENDPOINTS from '../../config/endpoints';
import { Avatar, Caption, IconButton, Title, useTheme, } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MessageList from '../../components/MessageList';
import { handleError } from '../../utils/handleError';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const Chat = ({ navigation, route }) => {
  const { userIdSend, userIdTo, avatarTo, nameTo, status } = route.params; // Nhận userId và receiverId từ màn hình trước ( route.params)
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('')
  const [newMessage, setNewMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [reload, setReload] = useState(false)
  const theme = useTheme();

  const fetchMessages = async () => {
    try {
      let response;
      if (status == false) {
        response = await fetch(
          `${ENDPOINTS.CHAT.MESSAGE}/${userIdSend}/${userIdTo}`,
        );
      } else {
        response = await fetch(
          `${ENDPOINTS.CHAT.USER_CONVERSATION}/${userIdSend}/${userIdTo}`,
        );
        console.log(`Da goi endpoints ${ENDPOINTS.CHAT.USER_CONVERSATION}/${userIdSend}/${userIdTo}}`)
      }

      // Kiểm tra xem phản hồi có thành công không
      if (!response.ok) {
        const errorText = await response.text(); // Lấy nội dung phản hồi
        console.error('Error response:', errorText); // Ghi lại phản hồi
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      const transformedData = transformMessages(data); // Chuyển đổi dữ liệu
      setMessages(transformedData); // Lưu tin nhắn vào state
    } catch (error) {
      handleError(error); // Gọi hàm handleError để xử lý lỗi
    }
  };

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

          setMessages(prevMessages => {
            [...prevMessages, receivedMessage]
            setReload(()=>!reload)
          });

          // Cập nhật danh sách tin nhắn khi nhận được phản hồi từ server
          // setMessages(prevMessages => {
          //   // Kiểm tra xem tin nhắn đã gửi có khớp với tin nhắn nhận được không
          //   const isMessageSent = prevMessages.some(msg => msg.content === receivedMessage.content);
          //   if (!isMessageSent) {
          //     setError("Message sent unsuccessfully")
          //     // return [...prevMessages, receivedMessage];
          //   } else {
          //     // Nếu khớp, xóa tin nhắn cuối cùng (tin nhắn tạm thời)
          //     const updatedMessages = prevMessages.filter(msg => msg.content !== receivedMessage.content);
          //     // Thêm tin nhắn nhận được từ server vào danh sách
          //     return [...updatedMessages, receivedMessage];
          //   }
          //   setReload(true)
          // });
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
    fetchMessages();
  }, [status, userIdSend, userIdTo, reload]);

  // Gửi tin nhắn qua WebSocket
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        userIdSend: userIdSend,
        userIdTo: userIdTo,
        content: newMessage,
        type: status,
      };

      // Tạo ID tạm thời cho tin nhắn
      // const messageWithContent = {
      //   ...message,
      //   userIdSend: userIdSend,
      //   content: message.content, // Tạo ID tạm thời cho tin nhắn
      //   sentTime: new Date().toISOString(), // Thêm thời gian tạo
      //   visible: true, // Đặt trạng thái là visible
      // }

      // Thêm tin nhắn vào danh sách tin nhắn trước khi gửi
      // setMessages(prevMessages => {
      //   if (Array.isArray(prevMessages)) {
      //     return [...prevMessages, messageWithContent];
      //   } else {
      //     console.error('prevMessages is not an array:', prevMessages);
      //     return [messageWithContent]; // Trả về một mảng mới chỉ chứa message
      //   }
      // });

      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
      setNewMessage('');
    }
  };

  // phương thức chuyển đổi
  const transformMessages = (data) => {
    return data.map(item => ({
      id: item.id.toString(), // Chuyển đổi groupChatId thành chuỗi để làm id
      content: item.content,
      sentTime: item.createdAt, // Sử dụng createdAt làm sentTime
      receivedTime: item.createdAt, // Có thể sử dụng cùng một giá trị cho receivedTime
      isRead: item.visible, // Sử dụng visible để xác định trạng thái đã đọc
      senderId: item.userIdSend, // Sử dụng userIdSend
    }));
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <MessageList messages={messages} myId={userIdSend} error={error} />
      <View className="flex-row items-center p-1 bg-slate-200 rounded-full m-2">
        <Pressable className="rounded-full bg-blue-500 p-2"
          onPress={() => navigation.navigate('(camera)')}>
          <FontAwesome name="camera" size={20} color='white' />
        </Pressable>
        <TextInput
          className="flex-1  rounded-lg px-3 py-2"
          placeholder="Message..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage} // Gửi tin nhắn khi nhấn Enter
        />
        <Pressable className="ml-2">
          <Feather name="image" size={24} />
        </Pressable>
        <Pressable className="mx-2">
          <MaterialCommunityIcons name="sticker-emoji" size={24} />
        </Pressable>
        <Pressable className="mx-2"
          onPress={sendMessage}>
          <Ionicons name="send" size={24} color='#1DA1F2' />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;