import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const dummyPosts = [
  { id: "1", uri: "https://via.placeholder.com/150" },
  { id: "2", uri: "https://via.placeholder.com/150" },
  { id: "3", uri: "https://via.placeholder.com/150" },
  { id: "4", uri: "https://via.placeholder.com/150" },
  { id: "5", uri: "https://via.placeholder.com/150" },
];

function Profile({ navigation }) {
  const [selectedItem, setSelectedItem] = useState("table");
  const handleEdit = () => {
    navigation.navigate("EditProfile");
  };
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={true}
      style={styles.container}
    >
      <View>
        <View style={styles.header}>
          <View style={styles.infoContainer}>
            <Text style={styles.username}>Username</Text>
          </View>
          <Icon name="bars" size={20} color={"#333"} />
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

        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity style={styles.btnEditProfile} onPress={handleEdit}>
            <Text style={{ fontWeight: 600 }}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnEditProfile}>
            <Text style={{ fontWeight: 600 }}>Chia sẻ trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 5,
              padding: 7,
              paddingHorizontal: 10,
              alignItems: "center",
              borderRadius: 7,
              backgroundColor: "#ccc",
              marginTop: 10,
            }}
          >
            <Icon name="user-plus" style={{}}></Icon>
          </TouchableOpacity>
        </View>

        <View style={styles.explore}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 7,
            }}
          >
            <Text style={{ fontWeight: 500 }}>Khám phá mọi người</Text>
            <TouchableOpacity>
              <Text style={{ color: "#0095f6", fontWeight: 500 }}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: 140,
                  backgroundColor: "#ccc",
                  padding: 7,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, top: 10 }}
                >
                  <Icon name="close" />
                </TouchableOpacity>
                <View
                  //   source={{ uri: "https://via.placeholder.com/100" }}
                  style={{
                    width: 80,
                    height: 80,
                    marginVertical: 10,
                    backgroundColor: "white",
                    borderRadius: 40,
                  }}
                />
                <Text style={{ fontSize: 17, fontWeight: 600 }}>Instagram</Text>
                <Text style={{ fontSize: 13 }}>Gợi ý cho bạn</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#0095f7",
                    padding: 5,
                    paddingHorizontal: 7,
                    alignItems: "center",
                    borderRadius: 7,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: 600 }}>
                    Theo dõi
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 7,
            marginHorizontal:-10,
          }}
        >
          <TouchableOpacity
            style={[
              selectedItem === "table" && styles.itemSelected,
              styles.item,
            ]}
            onPress={() => handleSelectItem("table")}
          >
            <Icon name="table" style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              selectedItem === "home" && styles.itemSelected,
              styles.item,
            ]}
            onPress={() => handleSelectItem("home")}
          >
            <Icon name="home" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.postsContainer}>
            <View style={styles.postImage}>
                <Icon name="clone" />
            </View>
            <View style={styles.postImage}>
                <Icon name="clone" />
            </View>
            <View style={styles.postImage} />
            <View style={styles.postImage} />
            <View style={styles.postImage} />
        </View>
        {/* <FlatList
          data={dummyPosts}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image source={{ uri: item.uri }} style={styles.postImage} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          style={styles.postsContainer}
        /> */}
      </View>
    </ScrollView>
  );
}

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
    display: "flex",
    flexDirection: "row", // Thêm flexDirection: 'row'
    flexWrap: "wrap", // Cho phép các item xuống dòng nếu không đủ chỗ
    marginTop: 10,
    width: "105%",
    backgroundColor: "black",
    marginHorizontal:-10
  },
  postImage: {
    width: "33.3%",
    height:'33.3%',
    backgroundColor: "#ccc",
    aspectRatio: 1, // Tạo hình vuông
    borderWidth:0.5,
  },

  btnEditProfile: {
    marginRight: 5,
    padding: 7,
    paddingHorizontal: 35,
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#ccc",
    marginTop: 10,
  },
  explore: {
    marginTop: 20,
    marginBottom: 20,
  },
  item: {
    width: "50%",
    alignItems: "center",
  },
  itemSelected: {
    borderBottomWidth: 1,
  },
});

export default Profile;
