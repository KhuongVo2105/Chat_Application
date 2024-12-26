import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import images from '../../config/images';

const CreatePassword = ({navigation, route}) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setEmail(route.params.email);
  }, [route.params]);

  const handleTogglePassword = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const handleBirthday = async () => {
    if (password && password.length >= 6) {
      navigation.navigate('Register_Birthday', {
        email: email,
        password: password,
      });
    } else {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
    }
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-4">
        <Text className="text-3xl font-semibold mb-1">Create a password</Text>
        <Text className="text-base mb-7">
          Create a password with at least 6 letters or numbers. It should be
          something others can't guess.
        </Text>

        {/* Password input */}
        <View className="w-96 relative">
          <TextInput
            className="enabled:hover:border-gray-40 border py-2 px-4 w-full hover:shadow mb-3 rounded-2xl"
            onChangeText={setPassword}
            placeholder="Password"
            value={password}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            className="absolute right-0 top-1/2 -translate-y-4"
            onPress={handleTogglePassword}>
            <Image
              className="h-5"
              source={isPasswordVisible ? images.icon_show : images.icon_hide}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Go to next page button */}
        <TouchableOpacity
          className="w-96 bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleBirthday}>
          <Text className="text-center text-lg font-medium text-white">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePassword;
