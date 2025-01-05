import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Conversation = ({route}) => {
  const {groupId} = route.params; // hoặc lấy từ API nếu cần
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [jitsiLink, setJitsiLink] = useState('');

  useEffect(() => {
    // Cấu hình link Jitsi từ groupId
    setJitsiLink(`https://meet.jit.si/moderated/${groupId}`);
  }, [groupId]);

  const handleStartCall = () => {
    setIsCallStarted(true);
    // Mở link Jitsi Meet trong trình duyệt
    Linking.openURL(jitsiLink).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold">Conversation</Text>
      <Text className="text-lg my-2">{groupId}</Text>
      {!isCallStarted && (
        <Pressable onPress={handleStartCall}>
          <Ionicons name="videocam-outline" size={80} />
          <Text>Bắt đầu cuộc gọi</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Conversation;
