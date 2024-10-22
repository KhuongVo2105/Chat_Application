import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { AuthContext } from "./Context";
import { REACT_APP_API_BASE_URL } from "@env"; // Import biến môi trường

interface User {
    username: string;
    avatar: string;
    bio: string;
  }

function EditProfile({ navigation }) {
  const { userToken, setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);

  const handleBack = () => {
    navigation.navigate("Profile");
  };

  const handleUpdateProfile = () => {};

  useEffect(() => {
    const getUserInfo = async () => {
      // Kiểm tra token có tồn tại không
      if (!userToken) {
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
            bio: user?.bio,
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
    <View style={styles.editProfileContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 2,
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Button title="<" onPress={handleBack} />
        <Text style={styles.title}>Chỉnh sửa trang cá nhân</Text>
        <Button title="Xong" onPress={handleBack} />
      </View>
      <View style={styles.editAvatar}>
        {userData?.avatar == null ? (
            <Image
              source={require("../images/avatarDefine.jpg")}
              style={styles.avatar}
            />
          ) : (
            <Image
              source={require("../images/avatarDefine.jpg")}
              style={styles.avatar}
            />
          )}
        <Button
          title="Chỉnh sửa ảnh hoặc avatar"
          onPress={() => {
            // Thêm xử lý thay đổi ảnh đại diện ở đây
          }}
        />
      </View>
      <View style={styles.editInfo}>
        <View style={styles.formGroup}>
          <Text style={styles.fieldName}>Tên</Text>
          <TextInput
            style={styles.input}
            value={userData?.username}
            onChangeText={(text) =>
              setUserData({ ...userData, username: text })
            }
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.fieldName}>Tên người dùng</Text>
          <TextInput
            style={styles.input}
            value={userData?.bio}
            onChangeText={(text) =>
              setUserData({ ...userData, bio: text })
            }
            multiline
          />
        </View>
        <TouchableOpacity>
          <Text
            style={{
              color: "#0095f6",
              fontSize: 16,
              fontWeight: "500",
              marginTop: 30,
            }}
          >
            Chuyển sang tài khoản công việc
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editProfileContainer: {
    flex: 1,
    display: "flex",
    width: "100%",
    margin: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: "600",
  },
  editAvatar: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: "black",
  },
  fieldName: {
    width: 100,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    width: 280,
    height: 40,
    padding: 10,
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  editInfo: {
    width: "100%",
  },
  formGroup: {
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default EditProfile;
