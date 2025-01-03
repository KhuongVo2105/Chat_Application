import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconUserProfileStatic } from '../../components/IconComponents';
import Home from './Home';
import NewPostScreen from './NewPostScreen';
import Search from './Search';
import Notification from './Notification';
import Header from './Header';
import Profile from './Profile';
import { Pressable, Text, View } from 'react-native';
import EditProfile from './EditProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();
const size = 32

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const ProfileHeader = ({ navigation, route }) => {
  return (
    <View className="w-full flex flex-row justify-center items-center py-3">
      <View className="w-96 flex flex-row justify-between items-center">
        <Pressable className='flex flex-row items-center'>
          <MaterialCommunityIcons name='lock-outline' size={size / 2} />
          <Text className='text-lg px-2'>Username</Text>
          <Ionicons name='chevron-down' size={size / 2} />
        </Pressable>
        <Pressable>
          <Ionicons name='menu-outline' size={size} />
        </Pressable>
      </View>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: true,
        header: ({ navigation, route }) => <Header navigation={navigation} route={route} />,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          size: 100,
        },
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
      <Tab.Screen name='Profile' component={ProfileStack} options={{
        tabBarIcon: () => (
          <IconUserProfileStatic width={32} height={32} source={require('./../../assets/portaits/portait_1.jpg')} />
        ),
        headerShown: true,
        header: ({ navigation, route }) => <ProfileHeader navigation={navigation} route={route} />
      }} />

    </Tab.Navigator>
  );
};

export default TabsLayout;