import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import axios from 'axios';
import ENDPOINTS from '../../config/endpoints';

const RegisterConfirmCode = ({navigation, route}) => {
  const [confirmCode, setConfirmCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(route.params.email);

    startCountdown(); // Bắt đầu đếm ngược khi component được mount
  }, [route.params]);

  const handleRegisterCode = async () => {
    setLoading(true);

    try {
      const endpoint = ENDPOINTS.OTP.VERIFY_OTP;
      console.log(
        `Verifying OTP at ${endpoint} with email: ${email} and OTP: ${confirmCode}`,
      );

      const response = await axios.get(endpoint, {
        params: {otp: confirmCode, email: email},
      });

      if (response.data && response.data.result) {
        Alert.alert('Success', 'OTP verified successfully.');
        navigation.navigate('Register_CreatePasswd', {email: email}); // Điều hướng đến trang tạo mật khẩu
      } else {
        Alert.alert('Error', 'Invalid OTP or email.');
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isResendEnabled) {
      Alert.alert(
        `Please wait ${countdown} seconds before resending the code.`,
      );
      return;
    }

    setLoading(true);

    try {
      const endpoint = ENDPOINTS.OTP.SEND_OTP;
      console.log(
        `Sending OTP request to ${endpoint} with email: ${emailContext}`,
      );

      const response = await axios.post(endpoint, {email: email});

      if (response.data && response.data.result) {
        Alert.alert('Success', 'OTP sent successfully to your email.');
        startCountdown(); // Bắt đầu lại đếm ngược sau khi gửi thành công
      } else {
        Alert.alert('Error', 'No response data received.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setIsResendEnabled(false);
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          setIsResendEnabled(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-3">
        <Text className="text-2xl font-bold mb-1 instagram">
          Enter the confirmation code
        </Text>
        <Text className="text-base mb-7">
          To confirm your account, enter the 6-digit code we sent to {email}.
        </Text>

        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-5 rounded-2xl drop-shadow-2xl"
          onChangeText={setConfirmCode}
          placeholder="Confirmation code"
          value={confirmCode}
        />

        <TouchableOpacity
          className="w-96 bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleRegisterCode}
          disabled={loading}>
          <Text className="text-center text-lg font-medium text-white">
            {loading ? 'Verifying...' : 'Next'}
          </Text>
        </TouchableOpacity>

        <Pressable
          className="w-96 py-2 rounded-full border"
          onPress={handleResendCode}
          disabled={!isResendEnabled}>
          <Text className="text-center text-base font-medium text-gray-700">
            {isResendEnabled
              ? "I didn't get the code"
              : `I didn't get the code (${countdown})`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterConfirmCode;
