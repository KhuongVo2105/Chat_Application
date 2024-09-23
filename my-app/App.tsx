import * as React from "react";
import { useState, useContext } from "react";
import { StyleSheet, Alert, Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";

import RegisterScreen from "./component/Register";
import InfoScreen from "./component/Info";
import { AuthContext } from "./component/Context";
import { AuthProvider } from "./component/Context";
import LoginScreen from "./component/Login"
import VerifyScreen from "./component/Verify"

// Tạo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="Infos" component={InfoScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

