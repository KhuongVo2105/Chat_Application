import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import avatarDefine from '../assets/avatarDefine.jpg';

const UserSuggestion = props => {
  return (
    <View className="w-36 border border-slate-200 shadow-inner rounded-lg p-3 items-center mx-1">
      <TouchableOpacity className="absolute right-2 top-2">
        <FontAwesome name="close" />
      </TouchableOpacity>
      <View
        className={`w-16 h-16 overflow-hidden flex flex-row justify-center items-center`}>
        {/* Hình ảnh chính (phía dưới) */}
        <Image
          className="absolute z-0 rounded-full" // Đặt dưới cùng với z-0
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          source={props.image ? {uri: props.image} : avatarDefine}
        />
      </View>
      <Text className="text-base font-semibold">
        {props.username ? props.username : 'username'}
      </Text>
      <View className="h-10">
        <Text
          className="text-xs text-slate-500"
          numberOfLines={2} // Giới hạn số dòng hiển thị là 2
          ellipsizeMode="tail" // Ẩn phần thừa nếu quá dài
        >
          {props.caption ? props.caption : 'Suggested for you'}
        </Text>
      </View>
      <TouchableOpacity className="bg-blue-500 p-1 px-2 items-center rounded-md"
      onPress={props.follow}>
        <Text className="text-white font-semibold">Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSuggestion;

const styles = StyleSheet.create({});
