import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Message from './Message';

const MessageList = ({ messages, myId, error }) => {

  // const mockMessages = [
  //   {
  //     id: 'msg001',
  //     content: 'Hello everyone!',
  //     sentTime: '2023-10-01T10:00:00Z',
  //     receivedTime: '2023-10-01T10:00:01Z',
  //     isRead: true,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg002',
  //     content: 'Hi! How are you?',
  //     sentTime: '2023-10-01T10:01:00Z',
  //     receivedTime: '2023-10-01T10:01:01Z',
  //     isRead: true,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg003',
  //     content: 'I am good, thanks! What about you?',
  //     sentTime: '2023-10-01T10:02:00Z',
  //     receivedTime: '2023-10-01T10:02:01Z',
  //     isRead: true,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg004',
  //     content: 'I am doing well too!',
  //     sentTime: '2023-10-01T10:03:00Z',
  //     receivedTime: '2023-10-01T10:03:01Z',
  //     isRead: true,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg005',
  //     content: 'What are your plans for today?',
  //     sentTime: '2023-10-01T10:04:00Z',
  //     receivedTime: '2023-10-01T10:04:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg006',
  //     content: 'I have a meeting later in the afternoon.',
  //     sentTime: '2023-10-01T10:05:00Z',
  //     receivedTime: '2023-10-01T10:05:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg007',
  //     content: 'Sounds good! Let’s catch up later.',
  //     sentTime: '2023-10-01T10:06:00Z',
  //     receivedTime: '2023-10-01T10:06:01Z',
  //     isRead: false,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg008',
  //     content: 'I was thinking of going for a walk in the park.',
  //     sentTime: '2023-10-01T10:07:00Z',
  //     receivedTime: '2023-10-01T10:07:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg009',
  //     content: 'That sounds nice! The weather is perfect today.',
  //     sentTime: '2023-10-01T10:08:00Z',
  //     receivedTime: '2023-10-01T10:08:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg010',
  //     content: 'Yes, I love sunny days like this.',
  //     sentTime: '2023-10-01T10:09:00Z',
  //     receivedTime: '2023-10-01T10:09:01Z',
  //     isRead: false,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg011',
  //     content: 'Do you want to join me for a coffee after the walk?',
  //     sentTime: '2023-10-01T10:10:00Z',
  //     receivedTime: '2023-10-01T10:10:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg012',
  //     content: 'Sure! I would love that.',
  //     sentTime: '2023-10-01T10:11:00Z',
  //     receivedTime: '2023-10-01T10:11:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg013',
  //     content: 'What time do you want to meet?',
  //     sentTime: '2023-10-01T10:12:00Z',
  //     receivedTime: '2023-10-01T10:12:01Z',
  //     isRead: false,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg014',
  //     content: 'How about 3 PM? Does that work for you?',
  //     sentTime: '2023-10-01T10:13:00Z',
  //     receivedTime: '2023-10-01T10:13:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg015',
  //     content: '3 PM sounds perfect! I’ll see you then.',
  //     sentTime: '2023-10-01T10:14:00Z',
  //     receivedTime: '2023-10-01T10:14:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg016',
  //     content: 'Great! I’ll bring some snacks too.',
  //     sentTime: '2023-10-01T10:15:00Z',
  //     receivedTime: '2023-10-01T10:15:01Z',
  //     isRead: false,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg017',
  //     content: 'Awesome! I love snacks.',
  //     sentTime: '2023-10-01T10:16:00Z',
  //     receivedTime: '2023-10-01T10:16:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg018',
  //     content: 'What kind of snacks are you thinking of bringing?',
  //     sentTime: '2023-10-01T10:17:00Z',
  //     receivedTime: '2023-10-01T10:17:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg019',
  //     content: 'Maybe some chips and cookies? They are always a hit!',
  //     sentTime: '2023-10-01T10:18:00Z',
  //     receivedTime: '2023-10-01T10:18:01Z',
  //     isRead: false,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg020',
  //     content: 'Sounds delicious! I can’t wait.',
  //     sentTime: '2023-10-01T10:19:00Z',
  //     receivedTime: '2023-10-01T10:19:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg021',
  //     content: 'Me too! It’s going to be a fun day.',
  //     sentTime: '2023-10-01T10:20:00Z',
  //     receivedTime: '2023-10-01T10:20:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg022',
  //     content: 'By the way, have you guys seen the new cafe that opened nearby?',
  //     sentTime: '2023-10-01T10:21:00Z',
  //     receivedTime: '2023-10-01T10:21:01Z',
  //     isRead: false,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg023',
  //     content: 'Yes! I heard they have amazing coffee and pastries.',
  //     sentTime: '2023-10-01T10:22:00Z',
  //     receivedTime: '2023-10-01T10:22:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg024',
  //     content: 'We should definitely check it out after our walk.',
  //     sentTime: '2023-10-01T10:23:00Z',
  //     receivedTime: '2023-10-01T10:23:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg025',
  //     content: 'That’s a great idea! I’m looking forward to it.',
  //     sentTime: '2023-10-01T10:24:00Z',
  //     receivedTime: '2023-10-01T10:24:01Z',
  //     isRead: false,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg026',
  //     content: 'Me too! It’s going to be a fun outing.',
  //     sentTime: '2023-10-01T10:25:00Z',
  //     receivedTime: '2023-10-01T10:25:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg027',
  //     content: 'Let’s make sure to take some pictures while we’re out!',
  //     sentTime: '2023-10-01T10:26:00Z',
  //     receivedTime: '2023-10-01T10:26:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  //   {
  //     id: 'msg028',
  //     content: 'Absolutely! I love capturing moments.',
  //     sentTime: '2023-10-01T10:27:00Z',
  //     receivedTime: '2023-10-01T10:27:01Z',
  //     isRead: false,
  //     senderId: '001',
  //   },
  //   {
  //     id: 'msg029',
  //     content: 'Same here! It’ll be a great memory.',
  //     sentTime: '2023-10-01T10:28:00Z',
  //     receivedTime: '2023-10-01T10:28:01Z',
  //     isRead: false,
  //     senderId: '002',
  //   },
  //   {
  //     id: 'msg030',
  //     content: 'Looking forward to our little adventure!',
  //     sentTime: '2023-10-01T10:29:00Z',
  //     receivedTime: '2023-10-01T10:29:01Z',
  //     isRead: false,
  //     senderId: '003',
  //   },
  // ];
  // const mockError = [
  //   { id:'', title: ''}
  // ]
  // const myId = '001'

  const renderItem = ({ item }) => (
    <View className="mx-2 my-1 ">
      <Message message={item.content} fromMe={item.fromMe} receivedTime={item.sentTime} error={error} />
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: 'column-reverse',
        }}
      />
    </View>
  );
}

export default MessageList

const styles = StyleSheet.create({})