import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Conversation = () => {
    const route = useRoute()
    const { groupId } = route.params;

    return (
        <View>
            <Text>Conversation</Text>
            <Text className="fs-4">{groupId}</Text>
            <Pressable>
                <Ionicons name='videocam-outline' size={80} />
            </Pressable>
        </View>
    )
}

export default Conversation

const styles = StyleSheet.create({})