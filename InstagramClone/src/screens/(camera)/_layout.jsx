import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';

const CameraLayout = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="CameraScreen">
            <Stack.Screen
                name='CameraScreen'
                component={CameraScreen}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default CameraLayout

const styles = StyleSheet.create({})