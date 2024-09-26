import React, { useContext, useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "./Context";
import { REACT_APP_API_BASE_URL } from '@env';

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

        const endpoint = `${REACT_APP_API_BASE_URL}/users/myInfo`;

        const response = await axios.post(
          endpoint,
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
