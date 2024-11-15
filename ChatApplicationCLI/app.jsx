import { StyleSheet, Text, View } from 'react-native'

import React from 'react'
import { AuthProvider } from './constants/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import RootLayout from './app/_layout'

const app = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <RootLayout />
            </NavigationContainer>
        </AuthProvider>
    )
}

export default app

const styles = StyleSheet.create({})