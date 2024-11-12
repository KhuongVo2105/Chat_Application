import { Pressable, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ENDPOINTS from '../../constants/endpoints';

import {
    RTCPeerConnection,
    RTCSessionDescription,
    RTCIceCandidate,
    mediaDevices
} from 'react-native-webrtc';

const Conversation = () => {
    const [socket, setSocket] = useState(null); // Khởi tạo socket là null
    const route = useRoute();
    const { groupId } = route.params;

    const localConnection = useRef(new RTCPeerConnection()); // RTCPeerConnection instance
    const [remoteStream, setRemoteStream] = useState(null); // Stream from the other peer


    // Hàm kết nối WebSocket
    function connectWebSocket() {
        const socketUrl = ENDPOINTS.WEBSOCKET.SOCKET_URL;
        
        // Tạo WebSocket và lưu vào state
        const ws = new WebSocket(socketUrl);
        
        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "offer") {
                await handleOffer(message);
            } else if (message.type === "answer") {
                await localConnection.current.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === "candidate") {
                const candidate = new RTCIceCandidate(message.candidate);
                await localConnection.current.addIceCandidate(candidate);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(ws); // Lưu WebSocket vào state để sử dụng sau
        startCall(); // Start WebRTC connection after WebSocket connection opens
    }

    async function startCall() {
        // Lấy media stream (video và audio) từ mediaDevices của react-native-webrtc
        const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
        stream.getTracks().forEach((track) => localConnection.current.addTrack(track, stream));

        localConnection.current.onicecandidate = ({ candidate }) => {
            if (candidate) {
                socket.send(JSON.stringify({ type: "candidate", candidate }));
            }
        };

        localConnection.current.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        const offer = await localConnection.current.createOffer();
        await localConnection.current.setLocalDescription(offer);

        socket.send(JSON.stringify({ type: "offer", sdp: offer.sdp }));
    }

    async function handleOffer(message) {
        await localConnection.current.setRemoteDescription(new RTCSessionDescription(message));
        const answer = await localConnection.current.createAnswer();
        await localConnection.current.setLocalDescription(answer);

        // Send answer back through WebSocket
        socket.send(JSON.stringify({ type: "answer", sdp: answer.sdp }));
    }

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold">Conversation</Text>
            <Text className="text-lg my-2">{groupId}</Text>
            <Pressable onPress={connectWebSocket}>
                <Ionicons name="videocam-outline" size={80} />
            </Pressable>

            {remoteStream && (
                <Video
                    source={{ uri: remoteStream }}
                    style={{ width: '100%', height: 200 }}
                    resizeMode="contain"
                />
            )}
        </View>
    );
};

export default Conversation;
