import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert, 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video as ExpoVideo } from "expo-av";
import ENDPOINTS from "../constants/endpoints";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function NewPostScreen() {
  const [media, setMedia] = useState([]);
  const [text, setText] = useState("");

  const navigation = useNavigation();

  const route = useRoute();
  const { user } = route.params;
  const handleCreatePost = async () => {
    const newPost = {
      caption: text,
      user: {
        id: user.id,
      },
    };

    const requestGetToken = {
      email: user.email,
      password: "123456789a@B",
    };

    const endpoint = ENDPOINTS.POST.ADD;
    try {
      const responseGetToken = await axios.post(
        ENDPOINTS.AUTH.GET_TOKEN,
        requestGetToken
      );

      const token = responseGetToken.data.result.token;
      const introspectResponse = await axios.post(ENDPOINTS.AUTH.INTROSPECT, {
        token: token,
      });

      if (
        introspectResponse.data.code === 200 &&
        introspectResponse.data.result.valid
      ) {
        const responseCreateNewPost = await axios.post(endpoint, newPost, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert("Đăng bài thành công");
        const postId = responseCreateNewPost.data.result.id;
        var newMedia = [];

        var formData = new FormData();
        media.forEach((values) => {
          formData.append("fileUpload", {
            uri: values.uri,
            type: values.mimeType,
            name: values.fileName,
          });

          newMedia.push({
            mediaUrl: values.uri,
            post: {
              id: postId,
            },
          });
        });

        // thêm ảnh vào db
        const responseAddMedia = await axios.post(
          ENDPOINTS.MEDIA.ADD,
          newMedia,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // thêm ảnh vào cloudinary
        const responseAddCloudinary = axios.post(ENDPOINTS.CLOUDINARY.ADD_MULTIPLE, formData, {
          params:{
            userId: user.id,
            postId: postId,
          },
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })

        navigation.navigate("Home", {"user": user});
      } else {
        Alert.alert("Đăng bài thất bại");
      }
    } catch (error) {
      Alert.alert("Có lỗi xảy ra", error.message);
    }
  };

  // Hàm chọn ảnh hoặc video từ thư viện
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Cho phép chọn cả ảnh và video
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia([...media, ...result.assets.map((asset) => asset)]);
    }
  };  

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity>
            <FontAwesome
              name="arrow-left"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Tạo Bài Viết</Text>

          <Button 
            title="Đăng" 
            onPress = {() => handleCreatePost()}
            disabled={(text || media.length != 0) ? false : true} />
        </View>

        {media.length <= 0 ? (
          <View style={styles.imageLayout}>
            <FontAwesome name="photo" size={150} color="black" />
          </View>
        ) : null}

        <ScrollView horizontal style={styles.imageScroll}>
          {media.map((values, index) =>
            values ? (
              values.type.includes("image") ? (
                <Image
                  key={index}
                  source={{ uri: values.uri }}
                  style={styles.image}
                />
              ) : values.type.includes("video") ? (
                <ExpoVideo
                  key={index}
                  source={{ uri: values.uri }}
                  style={styles.selectedVideo}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                />
              ) : null
            ) : null
          )}
        </ScrollView>

        <Button
          title="Thêm"
          onPress={pickMedia}
          style={styles.imagePickerButton}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Bạn đang nghĩ gì?"
          multiline={true}
          value={text}
          onChangeText={(value) => setText(value)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageScroll: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 8,
    borderRadius: 8,
  },
  selectedVideo: {
    width: 300,
    height: 300,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  imageLayout: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: 300,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  imagePickerButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  textInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    height: 190,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  imageLayoutIcon: {
    display: "flex",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
});