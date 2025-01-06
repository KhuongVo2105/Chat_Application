import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import ENDPOINTS from '../../config/endpoints';

// 1. Hook: useLoadGroup
export const useLoadGroup = async token => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadGroup = useCallback(async () => {
    setLoading(true);
    setError(null);

    const endpoint = ENDPOINTS.GROUP.GET_GROUPS;

    try {
      const response = await axios.get(endpoint, {
        headers: {Authorization: `Bearer ${token}`},
      });

      const {data, status} = response;

      if (status === 200 && data.result) {
        setConversations(data.result);
      } else {
        setError(data.message || 'Unable to load groups.');
      }
    } catch (err) {
      const errorMessage = err.response
        ? `Server Error: ${err.response.data.message || err.message}`
        : 'Network Error: Unable to connect to server.';
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadGroup();
    } // Chỉ tự động tải khi có token
  }, [token, loadGroup]);

  return {conversations, loading, error, reload: loadGroup};
};

// 2. Function: loadGroupDetails
export const loadGroupDetails = async ({token, groupId}) => {
  const endpoint = `${ENDPOINTS.GROUP.GET_GROUPS}/${groupId}`;
  try {
    // console.log(`Instagram-Load Group Details-endpoint: ${endpoint}`, 'token:', token);
    const response = await axios.get(endpoint, {
      headers: {Authorization: `Bearer ${token}`},
    });
    const {data, status} = response;

    if (status === 200 && data.result) {
      return {data: data.result, error: null};
    } else {
      const errorMessage = `Unable to load details for group ${groupId}`;
      console.warn(errorMessage);
      return {data: null, error: errorMessage};
    }
  } catch (err) {
    const errorMessage = err.response
      ? `Error: ${err.response.data.message || err.message}`
      : 'Network Error: Unable to connect to server.';
    console.error(errorMessage);
    console.error(
      `\tError fetching details for group ${groupId}:`,
      err.response?.data || err.message,
    );
    return {data: null, error: errorMessage};
  }
};

// 3. Function: loadUserDetails
export const loadUserDetails = async ({token, userId}) => {
  const endpoint = `${ENDPOINTS.USER.GET_USER_PROFILE}/${userId}`;
  try {
    const response = await axios.get(endpoint, {
      headers: {Authorization: `Bearer ${token}`},
    });
    const {data, status} = response;

    if (status === 200 && data.result) {
      return {data: data.result, error: null};
    } else {
      const errorMessage = `Unable to load details for user ${userId}`;
      console.warn(errorMessage);
      return {data: null, error: errorMessage};
    }
  } catch (err) {
    const errorMessage = err.response
      ? `Error: ${err.response.data.message || err.message}`
      : 'Network Error: Unable to connect to server.';
    console.error(errorMessage);
    console.error(
      `\tError fetching details for group :`,

      err.response?.data || err.message,
    );
    return {data: null, error: errorMessage};
  }
};

export const fetchGroups = async token => {
  const endpoint = ENDPOINTS.GROUP.GET_GROUPS;
  try {
    const response = await axios.get(endpoint, {
      headers: {Authorization: `Bearer ${token}`},
    });
    const {data, status} = response;

    if (status === 200 && data.result) {
      return {data: data.result, error: null};
    } else {
      const errorMessage = data.message || 'Unable to load groups.';
      return {data: null, error: errorMessage};
    }
  } catch (err) {
    const errorMessage = err.response
      ? `Server Error: ${err.response.data.message || err.message}`
      : 'Network Error: Unable to connect to server.';
    return {data: null, error: errorMessage};
  }
};
