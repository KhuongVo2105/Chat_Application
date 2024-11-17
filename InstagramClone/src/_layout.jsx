import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import SignIn from './SignIn';
import TabsLayout from './(tabs)/_layout';
import AuthsLayout from "./(auths)/_layout";
import { AuthProvider } from "./constants/AuthContext";
import ConversationLayout from "./(conversations)/_layout";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [fontsLoaded, error] = useFonts({
        'Instagram-Sans-Bold': require('../assets/fonts/Instagram Sans Bold.ttf'),
        'Instagram-Sans-Headline': require('../assets/fonts/Instagram Sans Headline.otf'),
        'Instagram-Sans-Light': require('../assets/fonts/Instagram Sans Light.ttf'),
        'Instagram-Sans-Medium': require('../assets/fonts/Instagram Sans Medium.ttf'),
        'Instagram-Sans': require('../assets/fonts/Instagram Sans.ttf')
    })

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded) return null;

    if (!fontsLoaded && !error) return null;

    const Stack = createNativeStackNavigator();

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
                    <Stack.Screen name='(tabs)' options={{ headerShown: false }} component={TabsLayout} />
                    <Stack.Screen name='(auths)' options={{ headerShown: false }} component={AuthsLayout} />
                    <Stack.Screen name="(conversations)" options={{ headerShown: false }} component={ConversationLayout} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    )
}

export default RootLayout;
