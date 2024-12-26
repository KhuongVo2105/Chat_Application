import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import images from '../../config/images';
import {useState, useEffect} from 'react';
import {IconUserProfile} from '../../components/IconComponents';
import {AuthContext} from '../../context/AuthContext';
import ENDPOINTS from '../../config/endpoints';
import axios from 'axios';

const Home = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [yourComment, setYourComment] = useState();

  const {
    tokenContext,
    setIdContext,
    setUsernameContext,
    setEmailContext,
    setCreatedAtContext,
    setBirthdayContext,
    setRoleContext,
  } = useContext(AuthContext);

  // Hàm lấy thông tin người dùng
  const fetchUserInfo = async () => {
    if (!tokenContext) {
      console.log('Token is not available.');
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

        // Lưu thông tin vào Context
        setIdContext(userInfo.id);
        setUsernameContext(userInfo.username);
        setEmailContext(userInfo.email);
        setCreatedAtContext(userInfo.createdAt);
        setBirthdayContext(userInfo.birthday);
        setRoleContext({roles: userInfo.roles});

        console.log('User information loaded successfully.');
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
    fetchUserInfo();
  }, [tokenContext]);

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
        <View className="flex flex-column w-full py-3">
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
                  <Text className="font-semibold text-lg">Username</Text>
                  <Image
                    className="ml-1"
                    source={images.icon_verify}
                    style={{width: 25, height: 25}}
                    resizeMode="contain"
                  />
                </View>

                {/* Sub title */}
                <Text className="text-sm">This is subtitle</Text>
              </View>
            </TouchableOpacity>

            {/* Header right */}
            <Pressable>
              <Image
                source={images.icon_triple_dot}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </Pressable>
          </View>

          {/* Content post */}
          <View className="w-full bg-red-200 relative mb-2">
            <Image
              className=""
              resizeMode="cover"
              source={require('./../../assets/portaits/portait_1.jpg')}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: 3 / 4, // Tỷ lệ 3:4 (width:height)
              }}
            />
            <Text className="absolute right-3 top-3 bg-gray-500 px-2 py-1 rounded-full fs-sm text-white">
              1/1
            </Text>
          </View>

          {/* Footer post */}
          <View className="flex flew-column">
            <View className="w-full flex flex-column justify-between px-3">
              {/* React row */}
              <View className="w-24 flex flex-row justify-between items-center mb-2">
                <TouchableOpacity className="">
                  <Image source={images.icon_notify} style={styles.icons} />
                </TouchableOpacity>
                <TouchableOpacity className="">
                  <Image
                    source={images.icon_message}
                    style={{
                      width: 25,
                      height: 25,
                      transform: [{scaleX: -1}],
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
              <Text className="w-full mb-2">This is a new comment</Text>
              <View className="flex flex-row items-center">
                <View className="w-8 h-8 overflow-hidden flex flex-row justify-center items-center">
                  {/* Hình ảnh chính (phía dưới) */}
                  <Image
                    className="absolute z-0 rounded-full" // Đặt dưới cùng với z-0
                    style={{width: '85%', height: '85%'}}
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

        {/* navigation bottom */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    width: 28,
    height: 28,
  },
});
export default Home;
