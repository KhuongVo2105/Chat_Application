import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import SignIn from './SignIn';
import TabsLayout from './(tabs)/_layout';
import AuthsLayout from './(auths)/_layout';
import ConversationLayout from './(conversations)/_layout';
import { AuthProvider } from '../context/AuthContext';

const RootLayout = () => {

    console.log(`[SCREEN NAVIGATION] ${new Date().toISOString()} - Screen: RootLayout`)

    const Stack = createNativeStackNavigator();

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SignIn'>
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
