import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import { LoginManager, AccessToken } from "react-native-fbsdk-next"; // Thêm import này

import axios from "axios";
import { REACT_APP_API_BASE_URL } from '@env';


interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}
function RegisterScreen({ navigation }) {
  const [createUserRequeste, setCreateUserRequest] =
    useState<CreateUserRequest>({
      username: "",
      email: "",
      password: ""
    });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Hàm xử lý đăng nhập với Facebook
  // const handleFacebookLogin = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions([
  //       "public_profile",
  //       "email",
  //     ]);
  //     if (result.isCancelled) {
  //       Alert.alert("Login cancelled");
  //     } else {
  //       const data = await AccessToken.getCurrentAccessToken();
  //       if (data) {
  //         // Gửi token Facebook tới server để xác thực
  //         const response = await axios.post(
  //           "http://192.168.1.24:8080/spring/facebookLogin",
  //           {
  //             accessToken: data.accessToken.to(),
  //           }
  //         );

  //         if (response.data) {
  //           Alert.alert("Success", "Logged in with Facebook");
  //           navigation.navigate("Home");
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     Alert.alert("Login failed", error.message);
  //   }
  // };

  const handleRegister = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z0-9]{2,30}$/;
    const passwordRegex = /^.{6,}$/;

    if (
      createUserRequeste.username === "" ||
      createUserRequeste.email === "" ||
      createUserRequeste.password === ""
    ) {
      Alert.alert("Error", "Field must not be empty!");
      return;
    }
    if (!emailRegex.test(createUserRequeste.email)) {
      Alert.alert("Error", "Invalid email format!");
      return;
    }
    if (!nameRegex.test(createUserRequeste.username)) {
      Alert.alert(
        "Error",
        "Name must have at least 2 characters and no spaces!"
      );
      return;
    }
    if (!passwordRegex.test(createUserRequeste.password)) {
      Alert.alert("Error", "Password must be at least 6 characters!");
      return;
    }
    if (createUserRequeste.password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    console.log("createUserData :", createUserRequeste);
    var userId = "";

    setLoading(true);
    try {
      const endpoint = `${REACT_APP_API_BASE_URL}/v1/users`;
      console.log(`Instagram_Register_endpoint: ${endpoint}`)
      const response = await axios.post(endpoint, createUserRequeste);
      console.log("response.data",response.data)

      if (response.data) {
        userId = response.data.result.id;
        setLoading(false);
        Alert.alert(
          "Success",
          "Please check your mail to get the verification code!"
        );
        navigation.navigate("Verify", { userId: userId });
      }

    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Username already exists or network error.");
    }
  };

  const handleBack = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>InstaClone</Text>
        
        <TouchableOpacity style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={styles.loginFacebook}>
            <Icon name="facebook-square" size={40} color="#0095f6" /> Login with
            Facebook
          </Text>
        </TouchableOpacity>
        <Text style={{ opacity: 0.5, marginBottom: 20, textAlign: "center" }}>
          ______________________ OR ______________________
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor={"#333"}
          value={createUserRequeste.username}
          onChangeText={(text) =>
            setCreateUserRequest({ ...createUserRequeste, username: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={"#333"}
          value={createUserRequeste.email}
          keyboardType="email-address"
          onChangeText={(text) =>
            setCreateUserRequest({ ...createUserRequeste, email: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={"#333"}
          secureTextEntry
          value={createUserRequeste.password}
          onChangeText={(text) =>
            setCreateUserRequest({ ...createUserRequeste, password: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor={"#333"}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {loading ? ( // Hiển thị ActivityIndicator khi đang loading
          <ActivityIndicator size="large" color="#0095f6" />
        ) : (
          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        )}
        <Button title="Back" onPress={handleBack} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
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
  registerBtn: {
    backgroundColor: "#0095f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginHorizontal: "auto",
    marginBottom: 30,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginFacebook: {
    color: "#0095f6",
    alignItems: "center",
  },
});
export default RegisterScreen;
