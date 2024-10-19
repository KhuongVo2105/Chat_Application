import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator, StyleSheet, Pressable, ImageBackground, ScrollView } from 'react-native';
import images from '../constants/images';
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
      <ScrollView className="w-full bg-yellow-400">

        {/* Header */}

        <View className="w-full flex flex-row">
          {/* new feeds */}
          <ScrollView className="" horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity className="w-20 h-20 overflow-hidden flex flex-row justify-center items-center m-3">
              {/* Hình ảnh chính (phía dưới) */}
              <Image
                className="absolute z-0 rounded-full"  // Đặt dưới cùng với z-0
                style={{ width: '85%', height: '85%' }}
                resizeMode="cover"
                source={require('./../assets/portaits/portait_1.jpg')}
              />

              {/* Khung viền PNG (phía trên) */}
              <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full"  // Đặt trên cùng với z-10
                source={images.story_unseen}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-20 h-20 overflow-hidden flex flex-row justify-center items-center m-3">
              {/* Hình ảnh chính (phía dưới) */}
              <Image
                className="absolute z-0 rounded-full"  // Đặt dưới cùng với z-0
                style={{ width: '85%', height: '85%' }}
                resizeMode="cover"
                source={require('./../assets/portaits/portait_2.jpg')}
              />

              {/* Khung viền PNG (phía trên) */}
              <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full"  // Đặt trên cùng với z-10
                source={images.story_unseen}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-20 h-20 overflow-hidden flex flex-row justify-center items-center m-3">
              {/* Hình ảnh chính (phía dưới) */}
              <Image
                className="absolute z-0 rounded-full"  // Đặt dưới cùng với z-0
                style={{ width: '85%', height: '85%' }}
                resizeMode="cover"
                source={require('./../assets/portaits/portait_3.jpg')}
              />

              {/* Khung viền PNG (phía trên) */}
              <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full"  // Đặt trên cùng với z-10
                source={images.story_unseen}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-20 h-20 overflow-hidden flex flex-row justify-center items-center m-3">
              {/* Hình ảnh chính (phía dưới) */}
              <Image
                className="absolute z-0 rounded-full"  // Đặt dưới cùng với z-0
                style={{ width: '85%', height: '85%' }}
                resizeMode="cover"
                source={require('./../assets/portaits/portait_4.jpg')}
              />

              {/* Khung viền PNG (phía trên) */}
              <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full"  // Đặt trên cùng với z-10
                source={images.story_unseen}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-20 h-20 overflow-hidden flex flex-row justify-center items-center m-3">
              {/* Hình ảnh chính (phía dưới) */}
              <Image
                className="absolute z-0 rounded-full"  // Đặt dưới cùng với z-0
                style={{ width: '85%', height: '85%' }}
                resizeMode="cover"
                source={require('./../assets/portaits/portait_1.jpg')}
              />

              {/* Khung viền PNG (phía trên) */}
              <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full"  // Đặt trên cùng với z-10
                source={images.story_unseen}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-20 h-20 overflow-hidden flex flex-row justify-center items-center m-3">
              {/* Hình ảnh chính (phía dưới) */}
              <Image
                className="absolute z-0 rounded-full"  // Đặt dưới cùng với z-0
                style={{ width: '85%', height: '85%' }}
                resizeMode="cover"
                source={require('./../assets/portaits/portait_2.jpg')}
              />

              {/* Khung viền PNG (phía trên) */}
              <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full"  // Đặt trên cùng với z-10
                source={images.story_unseen}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-20 h-20 overflow-hidden flex flex-row justify-center items-center m-3">
              {/* Hình ảnh chính (phía dưới) */}
              <Image
                className="absolute z-0 rounded-full"  // Đặt dưới cùng với z-0
                style={{ width: '85%', height: '85%' }}
                resizeMode="cover"
                source={require('./../assets/portaits/portait_3.jpg')}
              />

              {/* Khung viền PNG (phía trên) */}
              <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full"  // Đặt trên cùng với z-10
                source={images.story_unseen}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-20 h-20 overflow-hidden flex flex-row justify-center items-center m-3">
              {/* Hình ảnh chính (phía dưới) */}
              <Image
                className="absolute z-0 rounded-full"  // Đặt dưới cùng với z-0
                style={{ width: '85%', height: '85%' }}
                resizeMode="cover"
                source={require('./../assets/portaits/portait_4.jpg')}
              />

              {/* Khung viền PNG (phía trên) */}
              <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full"  // Đặt trên cùng với z-10
                source={images.story_unseen}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Contents */}
        <View className="w-full h-96 bg-gray-200">

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
})
export default Home;
