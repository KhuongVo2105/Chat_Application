import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {IconUserProfile} from '../../components/IconComponents';
import {
  fetchGroups,
  loadGroupDetails,
  loadUserDetails,
} from './ConversationsHelper'; // Import các hook và hàm từ helper
import {AuthContext} from '../../context/AuthContext';

const Conversations = ({navigation, route}) => {
  const {tokenContext, idContext} = useContext(AuthContext); // Lấy token từ Context
  const [conversations, setConversations] = useState([]); // Lưu trữ danh sách các cuộc trò chuyện
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Hàm để tải tất cả dữ liệu
  const loadAllData = async () => {
    console.log('Starting to load data...');
    setLoading(true);
    setError(null); // Reset lỗi khi bắt đầu tải lại dữ liệu

    try {
      console.log('Fetching groups...');
      // 1. Gọi fetchGroups thay vì useLoadGroup
      const {data: groups, error: groupError} = await fetchGroups(tokenContext);
      if (groupError) {
        throw new Error(groupError);
      }

      console.log('Fetching group details...');
      // 2. Tải chi tiết từng nhóm
      const groupDetails = await Promise.all(
        groups.map(async group => {
          const {data: groupData, error: groupDetailError} =
            await loadGroupDetails({
              token: tokenContext,
              groupId: group.id,
            });
          if (groupDetailError) {
            return null;
          }

          const users = await Promise.all(
            groupData.userIds.map(async userId => {
              const {data: userData, error: userDetailError} =
                await loadUserDetails({
                  token: tokenContext,
                  userId: userId,
                });
              return userDetailError ? null : userData;
            }),
          );

          return {...groupData, users: users.filter(user => user !== null)};
        }),
      );

      setConversations(groupDetails.filter(group => group !== null));
    } catch (error) {
      console.error('Error loading all data:', error);
      Alert.alert('Error', 'Failed to load data.');
      setError('An error occurred while loading data.');
    } finally {
      console.log('Data loading completed.');
      setLoading(false);
    }
  };

  // Gọi loadAllData khi component được render lần đầu tiên
  useEffect(() => {
    if (tokenContext) {
      console.log('Token is available, loading data...');
      loadAllData();
    } else {
      console.log('Token is not available.');
    }
  }, [tokenContext]);

  // Hiển thị loading nếu đang tải dữ liệu
  if (loading) {
    console.log('Loading data...');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Hiển thị lỗi nếu có lỗi
  if (error) {
    console.log('Error:', error);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Component hiển thị từng cuộc trò chuyện
  const Conversation = ({item}) => {
    const conversationName = getConversationName(
      item.userIds,
      item.users,
      idContext,
    );

    return (
      <TouchableOpacity
        style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}
        onPress={() => {
          console.log('Navigating to conversation with groupId:', item.id);
          navigation.navigate('Conversation', {
            groupId: item.id,
            conversationName: conversationName,
          });
        }}>
        <IconUserProfile
          containerStyles=""
          width={60}
          height={60}
          seen={true}
          source={item.avatar}
        />
        <Text
          style={{
            marginLeft: 10,
            fontWeight: 'bold',
            maxWidth: '75%', // Hạn chế chiều ngang tối đa
          }}
          numberOfLines={1} // Giới hạn hiển thị trong một dòng
          ellipsizeMode="tail" // Thêm "..." nếu nội dung vượt quá
        >
          {conversationName}
        </Text>
      </TouchableOpacity>
    );
  };

  // Lọc các group có userIds không trống
  const filteredConversations = conversations.filter(
    item => item.userIds && item.userIds.length > 0,
  );

  // Render danh sách cuộc trò chuyện
  console.log(
    'Rendering conversations list...',
    // filteredConversations
  );

  // Hàm xử lý đặt tên
  const getConversationName = (userIds, users, idContext) => {
    if (!userIds || !users || !idContext) {
      return 'Unknown Conversation';
    }

    // Tìm tất cả username trừ idContext
    const otherUsers = users.filter(user => user.id !== idContext);

    // Nếu không có người dùng khác
    if (otherUsers.length === 0) {
      return 'Empty Conversation';
    }

    // Trường hợp có 2 người trong nhóm
    if (userIds.length === 2) {
      return otherUsers[0]?.username || 'Unknown User';
    }

    // Trường hợp có 3 người trong nhóm
    if (userIds.length === 3) {
      return otherUsers.map(user => user.username).join(', ');
    }

    // Trường hợp có nhiều hơn 3 người
    if (userIds.length > 3) {
      // Chọn ngẫu nhiên 2 username
      const randomUsers = otherUsers
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      const remainingCount = userIds.length - randomUsers.length - 1;
      return `${randomUsers
        .map(user => user.username)
        .join(', ')} + ${remainingCount}`;
    }

    return 'Unknown Conversation';
  };

  return (
    <View style={{flex: 1}}>
      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          renderItem={({item}) => (
            <Conversation
              item={{
                id: item.group.id,
                userIds: item.userIds,
                users: item.users,
                avatar:
                  item.users?.[0]?.avatar ||
                  require('../../assets/portaits/default_profile.png'),
              }}
            />
          )}
          keyExtractor={item => item.group.id.toString()}
        />
      ) : (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No conversations available.
        </Text>
      )}
    </View>
  );
};

export default Conversations;
