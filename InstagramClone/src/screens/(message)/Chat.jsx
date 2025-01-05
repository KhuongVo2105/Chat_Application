import React, {useState, useEffect} from 'react';
import {Stomp} from '@stomp/stompjs';
import {Client} from '@stomp/stompjs';
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
} from 'react-native';
import SockJS from 'sockjs-client';
import {createStackNavigator} from '@react-navigation/stack';

import {TextEncoder, TextDecoder} from 'text-encoding';
import {useNavigation} from '@react-navigation/native';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const Chat = ({route}) => {
  const {userIdSend, userIdTo, avatarTo, nameTo, status} = route.params; // Nhận userId và receiverId từ màn hình trước ( route.params)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);

  // Kết nối WebSocket
  useEffect(() => {
    const socket = new SockJS('http://172.16.0.122:8080/ws');
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
            `http://172.16.0.122:8080/messages/${userIdSend}/${userIdTo}`,
          );
        } else {
          response = await fetch(
            `http://172.16.0.122:8080/messages/group/${userIdSend}/${userIdTo}`,
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
      setMessages(prevMessages => [...prevMessages, message]);
      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(message),
      });
      setNewMessage('');
    }
  };

  // Render mỗi tin nhắn
  const renderItem = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.userIdSend === userIdSend
          ? styles.sentMessage
          : styles.receivedMessage,
      ]}>
      {item.userIdSend !== userIdSend &&
        (status === false ? (
          <Image source={{uri: avatarTo}} style={styles.avatar} />
        ) : (
          <Image source={{uri: item.avatar}} style={styles.avatar} />
        ))}
      <View
        style={[
          styles.messageBox,
          item.userIdSend === userIdSend
            ? styles.sentMessageBox
            : styles.receivedMessageBox,
        ]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
      {/*Ảnh đại diện của người dùng*/}
      {/*{item.userIdSend === userIdSend && (*/}
      {/*  <Image source={{uri: avatarTo}} style={styles.avatar} />*/}
      {/*)}*/}
    </View>
  );

  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.headerChat}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        {status === false ? (
          <Image source={{uri: avatarTo}} style={styles.avatarHeader} />
        ) : (
          <Image
            source={require('../../assets/chatGroup.png')}
            style={styles.avatarHeader}
          />
        )}
        <Text style={styles.nameTo}>{nameTo}</Text>
      </View>
      <View style={styles.horizontalLine} />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn ..."
        />
        <View style={styles.buttonSend}>
          <Button title="Gửi" onPress={sendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  sentMessage: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 15,
  },
  messageBox: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  sentMessageBox: {
    backgroundColor: '#3e99fd',
    alignSelf: 'flex-end',
  },
  buttonSend: {
    borderRadius: 50,
    margin: 5,
    marginTop: 10,
  },
  receivedMessageBox: {
    backgroundColor: '#85b0c4',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#111111',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
  },
  headerChat: {
    flexDirection: 'row',
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    paddingBottom: 0,
  },
  icon: {
    width: 30,
    height: 30,
  },
  avatarHeader: {
    width: 40,
    height: 40,
    marginTop: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  nameTo: {
    fontWeight: 'bold',
    color: '#050505',
    marginTop: 15,
    marginLeft: 10,
    fontSize: 20,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#a9a8a8',
    marginTop: 10,
  },
});

export default Chat;
