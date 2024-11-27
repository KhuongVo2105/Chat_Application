import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Image, Pressable } from 'react-native';
import images from '../../constants/images';
import { IconHeart, IconMessage, IconUserProfile } from '../../constants/IconComponents';
import Home from './Home';
import NewPostScreen from './NewPostScreen';
import Search from './Search';
import Notification from './Notification';

const iconBackSize = 30;

// Thanh điều hướng chung cho các màn hình tab
const Header = ({  navigation}) => {
  // const navigation = useNavigation()

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
          <Ionicons name="heart-outline" color="black" size={iconBackSize} />
        </Pressable>

        <Pressable className="mx-1" onPress={() => {
          console.log('Action', 'Go to conversation')
          navigation.navigate('(conversations)');
        }}>
          <IconMessage width={iconBackSize - 5} height={iconBackSize - 5} fill={"black"} />
        </Pressable>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator()

const TabsLayout = () => {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: true,
        header: ({ navigation }) => <Header navigation={navigation} />,
        tabBarShowLabel: false
      }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Post" component={NewPostScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Notification" component={Notification} options={{
        tabBarBadge: 3,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Profile" component={Home} options={{
        tabBarIcon: () => (
          <IconUserProfile width={iconBackSize} height={iconBackSize} source={require('./../../assets/portaits/portait_1.jpg')} />
        )
      }} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
