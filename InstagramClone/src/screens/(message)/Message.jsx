import { useCallback, useState, useContext, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import ENDPOINTS from '../../config/endpoints';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ConnectedUsersList from '../../components/ConnectedUsersList';
import { ActivityIndicator, Avatar, Searchbar, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ModalCreateGroup from '../../components/ModalCreateGroup';
import { handleError } from '../../utils/handleError';
import GroupChat from '../../components/GroupChat';

const Message = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState()
  const [visibleCreateGroup, setVisibleCreateGroup] = useState(false)

  const { idContext, tokenContext, usernameContext } = useContext(AuthContext)
  // const [userId, setUserId] = useState('92ffa9f0-dcfb-493a-aba7-bd4a2783295e'); //92ffa9f0-dcfb-493a-aba7-bd4a2783295e
  const [userId, setUserId] = useState(idContext); //92ffa9f0-dcfb-493a-aba7-bd4a2783295e

  const [listMessage, setListMessage] = useState('');
  const [listFollowing, setListFollowing] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [groupName, setGroupName] = useState('');

  // State để theo dõi ai đã được "Thêm" (nếu có)
  const [addedUsers, setAddedUsers] = useState({});

  // State để lưu danh sách ID người dùng đã được thêm
  const [selectedUserIds, setSelectedUserIds] = useState([userId]); //đổi sang idContext

  // State để hiện thực trạng thái load tiến trình 
  const [loadConversationList, setLoadConversationList] = useState(false)
  const [loadConnectionList, setLoadConnectionList] = useState(false)

  const theme = useTheme()

  async function fetchConnectionList() {
    setLoadConnectionList(true)
    // console.log(`usernameContext: ${usernameContext}`)
    if (usernameContext && tokenContext) {
      try {
        const response = await axios.post(
          ENDPOINTS.CHAT.FOLLOWING_USERS,
          { username: usernameContext },
          { headers: { 'Authorization': `Bearer ${tokenContext}` } }
        )
        if (response.status == 200) {
          setListFollowing(response.data)
        } else console.log('da co loi xay ra trong qua trinh lay danh sach following')
      } catch (error) {
        console.log('[fetchConnectionList error]')
        handleError(error)
      } finally {
        setLoadConnectionList(false)
      }
    }
  }

  async function fetchConverstationList() {
    setLoadConversationList(true)
    try {
      const response = await axios.get(
        ENDPOINTS.CHAT.MESSAGE_LIST,
        { params: { userIdSend: idContext } }
      )
      if (response.status == 200) {
        setListMessage(response.data)
      }
    } catch (error) {
      console.log('[fetchConversationList error]')
      handleError(error)
    } finally {
      setLoadConversationList(false)
    }
  }

  // useEffect để lấy id, username, token khi component mount
  useEffect(() => {
    // Kiểm tra và cập nhật userId nếu idContext thay đổi
    if (idContext) {
      setUserId(idContext);
    }

    // Nếu cần, bạn có thể thực hiện các hành động khác với tokenContext và usernameContext
    // console.log('UserID:', idContext);
    // console.log('Token:', tokenContext);
    // console.log('Username:', usernameContext);

    // Cleanup function nếu cần
    return () => {
      // Thực hiện các hành động dọn dẹp nếu cần
    };
  }, [idContext, tokenContext, usernameContext]); // Chạy lại khi các giá trị này thay đổi  

  // Hàm để xử lý thay đổi nút "Thêm" thành "Dấu tick"
  const toggleAddUser = userId => {
    setAddedUsers(prevState => {
      const newState = { ...prevState };
      // Nếu người dùng đã được thêm, hủy bỏ
      if (newState[userId]) {
        delete newState[userId];
        setSelectedUserIds(selectedUserIds.filter(id => id !== userId)); // Xóa ID khỏi danh sách
      } else {
        newState[userId] = true;
        setSelectedUserIds([...selectedUserIds, userId]); // Thêm ID vào danh sách
      }
      return newState;
    });
  };

  // Khu vực xử lý tạo nhóm
  const fetchDataRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        fetchConnectionList()
        fetchConverstationList()
      };
      fetchDataRef.current = fetchData;
      fetchData();
    }, [userId]), // Thay đổi user
  );

  //Gửi dữ liệu về server tạo nhóm
  const sendListMemberCreateGr = async () => {
    if (selectedUserIds.length === 0 || groupName.trim() === '') {
      alert('Lỗi', 'Vui lòng chọn người dùng và nhập tên nhóm.');
      return;
    }

    try {
      const response = await fetch(
        ENDPOINTS.CHAT.CREATE_GROUP,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nameGroup: groupName,
            idUserList: selectedUserIds,
          }),
        },
      );

      const data = await response.text(); // Lấy dữ liệu từ phản hồi

      if (response.ok) {
        alert('Thành công', data); // Hiển thị thông báo thành công
        closeCreateGroup();
        fetchDataRef.current();
      } else {
        alert('Lỗi', data); // Hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Lỗi', 'Có lỗi xảy ra khi gửi dữ liệu.');
    }
  };

  //phần tạo gr
  const renderFollowingAddGroud = ({ item }) => (
    <View style={styles.addGroupContainer}>

      <Image source={{ uri: item.avatar }} style={styles.avatarAddG} />
      <Text style={styles.nameAddGr}>{item.username}</Text>
      <View style={styles.containerButtonG}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => toggleAddUser(item.id)} // Gọi hàm toggle khi nhấn
        >
          <Icon
            name={addedUsers[item.id] ? 'check' : 'plus'} // Dùng "check" khi đã thêm, "plus" khi chưa thêm
            size={30}
            color="#68d743"
          />
        </TouchableOpacity>
      </View>
      {/*</TouchableOpacity>*/}
    </View>
  );
  //

  const closeCreateGroup = () => {
    setOpenCreate(false);
    setSelectedUserIds('');
    setGroupName(null);
    setAddedUsers('');
  };

  return (
    <View className="flex-1 flex items-center justify-start bg-white relative">

      <Searchbar
        className="flex-none w-96 mx-auto mb-2 bg-slate-100"
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      {loadConnectionList ? (
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      ) : (
        <ConnectedUsersList styleGroup={`flex-none mx-2 mb-3 `} list={listFollowing} />
      )}

      <View className="w-full mb-3">
        <Text className="text-lg font-semibold ml-3" style={{color:theme.colors.onSurface}}>Messages</Text>
      </View>

      {loadConversationList ? (
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      ) : (
        <GroupChat navigation={navigation} styleGroup={`flex-auto`} conversations={listMessage} />
      )}

      {/*Add Group*/}
      <Pressable
        className="p-1.5 rounded-full absolute bottom-8 right-5 shadow bg-white z-10"
        style={{ backgroundColor: theme.colors.onSecondaryContainer }}
        onPress={() => setOpenCreate(true)}>
        <MaterialCommunityIcons name="account-multiple-plus-outline" size={40} color={`${theme.colors.onPrimary}`} />
        {/* Bảng Add Group */}
        {/* Modal hiển thị bảng tạo nhóm */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={openCreate}
          onRequestClose={() => setOpenCreate(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Tạo Nhóm</Text>

              {/* Tên nhóm */}
              <TextInput
                style={styles.input}
                placeholder="Nhập tên nhóm ..."
                value={groupName}
                onChangeText={setGroupName}
              />

              {/* Danh sách follower */}
              <View style={styles.flatListD}>
                <Text style={styles.sectionTitle}>Followers:</Text>
                <FlatList
                  data={listFollowing}
                  renderItem={renderFollowingAddGroud}
                  keyExtractor={item => item.userIdTo}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  removeClippedSubviews={false}
                />
              </View>

              {/* Nút hành động */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={sendListMemberCreateGr}>
                  <Text style={styles.submitButtonText}>Tạo nhóm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitButton, { backgroundColor: 'red' }]}
                  onPress={() => closeCreateGroup()}>
                  <Text style={styles.submitButtonText}>Quay lại</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.selectedUsers}>
                <Text>Danh sách ID người dùng đã thêm:</Text>
                {selectedUserIds.length > 0 ? (
                  selectedUserIds.map(id => (
                    <Text key={id} style={styles.userId}>
                      {id}
                    </Text>
                  ))
                ) : (
                  <Text>Không có người dùng nào được thêm.</Text>
                )}
              </View>
            </View>
          </View>
        </Modal>
        {/*  */}
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({});

export default Message;
