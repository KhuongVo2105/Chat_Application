import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import images from "./../../constants/images";
import { useState, useEffect } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import axios from "axios";
import ENDPOINTS from "./../../constants/endpoints";
import { IconUserProfile } from "../../constants/IconComponents";
import { AuthContext } from "../../constants/AuthContext";
import { Video } from "expo-av";

const Home = () => {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpbnN0YWdyYW0uY29tIiwic3ViIjoibmFtY2FvMTIzYUBnbWFpbC5jb20iLCJleHAiOjE3MzIwMjg2NzAsImlhdCI6MTczMjAyNTA3MCwic2NvcGUiOiIifQ.P3DLFb7qgrRGEDPtUbZk0_Tc96S75_kcWaeK-Y58zCajVXFqo95gvFrHQK4Pfvd4e0CjcQ6D6XyBfwxWenvR8w";
  const [loading, setLoading] = useState(false);
  const [yourComment, setYourComment] = useState();
  const [medias, setMedias] = useState([]);
  const [follow, setFollow] = useState([]);
  const [posts, setPosts] = useState([]);
  const [foldersCloudinary, setFoldersCloudinary] = useState([]);
  const authContext = useContext(AuthContext);

  const user = { id: "c0a65020-1681-441f-90b9-4a846f9f328b" };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Gọi API lấy danh sách following
        const getFollowingEndpoint = ENDPOINTS.FOLLOW.GET_FOLLOWING;
        const followingResponse = await axios.post(getFollowingEndpoint, user, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const followingList = followingResponse.data.result;
        setFollow(followingList);

        // Lấy danh sách post dựa trên following
        const followingUserIds = followingList.map((value) => ({
          id: value.followingUser.id,
        }));
        followingUserIds.push({ id: user.id }); // Thêm chính người dùng hiện tại

        const findAllMultipleUserEndpoint =
          ENDPOINTS.POST.FIND_ALL_MULTIPLE_USER;
        const postResponse = await axios.post(
          findAllMultipleUserEndpoint,
          followingUserIds,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const postsResponse = postResponse.data.result;
        setPosts(postsResponse);

        // Lấy media dựa trên các post đã lấy
        let folders = [];
        postsResponse.forEach((value) => {
          const folder = "posts/" + value.user.id + "/" + value.id;
          folders.push(folder);
        });

        setFoldersCloudinary(folders);

        const multipleMediaEndpoint = ENDPOINTS.CLOUDINARY.FIND_ALL_MULTIPLE;
        const mediaResponse = await axios.post(multipleMediaEndpoint, folders, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mediasResponse = mediaResponse.data.result;

        setMedias(mediasResponse);
        console.log("mediaResponse");
        console.log(mediasResponse);
      } catch (err) {
        console.error("Error calling APIs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item: url, index: idxChild }) => {
    if (url.endsWith(".jpg") || url.endsWith(".png")) {
      return (
        <Image
          key={idxChild}
          source={{ uri: url }}
          style={styles.selectedImage}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Video
          style={styles.selectedVideo}
          source={{
            uri: url,
          }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      );
    }
  };

  return (
    <View className="w-full h-full flex justify-center items-center bg-white">
      <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
        {/* new feeds */}
        <ScrollView
          className=""
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            seen={false}
            source={require("./../../assets/portaits/portait_1.jpg")}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            seen={false}
            source={require("./../../assets/portaits/portait_2.jpg")}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require("./../../assets/portaits/portait_3.jpg")}
            seen={false}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require("./../../assets/portaits/portait_4.jpg")}
            seen={false}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require("./../../assets/portaits/portait_1.jpg")}
            seen={true}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require("./../../assets/portaits/portait_2.jpg")}
            seen={true}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require("./../../assets/portaits/portait_3.jpg")}
            seen={true}
          />

          <IconUserProfile
            containerStyles="m-3"
            width={80}
            height={80}
            source={require("./../../assets/portaits/portait_4.jpg")}
            seen={true}
          />
        </ScrollView>

        {/* Post */}
        <View>
          {/* Hiển thị dữ liệu postsInUI */}
          {posts.map((post, index) => (
            <View className="flex flex-column w-full py-3" key={post.id}>
              {/* Header post */}
              <View className="flex flex-row w-full justify-between items-center px-3 mb-3">
                {/* Header left */}
                <TouchableOpacity className="flex flex-row items-center">
                  <IconUserProfile
                    containerStyles="mr-2"
                    width={41}
                    height={41}
                    source={require("./../../assets/portaits/portait_3.jpg")}
                    seen={false}
                  />

                  <View className="flex flex-column">
                    <View className="flex flex-row items-center">
                      <Text className="font-semibold text-lg">
                        {post.user.username}
                      </Text>
                      <Image
                        className="ml-1"
                        source={images.icon_verify}
                        style={{ width: 25, height: 25 }}
                        resizeMode="containt"
                      />
                    </View>

                    {/* Sub title */}
                    <Text className="text-sm">This is subtitle</Text>
                  </View>
                </TouchableOpacity>

                {/* Header right */}
                <TouchableOpacity>
                  <Image
                    source={images.icon_triple_dot}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexl: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FlatList
                  data={medias[index]} // Chỉ render danh sách media tương ứng với index
                  renderItem={renderItem}
                  keyExtractor={(item, idxChild) => `${index} ${idxChild}`}
                  horizontal
                  pagingEnabled
                  bounces={false}
                />
              </View>

              {/* Content post */}
              {/* <View className="w-full bg-red-200 relative mb-2">
                <Text className="absolute right-3 top-3 bg-gray-500 px-2 py-1 rounded-full fs-sm text-white">
                  1/1
                </Text>
              </View> */}

              {/* Footer post */}
              <View className="flex flew-column">
                <View className="w-full flex flex-column justify-between px-3">
                  {/* React row */}
                  <View className="w-24 flex flex-row justify-between items-center mb-2">
                    <TouchableOpacity className="">
                      <Image source={images.icon_notify} style={styles.icons} />
                    </TouchableOpacity>
                    <TouchableOpacity className="">
                      <Image
                        source={images.icon_message}
                        style={{
                          width: 25,
                          height: 25,
                          transform: [{ scaleX: -1 }],
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity className="">
                      <Image
                        source={images.icon_share}
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Comment row */}
                  <Text className="w-full mb-2">{post.caption}</Text>
                  <View className="flex flex-row items-center">
                    <View className="w-8 h-8 overflow-hidden flex flex-row justify-center items-center">
                      {/* Hình ảnh chính (phía dưới) */}
                      <Image
                        className="absolute z-0 rounded-full" // Đặt dưới cùng với z-0
                        style={{ width: "85%", height: "85%" }}
                        resizeMode="cover"
                        source={require("./../../assets/portaits/portait_1.jpg")}
                      />
                    </View>
                    <TextInput
                      className="ml-1"
                      placeholder="Add a comment..."
                      onChangeText={(comment) => setYourComment(comment)}
                      value={yourComment}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        {/* navigation bottom */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    width: 28,
    height: 28,
  },
  selectedVideo: {
    width: 411,
    height: 500,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  selectedImage: {
    width: 411,
    height: 600,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});

export default Home;
