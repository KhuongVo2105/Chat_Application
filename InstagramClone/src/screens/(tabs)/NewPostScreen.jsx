import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ENDPOINTS from '../../config/endpoints';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';

const NewPostScreen = () => {
  const [media, setMedia] = useState([]);
  const [text, setText] = useState('');
  const {tokenContext} = useContext(AuthContext);
  const navigation = useNavigation();

  const pickMedia = async () => {
    const options = {
      mediaType: 'mixed',
      maxWidth: 800,
      maxHeight: 600,
      quality: 0.8,
      selectionLimit: 0,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else {
        const selectedMedia = response.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
          fileName: asset.fileName,
          width: asset.width,
          height: asset.height,
        }));

        setMedia([...media, ...selectedMedia]);
      }
    });
  };

  const handleCreatePost = async () => {
    navigation.navigate('Home');
    const userInfoEndpoint = ENDPOINTS.USER.MY_INFORMATION;
    const userInfoResponse = await axios.post(
      userInfoEndpoint,
      {},
      {
        headers: {Authorization: `Bearer ${tokenContext}`},
      },
    );
    const user = userInfoResponse.data.result;

    const newPost = {
      caption: text,
      user: {
        id: user.id,
      },
    };

    const endpoint = ENDPOINTS.POST.ADD;
    try {
      const introspectResponse = await axios.post(ENDPOINTS.AUTH.INTROSPECT, {
        token: tokenContext,
      });

      if (
        introspectResponse.data.code === 200 &&
        introspectResponse.data.result.valid
      ) {
        const responseCreateNewPost = await axios.post(endpoint, newPost, {
          headers: {Authorization: `Bearer ${tokenContext}`},
        });

        const postId = responseCreateNewPost.data.result.id;
        var newMedia = [];

        var formData = new FormData();
        media.forEach(values => {
          formData.append('fileUpload', {
            uri: values.uri,
            type: values.type,
            name: values.fileName,
          });
          newMedia.push({
            mediaUrl: values.uri,
            post: {
              id: postId,
            },
          });
        });

        // thêm ảnh vào db
        await axios.post(ENDPOINTS.MEDIA.ADD, newMedia, {
          headers: {Authorization: `Bearer ${tokenContext}`},
        });

        // thêm ảnh vào cloudinary
        await axios.post(ENDPOINTS.CLOUDINARY.ADD_MULTIPLE, formData, {
          params: {
            userId: user.id,
            postId: postId,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${tokenContext}`,
          },
        });

        Alert.alert('Đăng bài thành công');
        setMedia([]);
        setText('');
      } else {
        Alert.alert('Đăng bài thất bại');
      }
    } catch (error) {
      Alert.alert('Có lỗi xảy ra', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Tạo Bài Viết</Text>

          <Button
            title="Đăng"
            onPress={() => handleCreatePost()}
            disabled={text || media.length != 0 ? false : true}
          />
        </View>

        {media.length <= 0 ? (
          <View style={styles.imageLayout}>
            <Ionicons name="images-outline" size={150} />
          </View>
        ) : null}

        <ScrollView horizontal style={styles.imageScroll}>
          {media.map((values, index) =>
            values ? (
              values.type.includes('image') ? (
                <Image
                  key={index}
                  source={{uri: values.uri}}
                  style={styles.image}
                />
              ) : values.type.includes('video') ? (
                <Video
                  key={index}
                  style={styles.selectedVideo}
                  source={{uri: values.uri}}
                  controls={true}
                  resizeMode="contain"
                  onBuffer={this.onBuffer}
                  onError={this.videoError}
                />
              ) : null
            ) : null,
          )}
        </ScrollView>

        <Button
          title="Thêm"
          onPress={pickMedia}
          style={styles.imagePickerButton}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Bạn đang nghĩ gì?"
          multiline={true}
          value={text}
          onChangeText={value => setText(value)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageScroll: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 8,
    borderRadius: 8,
  },
  selectedVideo: {
    width: 300,
    height: 300,
    marginRight: 8,
    borderRadius: 8,
  },
  imageLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 300,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  imagePickerButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  textInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    height: 190,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  imageLayoutIcon: {
    display: 'flex',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
});

export default NewPostScreen;
