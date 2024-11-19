import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IconUserProfile } from '../../components/IconComponents';
import Home from './Home';
import NewPostScreen from './NewPostScreen';
import Search from './Search';
import Notification from './Notification';
import Header from './Header';

const iconBackSize = 30;

const Tab = createBottomTabNavigator()

const TabsLayout = () => {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: true,
        header: ({ navigation, route }) => <Header navigation={navigation} route={route} />,
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
