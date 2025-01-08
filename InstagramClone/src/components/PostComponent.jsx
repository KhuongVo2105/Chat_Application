import { Modal, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ImageCarousel from './ImageCarousel'
import { Avatar, useTheme } from 'react-native-paper';
import AvatarComponent from './AvatarComponent';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PostComponent = ({ post }) => {

  const { id, caption, user, images } = post;
  // mockdata
  // const mockData = [
  //   { id: '1', uri: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg' },
  //   { id: '2', uri: 'https://i.pinimg.com/736x/df/66/f6/df66f67e2b93b0cb15978281dc54f257.jpg' },
  //   { id: '3', uri: 'https://i.pinimg.com/736x/ba/ac/97/baac9746979cccdf09b9ea5b311f17fe.jpg' },
  // ];

  // const user = {
  //   avatar: 'https://i.pinimg.com/736x/b7/c2/31/b7c2314472307131946d9b255c3c06f7.jpg',
  //   username: 'KhuongVo2105'
  // }

  const mockPost = {
    id: id,
    caption: caption,
    user: user,
    images: images
  }
  // end mockdata

  const [isModalVisible, setModalVisible] = useState(false);
  const [newCaption, setNewCaption] = useState();
  const [isModalEditVisible, setModalEditVisible] = useState(false);

  const theme = useTheme()
  const sizeIcon = 40

  const [avatarSource, setAvatarSource] = useState(mockPost.user.avatar ? { uri: mockPost.user.avatar } : require('../assets/avatarDefine.jpg'));

  const handleError = () => {
    setAvatarSource(require('../assets/avatarDefine.jpg')); // Sử dụng ảnh mặc định khi có lỗi
  };

  const toggleModal = (postId, caption) => {
    setSelectedPostId(postId);
    setNewCaption(caption);
    setModalVisible(!isModalVisible);
  };

  return (
    <View className="mb-3">
      <View className="mx-3 flex flex-row items-center justify-start mb-2">
        <Avatar.Image size={sizeIcon} source={avatarSource} onError={handleError} />
        <Text className="flex-1 mx-3 text-base font-semibold">{mockPost.user.username}</Text>
        <Pressable className="px-2 py-1" onPress={() => setModalVisible(true)}>
          <Entypo name="dots-three-vertical" size={(sizeIcon / 2)} color={theme.colors.onSurface} />
        </Pressable>
      </View>
      <ImageCarousel images={mockPost.images} />
      <View className="flex flex-row items-center justify-start my-3 mx-3">
        <TouchableOpacity className="mx-2">
          <FontAwesome5 name="heart" size={(sizeIcon / 2) + 3} />
        </TouchableOpacity>
        <TouchableOpacity className="mx-2">
          <Feather name="send" size={(sizeIcon / 2) + 3} />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={2} className="text-light mx-6 mb-3">
        <Text className="font-semibold">{mockPost.user.username}  </Text>
        {mockPost.caption}
      </Text>

      {/* Modal show more */}
      {/* <Modal
        visible={isModalVisible}
        transparent={true} // Đặt transparent để không có backdrop
        animationType="slide" // Hoặc "fade" tùy thuộc vào hiệu ứng bạn muốn
      >
        <View className="flex-1 bg-transparent">
          <View className="flex items-center w-100 bg-yellow-400">
            <Pressable>
              <Text className="text-base font-medium ">
                Edit
              </Text>
            </Pressable>
            <Pressable>
              <Text className="text-base font-medium text-red-500">
                Delete
              </Text>
            </Pressable>
          </View>

        </View>
      </Modal> */}
    </View>
  )
}

export default PostComponent

const styles = StyleSheet.create({})