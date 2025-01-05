import React, { useCallback, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import images from '../../config/images';
import { useState, useEffect } from 'react';
import { IconUserProfile } from '../../components/IconComponents';
import { AuthContext } from '../../context/AuthContext';
import ENDPOINTS from '../../config/endpoints';
import axios from 'axios';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';

const Home = ({ navigation, route }) => {
  const {
    tokenContext,
    setIdContext,
    idContext,
    setUsernameContext,
    setEmailContext,
    setCreatedAtContext,
    setBirthdayContext,
    setPrivacyContext,
    setStatusContext,
    setRoleContext,
  } = useContext(AuthContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newCaption, setNewCaption] = useState();
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [yourComment, setYourComment] = useState();
  const [medias, setMedias] = useState([]);
  const [follow, setFollow] = useState([]);
  const [posts, setPosts] = useState([]);
  const [foldersCloudinary, setFoldersCloudinary] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedEditPostId, setSelectedEditPostId] = useState(null);
  const [user, setUser] = useState();
  const isFocused = useIsFocused();

  const fetchData = async () => {
    if (!tokenContext) {
      console.log('Token is not available');
      return;
    } else console.log('Token is existed:', tokenContext);

    try {
      const endpoint = ENDPOINTS.USER.MY_INFORMATION;
      const response = await axios.post(
        endpoint, // URL
        {}, // Request body (ở đây là rỗng vì không truyền dữ liệu)
        {
          headers: {
            Authorization: `Bearer ${tokenContext}`,
          },
        },
      );
      console.log('\tLoad user profile is successfully');

      // Kiểm tra phản hồi từ server
      if (response.data.code === 200 && response.data.result) {
        const userInfo = response.data.result;
        console.log(`User information: ${JSON.stringify(userInfo, null, 2)}`);
        setUser(userInfo);
        // Lưu thông tin vào Context
        setIdContext(userInfo.id);
        setUsernameContext(userInfo.username);
        setEmailContext(userInfo.email);
        setCreatedAtContext(userInfo.createdAt);
        setBirthdayContext(userInfo.birthday);
        setPrivacyContext(userInfo.privacy);
        setStatusContext(userInfo.status);
        setRoleContext({ roles: userInfo.roles });

        console.log('User information loaded successfully.');

        // Gọi API lấy danh sách following
        const getFollowingEndpoint = ENDPOINTS.FOLLOW.GET_FOLLOWING;
        try {
          const followingResponse = await axios.post(
            getFollowingEndpoint,
            userInfo,
            {
              headers: { Authorization: `Bearer ${tokenContext}` },
            },
          );
          var followingList = followingResponse.data.result;
          setFollow(followingList);
          console.log('followingList');
          console.log(followingList);

          if(followingList === undefined){
            followingList = []
          }

          // Lấy danh sách post dựa trên following
          const followingUserIds = followingList.map(value => ({
            id: value.followingUser.id,
          }));
          followingUserIds.push({ id: userInfo.id }); // Thêm chính người dùng hiện tại

          const findAllMultipleUserEndpoint = ENDPOINTS.POST.FIND_ALL_MULTIPLE_USER;
          const postResponse = await axios.post(
            findAllMultipleUserEndpoint,
            followingUserIds,
            {
              headers: { Authorization: `Bearer ${tokenContext}` },
            },
          );

          const postsResponse = postResponse.data.result;
          const visiblePosts = postsResponse.filter(post => post.visible == 1);
          setPosts(visiblePosts);

          // Lấy media dựa trên các post đã lấy
          let folders = [];
          visiblePosts.forEach(value => {
            const folder = 'posts/' + value.user.id + '/' + value.id;
            folders.push(folder);
          });

          setFoldersCloudinary(folders);

          const multipleMediaEndpoint = ENDPOINTS.CLOUDINARY.FIND_ALL_MULTIPLE;
          const mediaResponse = await axios.post(
            multipleMediaEndpoint,
            folders,
            {
              headers: { Authorization: `Bearer ${tokenContext}` },
            },
          );

          const mediasResponse = mediaResponse.data.result;

          setMedias(mediasResponse);
          console.log('mediaResponse');
          console.log(mediasResponse);
        } catch (error) {
          console.log('loi api');
        }
      } else {
        console.log('Unexpected response format:', response.data);
      }
    } catch (error) {
      // Xử lý lỗi
      if (error.response) {
        // Lỗi từ server (status code không phải 2xx)
        console.log(
          'Error from server:',
          error.message,
          '\n\t',
          error.response.data,
        );
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        console.log('No response received:', error.request);
      } else {
        // Lỗi khác khi thực hiện yêu cầu
        console.log('Error during request:', error.message);
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData(); // Lấy lại bài posts khi quay về màn hình Home
    }
  }, [isFocused]);

  const renderItem = ({ item: url, index: idxChild }) => {
    if (url.endsWith('.jpg') || url.endsWith('.png')) {
      return (
        <Image
          key={idxChild}
          source={{ uri: url }}
          style={styles.selectedImage}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Video
          key={idxChild}
          style={[styles.selectedVideo]}
          source={{ uri: url }}
          controls={true}
          resizeMode="contain"
          onBuffer={this.onBuffer}
          onError={this.videoError}
        />
      );
    }
  };

  const toggleModal = (postId, caption) => {
    setSelectedPostId(postId);
    setNewCaption(caption);
    setModalVisible(!isModalVisible);
  };

  const toggleModalEditPost = postId => {
    setModalEditVisible(!isModalEditVisible);
  };

  const handleEdit = async () => {
    setNewCaption('');
    console.log('Edit option clicked: ' + selectedPostId);
    console.log('new caption: ' + newCaption);
    const post = {
      id: selectedPostId,
      caption: newCaption,
    };

    const updateCaptionEndpoint = ENDPOINTS.POST.UPDATE_CAPTION;
    await axios.post(updateCaptionEndpoint, post, {
      headers: {
        Authorization: `Bearer ${tokenContext}`,
      },
    });
    fetchData();
    toggleModal();
    toggleModalEditPost();
  };

  const handleDelete = async () => {
    console.log('Delete option clicked: ' + selectedPostId);
    const post = {
      id: selectedPostId,
      visible: false,
    };

    const hiddenEndpoint = ENDPOINTS.POST.UPDATE_VISIBLE;
    await axios.post(hiddenEndpoint, post, {
      headers: {
        Authorization: `Bearer ${tokenContext}`,
      },
    });

    fetchData();
    toggleModal(); // Close modal after action
  };

  return (
    <View className="w-full h-full flex justify-center items-center bg-white">
      <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
        {/* new feeds */}
        <ScrollView
          className=""
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            seen={false}
            source={require('./../../assets/portaits/portait_1.jpg')}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            seen={false}
            source={require('./../../assets/portaits/portait_2.jpg')}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require('./../../assets/portaits/portait_3.jpg')}
            seen={false}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require('./../../assets/portaits/portait_4.jpg')}
            seen={false}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require('./../../assets/portaits/portait_1.jpg')}
            seen={true}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require('./../../assets/portaits/portait_2.jpg')}
            seen={true}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require('./../../assets/portaits/portait_3.jpg')}
            seen={true}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require('./../../assets/portaits/portait_4.jpg')}
            seen={true}
          />
        </ScrollView>

        {/* Post */}
        <View>
          {/* Hiển thị dữ liệu postsInUI */}
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <View className="flex flex-column w-full py-3" key={post.id}>
                {/* Header post */}
                <View className="flex flex-row w-full justify-between items-center px-3 mb-3">
                  {/* Header left */}
                  <TouchableOpacity className="flex flex-row items-center">
                    <IconUserProfile
                      containerStyles="mr-2"
                      width={41}
                      height={41}
                      source={require('./../../assets/portaits/portait_3.jpg')}
                      seen={false}
                    />

                    <View className="flex flex-column">
                      <View className="flex flex-row items-center">
                        <Text className="font-semibold text-lg">
                          {post.user.username}
                        </Text>
                        <Image
                          className="ml-1"
                          source={images.icon_verify}
                          style={{ width: 25, height: 25 }}
                          resizeMode="contain"
                        />
                      </View>

                      {/* Sub title */}
                      <Text className="text-sm">This is subtitle</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Header right */}
                  <TouchableOpacity
                    onPress={() => toggleModal(post.id, post.caption)}
                    style={styles.optionsButton}>
                    <Image
                      source={images.icon_triple_dot}
                      style={{
                        width: 24,
                        height: 24,
                      }}
                    />
                  </TouchableOpacity>
                </View>

                {/* Modal */}
                <Modal
                  isVisible={isModalVisible}
                  onBackdropPress={() => setModalVisible(false)}
                  backdropOpacity={0.1}
                  style={styles.modal}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      onPress={() => toggleModalEditPost()}
                      style={styles.option}>
                      <Ionicons name="pencil-outline" size={20} />
                      <Text style={styles.optionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete()}
                      style={styles.option}>
                      <Ionicons name="trash-outline" size={20} color="red" />
                      <Text style={[styles.optionText, { color: 'red' }]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>

                {/* {Modal edit  post} */}
                <Modal
                  isVisible={isModalEditVisible}
                  onBackdropPress={() => setModalEditVisible(false)}
                  backdropOpacity={0.1}
                  style={styles.modal}>
                  <View style={styles.modalEditContent}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => setModalEditVisible(false)}>
                          <Ionicons
                            name="arrow-back-outline"
                            size={25}></Ionicons>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, marginLeft: 10 }}>
                          Sửa đổi
                        </Text>
                      </View>

                      <TouchableOpacity onPress={() => handleEdit()}>
                        <Ionicons name="checkmark-outline" size={25}></Ionicons>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      className="ml-1"
                      placeholder="Write a caption..."
                      onChangeText={newCaption => setNewCaption(newCaption)}
                      value={newCaption}
                    />
                  </View>
                </Modal>

                <View
                  style={{
                    flexl: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <FlatList
                    data={medias[index]} // Chỉ render danh sách media tương ứng với index
                    renderItem={renderItem}
                    keyExtractor={(item, idxChild) => `${index} ${idxChild}`}
                    horizontal
                    pagingEnabled
                    bounces={false}
                  />
                </View>

                {/* Footer post */}
                <View className="flex flew-column">
                  <View className="w-full flex flex-column justify-between px-3">
                    {/* React row */}
                    <View className="w-24 flex flex-row justify-between items-center mb-2">
                      <TouchableOpacity className="">
                        <Image
                          source={images.icon_notify}
                          style={styles.icons}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity className="">
                        <Image
                          source={images.icon_message}
                          style={{
                            width: 25,
                            height: 25,
                            transform: [{ scaleX: -1 }],
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity className="">
                        <Image
                          source={images.icon_share}
                          style={{
                            width: 25,
                            height: 25,
                          }}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Comment row */}
                    <Text className="w-full mb-2">{post.caption}</Text>
                    <View className="flex flex-row items-center">
                      <View className="w-8 h-8 overflow-hidden flex flex-row justify-center items-center">
                        {/* Hình ảnh chính (phía dưới) */}
                        <Image
                          className="absolute z-0 rounded-full" // Đặt dưới cùng với z-0
                          style={{ width: '85%', height: '85%' }}
                          resizeMode="cover"
                          source={require('./../../assets/portaits/portait_1.jpg')}
                        />
                      </View>
                      <TextInput
                        className="ml-1"
                        placeholder="Add a comment..."
                        onChangeText={comment => setYourComment(comment)}
                        value={yourComment}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.welcome}>
              Chào mừng bạn đến với chúng tôi. Hãy chia sẻ và kết nối với mọi
              người
            </Text>
          )}
        </View>
        {/* navigation bottom */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    height: 500,
    textAlign: 'center',
    fontSize: 20,
  },
  icons: {
    width: 28,
    height: 28,
  },
  selectedVideo: {
    width: 412,
    height: 600,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  selectedImage: {
    width: 393,
    height: 600,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  optionsButton: {
    padding: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalEditContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
export default Home;
