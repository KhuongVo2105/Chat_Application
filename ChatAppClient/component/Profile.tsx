import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const dummyPosts = [
  { id: "1", uri: "https://via.placeholder.com/150" },
  { id: "2", uri: "https://via.placeholder.com/150" },
  { id: "3", uri: "https://via.placeholder.com/150" },
  { id: "4", uri: "https://via.placeholder.com/150" },
  { id: "5", uri: "https://via.placeholder.com/150" },
];

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>Username</Text>
        </View>
        <Icon name="book" size={20} color={"#333"} />
      </View>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>Bài viết</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>200</Text>
            <Text style={styles.statLabel}>Người theo dõi</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>180</Text>
            <Text style={styles.statLabel}>Đang theo dõi</Text>
          </View>
        </View>
      </View>
      <Text style={styles.bio}>This is a sample bio about the user.</Text>
      <View style={{display:'flex',flexDirection:'row'}}>
      <TouchableOpacity style={styles.btnEditProfile}>
        <Text style={{}}>Chỉnh sửa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnEditProfile}>
        <Text style={{}}>Chia sẻ trang cá nhân</Text>
      </TouchableOpacity>
      </View>
      <FlatList
        data={dummyPosts}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Image source={{ uri: item.uri }} style={styles.postImage} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
  },
  postsContainer: {
    marginTop: 10,
  },
  postImage: {
    width: "33.33%", // 3 cột
    aspectRatio: 1, // Tạo hình vuông
  },
  btnEditProfile: {
    marginRight:5,
    padding: 7,
    paddingHorizontal:35,
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#ccc",
    marginTop: 10,
  },
});

export default Profile;
