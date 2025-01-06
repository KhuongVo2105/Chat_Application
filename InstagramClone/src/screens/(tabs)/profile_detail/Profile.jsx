import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import ProfileScreen from './ProfileScreen';
import {useRoute} from '@react-navigation/native';
import {View, ActivityIndicator} from 'react-native';
import ENDPOINTS from '../../../config/endpoints';
import axios from 'axios';

const Profile = () => {
  const {tokenContext, idContext} = useContext(AuthContext);
  const route = useRoute();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const newUserId = route.params?.userId || idContext;
    console.log('newUserId ', newUserId);
    if (newUserId !== userId) {
      setUserId(newUserId);
      setUser(null);
      setLoading(false);
    }
  }, [route.params?.userId, idContext, userId]);
  useEffect(() => {
    if (!userId) return;
    const fetchUserById = async () => {
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
  }, [userId, tokenContext]);

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
