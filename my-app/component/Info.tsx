import React, { useContext, useEffect, useState } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "./Context";
import { REACT_APP_API_BASE_URL } from '@env'; // Import biến môi trường

// Define User interface
interface User {
  username: string;
  firstName: string | null;
  lastName: string | null;
  dob: string | null;
}

export default function InfoScreen({ navigation }) {
  const { userToken, setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

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
            firstName: user.firstName,
            lastName: user.lastName,
            dob: user.dob,
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
    <View>
      <Text>Welcome, {userData?.username}!</Text>
      <Text>First Name: {userData?.firstName || "N/A"}</Text>
      <Text>Last Name: {userData?.lastName || "N/A"}</Text>
      <Text>Date of Birth: {userData?.dob || "N/A"}</Text>
    </View>
  );
}
