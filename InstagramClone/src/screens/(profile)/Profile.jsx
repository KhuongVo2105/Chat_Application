import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {AuthContext} from '../../context/AuthContext';
import UserSuggestion from '../../components/UserSuggestion';
import ImageGrid from '../../components/ImageGrid';
import ENDPOINTS from '../../config/endpoints';
import {handleError} from '../../utils/handleError';
import QRCode from 'react-native-qrcode-svg';

export const User = {
  username: '',
  avatar: '',
};

const Profile = ({navigation, username, isUser}) => {
  const images = [
    {
      id: '1',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '2',
      quantity: 2,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '3',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
    {
      id: '4',
      quantity: 10,
      uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
    },
    {
      id: '5',
      quantity: 5,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '6',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '7',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '8',
      quantity: 2,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '9',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '10',
      quantity: 10,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '11',
      quantity: 5,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '12',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '13',
      quantity: 3,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '14',
      quantity: 4,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '15',
      quantity: 6,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
    {
      id: '16',
      quantity: 7,
      uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
    },
    {
      id: '17',
      quantity: 8,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '18',
      quantity: 9,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '19',
      quantity: 2,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '20',
      quantity: 3,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
    {
      id: '21',
      quantity: 4,
      uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
    },
    {
      id: '22',
      quantity: 5,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '23',
      quantity: 6,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '24',
      quantity: 7,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '25',
      quantity: 8,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
    {
      id: '26',
      quantity: 9,
      uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
    },
    {
      id: '27',
      quantity: 10,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '28',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '29',
      quantity: 2,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '30',
      quantity: 3,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
    {
      id: '31',
      quantity: 4,
      uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
    },
    {
      id: '32',
      quantity: 5,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '33',
      quantity: 6,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '34',
      quantity: 7,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '35',
      quantity: 8,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
    {
      id: '36',
      quantity: 9,
      uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
    },
    {
      id: '37',
      quantity: 10,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '38',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '39',
      quantity: 2,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '40',
      quantity: 3,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
    {
      id: '41',
      quantity: 4,
      uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
    },
    {
      id: '42',
      quantity: 5,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '43',
      quantity: 6,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '44',
      quantity: 7,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '45',
      quantity: 8,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
    {
      id: '46',
      quantity: 9,
      uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
    },
    {
      id: '47',
      quantity: 10,
      uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg',
    },
    {
      id: '48',
      quantity: 1,
      uri: 'https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg',
    },
    {
      id: '49',
      quantity: 2,
      uri: 'https://i.pinimg.com/736x/5d/7f/5f/5d7f5f33f763c18b03fc6cd9836a423d.jpg',
    },
    {
      id: '50',
      quantity: 3,
      uri: 'https://i.pinimg.com/736x/c6/12/8a/c6128ae7a90bed67e450fa6376891273.jpg',
    },
  ];

  const {tokenContext} = useContext(AuthContext);

  const [selectedItem, setSelectedItem] = useState('table');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [numPost, setNumPost] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);
  const [numFollower, setNumFollower] = useState(0);
  const [isOpenQR, setIsOpenQR] = useState(false);

  const handleSelectItem = item => {
    setSelectedItem(item);
  };

  async function fetchSuggestion() {}

  async function fetchPost() {
    const endpoint = ENDPOINTS.USER.GET_POST_BY_USERNAME;
    console.log(`Instagram-GET_POST_BY_USERNAME-endpoint: ${endpoint}`);
    try {
      const response = await axios.post(
        endpoint,
        {username: username},
        {headers: {Authorization: `Bearer ${tokenContext}`}},
      );
      const {result} = response.data;
      console.log(result);
      setNumPost(result.length);
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchMedia({postId}) {}

  async function renderPost() {}

  // const fetchFollower = async () => {
  //   const endpoint = ENDPOINTS.USER.GET_POST_BY_USERNAME
  //   console.log(`Instagram-GET_POST_BY_USERNAME-endpoint: ${endpoint}`);
  //   try {
  //     const response = await axios.post(
  //       endpoint,
  //       { "username": usernameContext },
  //       { headers: { Authorization: `Bearer ${tokenContext}` } }
  //     )
  //     const { result } = response.data;
  //     console.log(result)
  //     setNumPost(result.length)
  //   } catch (error) {
  //     handleError(error)
  //   }
  // }

  // const fetchFollowing = async ()=>{
  //   const endpoint = ENDPOINTS.USER.GET_POST_BY_USERNAME
  //   console.log(`Instagram-GET_POST_BY_USERNAME-endpoint: ${endpoint}`);
  //   try {
  //     const response = await axios.post(
  //       endpoint,
  //       { "username": usernameContext },
  //       { headers: { Authorization: `Bearer ${tokenContext}` } }
  //     )
  //     const { result } = response.data;
  //     console.log(result)
  //     setNumPost(result.length)
  //   } catch (error) {
  //     handleError(error)
  //   }
  // }

  useEffect(() => {
    setLoading(true);
    fetchPost(); // Gọi hàm fetchPost khi component được mount

    setLoading(false);
  }, []);
  
  return (
    <View>
      <ScrollView
        className="bg-white"
        horizontal={false}
        showsVerticalScrollIndicator={false}>
        <View className="w-96 mx-auto">
          <View className="mb-3" style={styles.header}>
            {userData?.avatar == null ? (
              <Image
                source={require('../../assets/avatarDefine.jpg')}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={require('../../assets/avatarDefine.jpg')}
                style={styles.avatar}
              />
            )}
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{numPost}</Text>
                <Text style={styles.statLabel}>posts</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{numFollower}</Text>
                <Text style={styles.statLabel}>followers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{numFollowing}</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>

          <Text className="text-sm text-slate-500 mb-3">
            Add your name and bio.
          </Text>

          {isUser  ?  (<View className="flex flex-row items-center mb-3">
            <Pressable
              className="flex-1 bg-gray-200 rounded-md py-1 mx-1"
              onPress={() => navigation.navigate('EditProfile')}>
              <Text className="text-base font-medium text-center">
                Edit profile
              </Text>
            </Pressable>
            <Pressable className="flex-1 bg-gray-200 rounded-md py-1 mx-1">
              <Text className="text-base font-medium text-center"
              onPress={() => {setIsOpenQR(true)}}>
                Share profile
              </Text>
            </Pressable>
            <Pressable className="flex-none size-1 p-1 mx-1">
              <FontAwesome6 name="user-plus" size={18}></FontAwesome6>
            </Pressable>
          </View>) :
            (<View>
              <Pressable className="flex-1 bg-blue-200 rounded-md py-1 mx-1">
              <Text className="text-base font-medium text-center"
              onPress={() => {setIsOpenQR(true)}}>
                follow
              </Text>
            </Pressable>
            </View>)
          }

          <View className="w-full flex mb-3">
            <View className="flex flex-row justify-between items-center mb-2">
              <Text className="text-base">Discover people</Text>
              <Pressable>
                <Text className="text-base text-blue-500">See all</Text>
              </Pressable>
            </View>
            <View className="w-full flex flex-row justify-between items-center">
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <UserSuggestion
                  username="JohnDoe"
                  caption="Suggested for you"
                  image="https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg"
                />
                <UserSuggestion
                  username="JaneSmith"
                  caption="Recommended for you Recommended for you Recommended for you"
                />
              </ScrollView>
            </View>
          </View>

          <View className="h-10 flex flex-row justify-between mb-2">
            <View className="flex-1 flex flex-row justify-center p-1">
              <Pressable
                className={`flex flex-row justify-center p-1 ${selectedItem === 'table' ? 'border-b-2 border-b-slate-400' : 'border-b-0'}`}
                onPress={() => handleSelectItem('table')}>
                <Fontisto
                  name="nav-icon-grid"
                  size={selectedItem === 'table' ? 22 : 20}
                />
              </Pressable>
            </View>
            <View className="flex-1 flex flex-row justify-center p-1">
              <Pressable
                className={`flex flex-row justify-center p-1 ${selectedItem === 'home' ? 'border-b-2 border-b-slate-400' : 'border-b-0'}`}
                onPress={() => handleSelectItem('home')}>
                <FontAwesome
                  name="home"
                  size={selectedItem === 'home' ? 24 : 22}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Grid */}
      <ImageGrid images={images} />
      {/* QR Code Modal */}
      <Modal visible={isOpenQR} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.qrContainer}>
            <QRCode
              value={`https://myapp_instagram.com/profile/${username}`}
              size={200}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsOpenQR(!isOpenQR)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
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
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'row', // Thêm flexDirection: 'row'
    flexWrap: 'wrap', // Cho phép các item xuống dòng nếu không đủ chỗ
    marginTop: 10,
    width: '105%',
    backgroundColor: 'black',
    marginHorizontal: -10,
  },
  postImage: {
    width: '33.3%',
    height: '33.3%',
    backgroundColor: '#ccc',
    aspectRatio: 1, // Tạo hình vuông
    borderWidth: 0.5,
  },

  btnEditProfile: {
    marginRight: 5,
    padding: 7,
    paddingHorizontal: 35,
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  explore: {
    marginTop: 20,
    marginBottom: 20,
  },
  item: {
    width: '50%',
    alignItems: 'center',
  },
  itemSelected: {
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1a73e8',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
