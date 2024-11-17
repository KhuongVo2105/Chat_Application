import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconUserProfile } from '../constants/IconComponents';
import { useNavigation } from '@react-navigation/native';

const CONVERSATIONS = [
  {
    id: 'HelloImKhuong2105',
    members: [{
      username: "LeLongbe",
      email: "21130436@st.hcmuaf.edu.vn",
      isLeader: false,
      createdAt: '2024-11-01'
    }],
    createdAt: '2024-11-01'
  },
  {
    id: 2,
    members: [
      {
        username: "JohnDoe",
        email: "johndoe@example.com",
        isLeader: true,
        createdAt: '2024-11-02'
      },
      {
        username: "JaneSmith",
        email: "janesmith@example.com",
        isLeader: false,
        createdAt: '2024-11-02'
      }
    ],
    createdAt: '2024-11-03'
  },
  {
    id: 3,
    members: [
      {
        username: "AliceBrown",
        email: "alicebrown@example.com",
        isLeader: false,
        createdAt: '2024-11-05'
      },
      {
        username: "BobGreen",
        email: "bobgreen@example.com",
        isLeader: true,
        createdAt: '2024-11-05'
      }
    ],
    createdAt: '2024-11-06'
  },
];

const Conversation = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="flex flex-row mb-3 w-96 mx-auto items-center"
      onPress={() => navigation.navigate('Conversation', { groupId: item.id })}
    >
      <IconUserProfile
        containerStyles=""
        width={60}
        height={60}
        seen={true}
        source={require('./../../assets/portaits/portait_1.jpg')}
      />
      <Text className="ml-3">{item.members[0].username}</Text>
    </TouchableOpacity>
  );
};

const Conversations = () => {

  return (
    <View>
      <FlatList
        data={CONVERSATIONS}
        renderItem={({ item }) => <Conversation item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default Conversations