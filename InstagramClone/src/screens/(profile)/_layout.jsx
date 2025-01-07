import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './Profile';
import EditProfile from './EditProfile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProfileLayout = () => {
  const sizeProfile = 32,
    sizeEdit = 20;
  const {usernameContext} = useContext(AuthContext);
  const Stack = createNativeStackNavigator();
  const router = useRoute();
  const [user, setUser] = useState();
  const [isUser, setIsUser] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useContext(AuthContext);


    useEffect(() => {
    if(router.params?.user) {
      setUser(router.params?.user);
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, [usernameContext, router.params?.user])



  const ProfileHeader = ({navigation, route}) => {
      const handleLogout = () => {
          logout();
          navigation.replace('SignIn');
      }
    return (
      <View className="w-full flex flex-row justify-center items-center py-3 bg-white">
        <View className="w-96 flex flex-row justify-between items-center">
          <Pressable className="flex flex-row items-center">
            <MaterialCommunityIcons
              name="lock-outline"
              size={sizeProfile / 2}
            />
            <Text className="text-lg px-2">
              {isUser ? usernameContext : user?.username}
            </Text>
            <Ionicons name="chevron-down" size={sizeProfile / 2} />
          </Pressable>
            {!menuVisible && (
                <Pressable
                    onPress={() => setMenuVisible(true)}>
                    <Ionicons name="menu-outline" size={sizeProfile} />
                </Pressable>
            )}
            {/*Đăng xuât*/}
            {menuVisible && (
                <Pressable
                    onPress={handleLogout}
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.logoutButtonPressed,
                    ]}>
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </Pressable>
            )}
        </View>
      </View>
    );
  };

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={() => <Profile user={user} isUser={isUser} />}
        options={{
          headerShown: true,
          header: ({navigation, route}) => (
            <ProfileHeader navigation={navigation} route={route} />
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({
    logoutButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    logoutButtonPressed: {
        backgroundColor: 'darkred',
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
