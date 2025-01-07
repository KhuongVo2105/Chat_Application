import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { AuthContext } from '../../context/AuthContext';

const HeaderConverstaions = ({navigation, route}) => {
  const [online, setOnline] = useState(true);
  const {usernameContext} = useContext(AuthContext)

  return (
    <View className="w-full flex flex-row bg-white py-4">
      <View className="w-96 flex flex-row items-center justify-start mx-auto">
        <Pressable className="" onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={styles.arrow_left} />
        </Pressable>
        <Text className="ml-4 text-lg font-bold">
          {route.params && route.params.nameTo
            ? route.params.nameTo
            : 'example@gmail.com'}
        </Text>
        <View className="grow" />
        <View className="flex flex-row">
          <Pressable className="mx-3">
            <Ionicons name="call-outline" style={styles.call} />
          </Pressable>
          <Pressable className="flex flex-row items-center">
            <Ionicons name="videocam-outline" style={styles.call} />
            {online ? <Octicons name="dot-fill" style={styles.status} /> : null}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HeaderConverstaions;

const styles = StyleSheet.create({
  arrow_left: {
    fontSize: 25,
  },
  call: {
    fontSize: 30,
  },
  status: {
    fontSize: 20,
    color: 'green',
    marginLeft: 3,
  },
});
