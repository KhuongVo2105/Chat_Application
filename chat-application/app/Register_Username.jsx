import React from 'react'
import { View, Text, TouchableOpacity, Image, Button, TextInput, Alert, Modal, ScrollView } from 'react-native'
import images from '../contants/image'
import { useState, useEffect } from 'react';
import axios from 'axios'

const Username = ({ navigation, route }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [birthday, setBirthday] = useState(new Date())
  const [username, setUsername] = useState()
  const [prev, setPrev] = useState()
  const [loading, setLoading] = useState(false)

  const transfer = {
    email: email,
    password: password,
    birthday: birthday,
    username: username,
    prev: prev
  }

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
      setEmail(data.email);  // Ví dụ: Đặt email từ dữ liệu truyền vào
      setPassword(data.password)
      setBirthday(data.birthday)
      setPrev(data.prev)
    }
  }, [route.params])

  const handleBack = () => {
    navigation.navigate(prev)
  }

  const handleSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handleRegister = () => {
    transfer.prev = 'Register_Username'
    navigation.navigate('Register', { data: transfer })
  }

  const handleUsenameIsExist = () => {
    if (username) {

    }
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
        <Text className="text-3xl font-semibold mb-1">To sign up, read and agree to our terms and policies</Text>
        <Text className="text-base mb-7">
          By signing up you agree to Instagram's Terms, Privacy Policy and Cookies Policy
        </Text>

        {/* enter username */}
        <TouchableOpacity
          className="bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleRegister}>
          <Text className="text-center text-lg font-medium text-white">I agree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white py-2 rounded-full mb-3"
          onPress={handleSignIn}>
          <Text className="text-center text-lg font-medium text-blue-600">Already have an account?</Text>
        </TouchableOpacity>
      </View>

    </View>

  )
}

export default Username