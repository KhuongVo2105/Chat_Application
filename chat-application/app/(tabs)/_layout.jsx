import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import { View, Image, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import images from '../../constants/images';
import { AuthProvider } from '../../constants/AuthContext';
import { SvgXml } from 'react-native-svg';
import { IconCreateNewPost, IconHeart, IconHome, IconMessage, IconSearch, IconUserProfile } from '../../constants/IconComponents';
import pathDatas from '../../constants/pathDatas';

const iconBackSize = 30;

// Thanh điều hướng chung cho các màn hình tab
const Header = () => {
  return (
    <View className="w-full flex flex-row bg-white justify-between mt-6 p-2">
      <Pressable>
        <Image
          source={images.instagram_text} // Đảm bảo đường dẫn đúng
          style={{ width: 121, height: 35 }} // Điều chỉnh kích thước và margin
          resizeMode='containt' />
      </Pressable>

      <View className="flex flex-row items-center">
        <Pressable
          className="mx-1">
          <IconHeart width={iconBackSize} height={iconBackSize} />
        </Pressable>
        <Pressable className="mx-1">
          <IconMessage width={iconBackSize-5} height={iconBackSize-5} fill={"black"}/>
        </Pressable>
      </View>
    </View>
  );
};

const FooterBar = () => {
  return (
    <View className="flex flex-row items-center justify-between sticky bottom-0 p-3 pb-2 w-full absolute bottom-0 border-t"
      style={{ backgroundColor: "#fafbfb" }}>
      <Pressable className="ml-2" onPress={() => router.push('./../SignIn')}>
        <IconHome width={iconBackSize} height={iconBackSize} pathData={pathDatas.icon_home_selected}/>
      </Pressable>
      <Pressable className="ml-2" onPress={() => router.push('')}>
        <IconSearch width={iconBackSize} height={iconBackSize} />
      </Pressable>
      <Pressable className="ml-2" onPress={() => router.push('')}>
        <IconCreateNewPost width={iconBackSize} height={iconBackSize} />
      </Pressable>
      <Pressable className="ml-2" onPress={() => router.push('')}>
        <IconHeart width={iconBackSize} height={iconBackSize} />
      </Pressable>
      <Pressable className="ml-2" onPress={() => router.push('')}>
        <IconUserProfile width={iconBackSize} height={iconBackSize} source={require('./../../assets/portaits/portait_1.jpg')}/>
      </Pressable>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const TabsLayout = () => {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: true,
          header: () => <Header />
        }} />
        {/* Bạn có thể thêm các tab khác vào đây nếu cần */}

      </Stack.Navigator>
      <FooterBar />
    </AuthProvider>
  );
};

export default TabsLayout;
