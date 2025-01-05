<<<<<<< HEAD
import React, {useContext, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
=======

import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
>>>>>>> 43794d2e9cf7abe8c8c16226b246f2f20d988365
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconUserProfileStatic} from '../../components/IconComponents';
import Home from './Home';
import NewPostScreen from './NewPostScreen';
import Search from './search/Search';
import Notification from './Notification';
import Header from './Header';
import ProfileLayout from '../(profile)/_layout';
<<<<<<< HEAD
import {Avatar} from 'react-native-paper';
=======
import { Avatar } from 'react-native-paper';

const Tab = createBottomTabNavigator();
>>>>>>> 43794d2e9cf7abe8c8c16226b246f2f20d988365

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
<<<<<<< HEAD
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={NewPostScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarBadge: 3,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileLayout"
        component={ProfileLayout}
        options={{
          tabBarIcon: () => (
            <Avatar.Image
              size={30}
              source={require('./../../assets/portaits/portait_1.jpg')}
            />
          ),
          headerShown: false,
        }}
        listeners={({navigation}) => ({blur: () => navigation.setParams({username: undefined})})}
      />
=======
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
      <Tab.Screen name='ProfileLayout' component={ProfileLayout} options={{
        tabBarIcon: () => (
          <Avatar.Image size={30} source={require('./../../assets/portaits/portait_1.jpg')} />
        ),
        headerShown: false
      }} />
>>>>>>> 43794d2e9cf7abe8c8c16226b246f2f20d988365
    </Tab.Navigator>
  );
};

export default TabsLayout;
