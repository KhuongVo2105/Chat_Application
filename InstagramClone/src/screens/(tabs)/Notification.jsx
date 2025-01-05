import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {OneSignal} from 'react-native-onesignal';

const Notifycation = () => {
  OneSignal.initialize('672c61cb-8e38-40a0-9d50-d0cc76dc03fe');
  OneSignal.login('9836ce95-2337-4ce2-9f10-44ffba72eeada');
  OneSignal.User.pushSubscription.optIn();
  console.log('Hello Notification');
  return (
    <View>
      <Text>Notifycation</Text>
    </View>
  );
};

export default Notifycation;

const styles = StyleSheet.create({});
