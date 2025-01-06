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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import ENDPOINTS from '../../config/endpoints';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ConnectedUsersList from '../../components/ConnectedUsersList';
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ModalCreateGroup from '../../components/ModalCreateGroup';

const Message = () => {
  const [searchQuery, setSearchQuery] = useState()
  const [visibleCreateGroup, setVisibleCreateGroup] = useState(false)

  const { idContext, tokenContext, usernameContext } = useContext(AuthContext)
  // const [userId, setUserId] = useState('92ffa9f0-dcfb-493a-aba7-bd4a2783295e'); //92ffa9f0-dcfb-493a-aba7-bd4a2783295e
  const [userId, setUserId] = useState(idContext); //92ffa9f0-dcfb-493a-aba7-bd4a2783295e

  const [listMessage, setListMessage] = useState('');
  const [listFollowing, setListFollowing] = useState('');
  // const [idContext] = useContext(AuthContext); //id nguoi dung
  // const [usernameContext] = useContext(AuthContext); //ten nguoi dung
  const [openCreate, setOpenCreate] = useState(false);
  const [groupName, setGroupName] = useState('');

  // State để theo dõi ai đã được "Thêm" (nếu có)
  const [addedUsers, setAddedUsers] = useState({});

  // State để lưu danh sách ID người dùng đã được thêm
  const [selectedUserIds, setSelectedUserIds] = useState([userId]); //đổi sang idContext

  // useEffect để lấy id, username, token khi component mount
  useEffect(() => {
    // Kiểm tra và cập nhật userId nếu idContext thay đổi
    if (idContext) {
      setUserId(idContext);
    }

    // Nếu cần, bạn có thể thực hiện các hành động khác với tokenContext và usernameContext
    console.log('UserID:', idContext);
    console.log('Token:', tokenContext);
    console.log('Username:', usernameContext);

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
        try {

          console.log(`userid: ${userId}`)
          // Gọi hai API song song
          const [response1, response2] = await Promise.all([
            axios.get(`${ENDPOINTS.CHAT.MESSAGE_LIST}?userIdSend=${userId}`), // Gọi API danh sách tin nhắn
            axios.post(ENDPOINTS.CHAT.FOLLOWING,
              { username: usernameContext }, // Gửi payload JSON
              {
                headers: { 'Authorization': `Bearer ${tokenContext}` }, // Thêm Bearer token vào header
              }
            ),
          ]);

          // Lưu dữ liệu vào state
          setListMessage(response1.data); // Lấy dữ liệu từ response1
          console.log(`Danh sach tin nhan\n${JSON.stringify(response1.data, null, 2)}`);

          setListFollowing(response2.data); // Lấy dữ liệu từ response2
        } catch (error) {
          console.error('Error fetching APIs:', error);
        }
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
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() =>
          navigation.navigate('Chat', {
            userIdSend: userId, //thay đổi user
            userIdTo: item.userIdTo,
            avatarTo:
              item.status === false
                ? item.avatar
                : require('../../assets/chatGroup.png'),
            nameTo: item.name,
            status: item.status, //boolean true là gr false là 1vs1
          })
        }>
        {item.status === false ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <Image
            source={require('../../assets/chatGroup.png')}
            style={styles.avatar}
          />
        )}
        <View style={styles.infoContainer}>
          <View style={styles.messageRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text style={styles.lastMessage}>
            {item.visible && item.lastMessage
              ? `bạn:${item.lastMessage}`
              : item.lastMessage || 'Không có tin nhắn'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const navigation = useNavigation();

  return (
    <View className="h-full bg-white">

      <Searchbar
        className="w-96 mx-auto mt-2 bg-slate-100"
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <ConnectedUsersList styleGroup={`mx-2 mb-3`} list={listFollowing} />

      {/*Add Group*/}
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => setOpenCreate(true)}>
        <Image
          source={require('../../assets/addGroud.png')}
          style={styles.iconAdd}
        />
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
      </TouchableOpacity>

      <Pressable className="p-2 rounded-full bg-cyan-500"
        onPress={() => {setVisibleCreateGroup(true) }}>
        <MaterialCommunityIcons name="account-multiple-plus" size={30} />
      </Pressable>

      <ModalCreateGroup visible={visibleCreateGroup} hideModal={() => setVisibleCreateGroup(false)}/>

      <FlatList
        data={listMessage}
        renderItem={renderItem}
        keyExtractor={item => item.userIdTo}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  containerLine: {
    justifyContent: 'center',
    marginBottom: 10,
  },
  containerFollow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconF: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginBottom: 10,
    borderRadius: 30,
    marginRight: 5,
  },
  userContainer: {
    flexDirection: 'row',
    backgroundColor: '#efeded',
    padding: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#c0bdbd',
  },
  userContainerF: {
    backgroundColor: '#fdfbfb',
    marginLeft: 10,
    borderBottomColor: '#eee',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
    paddingBottom: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  username: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  avatarF: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 5,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#131313',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  //icon add group
  containerButtonG: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconAdd: {
    width: 40,
    height: 40,
  },

  flatList: {
    width: '100%',
    paddingLeft: 10,
  },
  //
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  followerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  submitButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    flex: 1,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // flastlist dọc
  flatListD: {
    height: '50%',
    width: '95%',
  },
  //add nhóm
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  addGroupContainer: {
    flexDirection: 'row',
  },
  nameAddGr: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#131313',
    marginLeft: 20,
    marginTop: 15,
  },
  avatarAddG: {
    width: 40,
    height: 40,
    borderRadius: 30,
    margin: 5,
  },
});

export default Message;
