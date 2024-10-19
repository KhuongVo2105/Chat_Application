import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Alert, Modal, ScrollView } from 'react-native'
import images from '../constants/images'
import { useState, useEffect } from 'react';
import axios from 'axios'
import ENDPOINTS from "../constants/endpoints";

const RegisterConfirmCode = ({ navigation, route }) => {
  const [email, setEmail] = useState();
  const [confirmCode, setConfirmCode] = useState();
  const [prev, setPrev] = useState();
  const [loading, setLoading] = useState(false);
  const [isResendEnabled, setIsResendEnabled] = useState(false); // Khởi tạo là false
  const [countdown, setCountdown] = useState(60); // Thời gian đếm ngược

  const transfer = {
    prev: prev,
    email: email
  };

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      setEmail(data.email);  // Đặt email từ dữ liệu truyền vào
      setPrev(data.prev);
    }
  }, [route.params]);

  useEffect(() => {
    // Bắt đầu đếm ngược ngay khi trang được tải
    startCountdown();
  }, []);

  const handleRegisterCode = async () => {
    setLoading(true);

    try {
      const endpoint = ENDPOINTS.OTP.VERIFY_OTP;
      console.log(`Verifying OTP at ${endpoint} with email: ${email} and OTP: ${confirmCode}`);

      const response = await axios.get(endpoint, {
        params: { otp: confirmCode, email: email }
      });

      if (response.data && response.data.result) {
        Alert.alert("Success", "OTP verified successfully.");
        transfer.prev = 'Register_ConfirmCode';
        navigation.navigate('Register_CreatePasswd', { data: transfer });
      } else {
        Alert.alert("Error", "Invalid OTP or email.");
      }
    } catch (error) {
      console.log('Error verifying OTP:', error);
      Alert.alert("Error", "Failed to verify OTP. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.navigate(prev);
  };

  const handleResendCode = async () => {
    if (!isResendEnabled) {
      Alert.alert(`Please wait ${countdown} seconds before resending the code.`);
      return;
    }

    setLoading(true);

    try {
      const endpoint = ENDPOINTS.OTP.SEND_OTP;
      console.log(`Send request to ${endpoint} with ${email}`)
      const response = await axios.post(endpoint, { email: email });

      if (response.data && response.data.result) {
        Alert.alert('Success', 'OTP sent successfully to your email.');
        startCountdown()
      } else {
        Alert.alert('Error', 'No response data received.');
      }
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    setIsResendEnabled(false);
    setCountdown(60); // Đặt lại bộ đếm ngược
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          setIsResendEnabled(true); // Cho phép gửi lại sau khi hết thời gian
          return 0; // Đặt lại về 0
        }
        return prevCountdown - 1;
      });
    }, 1000); // Giảm bộ đếm mỗi giây
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
        <Text className="text-3xl font-semibold mb-1">Enter the confirmation code</Text>
        <Text className="text-base mb-7">To confirm your account, enter the 6-digit code we sent to {email}.</Text>

        {/* Confirm code */}
        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-5 rounded-2xl drop-shadow-2xl"
          onChangeText={setConfirmCode}
          placeholder='Confirmation code'
          value={confirmCode}
        />

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
          <Text className="text-center text-lg font-medium text-gray-700">
            {isResendEnabled ? "I didn't get the code" : `I didn't get the code (${countdown})`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterConfirmCode;