import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Avatar } from 'react-native-paper'; // Đảm bảo bạn đã cài đặt react-native-paper
import { AuthContext } from '../context/AuthContext';

const GroupChat = ({ navigation, styleGroup, conversations }) => {
    const mockData = [
        {
            userIdTo: "1",
            lastMessage: "Hello, how are you?",
            name: "Group 1",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "1 hour",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T10:30:50.746+00:00"
        },
        {
            userIdTo: "2",
            lastMessage: "Let's meet tomorrow.",
            name: "Group 2",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "2 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T11:00:50.746+00:00"
        },
        {
            userIdTo: "3",
            lastMessage: "Are you coming to the party?",
            name: "Group 3",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "3 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T12:00:50.746+00:00"
        },
        {
            userIdTo: "4",
            lastMessage: "Don't forget the meeting.",
            name: "Group 4",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "4 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T13:00:50.746+00:00"
        },
        {
            userIdTo: "5",
            lastMessage: "Can you send me the files?",
            name: "Group 5",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "5 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T14:00:50.746+00:00"
        },
        {
            userIdTo: "6",
            lastMessage: "Great job on the project!",
            name: "Group 6",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "6 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T15:00:50.746+00:00"
        },
        {
            userIdTo: "7",
            lastMessage: "What time is the event?",
            name: "Group 7",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "7 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T16:00:50.746+00:00"
        },
        {
            userIdTo: "8",
            lastMessage: "Looking forward to it!",
            name: "Group 8",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "8 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T17:00:50.746+00:00"
        },
        {
            userIdTo: "9",
            lastMessage: "Let's catch up soon.",
            name: "Group 9",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "9 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T18:00:50.746+00:00"
        },
        {
            userIdTo: "10",
            lastMessage: "Thanks for your help!",
            name: "Group 10",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "10 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T19:00:50.746+00:00"
        },
        {
            userIdTo: "11",
            lastMessage: "Can we reschedule our meeting?",
            name: "Group 11",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "11 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T20:00:50.746+00:00"
        },
        {
            userIdTo: "12",
            lastMessage: "Don't forget to submit your report.",
            name: "Group 12",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "12 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T21:00:50.746+00:00"
        },
        {
            userIdTo: "13",
            lastMessage: "What do you think about the new project?",
            name: "Group 13",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "13 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T22:00:50.746+00:00"
        },
        {
            userIdTo: "14",
            lastMessage: "Let's finalize the details.",
            name: "Group 14",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "14 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-06T23:00:50.746+00:00"
        },
        {
            userIdTo: "15",
            lastMessage: "Can you review my presentation?",
            name: "Group 15",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "15 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-07T00:00:50.746+00:00"
        },
        {
            userIdTo: "16",
            lastMessage: "Looking for your feedback.",
            name: "Group 16",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "16 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-07T01:00:50.746+00:00"
        },
        {
            userIdTo: "17",
            lastMessage: "Let's discuss the budget.",
            name: "Group 17",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "17 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-07T02:00:50.746+00:00"
        },
        {
            userIdTo: "18",
            lastMessage: "Can you send me the latest updates?",
            name: "Group 18",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "18 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-07T03:00:50.746+00:00"
        },
        {
            userIdTo: "19",
            lastMessage: "What time is our next call?",
            name: "Group 19",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "19 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-07T04:00:50.746+00:00"
        },
        {
            userIdTo: "20",
            lastMessage: "Thanks for the update!",
            name: "Group 20",
            avatar: "https://cdn-icons-png.flaticon.com/512/2352/2352167.png",
            time: "20 hours",
            visible: true,
            status: true,
            timeCreateAt: "2025-01-07T05:00:50.746+00:00"
        }
    ];

    const {idContext} = useContext(AuthContext)

    const renderItem = ({ item }) => (
        <TouchableOpacity
            className="flex flex-row items-center py-2"
            onPress={() =>
                navigation.navigate('Chat', {
                    userIdSend: idContext, // thay đổi user
                    userIdTo: item.userIdTo,
                    avatarTo:
                        item.status === false
                            ? item.avatar
                            : require('../assets/chatGroup.png'),
                    nameTo: item.name,
                    status: item.status, // boolean true là gr false là 1vs1
                })
            }>
            <View className="rounded-full border mx-3">
                {item.status === false ? (
                    <Avatar.Image source={{ uri: item.avatar }} size={40} className="bg-white" />
                ) : (
                    <Avatar.Image source={require('../assets/chatGroup.png')} size={40} className="bg-white" />
                )}
            </View>
            <View className="flex-1">
                <Text className="text-xl font-semibold">{item.name}</Text>
                <Text className="text-base opacity-80"
                    numberOfLines={1}>
                    {item.visible && item.lastMessage
                        ? `You: ${item.lastMessage}`
                        : item.lastMessage || 'Không có tin nhắn'}
                </Text>
            </View>
            <Text className=" px-2 py-0.5 rounded-full bg-sky-100 text-dark mr-5">{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            className={`w-full mb-10 ${styleGroup}`}
            data={conversations}
            renderItem={renderItem}
            keyExtractor={item => item.userIdTo}
            removeClippedSubviews={false}
            horizontal={false}
            showsVerticalScrollIndicator={false}
        />
    );
}

export default GroupChat;

const styles = StyleSheet.create({});