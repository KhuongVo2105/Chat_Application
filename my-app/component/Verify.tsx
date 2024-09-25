import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function VerifyScreen({ route, navigation }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(300); // 5 phút = 300 giây
  const inputRefs = useRef([]);

  // Lấy username từ route params
  const { userId } = route.params || {};

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown); // Hủy bỏ bộ đếm khi component unmount
  }, []);

  const handleOtpChange = (text, index) => {
    let otpArray = [...otp];
    otpArray[index] = text;
    setOtp(otpArray);

    // Tự động di chuyển tới ô tiếp theo sau khi nhập xong
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Nếu xóa ký tự, quay lại ô trước
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    const response = await axios.post("http://192.168.1.6:8080/spring/verify",
      {
        "userId": userId,
        "passTemp": otpCode 
      }
    )
    if (response.status == 200) {
      Alert.alert("Success", "OTP is correct!");
      navigation.navigate("Login");
    } else {
      Alert.alert("Error", "Incorrect OTP code.");
    }
  };
  const handleResendCode = async () => {
    const otpCode = otp.join("");
    const response = await axios.post("http://192.168.1.6:8080/spring/verify/resend",
      userId
    )
    if (response.status == 200) {
      Alert.alert("Success", "Resend code successful!");
    } else {
      Alert.alert("Error", "Have error wait, please");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => handleOtpChange(text, index)}
            ref={(el) => (inputRefs.current[index] = el)} // Gán ref cho mỗi ô input
          />
        ))}
      </View>
      <Text style={styles.timer}>Time remaining: {formatTime(timer)}</Text>
      <TouchableOpacity style={styles.submitBtn} onPress={handleResendCode}>
        <Text style={styles.submitText}>Resend code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Instagram-Sans",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    width: 40,
    textAlign: "center",
    marginHorizontal: 5,
  },
  timer: {
    fontSize: 16,
    marginBottom: 20,
    color: "gray",
  },
  submitBtn: {
    backgroundColor: "#0095f6",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
