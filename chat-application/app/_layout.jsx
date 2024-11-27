<<<<<<< HEAD
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
=======
import { useFonts } from "expo-font";
import React, { useEffect } from 'react'
import { SplashScreen } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import TabsLayout from './(tabs)/_layout';
import AuthsLayout from "./(auths)/_layout";
import { AuthProvider } from "../constants/AuthContext";
import ConversationLayout from "./(conversations)/_layout";
>>>>>>> d8acec4626ac1a67da46ba8f53d5880fa674d8b1

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
<<<<<<< HEAD
        <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name='Register_Email' component={Register_Email} options={{ headerShown: false }} />
            <Stack.Screen name='Register_ConfirmCode' component={Register_ConfirmCode} options={{ headerShown: false }} />
            <Stack.Screen name='Register_CreatePasswd' component={Register_CreatePasswd} options={{ headerShown: false }} />
            <Stack.Screen name='Register_Birthday' component={Register_Birthday} options={{ headerShown: false }} />
            <Stack.Screen name='Register_Username' component={Register_Username} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default RootLayout

const styles = StyleSheet.create({})
=======
        <AuthProvider>
            <Stack.Navigator initialRouteName='SignIn'>
                <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} component={TabsLayout} />
                <Stack.Screen name='(auths)' options={{ headerShown: false }} component={AuthsLayout} />
                <Stack.Screen name="(conversations)" options={{ headerShown: false }} component={ConversationLayout} />
            </Stack.Navigator>
        </AuthProvider>
    )
}

export default RootLayout;
>>>>>>> d8acec4626ac1a67da46ba8f53d5880fa674d8b1
