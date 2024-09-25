import React, { useContext, useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "./Context";

// Define User interface
interface User {
  username: string;
  email: string;
  fullName: string;
}

export default function DetailsScreen() {
  const { userToken } = useContext(AuthContext);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!userToken) {
        setError("No user token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://192.168.1.6:8080/spring/user",
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data", err);
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userToken]); // Dependency array ensures effect runs when userToken changes

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      <Text>Welcome, {userData?.username}!</Text>
      <Text>FullName: {userData?.fullName}</Text>
      <Text>Email: {userData?.email}</Text>
    </View>
  );
}
