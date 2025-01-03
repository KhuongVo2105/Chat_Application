import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { REACT_APP_API_BASE_URL } from "@env"; // Import biến môi trường
import { AuthContext } from "../../context/AuthContext";

const dummyPosts = [
  { id: "1", uri: "https://via.placeholder.com/150" },
  { id: "2", uri: "https://via.placeholder.com/150" },
  { id: "3", uri: "https://via.placeholder.com/150" },
  { id: "4", uri: "https://via.placeholder.com/150" },
  { id: "5", uri: "https://via.placeholder.com/150" },
];

export const User = {
  username: '',
  avatar: ''
}

const Profile = ({navigation}) => {
  const { userToken, setUserToken } = useContext(AuthContext);
  console.log('userToken : ',userToken)
  const [selectedItem, setSelectedItem] = useState("table");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const handleEdit = () => {
    navigation.navigate("EditProfile");
  };
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      if (userToken == "" || userToken == null) {
        Alert.alert("Error", "No user token found", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"), // Chuyển về trang Login nếu không có token
          },
        ]);
        return;
      }
      try {
        const endpoint = `${REACT_APP_API_BASE_URL}/v1/users/my-info`;
        console.log(`getUser: ${endpoint}`);
        console.log(`token: ${userToken}`);
        const response = await axios.post(
          endpoint,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`, // Gửi token theo định dạng Bearer
            },
          }
        );

        // Kiểm tra mã code trong phản hồi
        if (response.status === 200) {
          // Token hợp lệ, xử lý dữ liệu người dùng
          console.log("result : ", response.data.result);
          const user = response.data.result;
          setUserData({
            username: user.username,
            avatar: user?.avatar,
          });
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data", err);
        Alert.alert("Error", "Failed to fetch user data. Please try again.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [userToken, navigation]);

  return (
    // <ScrollView
    //   horizontal={false}
    //   showsVerticalScrollIndicator={true}
    //   style={styles.container}
    // >
      <View>
        {/* <View style={styles.header}>
          <View style={styles.infoContainer}>
            <Text style={styles.username}>{userData?.username}</Text>
          </View>
          <Icon name="bars" size={20} color={"#333"} />
        </View> */}
        <View style={styles.header}>
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
              <Text style={styles.statLabel}>Bài viết</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>200</Text>
              <Text style={styles.statLabel}>Người theo dõi</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>180</Text>
              <Text style={styles.statLabel}>Đang theo dõi</Text>
            </View>
          </View>
        </View>
        <Text style={styles.bio}>This is a sample bio about the user.</Text>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity style={styles.btnEditProfile} onPress={handleEdit}>
            <Text style={{ fontWeight: 600 }}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnEditProfile}>
            <Text style={{ fontWeight: 600 }}>Chia sẻ trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 5,
              padding: 7,
              paddingHorizontal: 10,
              alignItems: "center",
              borderRadius: 7,
              backgroundColor: "#ccc",
              marginTop: 10,
            }}
          >
            <Icon name="user-plus" style={{}}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.explore}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 7,
            }}
          >
            <Text style={{ fontWeight: 500 }}>Khám phá mọi người</Text>
            <TouchableOpacity>
              <Text style={{ color: "#0095f6", fontWeight: 500 }}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: 140,
                  backgroundColor: "#ccc",
                  padding: 7,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, top: 10 }}
                >
                  <Icon name="close" />
                </TouchableOpacity>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    marginVertical: 10,
                    backgroundColor: "white",
                    borderRadius: 40,
                  }}
                />
                <Text style={{ fontSize: 17, fontWeight: 600 }}>Instagram</Text>
                <Text style={{ fontSize: 13 }}>Gợi ý cho bạn</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#0095f7",
                    padding: 5,
                    paddingHorizontal: 7,
                    alignItems: "center",
                    borderRadius: 7,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: 600 }}>
                    Theo dõi
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 7,
            marginHorizontal: -10,
          }}
        >
          <TouchableOpacity
            style={[
              selectedItem === "table" && styles.itemSelected,
              styles.item,
            ]}
            onPress={() => handleSelectItem("table")}
          >
            <Icon name="table" style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              selectedItem === "home" && styles.itemSelected,
              styles.item,
            ]}
            onPress={() => handleSelectItem("home")}
          >
            <Icon name="home" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.postsContainer}>
          <View style={styles.postImage}>
            <Icon name="clone" />
          </View>
          <View style={styles.postImage}>
            <Icon name="clone" />
          </View>
          <View style={styles.postImage} />
          <View style={styles.postImage} />
          <View style={styles.postImage} />
        </View>
      </View>
    // </ScrollView>
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
