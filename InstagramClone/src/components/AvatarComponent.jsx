import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-paper'
import images from '../config/images';

const AvatarComponent = ({ size, user }) => {
    const [avatarSource, setAvatarSource] = useState(user.avatar ? { uri: user.avatar } : require('../assets/avatarDefine.jpg'));

    const handleError = () => {
        setAvatarSource(require('../assets/avatarDefine.jpg')); // Sử dụng ảnh mặc định khi có lỗi
    };

    const seen = false

    return (
        <View className="overflow-hidden flex flex-row justify-center items-center">
            <Avatar.Image
                className=""
                size={size || 70}
                source={avatarSource}
                onError={handleError} // Gán hàm xử lý lỗi
            />
            {/* Khung viền PNG (phía trên) */}
            <Image
                className="w-full h-full justify-center items-center absolute z-10 rounded-full" // Đặt trên cùng với z-10
                source={seen != true ? images.story_unseen : images.story_seen}
            />
        </View>
    )
}

export default AvatarComponent

const styles = StyleSheet.create({})