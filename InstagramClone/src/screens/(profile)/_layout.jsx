import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import EditProfile from './EditProfile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';

const ProfileLayout = () => {
    const sizeProfile = 32, sizeEdit = 20
    const { usernameContext } = useContext(AuthContext)

    const Stack = createNativeStackNavigator();

    const ProfileHeader = ({ navigation, route }) => {
        return (
            <View className="w-full flex flex-row justify-center items-center py-3 bg-white">
                <View className="w-96 flex flex-row justify-between items-center">
                    <Pressable className='flex flex-row items-center'>
                        <MaterialCommunityIcons name='lock-outline' size={sizeProfile / 2} />
                        <Text className='text-lg px-2'>{usernameContext ? usernameContext : "Username"}</Text>
                        <Ionicons name='chevron-down' size={sizeProfile / 2} />
                    </Pressable>
                    <Pressable>
                        <Ionicons name='menu-outline' size={sizeProfile} />
                    </Pressable>
                </View>
            </View>
        )
    }

    const EditProfileHeader = ({ navigation, route }) => {
        return (
            <View className="w-full flex flex-row justify-center items-center py-3">
                <View className="w-96 flex flex-row justify-between items-center">
                    <Pressable className='flex flex-row items-center'
                        onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='arrow-left' size={sizeEdit} />
                        <Text className='text-lg font-medium ml-4'>Edit profile</Text>
                    </Pressable>
                    <Pressable>
                        <MaterialIcons name="done" size={sizeEdit + 4} color='blue' />
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <Stack.Navigator initialRouteName='Profile'>
            <Stack.Screen name="Profile" component={Profile} options={{
                headerShown: true,
                header: ({ navigation, route }) => <ProfileHeader navigation={navigation} route={route} />
            }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{
                headerShown: true,
                header: ({ navigation, route }) => <EditProfileHeader navigation={navigation} route={route} />
            }} />
        </Stack.Navigator>
    )
}

export default ProfileLayout

const styles = StyleSheet.create({})