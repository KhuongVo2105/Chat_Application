import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";

const HeaderConverstaions = ({ navigation, route }) => {
    return (
        <View className="w-full flex flex-row bg-white py-4">
            <View className="w-96 flex flex-row items-center justify-start mx-auto">
                <Pressable className="" onPress={() => navigation.goBack()}>
                    <AntDesign name='arrowleft' style={styles.arrow_left} />
                </Pressable>
                <Text className="ml-4 text-lg font-bold">
                    {(route.params && route.params.email)?route.params.email:"example@gmail.com"}
                </Text>
            </View>
        </View>
    )
}

export default HeaderConverstaions

const styles = StyleSheet.create({
    arrow_left: {
        fontSize: 25
    }
})