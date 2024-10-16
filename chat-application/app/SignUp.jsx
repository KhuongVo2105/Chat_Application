import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import images from '../constants/image'
import { useState } from 'react';
import axios from 'axios'

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [VerifyToken, setVerifyToken] = useState()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const signInRequest = {
    email: email,
    password: password
  }

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const endpoint = `${REACT_APP_API_BASE_URL}/chat-application/v1/users`;
      console.log(`Instagram-SignIn-endpoint: ${endpoint}`)
      const response = await axios.post(endpoint, signInRequest);

      if (response.data) {
        setLoading(false);

        setVerifyToken = response.data.result.token;
        setLoading(false);

        navigation.navigate("VerifyToken");
        Alert.alert("Success", "Password reset email has been sent successfully.");
      }

    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Network error or email not found.");
    }
  }

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handleFacebookLogin = () => {
    Alert.alert('', 'This feature will be updated later')
  }

  const handleTogglePassword = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (

    <View
      className="w-full h-full flex justify-center items-center bg-white">

      {/* Image */}
      <View className="w-80 h-auto mb-10">
        <Image
          className="w-full h-20"
          source={images.logo_text} resizeMode='contain' />
      </View>

      {/* Email field */}
      <TextInput
        className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-3 rounded-2xl drop-shadow-2xl"
        onChangeText={setEmail}
        placeholder='Phone number, username or email address'
        value={email} />
      {/* Password field */}
      <View
        className="w-96 relative">

        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-full hover:shadow mb-3 rounded-2xl"
          onChangeText={setPassword}
          placeholder='Password'
          value={password}
          secureTextEntry={!isPasswordVisible} />

        <TouchableOpacity className="absolute right-0  top-1/2 -translate-y-4"
          onPress={handleTogglePassword}>
          <Image className="h-5"
            source={isPasswordVisible ? images.icon_show : images.icon_hide} resizeMode='contain' />
        </TouchableOpacity>
      </View>

      {/* Forgot password redirect */}
      <TouchableOpacity
        className="w-96 mb-3"
        onPress={handleSignIn}>
        <Text className="text-blue-600 text-right drop-shadow-md font-medium">Forgotten password?</Text>
      </TouchableOpacity>

      {/* Log in button */}
      <TouchableOpacity
        className="w-96 bg-blue-600 py-3 rounded-2xl">
        <Text className="text-center text-xl font-medium text-white">Log in</Text>
      </TouchableOpacity>

      <View className="relative justify-center items-center my-7">
        <View className="w-96 bg-gray-300 h-0.5" />
        <Text className="absolute m-auto bg-white px-2">Or</Text>
      </View>

      {/* Log in with Facebook account */}
      <TouchableOpacity className="flex flex-row justify-items-center items-center"
        onPress={handleFacebookLogin}>
        <Image className="h-6" source={images.icon_fb} resizeMode='contain' />
        <Text className="text-base text-blue-600 font-medium">Log in with Facebook</Text>
      </TouchableOpacity>

      {/* Sign up redirect */}
      <View className="flex flex-row items-center justify-center sticky bottom-0 py-6 border-t-2 border-gray-300 w-full absolute bottom-0">
        <Text className="text-base text-gray-500">Already ?</Text>
        <TouchableOpacity className="ml-2" onPress={handleSignUp}>
          <Text className="text-base font-medium text-blue-600">Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>

  )
}

export default SignIn