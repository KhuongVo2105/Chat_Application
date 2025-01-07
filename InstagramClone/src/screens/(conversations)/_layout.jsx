import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Conversations from './Conversations';
import Conversation from './Conversation';
// import HeaderConversations from '../(message)/HeaderConverstaions';
// import HeaderConversation from '../(message)/HeaderConversation';

const ConversationLayout = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Conversations">
      <Stack.Screen
        name="Conversations"
        component={Conversations}
        options={{
          // headerShown: true,
          // header: ({navigation, route}) => (
          //   <HeaderConversations navigation={navigation} route={route} />
          // ),
        }}
      />
      <Stack.Screen
        name="Conversation"
        component={Conversation}
        options={{
          // headerShown: true,
          // header: ({navigation, route}) => (
          //   <HeaderConversation navigation={navigation} route={route} />
          // ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ConversationLayout;
