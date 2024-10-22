import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import images from '../constants/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints";

const SignIn = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [prev, setPrev] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      setPrev(data.prev);
    }
  }, [route.params]);

  const handleCheckFormat = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.trim() === '') {
      Alert.alert('Error', 'Email field cannot be left blank. Please enter your email.');
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'The email you entered is not valid. Please provide a valid email address.');
      return false;
    }

    return true;
  };

  const handleRegisterEmail = async () => {
    setLoading(true);

    // Check email format
    const isValid = handleCheckFormat();
    if (!isValid) {
      setLoading(false);
      return;
    }

    // Check network connectivity
    try {
      await axios.get('https://www.google.com');
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your internet connection.');
      setLoading(false);
      return;
    }

    try {
      const endpoint = ENDPOINTS.OTP.SEND_OTP;
      console.log(`Send request to ${endpoint} with ${email}`)
      const response = await axios.post(endpoint, { email });

      // Check if response data exists
      if (response.data && response.data.result) {
        Alert.alert('Success', 'OTP sent successfully to your email.');
      } else {
        Alert.alert('Error', 'No response data received.');
      }

      setLoading(false);

      // Pass data to the next screen
      navigation.navigate('Register_ConfirmCode', {
        data: { email, prev: 'Register_Email' },
      });
    } catch (error) {
      setLoading(false);

      // Log full error to the console for debugging
      console.error('Error sending OTP:', error);

      // Log specific response details if available
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

      // Show a generic error message to the user
      Alert.alert('Error', 'Failed to send OTP. Please try again later.');
    }
  };

  const handlePre = () => {
    if (prev) {
      navigation.navigate(prev);
    } else {
      console.log('No previous page found');
    }
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-4">
        <TouchableOpacity className="w-full" onPress={handlePre}>
          <Image className="w-6" source={images.icon_back} resizeMode="contain" />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold mb-1">What's your email?</Text>
        <Text className="text-base mb-7">Enter the email where you can be contacted. No one will see this on your profile.</Text>

        {/* Email field */}
        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-4 rounded-2xl drop-shadow-2xl"
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
        />

        {/* Send OTP message button */}
        <TouchableOpacity
          className="w-96 bg-blue-600 py-2 rounded-full"
          onPress={handleRegisterEmail}
          disabled={loading}
        >
          <Text className="text-center text-xl font-medium text-white">
            {loading ? 'Sending...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign up redirect */}
      <View className="flex flex-row items-center justify-center sticky bottom-0 py-6 w-full absolute bottom-0">
        <TouchableOpacity className="ml-2" onPress={handlePre}>
          <Text className="text-base font-medium text-blue-600">I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;