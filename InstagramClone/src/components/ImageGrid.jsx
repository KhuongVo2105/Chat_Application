import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';
import { handleError } from '../utils/handleError';
import axios from 'axios';
import ENDPOINTS from '../config/endpoints';

const ImageGrid = ({ post }) => {

  const [foldersCloudinary, setFoldersCloudinary] = useState([])
  const [medias, setMedias] = useState([]);

  const { idContext, tokenContext } = useContext(AuthContext)

  const fetchMediaFromCloudinary = async (folders) => {
    const multipleMediaEndpoint = ENDPOINTS.CLOUDINARY.FIND_ALL_MULTIPLE;
    try {
      const mediaResponse = await axios.post(multipleMediaEndpoint, folders, {
        headers: { Authorization: `Bearer ${tokenContext}` },
      });
      return mediaResponse.data.result;
    } catch (error) {
      console.log(`Lỗi khi gọi API: ${multipleMediaEndpoint}`); // Log endpoint
      handleError(error);
    }
  };

  const fetchMedias = async () => {
    console.log('post avc', JSON.stringify(post))

    const folders = Object.values(post).map(value => `posts/${value.userId}/${value.id}`);
    console.log(folders); // Kết quả: ['posts/user1/202', 'posts/user2/252']
    // let folders = post.map(value => `posts/${value.user.id}/${value.id}`);
    console.log(`folders: ${folders}`)
    setFoldersCloudinary(folders);
    console.log(`folders111: ${folders}`)

    console.log('123')
    const mediasResponse = await fetchMediaFromCloudinary(folders);
    console.log('123')
    setMedias(mediasResponse.flat());
    console.log('mediaResponse', mediasResponse);
    console.log('medias.length: ', medias.length)
  }

  useEffect(() => {
    fetchMedias();
  }, [])

  const images = medias.map((uri, index) => ({
    id: index.toString(),
    uri,
    quantity: index + 1,
  }));

  console.log('Images for FlatList:', images);

  const Item = ({ quantity, uri }) => {
    console.log(`uri: ${uri}`); // This should log the correct URI
    return (
      <View className="relative flex-1 m-1 h-32">
        <Image
          className="w-full h-full rounded-lg"
          resizeMode="cover"
          source={{ uri }}
          onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
        />
        {quantity > 1 && (
          <View className="absolute top-2 left-2">
            <MaterialCommunityIcons name="layers" size={20} color="white" />
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => <Item quantity={item.quantity} uri={item.uri} />}
      keyExtractor={item => item.id}
      numColumns={3} // Đặt số cột là 3
      columnWrapperStyle={styles.columnWrapper} // Tùy chỉnh khoảng cách giữa các cột
    />
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    flex: 1, // Đảm bảo mỗi ô chiếm không gian đều
    margin: 1, // Khoảng cách giữa các ô
    height: Dimensions.get('window').width / 3, // Đảm bảo chiều cao của ô là hình vuông
  },
  title: {
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Căn giữa các cột
  },
});
