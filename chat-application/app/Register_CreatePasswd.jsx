import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import images from '../constants/images';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ENDPOINTS from '../constants/endpoints';

const CreatePassword = ({ navigation, route }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [prev, setPrev] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const transfer = {
    email: email,
    password: password,
    prev: prev,
  };

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      setEmail(data.email);  // Đặt email từ dữ liệu truyền vào
      setPrev(data.prev);
    }
  }, [route.params]);

  const handleTogglePassword = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const handleBack = () => {
    navigation.navigate(prev);
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleBirthday = async () => {
    if (password && password.length >= 6) {
      transfer.password = password; // Cập nhật mật khẩu vào biến transfer
      transfer.prev = 'Register_CreatePasswd'
      navigation.navigate('Register_Birthday', { data: transfer });
    } else {
      Alert.alert("Error", "Password must be at least 6 characters long.");
    }
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-4">
        <TouchableOpacity className="w-full" onPress={handleBack}>
          <Image
            className="w-6"
            source={images.icon_back}
            resizeMode='contain' />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold mb-1">Create a password</Text>
        <Text className="text-base mb-7">
          Create a password with at least 6 letters or numbers. It should be something others can't guess.
        </Text>

        {/* Password input */}
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

        {/* Go to next page button */}
        <TouchableOpacity
          className="w-96 bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleBirthday}>
          <Text className="text-center text-lg font-medium text-white">Next</Text>
        </TouchableOpacity>
      </View>

      {/* Sign up redirect */}
      <View className="flex flex-row items-center justify-center sticky bottom-0 py-6 w-full absolute bottom-0">
        <TouchableOpacity className="ml-2" onPress={handleSignIn}>
          <Text className="text-base font-medium text-blue-600">I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePassword;
