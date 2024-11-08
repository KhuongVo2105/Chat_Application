import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const InstagramClone = () => {
  const navigation = useNavigation();
  const route = useRoute(); 
  const { user } = route.params;
  
  return (
    <SafeAreaView style={styles.container} sharedTransitionTag="sharedTag">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <FontAwesome name="heart-o" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconSpacing}>
            <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to Instagram</Text>
        <Text style={styles.subText}>
          Follow people to start seeing the photos and videos they share.
        </Text>
      </View>

      {/* Bottom navigation bar */}
      <View style={styles.navbar}>
        <TouchableOpacity>
          <FontAwesome name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("NewPostScreen", {"user": user})}>
          <Feather name="plus-square" size={24} color="black"/>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="film" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="user-circle-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    height: 50,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
  },
  iconSpacing: {
    marginLeft: 15,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "#808080",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});

export default InstagramClone;
