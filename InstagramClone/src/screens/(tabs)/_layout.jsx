import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconUserProfile} from '../../components/IconComponents';
import Home from './Home';
import NewPostScreen from './NewPostScreen';
import Search from './search/Search';
import Notification from './Notification';
import Header from './Header';
import Profile from '../(profile)/Profile';

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
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <IconUserProfile
              width={32}
              height={32}
              source={require('./../../assets/portaits/portait_1.jpg')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsLayout;
