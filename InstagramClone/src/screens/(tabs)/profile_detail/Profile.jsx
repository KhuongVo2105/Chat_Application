import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import ProfileScreen from './ProfileScreen';
import {useRoute} from '@react-navigation/native';
import {loadUserDetails} from '../../(conversations)/ConversationsHelper';
import {View, ActivityIndicator} from 'react-native';
import ENDPOINTS from '../../../config/endpoints';
import axios from 'axios';

const Profile = () => {
  const {tokenContext, idContext} = useContext(AuthContext);
  const route = useRoute();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const {userId} = route.params || {userId: idContext};
  useEffect(() => {
    const fetchUserById = async () => {
      // const response = await loadUserDetails({tokenContext, userId});
      // if (response.data) {
      //   setUser(response.data);
      //   setLoading(true);
      // } else {
      //   console.log(response.error);
      // }
      const endpoint = `${ENDPOINTS.USER.GET_USER_PROFILE}/${userId}`;
      try {
        const response = await axios.get(endpoint, {
          headers: {Authorization: `Bearer ${tokenContext}`},
        });
        if (response.status === 200) {
          setUser(response.data.result);
          setLoading(true);
        }
      } catch (err) {
        console.log(`Error Profile: ${err}`);
      }
    };
    fetchUserById();
  }, [tokenContext, userId]);
  if (loading) {
    return <ProfileScreen userId={user.id} username={user.username} />;
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
};

export default Profile;
