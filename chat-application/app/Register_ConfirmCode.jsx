import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Alert, Modal, ScrollView } from 'react-native'
import images from '../contants/image'
import { useState, useEffect } from 'react';
import axios from 'axios'

const SignIn = ({ navigation, route }) => {
  const [email, setEmail] = useState()
  const [confirmCode, setConfirmCode] = useState()
  const [prev, setPrev] = useState()
  const [loading, setLoading] = useState(false)

  const transfer ={
    prev: prev,
    email: email
  }

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      setEmail(data.email);  // Ví dụ: Đặt email từ dữ liệu truyền vào
      setPrev(data.prev)
    }
  }, [route.params])

  const [modalVisible, setModalVisible] = useState(false)

  const handleRegisterCode = async () => {
    setLoading(true);

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
    transfer.prev='Register_ConfirmCode'
    navigation.navigate('Register_CreatePasswd', {data: transfer})
  }

  const handleBack = () => {
    navigation.navigate(prev)
  }

  const handleResendCode = () => {
    Alert.alert('RESEND CODE')
    // axios.post()
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
        <Text className="text-3xl font-semibold mb-1">Enter the confirmation code</Text>
        <Text className="text-base mb-7">To confirm your account, enter the 6-digit code we sent to {email}.</Text>

        {/* Confirm code */}
        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-5 rounded-2xl drop-shadow-2xl"
          onChangeText={setConfirmCode}
          placeholder='Confirmation code'
          value={confirmCode} />

        {/* Verify code button */}
        <TouchableOpacity
          className="w-96 bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleRegisterCode}>
          <Text className="text-center text-lg font-medium text-white">Next</Text>
        </TouchableOpacity>

        {/* Resend code button */}
        <TouchableOpacity
          className="w-96 py-2 rounded-full border"
          onPress={handleResendCode}>
          <Text className="text-center text-lg font-medium text-gray-700">I didn't get the code</Text>
        </TouchableOpacity>
      </View>

    </View>

  )
}

export default SignIn