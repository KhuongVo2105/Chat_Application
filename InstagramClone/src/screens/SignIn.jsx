import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  Pressable,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import images from './../config/images';
import ENDPOINTS from './../config/endpoints';
import {AuthContext} from '../context/AuthContext';

const SignIn = ({navigation, route}) => {
  console.log(
    `[SCREEN NAVIGATION] ${new Date().toISOString()} - Screen: SignIn`,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    tokenContext,
    setTokenContext,
    setIdContext,
    setUsernameContext,
    setEmailContext,
    setCreatedAtContext,
    setBirthdayContext,
    setRoleContext,
  } = useContext(AuthContext);

  const handleCheckFormat = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim() === '') {
      Alert.alert(
        'Error',
        'Email field cannot be left blank. Please enter your email.',
      );
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert(
        'Error',
        'The email you entered is not valid. Please provide a valid email address.',
      );
      return false;
    }

    return true;
  };

  const handleSignIn = async () => {
    setLoading(true);

    if (!handleCheckFormat()) {
      setLoading(false);
      return;
    }

    try {
      const endpoint = ENDPOINTS.AUTH.GET_TOKEN;
      console.log(`Instagram-SignIn-endpoint: ${endpoint}`);

      const signInRequest = {
        email: email,
        password: password,
      };

      console.log(`Request: ${signInRequest}`);

      const response = await axios.post(endpoint, signInRequest);

      const {code, message, result} = response.data;
      const statusCode = response.status; // HTTP Status Code từ server

      switch (statusCode) {
        case 200: {
          // Trường hợp đăng nhập thành công
          const {authenticated, token} = result;
          if (authenticated) {
            setTokenContext(token);
            console.log('Token:', token);
            navigation.replace('(tabs)');
          } else {
            Alert.alert('Error', 'Authentication failed. Please try again.');
          }
          break;
        }
        default: {
          // Trường hợp lỗi không xác định
          Alert.alert('Error', message || 'An unexpected error occurred.');
          break;
        }
      }
    } catch (error) {
      if (error.response) {
        // Trường hợp server trả về phản hồi với mã lỗi HTTP (4xx, 5xx)

        const {status, data, headers} = error.response;
        const {code, message} = data;

        switch (status) {
          case 400:
            if (code == 1040) Alert.alert('Error', message);
            else
              console.log(`It's not #1040\tCode ${code}, Message: ${message}`);
            break;
          case 401:
            if (code == 1040) Alert.alert(message);
            else
              console.log(`It's not #1040\tCode ${code}, Message: ${message}`);
            break;
          default:
            break;
        }

        console.error('SignIn Error: Server responded with an error', {
          status: status,
          data: data,
          headers: headers,
        });
      } else if (error.request) {
        // Trường hợp không nhận được phản hồi từ server (timeout, server không khả dụng, v.v.)
        console.error('SignIn Error: No response received from server', {
          request: error.request,
        });

        Alert.alert(
          'Network Error',
          'No response received from the server. Please check your connection and try again.',
        );
      } else {
        // Các lỗi khác xảy ra trước khi gửi request (cấu hình sai, lỗi mã, v.v.)
        console.error(
          'SignIn Error: An error occurred while setting up the request',
          {
            message: error.message,
          },
        );

        Alert.alert(
          'Unexpected Error',
          `An unexpected error occurred:\n${error.message}`,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('(auths)');
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
        <Image
          className="w-full h-20"
          source={images.logo_text}
          resizeMode="contain"
        />
      </View>

      {/* Email field */}
      <TextInput
        className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-3 rounded-2xl drop-shadow-2xl"
        onChangeText={setEmail}
        placeholder="Phone number, username or email address"
        value={email}
      />
      {/* Password field */}
      <View className="w-96 relative">
        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-full hover:shadow mb-3 rounded-2xl"
          onChangeText={setPassword}
          placeholder="Password"
          value={password}
          secureTextEntry={!isPasswordVisible}
        />
        <Pressable
          className="absolute right-0 top-1/2 -translate-y-4"
          onPress={handleTogglePassword}>
          <Image
            className="h-5"
            source={isPasswordVisible ? images.icon_show : images.icon_hide}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* Forgot password redirect */}
      <TouchableOpacity
        className="w-96 mb-3"
        onPress={() => Alert.alert('Feature not implemented')}>
        <Text className="text-blue-600 text-right drop-shadow-md font-medium">
          Forgotten password?
        </Text>
      </TouchableOpacity>

      {/* Log in button */}
      <Pressable
        className="w-96 bg-blue-600 py-3 rounded-2xl"
        onPress={handleSignIn}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-center text-xl font-medium text-white">
            Log in
          </Text>
        )}
      </Pressable>

      <View className="relative justify-center items-center my-7">
        <View className="w-96 bg-gray-300 h-0.5" />
        <Text className="absolute m-auto bg-white px-2">Or</Text>
      </View>

      {/* Log in with Facebook account */}
      <TouchableOpacity
        className="flex flex-row justify-items-center items-center"
        onPress={handleFacebookLogin}>
        <Image className="h-6" source={images.icon_fb} resizeMode="contain" />
        <Text className="text-base text-blue-600 font-medium">
          Log in with Facebook
        </Text>
      </TouchableOpacity>

      {/* Sign up redirect */}
      <View className="flex flex-row items-center justify-center sticky bottom-0 py-6 border-t-2 border-gray-300 w-full absolute bottom-0">
        <Text className="text-base text-gray-500">Don't have an account?</Text>
        <Pressable className="ml-2" onPress={handleSignUp}>
          <Text className="text-base font-medium text-blue-600">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;