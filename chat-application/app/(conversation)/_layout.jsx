import { useFonts } from "expo-font";
import React, { useEffect } from 'react'
import { SplashScreen } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Conversations from "./Conversations";

SplashScreen.preventAutoHideAsync();

const ConversationLayout = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Conversations'>
            <Stack.Screen name='Conversations' component={Conversations} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ConversationLayout;
