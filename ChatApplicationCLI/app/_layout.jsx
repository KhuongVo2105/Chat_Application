import { useFonts } from "expo-font";
import React, { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import TabsLayout from './(tabs)/_layout';
import AuthsLayout from "./(auths)/_layout";
import { AuthProvider } from "../constants/AuthContext";
import ConversationLayout from "./(conversations)/_layout";
import { NavigationContainer } from '@react-navigation/native';  // Import NavigationContainer

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        'Instagram-Sans-Bold': require('../assets/Instagram-sans/Instagram Sans Bold.ttf'),
        'Instagram-Sans-Headline': require('../assets/Instagram-sans/Instagram Sans Headline.otf'),
        'Instagram-Sans-Light': require('../assets/Instagram-sans/Instagram Sans Light.ttf'),
        'Instagram-Sans-Medium': require('../assets/Instagram-sans/Instagram Sans Medium.ttf'),
        'Instagram-Sans': require('../assets/Instagram-sans/Instagram Sans.ttf'),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded) return null;

    const Stack = createNativeStackNavigator();

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SignIn">
                    <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" component={TabsLayout} options={{ headerShown: false }} />
                    <Stack.Screen name="(auths)" component={AuthsLayout} options={{ headerShown: false }} />
                    <Stack.Screen name="(conversations)" component={ConversationLayout} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};

export default RootLayout;
