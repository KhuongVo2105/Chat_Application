import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import ENDPOINTS from '../../config/endpoints';
import {AuthContext} from '../../context/AuthContext';
import {TextInput, useTheme} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const User = {
  username: '', // String
  avatar: '', // String
  bio: '', // String
};

export const UpdateUser = {
  username: '', // String
  newUsername: '', // String
  privacy: 0, // Number (e.g., 0 or 1)
};

function EditProfile({navigation}) {
  const theme = useTheme();

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const {tokenContext, usernameContext} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('Name');
  const [username, setUsername] = useState('Username');
  const [bio, setBio] = useState('');
  const [updateUserData, setUpdateUserData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]); // Lưu hình ảnh đã chọn
        console.log('Selected Image:', response.assets[0]);
      } else {
        console.error('ImagePicker Error: ', response.errorMessage);
      }
    });
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('username', userData.username); // Thay thế bằng username thực tế
    formData.append('file', {
      uri: selectedImage.uri,
      type: selectedImage.type || 'image/jpeg', // Đặt loại tệp tin mặc định
      name: selectedImage.fileName || 'photo.jpg', // Tên tệp tin mặc định
    });

    try {
      const endpoint = ENDPOINTS.USER.UPDATE_AVATAR;
      console.log(`updateAvatar: ${endpoint}`);
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert(
        'Success',
        response.data.message || 'Image uploaded successfully!',
      );
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const handleUpdate = async () => {
    const endpoint = ENDPOINTS.USER.UPDATE_USER_PROFILE;
    console.log(`updateUser: ${endpoint}`);
    const response = await axios.post(endpoint, updateUserData);
    if (response.status === 200) {
      console.log('result : ', response.data.username);
      userData.username = response.data.username;
      navigation.navigate('Profile');
    } else {
      Alert.alert('Error', 'Update error');
      throw new Error('Update error');
    }
  };

  const handleUploadAvatar = () => {};

  useEffect(() => {
    const getUserInfo = async () => {
      // Kiểm tra token có tồn tại không
      if (!tokenContext) {
        Alert.alert('Error', 'No user token found', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'), // Chuyển về trang Login nếu không có token
          },
        ]);
        return;
      }
      try {
        const endpoint = ENDPOINTS.USER.MY_INFORMATION;
        console.log(`getUser: ${endpoint}`);
        console.log(`token: ${tokenContext}`);
        const response = await axios.post(
          endpoint,
          {},
          {
            headers: {
              Authorization: `Bearer ${tokenContext}`, // Gửi token theo định dạng Bearer
            },
          },
        );

        // Kiểm tra mã code trong phản hồi
        if (response.status === 200) {
          // Token hợp lệ, xử lý dữ liệu người dùng
          console.log('result : ', response.data.result);
          const user = response.data.result;
          setUserData({
            username: user.username,
            avatar: user?.avatar,
            bio: user?.bio,
          });
          setUpdateUserData({
            username: user.username,
            newUsername: user?.username,
            privacy: 0,
          });
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user data', err);
        Alert.alert('Error', 'Failed to fetch user data. Please try again.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [tokenContext, navigation]);

  return (
    <ScrollView
      className="w-100 bg-white py-4"
      horizontal={false}
      showsVerticalScrollIndicator={false}>
      <View className="w-96 mx-auto">
        <View style={styles.editAvatar}>
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
          <TouchableOpacity
            // onPress={handleUploadAvatar}
            onPress={selectImage}>
            <Text style={{color: '#0095f6', fontSize: 15, fontWeight: 500}}>
              Chỉnh sửa ảnh hoặc avatar
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            className="mb-3"
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
            theme={theme}
            mode="outlined"
          />

          <TextInput
            className="mb-3"
            label="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            mode="outlined"
          />

          <TextInput
            className="mb-3"
            label="Bio"
            value={bio}
            onChangeText={text => setBio(text)}
            mode="outlined"
          />

          {/* <Text className="text-lg font-normal">
            Banners
          </Text> */}

          {/* Genre */}
          {/* <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={[
              { label: 'male', value: 'male' },
              { label: 'female', value: 'female' },
              { label: 'other', value: 'other' },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
          /> */}

          <Pressable className="w-full p-2 border-b border-b-neutral-400">
            <Text className="text-base text-sky-500">
              Switch to professinal account
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  editAvatar: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: 'black',
  },
});

export default EditProfile;
