import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import images from '../constants/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints";

const Register = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [username, setUsername] = useState('');
  const [prev, setPrev] = useState();
  const [loading, setLoading] = useState(false);

  const transfer = {
    email: email,
    password: password,
    birthday: birthday,
    username: username,
    prev: prev
  };

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      setEmail(data.email);
      setPassword(data.password);
      setBirthday(data.birthday);
      setUsername(data.username)
      setPrev(data.prev);
    }
  }, [route.params]);

  const handleBack = () => {
    navigation.navigate(prev);
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const userCreateReq = {
      email: email,
      password: password,
      username: username,
      birthday: birthday.toISOString().split('T')[0] // Chuyển đổi ngày sinh sang định dạng ISO
    };

    try {
      setLoading(true);
      const endpoint = ENDPOINTS.USER.SIGN_IN
      console.log(`Send request to ${endpoint} with ${userCreateReq}`)
      const response = await axios.post(endpoint, userCreateReq);

      // Check if response data exists
      if (response.data && response.data.result) {
        Alert.alert('Registration successful!', 'You can now sign in.');
        navigation.navigate('SignIn'); // Chuyển hướng đến trang đăng nhập
      } else {
        Alert.alert('Error', 'No response data received.');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        Alert.alert('Registration failed', error.response.data.message || 'An error occurred.');
      } else {
        Alert.alert('Registration failed', 'An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-4">
        <TouchableOpacity className="w-full" onPress={handleBack}>
          <Image className="w-6" source={images.icon_back} resizeMode='contain' />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold mb-1">To sign up, read and agree to our terms and policies</Text>
        <Text className="text-base mb-7">
          By signing up you agree to Instagram's Terms, Privacy Policy and Cookies Policy
        </Text>

        <TouchableOpacity
          className="bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleRegister}
          disabled={loading}
        >
          <Text className="text-center text-lg font-medium text-white">{loading ? 'Registering...' : 'I agree'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white py-2 rounded-full mb-3"
          onPress={handleSignIn}
        >
          <Text className="text-center text-lg font-medium text-blue-600">Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
