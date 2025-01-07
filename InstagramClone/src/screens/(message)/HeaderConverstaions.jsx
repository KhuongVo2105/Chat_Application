import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../context/AuthContext';
import { useTheme } from 'react-native-paper';

const HeaderConverstaions = ({navigation, route}) => {
  const {usernameContext} = useContext(AuthContext);

  return (
    <View className="w-full flex flex-row bg-white py-4">
      <View className="w-96 flex flex-row items-center justify-start mx-auto">
        <Pressable className="" onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={styles.arrow_left} />
        </Pressable>
        <Text className="ml-4 text-lg font-bold"
        style={{color:useTheme().colors.onSurface}}>
          {usernameContext ? usernameContext : 'example@gmail.com'}
        </Text>
      </View>
    </View>
  );
};

export default HeaderConverstaions;

const styles = StyleSheet.create({
  arrow_left: {
    fontSize: 25,
  },
});
