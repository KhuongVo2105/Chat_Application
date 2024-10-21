import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';

type MessageType = 'JOIN' | 'LEAVE' | 'CHAT';

interface ChatMessage {
  sender: string;
  content: string;
  type: MessageType;
}

const colors = ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#FF9800', '#39bbb0'];

const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const connect = () => {
    if (username.trim()) {
      const socket = new SockJS('http://localhost:8080/chat-application/chat');
      const client = new Client({
        webSocketFactory: () => socket,
        debug: str => console.log(str),
        onConnect: () => {
          client.subscribe('/topic/public', (msg: Message) => onMessageReceived(JSON.parse(msg.body)));
          client.publish({ destination: '/spring/chat.addUser', body: JSON.stringify({ sender: username, type: 'JOIN' }) });
          setIsConnected(true);
        },
        onWebSocketError: onError,
      });

      client.activate();
      setStompClient(client);
    }
  };

  const onMessageReceived = (msg: ChatMessage) => {
    setMessages(prevMessages => [...prevMessages, msg]);
  };

  const onError = () => {
    console.log('Could not connect to WebSocket server. Please try again later.');
  };

  const sendMessage = () => {
    if (message.trim() && stompClient) {
      const chatMessage: ChatMessage = { sender: username, content: message, type: 'CHAT' };
      stompClient.publish({ destination: '/spring/chat.sendMessage', body: JSON.stringify(chatMessage) });
      setMessage('');
    }
  };

  const getAvatarColor = (messageSender: string): string => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  return (
    <View style={styles.container}>
      {!isConnected ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Enter your username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />
          <Button title="Enter Chat" onPress={connect} />
        </View>
      ) : (
        <View style={styles.chatContainer}>
          <Text style={styles.title}>Spring Socket Chat Demo</Text>
          <ScrollView style={styles.messageArea}>
            {messages.map((msg, index) => (
              <View key={index} style={styles.message}>
                {msg.type === 'JOIN' || msg.type === 'LEAVE' ? (
                  <Text>{msg.sender} {msg.type === 'JOIN' ? 'joined' : 'left'}!</Text>
                ) : (
                  <View style={styles.chatMessage}>
                    <View style={[styles.avatar, { backgroundColor: getAvatarColor(msg.sender) }]}>
                      <Text style={styles.avatarText}>{msg.sender[0]}</Text>
                    </View>
                    <View>
                      <Text style={styles.sender}>{msg.sender}</Text>
                      <Text style={styles.content}>{msg.content}</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  chatContainer: {
    flex: 1,
  },
  messageArea: {
    flex: 1,
  },
  message: {
    marginBottom: 10,
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
  },
});

export default Chat;
