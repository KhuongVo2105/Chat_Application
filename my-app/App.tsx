import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./component/Register";
import InfoScreen from "./component/Info";
import { AuthProvider } from "./component/Context";
import LoginScreen from "./component/Login"
import VerifyScreen from "./component/Verify"
import FontLoader from "./utils/FontLoader";

// Tạo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <FontLoader>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Info" component={InfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </FontLoader>
    </AuthProvider>
  );
}

