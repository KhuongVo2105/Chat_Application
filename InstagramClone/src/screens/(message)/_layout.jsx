import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Message from './AllConversations';
import Chat from './Conversation'
import HeaderConversation from './HeaderConversation'
import HeaderConverstaions from './HeaderConverstaions'

const ChatLayout = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Message">
            <Stack.Screen
                name="Message"
                component={Message}
                options={{
                    headerShown: true,
                    header: ({ navigation, route }) => (
                        <HeaderConverstaions navigation={navigation} route={route}/>
                    ),
                }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                    headerShown: true,
                    header: ({ navigation, route }) => (
                        <HeaderConversation navigation={navigation} route={route} />
                    ),
                }}
            />
        </Stack.Navigator>
    )
}

export default ChatLayout

const styles = StyleSheet.create({})