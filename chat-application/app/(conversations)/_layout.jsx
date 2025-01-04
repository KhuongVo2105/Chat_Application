import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Conversations from "./Conversations";
import { View, Pressable, Text } from "react-native";
import Conversation from "./Conversation";

SplashScreen.preventAutoHideAsync();

const HeaderConversations = () => {
  return (
    <View>
      <Pressable onPress={() => {}}>
        <Ionicons name="arrow-back-outline" color="black" size="30" />
      </Pressable>
      <Text>Hello</Text>
    </View>
  );
};

const ConversationLayout = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Conversations">
      <Stack.Screen name="Conversations" component={Conversations} />
      <Stack.Screen name="Conversation" component={Conversation} />
    </Stack.Navigator>
  );
};

export default ConversationLayout;
