import { Text, View, Image, Pressable } from 'react-native'
import Register_Email from "./Register_Email";
import Register_Birthday from "./Register_Birthday";
import Register_ConfirmCode from "./Register_ConfirmCode";
import Register_CreatePasswd from "./Register_CreatePasswd";
import Register_Username from "./Register_Username";
import Register from "./Register";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import images from '../constants/images';
import { AuthProvider } from '../constants/AuthContext';

const iconBackSize = 30;

const NavigationBar = ({ prevPage }) => {
  return (
    <View className="w-full flex flex-row bg-white">
      <View className="w-96 flex flex-row items-center justify-start mx-auto mt-10">
        <Pressable className="" onPress={() => router.push(prevPage)}>
          <Image className="" source={images.icon_back} style={{
            width: iconBackSize, height: iconBackSize
          }} resizeMode="contain" />
        </Pressable>
      </View>
    </View>
  )
}

const FooterBar = () => {
  return (
    <View className="flex flex-row items-center justify-center sticky bottom-0 py-6 w-full absolute bottom-0">
      <Pressable className="ml-2" onPress={() => router.push('./../SignIn')}>
        <Text className="text-base font-medium text-blue-600">I already have an account</Text>
      </Pressable>
    </View>
  )
}

const Stack = createNativeStackNavigator();

const AuthsLayout = () => {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName='Register_Email'>
        <Stack.Screen name="Register_Email" component={Register_Email} options={{
          headerShown: true,
          header: () => <NavigationBar prevPage='./../SignIn' />
        }} />
        <Stack.Screen name="Register_ConfirmCode" component={Register_ConfirmCode} options={{
          headerShown: true,
          header: () => <NavigationBar prevPage='./Register_Email' />
        }} />
        <Stack.Screen name="Register_CreatePasswd" component={Register_CreatePasswd} options={{
          headerShown: true,
          header: () => <NavigationBar prevPage='./Register_ConfirmCode' />
        }} />
        <Stack.Screen name="Register_Birthday" component={Register_Birthday} options={{
          headerShown: true,
          header: () => <NavigationBar prevPage='./Register_CreatePasswd' />
        }} />
        <Stack.Screen name="Register_Username" component={Register_Username} options={{
          headerShown: true,
          header: () => <NavigationBar prevPage='./Register_Birthday' />
        }} />
        <Stack.Screen name="Register" component={Register} options={{
          headerShown: true,
          header: () => <NavigationBar prevPage='./Register_Username' />
        }} />
      </Stack.Navigator>

      <FooterBar />
    </AuthProvider>
  )
}

export default AuthsLayout;