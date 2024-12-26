import {Text, View, Pressable} from 'react-native';
import Register_Email from './Register_Email';
import Register_Birthday from './Register_Birthday';
import Register_ConfirmCode from './Register_ConfirmCode';
import Register_CreatePasswd from './Register_CreatePasswd';
import Register_Username from './Register_Username';
import Register from './Register';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationBar from './NavigationBar';

const FooterBar = ({navigation}) => {
  return (
    <View className="flex flex-row items-center justify-center sticky bottom-0 py-6 w-full absolute bottom-0">
      <Pressable
        className="ml-2"
        onPress={() => navigation.navigate('./../SignIn')}>
        <Text className="text-base font-medium text-blue-600">
          I already have an account
        </Text>
      </Pressable>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const AuthsLayout = () => {
  console.log(
    `[SCREEN NAVIGATION] ${new Date().toISOString()} - Screen: AuthsLayout`,
  );

  return (
    <>
      <Stack.Navigator initialRouteName="Register_Email">
        <Stack.Screen
          name="Register_Email"
          component={Register_Email}
          options={{
            headerShown: true,
            header: ({navigation, route}) => (
              <NavigationBar navigation={navigation} route={route} />
            ),
          }}
        />
        <Stack.Screen
          name="Register_ConfirmCode"
          component={Register_ConfirmCode}
          options={{
            headerShown: true,
            header: ({navigation, route}) => (
              <NavigationBar navigation={navigation} route={route} />
            ),
          }}
        />
        <Stack.Screen
          name="Register_CreatePasswd"
          component={Register_CreatePasswd}
          options={{
            headerShown: true,
            header: ({navigation, route}) => (
              <NavigationBar navigation={navigation} route={route} />
            ),
          }}
        />
        <Stack.Screen
          name="Register_Birthday"
          component={Register_Birthday}
          options={{
            headerShown: true,
            header: ({navigation, route}) => (
              <NavigationBar navigation={navigation} route={route} />
            ),
          }}
        />
        <Stack.Screen
          name="Register_Username"
          component={Register_Username}
          options={{
            headerShown: true,
            header: ({navigation, route}) => (
              <NavigationBar navigation={navigation} route={route} />
            ),
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            header: ({navigation, route}) => (
              <NavigationBar navigation={navigation} route={route} />
            ),
          }}
        />
      </Stack.Navigator>

      <FooterBar />
    </>
  );
};

export default AuthsLayout;
