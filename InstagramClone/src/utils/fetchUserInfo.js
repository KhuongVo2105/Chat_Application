import {useContext} from 'react';
import ENDPOINTS from '../config/endpoints';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';
import {handleError} from './handleError';

const fetchUserInfo = async () => {
  const {
    tokenContext,
    idContext,
    setIdContext,
    setUsernameContext,
    setEmailContext,
    setCreatedAtContext,
    setBirthdayContext,
    setPrivacyContext,
    setStatusContext,
    setRoleContext,
  } = useContext(AuthContext);

  if (!tokenContext) {
    console.log('Token is not available');
    return;
  } else console.log('Token is existed:', tokenContext);

  const endpoint = ENDPOINTS.USER.MY_INFORMATION;
  try {
    const response = await axios.post(
      endpoint, // URL
      {}, // Request body (ở đây là rỗng vì không truyền dữ liệu)
      {
        headers: {
          Authorization: `Bearer ${tokenContext}`,
        },
      },
    );
    console.log('\tLoad user profile is successfully');

    // Kiểm tra phản hồi từ server
    if (response.data.code === 200 && response.data.result) {
      const userInfo = response.data.result;
      console.log(`User information: ${JSON.stringify(userInfo, null, 2)}`);
      setUser(userInfo);
      // Lưu thông tin vào Context
      setIdContext(userInfo.id);
      setUsernameContext(userInfo.username);
      setEmailContext(userInfo.email);
      setCreatedAtContext(userInfo.createdAt);
      setPrivacyContext(userInfo.privacy);
      setStatusContext(userInfo.status);
      setBirthdayContext(userInfo.birthday);

      setRoleContext({roles: userInfo.roles});

      console.log('User information loaded successfully.');
    }
  } catch (error) {
    handleError(error);
  }
};

export default fetchUserInfo;
