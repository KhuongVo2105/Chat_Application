import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feaher from 'react-native-vector-icons/Feather';
import images from '../../config/images';

const Header = ({navigation, route}) => {
  return (
    <View className="w-full flex flex-row bg-white justify-between p-2">
      <Pressable>
        <Image
          source={images.instagram_text} // Đảm bảo đường dẫn đúng
          style={{width: 121, height: 35}} // Điều chỉnh kích thước và margin
          resizeMode="contain"
        />
      </Pressable>

      <View className="flex flex-row items-center">
        <Pressable className="mx-1">
          <AntDesign name="hearto" style={styles.notify} className="" />
        </Pressable>

        <Pressable
          className="mx-1 transform scale-x-[-1]"
          onPress={() => {
            console.log('Action', 'Go to conversation');
            // navigation.navigate('(conversations)');
            navigation.navigate('(message)');
          }}>
          <Feaher name="message-circle" style={styles.conversations} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  notify: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  conversations: {
    fontSize: 28,
    fontWeight: 'normal',
    color: 'black',
  },
});
