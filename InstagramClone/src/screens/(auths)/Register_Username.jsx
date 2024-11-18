import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Button, TextInput, Alert, Modal, ScrollView } from 'react-native'
import images from '../../config/images'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

const RegisterUsername = ({ navigation, route }) => {
  const [username, setUsername] = useState()
  const [loading, setLoading] = useState(false)

  const { usernameContext, setUsernameContext } = useContext(AuthContext)

  const handleRegister = () => {
    setUsernameContext(username)
    navigation.navigate('Register')
  }

  return (

    <View className="w-full h-full flex items-center bg-white">

      <View className="w-96 mt-4">

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
    </View>

  )
}

export default RegisterUsername