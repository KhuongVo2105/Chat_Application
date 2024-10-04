import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Alert, Modal, ScrollView } from 'react-native'
import images from '../contants/image'
import { useState, useEffect } from 'react';
import axios from 'axios'

const SignIn = ({ navigation, route }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmCode, setConfirmCode] = useState()
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const confirmCodeRequest = {
    code: confirmCode
  }

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      setEmail(data.email);  // Ví dụ: Đặt email từ dữ liệu truyền vào
    }
  }, [route.params])

  const [modalVisible, setModalVisible] = useState(false)

  const handleTogglePassword = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const handleCheckFormat = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (checkEmaiRequest.email === '') {
      Alert.alert('Error', 'Email field cannot be left blank. Please enter your email.')
      return false;
    }
    if (!emailRegex.test(checkEmaiRequest.email)) {
      Alert.alert("Error", "The email you entered is not valid. Please provide a valid email address.");
      return false;
    }

    return true;
  }

  const handleRegisterCode = async () => {
    setLoading(true);

    // Check email format
    const isValid = handleCheckFormat();
    if (!isValid) {
      setLoading(false);
      return;
    }

    // // Check network connectivity
    // try {
    //   await axios.get('https://www.google.com');
    // } catch (error) {
    //   Alert.alert("Error", "Network error. Please check your internet connection.");
    //   setLoading(false);
    //   return;
    // }

    // try {
    //   const endpoint = `${REACT_APP_API_BASE_URL}/chat-application/v1/users`;
    //   console.log(`Instagram-SignIn-endpoint: ${endpoint}`);
    //   const response = await axios.post(endpoint, checkEmailRequest);

    //   // Check if response data exists
    //   if (response.data) {
    //     // Handle successful response (e.g., navigate to the next screen)
    //     Alert.alert("Success", "Email sent successfully."); // Example success message
    //   } else {
    //     Alert.alert("Error", "No response data received.");
    //   }

    // } catch (error) {
    //   Alert.alert("Error", "Network error or email not found.");
    // }

    setLoading(false);
    navigation.navigete('Register_CreatePasswd')
  }

  const handleBack = () => {
    navigation.navigate('Register_Email')
  }

  const handleResendCode = () => {
    Alert.alert('RESEND CODE')
    // axios.post()
  }

  const handleSignIn = () => {
    navigation.navigate('SignIn')
  }

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

        {/* Confirm code */}
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

        {/* Verify code button */}
        <TouchableOpacity
          className="w-96 bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleRegisterCode}>
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

  )
}

export default SignIn