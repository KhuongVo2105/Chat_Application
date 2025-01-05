import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NavigationBar = ({navigation, route}) => {
  return (
    <View className="w-full flex flex-row bg-white">
      <View className="w-96 flex flex-row items-center justify-start mx-auto mt-10">
        <Pressable className="" onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={styles.arrow_left} />
        </Pressable>
      </View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  arrow_left: {
    fontSize: 25,
  },
});
