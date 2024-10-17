import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator, StyleSheet, Pressable, ImageBackground } from 'react-native';
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
      <View className="w-full flex flex-row ">
        <TouchableOpacity>
          <View className="overflow-hidden" style={styles.story_box}>

            <ImageBackground
              className="w-full h-full"
              source={require('./../assets/story_unseen.png')}>

              <Image
                className="w-full h-full"
                resizeMode='contain'
                source={require('./../assets/portaits/portait_1.jpg')}
              />
            </ImageBackground>
          </View>
        </TouchableOpacity>

      </View>
      <Text>Home page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  story_box: {
    width: 80, height: 80,
  }
})
export default Home;
