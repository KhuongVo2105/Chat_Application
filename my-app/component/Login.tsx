import * as React from "react";
import { useState, useContext } from "react";
import { StyleSheet, Alert, Text, TextInput, View, TouchableOpacity, } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

import { AuthContext } from "./Context";
import { REACT_APP_API_BASE_URL } from '@env';

interface LoginRequest {
  email: string;
  password: string;
}
function LoginScreen({ navigation }) {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const { setUserToken } = useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Hàm xử lý khi nhấn nút Login
  const handleLogin = async () => {

    const endpoint = `${REACT_APP_API_BASE_URL}/auth/token`;

    try {
      console.log(`Instagram_Login_endpoint: ${endpoint}`)
      const response = await axios.post(endpoint, loginRequest);

      // Kiểm tra giá trị authenticated từ phản hồi
      if (response.data.result.authenticated) {
        console.log("success API");
        setUserToken(response.data.result.token); // Lưu token từ response vào Context
        navigation.navigate("Info"); // Chuyển đến màn hình chi tiết nếu login thành công
      } else {
        Alert.alert("Login Failed", "Email or password is incorrect");
      }
    } catch (error) {
      // Log lỗi ra console
      if (axios.isAxiosError(error)) {
        // Lỗi từ Axios
        console.error("Axios error:", error.message); // Thông báo lỗi chung
        console.error("Error code:", error.code); // Mã lỗi (nếu có)
        console.error("Response data:", error.response?.data); // Dữ liệu phản hồi từ server
        console.error("Response status:", error.response?.status); // Mã trạng thái HTTP
        console.error("Response statusText:", error.response?.statusText); // Mô tả mã trạng thái

        Alert.alert("Login Failed", error.response?.data?.message || "An error occurred while logging in.");
      } else {
        // Lỗi khác
        console.error("Unexpected error:", error);
        Alert.alert("Login Failed", "An unexpected error occurred.");
      }
    }
  };


  // Hàm xử lý khi nhấn nút Register
  const handleRegister = () => {
    navigation.navigate("Register"); // Chuyển đến màn hình chi tiết nếu login thành công
  };

  const handleForgotPassword = ()=>{
    navigation.navigate("ForgotPassword");
  }

  const handleShowPass = () => {
    setSecureTextEntry(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InstaClone</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={"#333"}
        value={loginRequest.email}
        onChangeText={(text) =>
          setLoginRequest({ ...loginRequest, email: text })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={"#333"}
        secureTextEntry={secureTextEntry}
        value={loginRequest.password}
        onChangeText={(text) =>
          setLoginRequest({ ...loginRequest, password: text })
        }
      />
      <TouchableOpacity onPress={handleShowPass}
        style={{ position: "absolute", right: 25, top: 315, zIndex: 10 }}
      >
        <Icon name="eye" size={20} color={"#0095f6"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShowPass}
        style={{ position: "absolute", right: 25, top: 315, zIndex: 10, opacity: 0 }}
      >
        <Icon name="eye-slash" size={20} color={"#0095f6"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgetText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>
        ______________________ OR ______________________
      </Text>
      <Text style={styles.registerGroup}>
        Don't have an account?{" "}
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

export default LoginScreen;

// StyleSheet để tạo kiểu cho các thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 45,
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Instagram-Sans",
  },
  input: {
    fontSize: 15,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  loginBtn: {
    backgroundColor: "#0095f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginHorizontal: "auto",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    opacity: 0.5,
    textAlign: "center",
    marginTop: 20,
  },
  forgetText: {
    color: "#0095f6",
    fontSize: 14,
    textAlign: "right",
    marginTop: -10,
    marginBottom: 20,
  },
  registerGroup: {
    marginTop: 100,
    textAlign: "center",
  },
  registerText: {
    marginBottom: -2,
    color: "#0095f6",
    fontWeight: "bold",
  },
});
