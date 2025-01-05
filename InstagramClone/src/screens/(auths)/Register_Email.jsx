import React, {useState} from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity} from 'react-native';
import axios from 'axios';
import ENDPOINTS from '../../config/endpoints';

const RegisterEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
      Alert.alert(
        'Error',
        'Network error. Please check your internet connection.',
      );
      setLoading(false);
      return;
    }

    try {
      const endpoint = ENDPOINTS.OTP.SEND_OTP;
      console.log(`Send request to ${endpoint} with ${email}`);
      const response = await axios.post(endpoint, {email});

      setLoading(false);

      // Assuming success if response code is 200
      if (response.data && response.data.code === 200 && response.data.result) {
        Alert.alert('Success', 'OTP sent successfully to your email.');
        navigation.navigate('Register_ConfirmCode', {email: email});
      } else {
        Alert.alert('Error', 'Unexpected response.');
      }
    } catch (error) {
      setLoading(false);

      // If server responds with a 4xx or 5xx error, check the response body
      if (error.response) {
        const errorCode = error.response.data?.code;

        // Switch case for handling specific error codes from the response data
        switch (errorCode) {
          case 1022: // EMAIL_EXISTED
            Alert.alert(
              'Error',
              'Email already exists. Please use a different email.',
            );
            break;
          default:
            Alert.alert('Error', 'An unexpected error occurred.');
        }

        console.error('Error details:', error.response.data);
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again later.');
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-3">
        <Text className="text-3xl font-semibold mb-1">What's your email?</Text>
        <Text className="text-base mb-7">
          Enter the email where you can be contacted. No one will see this on
          your profile.
        </Text>

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
          disabled={loading}>
          <Text className="text-center text-xl font-medium text-white">
            {loading ? 'Sending...' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterEmail;
