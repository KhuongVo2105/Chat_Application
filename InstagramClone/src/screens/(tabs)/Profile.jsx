import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, ScrollView, Pressable, } from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from 'react-native-vector-icons/Fontisto'
import { AuthContext } from "../../context/AuthContext";
import UserSuggestion from '../../components/UserSuggestion'
import ImageGrid from "../../components/ImageGrid";


export const User = {
  username: '',
  avatar: ''
}

const Profile = ({ navigation }) => {
  const images = [
    { id: '1', quantity: 1, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '2', quantity: 2, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '3', quantity: 1, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '4', quantity: 10, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '5', quantity: 5, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '6', quantity: 1, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '7', quantity: 1, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '8', quantity: 2, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '9', quantity: 1, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '10', quantity: 10, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '11', quantity: 5, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
    { id: '12', quantity: 1, uri: 'https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg' },
];

  const { tokenContext } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState("table");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const handleEdit = () => {
    navigation.navigate("EditProfile");
  };
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     if (tokenContext == "" || tokenContext == null) {
  //       Alert.alert("Error", "No user token found", [
  //         {
  //           text: "OK",
  //           onPress: () => navigation.navigate("Login"), // Chuyển về trang Login nếu không có token
  //         },
  //       ]);
  //       return;
  //     }
  //     try {
  //       const endpoint = `${REACT_APP_API_BASE_URL}/v1/users/my-info`;
  //       console.log(`getUser: ${endpoint}`);
  //       console.log(`token: ${tokenContext}`);
  //       const response = await axios.post(
  //         endpoint,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${tokenContext}`, // Gửi token theo định dạng Bearer
  //           },
  //         }
  //       );

  //       // Kiểm tra mã code trong phản hồi
  //       if (response.status === 200) {
  //         // Token hợp lệ, xử lý dữ liệu người dùng
  //         console.log("result : ", response.data.result);
  //         const user = response.data.result;
  //         setUserData({
  //           username: user.username,
  //           avatar: user?.avatar,
  //         });
  //       } else {
  //         throw new Error("Failed to fetch user data");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user data", err);
  //       Alert.alert("Error", "Failed to fetch user data. Please try again.", [
  //         {
  //           text: "OK",
  //           onPress: () => navigation.navigate("Login"),
  //         },
  //       ]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getUserInfo();
  // }, [tokenContext, navigation]);

  return (

    <ScrollView
      className=""
      horizontal={false}
      showsVerticalScrollIndicator={false}>
      <View className='bg-white'>
        <View className='w-96 mx-auto'>
          <View className='mb-3' style={styles.header}>
            {userData?.avatar == null ? (
              <Image
                source={require("../../assets/avatarDefine.jpg")}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={require("../../assets/avatarDefine.jpg")}
                style={styles.avatar}
              />
            )}
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>100</Text>
                <Text style={styles.statLabel}>posts</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>200</Text>
                <Text style={styles.statLabel}>followers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>180</Text>
                <Text style={styles.statLabel}>following</Text>
              </View>
            </View>
          </View>

          <Text className='text-sm text-slate-500 mb-3'>Add your name and bio.</Text>

          <View className='flex flex-row items-center mb-3'>
            <Pressable className='flex-1 bg-gray-200 rounded-md py-1 mx-1' onPress={handleEdit}>
              <Text className='text-base font-medium text-center'>Edit profile</Text>
            </Pressable>
            <Pressable className='flex-1 bg-gray-200 rounded-md py-1 mx-1' >
              <Text className='text-base font-medium text-center'>Share profile</Text>
            </Pressable>
            <Pressable className='flex-none size-1 p-1 mx-1'        >
              <FontAwesome6 name="user-plus" size={18}></FontAwesome6>
            </Pressable>
          </View>

          <View className='w-full flex mb-3'>
            <View className="flex flex-row justify-between items-center mb-2">
              <Text className="text-base">Discover people</Text>
              <Pressable><Text className="text-base text-blue-500">See all</Text></Pressable>
            </View>
            <View className="w-full flex flex-row justify-between items-center">
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <UserSuggestion username="JohnDoe" caption="Suggested for you" image="https://i.pinimg.com/736x/2d/e2/ca/2de2caefc8094a183aaa3a070e9ed420.jpg" />
                <UserSuggestion username="JaneSmith" caption="Recommended for you Recommended for you Recommended for you" />
              </ScrollView>
            </View>
          </View>

          <View className="h-10 flex flex-row justify-between mb-2">
            <View className="flex-1 flex flex-row justify-center p-1">
              <Pressable
                className={`flex flex-row justify-center p-1 ${selectedItem === 'table' ? 'border-b-2 border-b-slate-400' : 'border-b-0'}`}
                onPress={() => handleSelectItem('table')}
              >
                <Fontisto name="nav-icon-grid" size={selectedItem === 'table' ? 22 : 20} />
              </Pressable>
            </View>
            <View className="flex-1 flex flex-row justify-center p-1">
              <Pressable
                className={`flex flex-row justify-center p-1 ${selectedItem === 'home' ? 'border-b-2 border-b-slate-400' : 'border-b-0'}`}
                onPress={() => handleSelectItem('home')}
              >
                <FontAwesome name="home" size={selectedItem === 'home' ? 24 : 22} />
              </Pressable>
            </View>
          </View>

          {/* Grid */}
          <ImageGrid images={images} />

        </View>
      </View>
    </ScrollView>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
  },
  postsContainer: {
    display: "flex",
    flexDirection: "row", // Thêm flexDirection: 'row'
    flexWrap: "wrap", // Cho phép các item xuống dòng nếu không đủ chỗ
    marginTop: 10,
    width: "105%",
    backgroundColor: "black",
    marginHorizontal: -10,
  },
  postImage: {
    width: "33.3%",
    height: "33.3%",
    backgroundColor: "#ccc",
    aspectRatio: 1, // Tạo hình vuông
    borderWidth: 0.5,
  },

  btnEditProfile: {
    marginRight: 5,
    padding: 7,
    paddingHorizontal: 35,
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#ccc",
    marginTop: 10,
  },
  explore: {
    marginTop: 20,
    marginBottom: 20,
  },
  item: {
    width: "50%",
    alignItems: "center",
  },
  itemSelected: {
    borderBottomWidth: 1,
  },
});

export default Profile;
