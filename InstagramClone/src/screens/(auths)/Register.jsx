import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, Pressable} from 'react-native';
import axios from 'axios';
import ENDPOINTS from '../../config/endpoints';

const Register = ({navigation, route}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [birthday, setBirthday] = useState(new Date());
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(route.params.email);
    setPassword(route.params.password);
    setBirthday(route.params.birthday);
    setUsername(route.params.username);

    console.log(`${email}, ${password}, ${birthday}, ${username}`)
  }, [route.params]);

  const handleRegister = async () => {

    if (!email || !password || !username || !birthday) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const userCreateReq = {
      email: email,
      password: password,
      username: username,
      birthday: birthday, // Chuyển đổi ngày sinh sang định dạng ISO
    };

    try {
      setLoading(true);
      const endpoint = ENDPOINTS.USER.SIGN_IN;
      console.log(`Send request to ${endpoint} with ${userCreateReq}`);
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
        Alert.alert(
          'Registration failed',
          error.response.data.message || 'An error occurred.',
        );
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
        <Text className="text-3xl font-semibold mb-1">
          To sign up, read and agree to our terms and policies
        </Text>
        <Text className="text-base mb-7">
          By signing up you agree to Instagram's Terms, Privacy Policy and
          Cookies Policy
        </Text>

        <TouchableOpacity
          className="bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleRegister}
          disabled={loading}>
          <Text className="text-center text-lg font-medium text-white">
            {loading ? 'Registering...' : 'I agree'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
