import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import ENDPOINTS from '../../../config/endpoints';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isSearchUser, setIsSearchUser] = useState(true);
  const [isSearchPost, setIsSearchPost] = useState(false);
  const [content, setContent] = useState('');
  const {tokenContext, idContext} = useContext(AuthContext);
  const navigation = useNavigation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  async function findUsername(content) {
    try {
      console.log('Token: ', tokenContext);
      const endpoint = ENDPOINTS.SEARCH.FIND_USERNAME;
      const response = await axios.get(
        endpoint + '?content=' + content + '&id=' + idContext,
        {
          headers: {Authorization: `Bearer ${tokenContext}`},
        },
      );
      if (response.data.code === 200) {
        setUsers(response.data.result);
        console.log(users);
      }
    } catch (error) {
      console.log('Error search: ', error);
    }
  }

  async function findPost(content) {
    try {
      const endpoint = ENDPOINTS.SEARCH.FIND_POST;
      const response = await axios.get(endpoint + '?content=' + content, {
        headers: {Authorization: `Bearer ${tokenContext}`},
      });
      if (response.data.code === 200) {
        setPosts(response.data.result);
      }
    } catch (error) {
      console.log('Error search: ', error);
    }
  }

  const handleTabClick = tab => {
    if (tab === 'user') {
      setIsSearchUser(true);
      setIsSearchPost(false);
      setContent('');
    } else if (tab === 'post') {
      setIsSearchUser(false);
      setIsSearchPost(true);
      setContent('');
    }
  };

  const handleSearch = () => {
    if (isSearchUser) {
      findUsername(content);
    }

    if (isSearchPost) {
      findPost(content);
    }
  };

  const renderItem = ({item}) => {
    const handlePressUser = () => {
      navigation.navigate('ProfileLayout', {user: item});
    };
    const handlePressPost = () => {};
    return (
      <TouchableOpacity
        onPress={isSearchUser ? handlePressUser : handlePressPost}>
        <View style={styles.userContainer}>
          <Image
            source={
              item.avatar
                ? {uri: item.avatar}
                : require('../../../assets/avatarDefine.jpg')
            }
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>{item.username}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onSuccess = e => {
    setIsCameraOpen(false);
    Linking.openURL(e.data).catch(err => console.log('Scan error: ', err));
  };

  const openCamera = () => {
    setIsCameraOpen(!isCameraOpen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={24}
          color="#fff"
          style={styles.backIcon}
        />
        <TextInput
          placeholder="Tìm kiếm"
          placeholderTextColor="#666"
          value={content}
          onChangeText={setContent}
          onEndEditing={handleSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={openCamera} style={styles.cameraButton}>
          <Text style={{color: '#000'}}>C</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Text
          style={[styles.tab, isSearchUser && styles.activeTab]}
          onPress={() => handleTabClick('user')}>
          Tài khoản
        </Text>
        <Text
          style={[styles.tab, isSearchPost && styles.activeTab]}
          onPress={() => handleTabClick('post')}>
          Bài viết
        </Text>
      </View>

      {/* User List */}
      <FlatList
        data={isSearchUser ? users : posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có kết quả</Text>
        }
      />

      <Modal visible={isCameraOpen} animationType="slide">
        <QRCodeScanner
          onRead={onSuccess}
          showMarker={true}
          topContent={<Text style={styles.cameraText}>Quét mã QR</Text>}
          bottomContent={
            <TouchableOpacity
              onPress={openCamera}
              style={styles.closeCameraButton}>
              <Text style={styles.closeCameraText}>Đóng</Text>
            </TouchableOpacity>
          }
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  backIcon: {
    marginRight: 10,
    color: '#000',
  },
  cameraButton: {
    marginLeft: 10,
    padding: 5,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    color: '#000',
    fontSize: 16,
    marginRight: 15,
  },
  activeTab: {
    color: '#000',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 15,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    color: '#333',
  },
  followers: {
    color: '#555',
    fontSize: 12,
  },
  emptyText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  cameraText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  closeCameraButton: {
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 5,
  },
  closeCameraText: {
    color: '#fff',
    fontSize: 14,
  },
});
