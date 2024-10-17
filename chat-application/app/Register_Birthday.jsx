import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import images from '../constants/image';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const Birthday = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [prev, setPrev] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShow(false);
    setBirthday(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const transfer = {
    email: email,
    password: password,
    birthday: birthday,
    prev: prev,
  };

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      setEmail(data.email);
      setPassword(data.password);
      setPrev(data.prev);
    }
  }, [route.params]);

  const handleBack = () => {
    navigation.navigate(prev);
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleUsername = () => {
    transfer.prev = 'Register_Birthday';
    navigation.navigate('Register_Username', { data: transfer });
  };

  const handleCheckAge = async () => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 16) {
      handleUsername();
    } else {
      Alert.alert('You must be at least 16 years old to register.');
    }
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-4">
        <TouchableOpacity className="w-full" onPress={handleBack}>
          <Image className="w-6" source={images.icon_back} resizeMode="contain" />
        </TouchableOpacity>
        <Text className="text-3xl font-semibold mb-1">What's your birthday?</Text>
        <Text className="text-base mb-7">
          Use your own birthday, even if this account is for a business, a pet or something else. No one will see this unless you choose to share it. Why do I need to provide my birthday?
        </Text>

        <View className="w-96 relative">
          <TextInput
            className="enabled:hover:border-gray-40 border py-2 px-4 w-full hover:shadow mb-3 rounded-2xl"
            placeholder="Your birthday"
            value={birthday.toDateString()}
            editable={false} // Không cho phép chỉnh sửa trực tiếp
          />
          <TouchableOpacity className="absolute right-0 top-1/2 -translate-y-4" onPress={showDatePicker}>
            <Image className="h-5" source={images.icon_calendar} resizeMode="contain" />
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              value={birthday}
              mode="date"
              display="default"
              onChange={onChange}
              maximumDate={new Date()} // Ngăn chặn các ngày trong tương lai
            />
          )}
        </View>

        <TouchableOpacity className="w-96 bg-blue-600 py-2 rounded-full mb-3" onPress={handleCheckAge}>
          <Text className="text-center text-lg font-medium text-white">Next</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center justify-center sticky bottom-0 py-6 w-full absolute bottom-0">
        <TouchableOpacity className="ml-2" onPress={handleSignIn}>
          <Text className="text-base font-medium text-blue-600">I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Birthday;
