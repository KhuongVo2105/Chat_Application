import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import images from '../constants/images';
import { useState } from 'react';
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const endpoint = ENDPOINTS.AUTH.GET_TOKEN;
      console.log(`Instagram-SignIn-endpoint: ${endpoint}`);
      
      const signInRequest = {
        email: email,
        password: password,
      };

      // Gửi yêu cầu đăng nhập
      const response = await axios.post(endpoint, signInRequest);

      if (response.data.code === 200 && response.data.result.authenticated) {
        const token = response.data.result.token;

        // Kiểm tra tính hợp lệ của token
        const introspectEndpoint = ENDPOINTS.AUTH.INTROSPECT;
        const introspectRequest = { token: token };
        const introspectResponse = await axios.post(introspectEndpoint, introspectRequest);

        if (introspectResponse.data.code === 200 && introspectResponse.data.result.valid) {
          // Nếu token hợp lệ, lấy thông tin người dùng
          const userInfoEndpoint = ENDPOINTS.USER.MY_INFORMATION;
          const userInfoResponse = await axios.post(userInfoEndpoint, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (userInfoResponse.data.code === 200) {
            const userData = userInfoResponse.data.result;
            console.log("User Data:", userData);

            // Chuyển hướng đến màn hình chính hoặc nơi bạn muốn
            navigation.navigate("Home", { user: userData });
          }
        } else {
          Alert.alert("Error", "Invalid token.");
        }
      } else {
        Alert.alert("Error", "Authentication failed. Please check your email and password.");
      }

    } catch (error) {
      console.error("SignIn error:", error);
      Alert.alert("Error", "Network error or unexpected response.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Register_Email', { data: { prev: 'SignIn' } });
  };

  const handleFacebookLogin = () => {
    Alert.alert('', 'This feature will be updated later');
  };

  const handleTogglePassword = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <View className="w-full h-full flex justify-center items-center bg-white">
      {/* Image */}
      <View className="w-80 h-auto mb-10">
        <Image className="w-full h-20" source={images.logo_text} resizeMode='contain' />
      </View>

      {/* Email field */}
      <TextInput
        className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-3 rounded-2xl drop-shadow-2xl"
        onChangeText={setEmail}
        placeholder='Phone number, username or email address'
        value={email}
      />
      {/* Password field */}
      <View className="w-96 relative">
        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-full hover:shadow mb-3 rounded-2xl"
          onChangeText={setPassword}
          placeholder='Password'
          value={password}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity className="absolute right-0 top-1/2 -translate-y-4" onPress={handleTogglePassword}>
          <Image className="h-5" source={isPasswordVisible ? images.icon_show : images.icon_hide} resizeMode='contain' />
        </TouchableOpacity>
      </View>

      {/* Forgot password redirect */}
      <TouchableOpacity className="w-96 mb-3" onPress={() => Alert.alert("Feature not implemented")}>
        <Text className="text-blue-600 text-right drop-shadow-md font-medium">Forgotten password?</Text>
      </TouchableOpacity>

      {/* Log in button */}
      <TouchableOpacity
        className="w-96 bg-blue-600 py-3 rounded-2xl"
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-center text-xl font-medium text-white">Log in</Text>
        )}
      </TouchableOpacity>

      <View className="relative justify-center items-center my-7">
        <View className="w-96 bg-gray-300 h-0.5" />
        <Text className="absolute m-auto bg-white px-2">Or</Text>
      </View>

      {/* Log in with Facebook account */}
      <TouchableOpacity className="flex flex-row justify-items-center items-center" onPress={handleFacebookLogin}>
        <Image className="h-6" source={images.icon_fb} resizeMode='contain' />
        <Text className="text-base text-blue-600 font-medium">Log in with Facebook</Text>
      </TouchableOpacity>

      {/* Sign up redirect */}
      <View className="flex flex-row items-center justify-center sticky bottom-0 py-6 border-t-2 border-gray-300 w-full absolute bottom-0">
        <Text className="text-base text-gray-500">Don't have an account?</Text>
        <TouchableOpacity className="ml-2" onPress={handleSignUp}>
          <Text className="text-base font-medium text-blue-600">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
