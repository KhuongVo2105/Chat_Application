import { StyleSheet } from 'react-native'
import { useFonts } from "expo-font";
import React, { useEffect } from 'react'
import { SplashScreen } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';

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
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}

export default RootLayout

const styles = StyleSheet.create({})
