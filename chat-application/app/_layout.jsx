import { Button, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useFonts } from "expo-font";
import React, { useEffect } from 'react'
import { SplashScreen } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Register_Email from './Register_Email'
import Register_ConfirmCode from './Register_ConfirmCode'
import Register_CreatePasswd from './Register_CreatePasswd'
import Register_Birthday from './Register_Birthday'
import Register_Username from './Register_Username'
import Register from './Register'
import Home from "./Home";
import images from '../constants/images';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [fontsLoaded, error] = useFonts({
        'Instagram-Sans-Bold': require('../assets/Instagram-sans/Instagram Sans Bold.ttf'),
        'Instagram-Sans-Headline': require('../assets/Instagram-sans/Instagram Sans Headline.otf'),
        'Instagram-Sans-Light': require('../assets/Instagram-sans/Instagram Sans Light.ttf'),
        'Instagram-Sans-Medium': require('../assets/Instagram-sans/Instagram Sans Medium.ttf'),
        'Instagram-Sans': require('../assets/Instagram-sans/Instagram Sans.ttf')
    })

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded) return null;

    if (!fontsLoaded && !error) return null;

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name='Register_Email' component={Register_Email} options={{ headerShown: false }} />
            <Stack.Screen name='Register_ConfirmCode' component={Register_ConfirmCode} options={{ headerShown: false }} />
            <Stack.Screen name='Register_CreatePasswd' component={Register_CreatePasswd} options={{ headerShown: false }} />
            <Stack.Screen name='Register_Birthday' component={Register_Birthday} options={{ headerShown: false }} />
            <Stack.Screen name='Register_Username' component={Register_Username} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{
                headerShown: true,
                title: '',
                headerLeft: () => (
                    <TouchableOpacity className="mx-1" onPress={() => console.log('Left icon pressed')}>
                        <Image
                            source={images.instagram_text} // Đảm bảo đường dẫn đúng
                            style={{ width: 121, height: 35 }} // Điều chỉnh kích thước và margin
                            resizeMode='containt'
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <View className="flex flex-row items-center">
                        <TouchableOpacity
                            className="mx-1">
                            <Image source={images.icon_notify}
                                style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mx-1">
                            <Image source={images.icon_message}
                                style={{ width: 27, height: 27 }} />
                        </TouchableOpacity>
                    </View>
                ),
            }} />
        </Stack.Navigator>
    )
}

export default RootLayout

const styles = StyleSheet.create({})
