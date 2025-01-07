import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Avatar, Tooltip } from 'react-native-paper'

const Message = (props) => {
    return (
        <View className={`flex ${props.fromMe ? "flex-row-reverse" : "flex-row"} items-end`}>
            {/* Hiển thị Avatar nếu fromMe không tồn tại */}
            {!props.fromMe && (
                <Avatar.Image size={24} source={require('../assets/avatarDefine.jpg')} />
            )}

            <View
                className={`py-1 px-3 w-auto max-w-[64%] shadow rounded-2xl
                ${props.fromMe ? "bg-blue-500 justify-end self-end mr-1" : "bg-cyan-500 justify-start self-start ml-1"}
                flex`}>
                <Text
                    className={`text-base text-white
                    ${props.fromMe ? "text-left" : "text-left"}`}>
                    {props.message}
                </Text>
                <Text className={`text-xs text-slate-200 opacity-80 ${props.fromMe ? "text-right" : "text-left"}`}>
                    {props.receivedTime}
                </Text>
            </View>
            {/* {props.error ? (
                <Tooltip title={`${props.error}`}>
                    <MaterialIcons name="error-outline" size={20} color={'red'} />
                </Tooltip>
            ) : null} */}

        </View>

    )
}

export default Message

const styles = StyleSheet.create({})