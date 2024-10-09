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

  const handleUsenameIsExist = ()=>{
    if(username){
      
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
        <Text className="text-3xl font-semibold mb-1">Create a username</Text>
        <Text className="text-base mb-7">
          Add a username or use our suggestion. You can change this at any time.
        </Text>

        {/* enter username */}
        <TextInput
          className="enabled:hover:border-gray-40 border py-2 px-4 w-full hover:shadow mb-3 rounded-2xl"
          placeholder="Username"
          onChangeText={setUsername}
          value={username} />

        {/* Go to next page */}
        <TouchableOpacity
          className="w-96 bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleRegister}>
          <Text className="text-center text-lg font-medium text-white">Next</Text>
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

export default Username