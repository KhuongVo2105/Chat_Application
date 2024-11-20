import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { IconUserProfile } from '../../components/IconComponents';
import { useLoadGroup, loadGroupDetails, loadUserDetails } from './ConversationsHelper'; // Import các hook và hàm từ helper
import { AuthContext } from '../../context/AuthContext';

const Conversations = ({navigation, route}) => {
  const { tokenContext } = useContext(AuthContext); // Lấy token từ Context
  const [conversations, setConversations] = useState([]); // Lưu trữ danh sách các cuộc trò chuyện
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  
  // Hàm để tải tất cả dữ liệu
  const loadAllData = async () => {
    console.log("Starting to load data...");

    setLoading(true);
    setError(null); // Reset lỗi khi bắt đầu tải lại dữ liệu

    try {
      console.log("Fetching groups...");
      // 1. Tải danh sách nhóm (group)
      const { conversations: groups, error: groupError } = await useLoadGroup(tokenContext);
      console.log("Fetched groups:", groups);
      
      if (groupError) throw new Error(groupError);

      console.log("Fetching group details...");
      // 2. Lấy chi tiết từng nhóm
      const groupDetails = await Promise.all(
        groups.map(async (group) => {
          console.log("Fetching details for group:", group.id);
          const { data: groupData, error: groupDetailError } = await loadGroupDetails({
            tokenContext,
            groupId: group.id,
          });

          if (groupDetailError) {
            console.log(`Error fetching group details for group ${group.id}:`, groupDetailError);
            return null;
          }

          console.log("Fetching users for group:", group.id);
          // 3. Lấy thông tin người dùng trong nhóm
          const users = await Promise.all(
            groupData.userIds.map(async (userId) => {
              console.log("Fetching user details for userId:", userId);
              const { data: userData, error: userDetailError } = await loadUserDetails({
                tokenContext,
                userId,
              });

              if (userDetailError) {
                console.log(`Error fetching user details for userId ${userId}:`, userDetailError);
                return null;
              }
              return userData;
            })
          );

          return {
            ...groupData,
            users: users.filter((user) => user !== null),
          };
        })
      );

      console.log("Fetched all group details:", groupDetails);
      // 4. Lọc nhóm có đầy đủ dữ liệu
      setConversations(groupDetails.filter((group) => group !== null));
    } catch (error) {
      console.error("Error loading all data:", error);
      Alert.alert("Error", "Failed to load data.");
      setError("An error occurred while loading data.");
    } finally {
      console.log("Data loading completed.");
      setLoading(false);
    }
  };

  // Gọi loadAllData khi component được render lần đầu tiên
  useEffect(() => {
    if (tokenContext) {
      console.log("Token is available, loading data...");
      loadAllData();
    } else {
      console.log("Token is not available.");
    }
  }, [tokenContext]);

  // Hiển thị loading nếu đang tải dữ liệu
  if (loading) {
    console.log("Loading data...");
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Hiển thị lỗi nếu có lỗi
  if (error) {
    console.log("Error:", error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Component hiển thị từng cuộc trò chuyện
  const Conversation = ({ item }) => {
    console.log("Rendering conversation:", item);
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}
        onPress={() => {
          console.log("Navigating to conversation with groupId:", item.id);
          navigation.navigate('Conversation', { groupId: item.id });
        }}
      >
        <IconUserProfile
          containerStyles=""
          width={60}
          height={60}
          seen={true}
          source={item.avatar}
        />
        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
          {item.username || 'Unknown User'}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render danh sách cuộc trò chuyện
  console.log("Rendering conversations list...");
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <Conversation
            item={{
              id: item.id,
              username: item.users[0]?.username || 'Unknown User',
              avatar: item.users[0]?.avatar || require('../../assets/portaits/portait_2.jpg'),
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Conversations;
