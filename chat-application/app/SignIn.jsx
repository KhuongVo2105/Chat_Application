import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import images from '../contants/image'
import { useState } from 'react'

const SignIn = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (

    <View
      className="w-full h-full flex justify-center items-center bg-white">
      <View className="w-80 h-auto mb-10">
        <Image
          className="w-full h-20"
          source={images.logo_text} resizeMode='contain' />
      </View>

      <TextInput
        className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-3 rounded-lg drop-shadow-2xl"
        onChangeText={setEmail}
        placeholder='Phone number, username or email address'
        value={email} />
      <TextInput
        className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-3 rounded-lg"
        onChangeText={setEmail}
        placeholder='Password'
        value={email} />
      <TouchableOpacity
        className="w-96 mb-3">
        <Text className="text-blue-600 text-right drop-shadow-md">Forgotten password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-96 bg-blue-600 py-3 rounded-lg">
        <Text className="text-center text-xl font-medium text-white">Log in</Text>
      </TouchableOpacity>

      <View className="relative justify-center items-center my-7">
        <View className="w-96 bg-gray-300 h-0.5" />
        <Text className="absolute m-auto bg-white px-2">Or</Text>
      </View>

      <TouchableOpacity className="flex flex-row justify-items-center items-center">
        <Image className="h-6" source={images.icon_fb} resizeMode='contain' />
        <Text className="text-base text-blue-600">Log in with Facebook</Text>
      </TouchableOpacity>
    </View>

  )
}

export default SignIn