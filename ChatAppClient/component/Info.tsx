import React, { useContext, useEffect, useState } from "react";
import { Text,TouchableOpacity , View, ActivityIndicator, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "./Context";
import { REACT_APP_API_BASE_URL } from '@env'; // Import biến môi trường

// Define User interface
interface User {
  username: string;
  email: string;
}

export default function InfoScreen({ navigation }) {
  const { userToken, setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigation.navigate("Login");
  };

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
        const endpoint = `${REACT_APP_API_BASE_URL}/users/myInfo`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${userToken}`, // Gửi token theo định dạng Bearer
          },
        });

        // Kiểm tra mã code trong phản hồi
        if (response.status === 200) {
          if (response.data.code !== 1000) {
            // Trường hợp token hết hiệu lực hoặc không có quyền truy cập
            if (response.data.code === 9998) {
              Alert.alert("Invalid Token", "Your token is invalid or unauthorized", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("Login"), // Chuyển về Login nếu token không hợp lệ
                },
              ]);
            } else {
              Alert.alert("Error", "An unexpected error occurred", [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("Login"),
                },
              ]);
            }
            return;
          }

          // Token hợp lệ, xử lý dữ liệu người dùng
          const user = response.data.result;
          setUserData({
            username: user.username,
            email: user.email
          });
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("An error occurred while fetching user data");
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

  // Hiển thị loading trong khi chờ dữ liệu
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  // Hiển thị lỗi nếu có
  if (error) return <Text>{error}</Text>;

  // Hiển thị thông tin người dùng nếu dữ liệu đã được tải thành công
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {userData?.username}!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{userData?.email}</Text>
      </View>
      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: "#2799d1",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", 
  },
  infoContainer: {
    flexDirection: "row", 
    marginBottom: 10,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555", 
    width: 100, 
  },
  info: {
    fontSize: 16,
    color: "#000",
  },
  backBtn: {
    backgroundColor: "#303030",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginHorizontal: "auto",
    marginTop: 200,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
