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
import { Pressable, StyleSheet, Text, View } from 'react-native';
import EditProfile from './EditProfile';

const Tab = createBottomTabNavigator()
const size = 32

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
      <Tab.Screen name='Profile' component={Profile} options={{
        tabBarIcon: () => (
          <IconUserProfileStatic width={32} height={32} source={require('./../../assets/portaits/portait_1.jpg')} />
        ),
        headerShown: true,
        header: ({ navigation, route }) => <ProfileHeader navigation={navigation} route={route} />
      }} />
      {/* <Tab.Screen name='EditProfile' component={EditProfile} options={{
        tabBarButton: () => null,
        headerShown: true,
        header: ({ navigation, route }) => <ProfileHeader navigation={navigation} route={route} />
      }} /> */}
    </Tab.Navigator>
  );
};

export default TabsLayout;