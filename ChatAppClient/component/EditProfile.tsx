import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface EditProfileProps {
  avatarUrl: string;
  username: string;
  bio: string
}

function EditProfile({navigation}) {
  const [profileProps, setProfileProps] = useState<{
    username: string;
    bio: string;
    avatarUrl: string;
  }>();

  const handleBack = () => {
    navigation.navigate("Profile");
  };

  const handleUpdateProfile = () => {
  };

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
        {/* <Image source={{ uri: profileProps.avatarUrl }} style={styles.avatar} /> */}
        <Image source={{ uri: profileProps?.avatarUrl }} style={styles.avatar} />
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
            value={profileProps?.username}
            onChangeText={(text) => setProfileProps({ ...profileProps, username: text })}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.fieldName}>Tên người dùng</Text>
          <TextInput
            style={styles.input}
            value={profileProps?.bio}
            onChangeText={(text) => setProfileProps({ ...profileProps, bio: text })}
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
