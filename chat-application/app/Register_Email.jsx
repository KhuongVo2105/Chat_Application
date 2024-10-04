import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import images from '../contants/image'
import { useState } from 'react';
import axios from 'axios'

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [loading, setLoading] = useState(false)
  const checkEmaiRequest = {
    email: email
  }
  const userData = {
    email: checkEmaiRequest.email
  }

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

  const handleRegisterEmail = async () => {
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
    navigation.navigate('Register_ConfirmCode', { data: userData })
  }

  const handleSignIn = () => {
    navigation.navigate('SignIn')
  }

  return (

    <View className="w-full h-full flex items-center bg-white">

      <View className="w-96 mt-4">
        <TouchableOpacity className="w-full" onPress={handleSignIn}>
          <Image
            className="w-6"
            source={images.icon_back}
            resizeMode='contain' />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold mb-1">What's your email?</Text>
        <Text className="text-base mb-7">Enter the email where you can be contacted. No one will see this on your profile.</Text>

        {/* Email field */}
        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-4 rounded-2xl drop-shadow-2xl"
          onChangeText={setEmail}
          placeholder='Email'
          value={email} />

        {/* Send OTP message button */}
        <TouchableOpacity
          className="w-96 bg-blue-600 py-2 rounded-full"
          onPress={handleRegisterEmail}>
          <Text className="text-center text-xl font-medium text-white">Next</Text>
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