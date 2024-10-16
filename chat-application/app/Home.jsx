import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import images from '../constants/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints";

const Home = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.data) {
      const { data } = route.params;
    }
  }, [route.params]);

  return (
    <View className="w-full h-full flex justify-center items-center bg-white">
      <Text>Home page</Text>
    </View>
  );
};

export default Home;
