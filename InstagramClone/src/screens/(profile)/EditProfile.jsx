import React, {useState, useContext, useEffect, useLayoutEffect} from 'react';
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
import {Dialog, Portal, Switch, TextInput, useTheme} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {handleError} from '../../utils/handleError';

function EditProfile({navigation}) {
  const theme = useTheme();
  // Context
  const {
    tokenContext,
    idContext,
    usernameContext,
    setUsernameContext,
    avatarContext,
    setAvatarContext,
    privacyContext,
    setPrivacyContext,
  } = useContext(AuthContext);

  // Field user information
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  
  const [privacy, setPrivacy] = useState(true);
  const [avatar, setAvatar] = useState('');
  // Other
  const [loading, setLoading] = useState(true);
  const [visibleDialog, setVisibleDialog] = useState(false);
  useEffect(() => {
   if (avatarContext) {
    setAvatar(avatarContext);
   } 
  }, [avatarContext])
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0) {
        uploadImage(response.assets[0]);
      } else {
        console.error('ImagePicker Error: ', response.errorMessage);
      }
    });
    
  };

  const uploadImage = async (image) => {
    // if (!selectedImage) {
    //   Alert.alert('Please select an image first!');
    //   return;
    // }
    const formData = new FormData();
    formData.append('username', usernameContext); // Thay thế bằng username thực tế
    formData.append('file', {
      uri: image.uri,
      type: image.type || 'image/jpeg', // Đặt loại tệp tin mặc định
      name: image.fileName || 'photo.jpg', // Tên tệp tin mặc định
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
      setAvatar(response.data);
      setAvatarContext(response.data);
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };
  const handleChangeUsername = (text) => {
    setUsername(text);
  }
  const handleUpdate = async () => {
    const endpoint = ENDPOINTS.USER.UPDATE_USER_PROFILE;
    console.log(`updateUser: ${endpoint}`);
    console.log(`id ${idContext}\tusername ${username}\tprivacy ${privacy}`);
    try {
      const response = await axios.post(
        endpoint,
        {
          id: idContext,
          username: username,
          privacy: privacy,
        },
        {headers: {Authorization: `Bearer ${tokenContext}`}},
      );

      if (response.status === 200) {
        const {result} = response.data;

        setUsernameContext(result.username);
        setPrivacyContext(result.privacy);
        console.log(result.username);
        setUsername(result.username);
        setPrivacy(result.privacy);

        Alert.alert('Success', 'Your profile has been updated successfully!');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleUploadAvatar = () => {};

  useEffect(() => {
    setLoading(true);

    if (!tokenContext) navigation.goBack();
    else {
      if (usernameContext) {
        console.log(`usernameContext: ${usernameContext}`);
        setUsername(usernameContext);
      }
      if (privacyContext) {
        console.log(`privacyContext: ${privacyContext}`);
        setPrivacy(privacyContext);
      }
    }

    setLoading(false);
  }, [tokenContext]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: 'Edit Profile',
  //     headerLeft: () => (
  //       <Pressable onPress={() => navigation.goBack()}>
  //         <MaterialCommunityIcons name="arrow-left" size={24} />
  //       </Pressable>
  //     ),
  //     headerRight: () => (
  //       <Pressable
  //         onPress={() => {
  //           handleUpdate();
  //         }}>
  //         <MaterialIcons name="done" size={24} color="blue" />
  //       </Pressable>
  //     ),
  //   });
  // }, [navigation]);

  return (
    <View>
<View className="w-full flex flex-row justify-center items-center py-3 bg-white">
                <View className="w-96 flex flex-row justify-between items-center">
                    <Pressable className='flex flex-row items-center'
                        onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='arrow-left' size={30} />
                        <Text className='text-lg font-medium ml-4'>Edit profile</Text>
                    </Pressable>
                    <Pressable
                      onPress={handleUpdate}>
                        <MaterialIcons name="done" size={30 + 4} color='blue' />
                    </Pressable>
                </View>
            </View>
    <ScrollView
      className="w-100 bg-white py-4"
      horizontal={false}
      showsVerticalScrollIndicator={false}>
      <View className="w-96 mx-auto">
        <View style={styles.editAvatar}>
          {avatar.length === 0 ? (
            <Image
              source={require('../../assets/avatarDefine.jpg')}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={{uri: avatar}}
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
            onChangeText={handleChangeUsername}
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

          <Text className="border-b border-b-neutral-400 text-lg font-normal mb-2">
            Account privacy
          </Text>
          <View className="flex flex-row items-center mb-2">
            <Text className="w-1/2 text-base">Private account</Text>
            <Switch
              className="w-1/2"
              value={privacy}
              onValueChange={() => setPrivacy(!privacy)}
              color={theme.colors.primary}
            />
          </View>
          <Text className="text-xs font-light mb-1">
            When your account is public, your profile and posts can be seen by
            anyone, on or off Instagram, even if they don't have an Instagram
            account.
          </Text>
          <Text className="text-xs font-light mb-10">
            When your account is private, only the followers you approve can see
            what you share, including your photos or videos on hashtag and
            location pages, and your followers and following lists. Certain info
            on your profile, like your profile picture and username, is visible
            to everyone on and off instagram.
          </Text>

          <Pressable className="w-full p-2 border-b border-b-neutral-400">
            <Text className="text-base text-sky-500">
              Switch to professinal account
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
    </View>

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
