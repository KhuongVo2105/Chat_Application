import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { REACT_APP_API_BASE_URL } from "@env";
import axios from "axios";

interface ForgotPasswordRequest {
  email: string;
}

const ForgotPassword = ({ navigation }) => {
  const [forgotPasswordRequest, setForgotPasswordRequest] =
    useState<ForgotPasswordRequest>({
      email: "",
    });
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigation.navigate("Login");
  };

  const handleVerifyToken = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (forgotPasswordRequest.email === "") {
      Alert.alert("Error", "Field must not be empty!");
      return;
    }
    if (!emailRegex.test(forgotPasswordRequest.email)) {
      Alert.alert("Error", "Invalid email format!");
      return;
    }

    setLoading(true);
    try {
      const endpoint = `${REACT_APP_API_BASE_URL}/users/forgotPasswd`;
      console.log(`Instagram_ForgotPassword_endpoint: ${endpoint}`);
      const response = await axios.post(endpoint, forgotPasswordRequest);

      if (response.data) {
        setLoading(false);

        let userEmail = response.data.result.email;
        setLoading(false);
        Alert.alert(
          "Success",
          `Password reset email has been sent successfully to ${userEmail}.`
        );

        navigation.navigate("VerifyToken");
        Alert.alert(
          "Success",
          "Password reset email has been sent successfully."
        );
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Network error or email not found.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Vui lòng nhập địa chỉ email mà bạn đã đăng ký để hệ thống kiểm tra.
      </Text>

      <TextInput
        style={styles.input}
        placeholder={"Nhập địa chỉ email"}
        placeholderTextColor={"#333"}
        value={forgotPasswordRequest.email}
        onChangeText={(text) =>
          setForgotPasswordRequest({ ...forgotPasswordRequest, email: text })
        }
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {loading ? ( // Hiển thị ActivityIndicator khi đang loading
        <ActivityIndicator size="large" color="#0095f6" />
      ) : (
        <TouchableOpacity style={styles.sendBtn} onPress={handleVerifyToken}>
          <Text style={styles.sendText}>Send code</Text>
        </TouchableOpacity>
      )}
      <Button title="Back" onPress={handleBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Căn chỉnh theo chiều dọc
    alignItems: "center", // Căn chỉnh theo chiều ngang
    padding: 20, // Khoảng cách từ mép khung tới nội dung
    backgroundColor: "white",
  },
  description: {
    fontSize: 16,
    marginBottom: 20, // Khoảng cách giữa thông báo và ô input
    textAlign: "center", // Căn giữa văn bản
  },
  input: {
    height: 40,
    width: "100%", // Chiều rộng bằng toàn bộ khung
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10, // Đệm bên trong cho văn bản trong input
    borderRadius: 5, // Làm bo góc ô input
  },
  sendBtn: {
    backgroundColor: "#0095f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "auto",
    marginHorizontal: "auto",
    marginBottom: 30,
  },
  sendText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPassword;
