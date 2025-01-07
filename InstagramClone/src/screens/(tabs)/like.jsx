import React, {useCallback, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import images from '../../config/images';
import {useState, useEffect} from 'react';
import {IconUserProfile} from '../../components/IconComponents';
import {AuthContext} from '../../context/AuthContext';
import ENDPOINTS from '../../config/endpoints';
import axios from 'axios';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';
import ConnectedUsersList from '../../components/ConnectedUsersList';
import {OneSignal} from 'react-native-onesignal';

const LikeButton = ({postId}) => {
  const [isLiked, setIsLiked] = useState(false);
  const {
    tokenContext,
    setIdContext,
    idContext,
    setUsernameContext,
    setEmailContext,
    setCreatedAtContext,
    setBirthdayContext,
    setPrivacyContext,
    setStatusContext,
    setRoleContext,
    setAvatarContext,
  } = useContext(AuthContext);
  const isFocused = useIsFocused();

  const isLike = async () => {
    const post = {
      id: postId,
      visible: false,
    };

    const like = {
      user: {
        id: idContext,
      },
      post: post,
    };

    const addIsLikeEndpoint = ENDPOINTS.LIKE.IS_LIKE;
    const isLiked = await axios.post(addIsLikeEndpoint, like, {
      headers: {
        Authorization: `Bearer ${tokenContext}`,
      },
    });

    setIsLiked(isLiked.data.result);
  };

  useEffect(() => {
    if (isFocused) {
      isLike();
    }
  }, [isFocused]);

  const handleAddLike = async () => {
    console.log('Add Like clicked: ' + postId);
    const post = {
      id: postId,
      visible: false,
    };

    const like = {
      user: {
        id: idContext,
      },
      post: post,
    };

    const addLikeEndpoint = ENDPOINTS.LIKE.ADD;
    await axios.post(addLikeEndpoint, like, {
      headers: {
        Authorization: `Bearer ${tokenContext}`,
      },
    });
    setIsLiked(true);
  };

  const handleDeleteLike = async () => {
    console.log('Delete like clicked: ' + postId);
    const post = {
      id: postId,
      visible: false,
    };

    const like = {
      user: {
        id: idContext,
      },
      post: post,
    };
    console.log(like);

    const deleteLikeEndpoint = ENDPOINTS.LIKE.DELETE;
    await axios.post(deleteLikeEndpoint, like, {
      headers: {
        Authorization: `Bearer ${tokenContext}`,
      },
    });
    setIsLiked(false);
  };

  const handleLike = () => {
    !isLiked ? handleAddLike() : handleDeleteLike();
  };

  return (
    <TouchableOpacity onPress={() => handleLike()}>
      {/* <Image source={images.icon_notify} style={styles.icons} /> */}
      {isLiked ? (
        <Ionicons name="heart" size={28} color="red"></Ionicons>
      ) : (
        <Ionicons name="heart-outline" size={28}></Ionicons>
      )}
    </TouchableOpacity>
  );
};

export default LikeButton;
