import * as React from "react";
import { useState, useContext } from "react";
import {
  StyleSheet,
  Alert,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

import { AuthContext } from "./Context";

interface LoginRequest {
  username: string;
  password: string;
}
function LoginScreen({ navigation }) {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const { setUserToken } = useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Hàm xử lý khi nhấn nút Login
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.6:8080/spring/login",
        loginRequest
      );
      if (response.data.authenticate) {
        console.log("success API");
        setUserToken(response.data.token);
        navigation.navigate("Infos"); // Chuyển đến màn hình chi tiết nếu login thành công
      } else {
        // console.error("error API");
        Alert.alert("Login Failed", "Username or password is incorrect");
      }
    } catch (error) {
      //   console.error(error); // Log lỗi ra console
      Alert.alert("Login Failed", "Username or password is incorrect");
    }
  };

  // Hàm xử lý khi nhấn nút Register
  const handleRegister = () => {
    navigation.navigate("Register"); // Chuyển đến màn hình chi tiết nếu login thành công
  };

  const handleShowPass = () => {
    setSecureTextEntry(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InstaClone</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor={"#333"}
        value={loginRequest.username}
        onChangeText={(text) =>
          setLoginRequest({ ...loginRequest, username: text })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={"#333"}
        secureTextEntry = {secureTextEntry}
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
        style={{ position: "absolute", right: 25, top: 315, zIndex: 10, opacity:0 }}
      >
        <Icon name="eye-slash" size={20} color={"#0095f6"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister}>
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
    fontFamily: "Trebuchet MS",
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
