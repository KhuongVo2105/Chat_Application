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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video as ExpoVideo } from "expo-av";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";
import ENDPOINTS from "../../constants/endpoints";

export default function NewPostScreen({ uri }) {
  const tokenContext = 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpbnN0YWdyYW0uY29tIiwic3ViIjoibmFtY2FvMTIzYUBnbWFpbC5jb20iLCJleHAiOjE3MzE4NDAzMzYsImlhdCI6MTczMTgzNjczNiwic2NvcGUiOiIifQ.aSl0xH66V6WR5C1SKgyiH4Nyvcpr0OEsV36SK99ZnxcuBTHTnEM67R2fCM_c2eUJFDF_rObs79nBkMWqw4n0Kg'
  const [media, setMedia] = useState([]);
  const [text, setText] = useState("");

  const pickMedia = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setMedia([...media, ...result.assets.map((asset) => asset)]);
    }
  };

  const userInfoEndpoint = ENDPOINTS.USER.MY_INFORMATION;
  const navigation = useNavigation();
  const handleCreatePost = async () => {
    const userInfoEndpoint = ENDPOINTS.USER.MY_INFORMATION;
    const userInfoResponse = await axios.post(
      userInfoEndpoint,
      {},
      {
        headers: { Authorization: `Bearer ${tokenContext}` },
      }
    );
    const user = userInfoResponse.data.result;

    const newPost = {
      caption: text,
      user: {
        id: 'c0a65020-1681-441f-90b9-4a846f9f328b',
      },
    };

    const endpoint = ENDPOINTS.POST.ADD;
    try {
      const introspectResponse = await axios.post(ENDPOINTS.AUTH.INTROSPECT, {
        token: tokenContext,
      });

      if (introspectResponse.data.code === 200 &&introspectResponse.data.result.valid) {
        const responseCreateNewPost = await axios.post(endpoint, newPost, {
          headers: { Authorization: `Bearer ${tokenContext}` },
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
            headers: { Authorization: `Bearer ${tokenContext}` },
          }
        );

        // thêm ảnh vào cloudinary
        const responseAddCloudinary = axios.post(
          ENDPOINTS.CLOUDINARY.ADD_MULTIPLE,
          formData,
          {
            params: {
              userId: user.id,
              postId: postId,
            },
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${tokenContext}`,
            },
          }
        );

        navigation.navigate("Home");
      } else {
        Alert.alert("Đăng bài thất bại");
      }
    } catch (error) {
      Alert.alert("Có lỗi xảy ra", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Tạo Bài Viết</Text>

          <Button
            title="Đăng"
            onPress={() => handleCreatePost()}
            disabled={text || media.length != 0 ? false : true}
          />
        </View>

        {media.length <= 0 ? (
          <View style={styles.imageLayout}>
            <MaterialIcons name="perm-media" size={150} color="black" />
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
