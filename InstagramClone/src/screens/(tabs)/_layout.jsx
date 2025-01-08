
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import NewPostScreen from './NewPostScreen';
import Search from './search/Search';
import Notification from './Notification';
import Header from './Header';
import ProfileLayout from '../(profile)/_layout';
import { Avatar } from 'react-native-paper';
import AvatarComponent from '../../components/AvatarComponent';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        header: ({navigation, route}) => (
          <Header navigation={navigation} route={route} />
        ),
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
        tabBarBadge: "",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart-outline" color={color} size={size} />
        )
      }} />
      <Tab.Screen name='ProfileLayout' component={ProfileLayout} options={{
        tabBarIcon: () => (
          // <AvatarComponent size={30} user={{avatar:'../assets/avatarDefine.jpg'}}/>
          <Avatar.Image size={30} source={require('./../../assets/portaits/portait_1.jpg')}
          />
        ),
        headerShown: false
        
      }}
      listeners={({navigation}) => ({blur: () => navigation.setParams({user: undefined, username: undefined})})} />
    </Tab.Navigator>
  );
};

export default TabsLayout;
