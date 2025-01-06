import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-paper'

const ConnectedUsersList = ({ list, styleGroup }) => {

    const mockData = [
        {
            "id": "3feff435-90e2-418b-a396-e1d0c7aab5c7",
            "username": "Emmy",
            "email": "emilyjones456@gmail.com",
            "avatar": "../assets/portaits/portait_1.jpg",
            "createdAt": "2025-01-05T22:23:34.965+00:00",
            "birthday": "1995-08-22",
            "privacy": false
        },
        {
            "id": "45383fe2-57d1-424c-bafa-ceda77a1d5cf",
            "username": "DaveW",
            "email": "davidwilliams202@gmail.com",
            "avatar": null,
            "createdAt": "2025-01-05T22:24:00.345+00:00",
            "birthday": "1985-03-25",
            "privacy": true
        },
        {
            "id": "59aa5cb6-d8a0-4aa8-a23d-1534b4ac111a",
            "username": "PattyG",
            "email": "patriciagarcia707@gmail.com",
            "avatar": null,
            "createdAt": "2025-01-05T22:24:43.006+00:00",
            "birthday": "1994-01-30",
            "privacy": true
        },
        {
            "id": "804065e9-3610-4e59-83da-cc3ed2d7a101",
            "username": "MikeB",
            "email": "michaelbrown789@gmail.com",
            "avatar": null,
            "createdAt": "2025-01-05T22:23:45.544+00:00",
            "birthday": "1988-11-30",
            "privacy": true
        },
        {
            "id": "8e829b0a-c674-486d-ab2c-3de39489dfc3",
            "username": "RobG",
            "email": "robertgarcia404@gmail.com",
            "avatar": null,
            "createdAt": "2025-01-05T22:24:16.045+00:00",
            "birthday": "1987-12-05",
            "privacy": true
        },
        {
            "id": "ef7a5df5-037d-46d1-a96e-7ef387a23d36",
            "username": "Johnny",
            "email": "johnsmith123@gmail.com",
            "avatar": null,
            "createdAt": "2025-01-05T22:23:22.971+00:00",
            "birthday": "1990-05-15",
            "privacy": true
        },
        {
            "id": "f1263926-c1bd-41ea-bc46-a3d573da89c3",
            "username": "SarahJ",
            "email": "sarahjohnson101@gmail.com",
            "avatar": "https://i.pinimg.com/736x/ff/d8/10/ffd8109392e5aa39b56f341f4a388ee9.jpg",
            "createdAt": "2025-01-05T22:23:53.488+00:00",
            "birthday": "1992-02-14",
            "privacy": true
        }
    ]

    const UserProfile = ({ user }) => {
        const [avatarSource, setAvatarSource] = useState(user.avatar ? { uri: user.avatar } : require('../assets/avatarDefine.jpg'));

        const handleError = () => {
            setAvatarSource(require('../assets/avatarDefine.jpg')); // Sử dụng ảnh mặc định khi có lỗi
        };

        return (
            <View className="flex items-center m-2 my-3">
                <View className="flex flex-row items-center static mb-1">
                    <Avatar.Image
                        className=""
                        size={70}
                        source={avatarSource}
                        onError={handleError} // Gán hàm xử lý lỗi
                    />
                    <View className={`w-5 h-5 rounded-full absolute bottom-0 right-[-2] border-4 border-white ${user.privacy ? "bg-green-500" : "bg-red-500"}`} />
                </View>
                <Text
                    numberOfLines={1}
                    className="max-w-[64]"
                >{user.username}</Text>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        return <UserProfile user={item} />;
    };


    return (
        <FlatList
            className={styleGroup}
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id} // Sử dụng id làm key
            horizontal={true} // Nếu bạn muốn hiển thị theo chiều ngang
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default ConnectedUsersList

const styles = StyleSheet.create({})