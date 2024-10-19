import { StyleSheet } from 'react-native'
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
import NewPostScreen from './NewPostScreen';
import { CardStyleInterpolators } from '@react-navigation/stack';

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
        <Stack.Navigator initialRouteName='SignIn'
        screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='Register_Email' component={Register_Email} />
            <Stack.Screen name='Register_ConfirmCode' component={Register_ConfirmCode} />
            <Stack.Screen name='Register_CreatePasswd' component={Register_CreatePasswd} />
            <Stack.Screen name='Register_Birthday' component={Register_Birthday} />
            <Stack.Screen name='Register_Username' component={Register_Username} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='NewPostScreen' component={NewPostScreen}/>
        </Stack.Navigator>
    )
}

export default RootLayout

const styles = StyleSheet.create({})
