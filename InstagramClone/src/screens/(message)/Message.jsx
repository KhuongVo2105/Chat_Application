import { useCallback, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DividerWithText from './DividerWithText';
import { AuthContext } from '../../context/AuthContext';
import ENDPOINTS from '../../config/endpoints';
import axios from 'axios';

const Message = () => {

  const { tokenContext, usernameContext } = useContext(AuthContext)

  const [userId, setUserId] = useState('3ec64a1e-19a6-424f-934d-689a2c73e39c');
  const [listMessage, setListMessage] = useState('');
  const [listFollowing, setListFollowing] = useState('');
  // const [idContext] = useContext(AuthContext); //id nguoi dung
  // const [usernameContext] = useContext(AuthContext); //ten nguoi dung

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          // Gọi hai API song song
          const [response1, response2] = await Promise.all([
            axios.get(`${ENDPOINTS.CHAT.MESSAGE_LIST}?userIdSend=${userId}`), // Gọi API danh sách tin nhắn
            axios.post(ENDPOINTS.CHAT.FOLLOWING, 
              { username: usernameContext }, // Gửi payload JSON
              {
                headers: { 'Authorization': `Bearer ${tokenContext}` }, // Thêm Bearer token vào header
              }
            ),
          ]);
  
          // Lưu dữ liệu vào state
          setListMessage(response1.data); // Lấy dữ liệu từ response1
          setListFollowing(response2.data); // Lấy dữ liệu từ response2
        } catch (error) {
          console.error('Error fetching APIs:', error);
        }
      };
  
      fetchData();
    }, [userId]), // Thay đổi user
  );

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() =>
          navigation.navigate('Chat', {
            userIdSend: userId, //thay đổi user
            userIdTo: item.userIdTo,
            avatarTo: item.avatar,
            nameTo: item.name,
          })
        }>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.messageRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text style={styles.lastMessage}>
            {item.visible && item.lastMessage
              ? `bạn:${item.lastMessage}`
              : item.lastMessage || 'Không có tin nhắn'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderFollowing = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.userContainerF}
        onPress={() =>
          navigation.navigate('Chat', {
            userIdSend: userId, //Thay đổi user
            userIdTo: item.id,
            avatarTo: item.avatar,
            nameTo: item.username,
          })
        }>
        <Image source={{ uri: item.avatar }} style={styles.avatarF} />
      </TouchableOpacity>
    </View>
  );

  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/**/}
      <View>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={require('../../assets/icon_back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* đổi tên thành usernameContext*/}
        <Text style={styles.username}>NTN</Text>
      </View>
      <View style={styles.containerLine}>
        <DividerWithText text="Người Theo Dõi" />
      </View>
      <View style={styles.containerFollow}>
        <Image
          source={require('../../assets/icons--instagram.png')}
          style={styles.iconF}
        />
        <FlatList
          data={listFollowing}
          renderItem={renderFollowing}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/**/}
      <View style={styles.containerLine}>
        <DividerWithText text="Tin Nhắn" />
      </View>
      <FlatList
        data={listMessage}
        renderItem={renderItem}
        keyExtractor={item => item.userIdTo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  containerLine: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  containerFollow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconF: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 30,
  },
  userContainer: {
    flexDirection: 'row',
    backgroundColor: '#efeded',
    padding: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#c0bdbd',
  },
  userContainerF: {
    backgroundColor: '#fdfbfb',
    marginLeft: 10,
    borderBottomColor: '#eee',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    paddingBottom: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  username: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  avatarF: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 5,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#131313',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default Message;
