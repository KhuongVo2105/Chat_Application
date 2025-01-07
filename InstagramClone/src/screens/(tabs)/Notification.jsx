import {FlatList, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ENDPOINTS from '../../config/endpoints';
import axios from 'axios';
  const Notifycation = () => {
    const [loading, setLoading] = useState(true); // Giữ trạng thái đang tải
    const [notifications, setNotifications] = useState([]);
    const [count, setCount] = useState(0);
    const { idContext } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchData = async () => {
        const endpoint = ENDPOINTS.NOTIFY.GET;
        try {
          const response = await axios.post(`${endpoint}?userId=${idContext}`);
          if (Array.isArray(response.data)) {
            setNotifications(response.data);
            setCount(response.data.length)
          } else {
            setNotifications([]);
          }
        } catch (error) {
          console.log('Notify error:', error);
          setNotifications([]);
        } finally {
          setLoading(false); // Kết thúc trạng thái tải
        }
      };
  
      fetchData();
    }, [idContext]);
  
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity>
          <View style={styles.userContainer}>
          <Image
            source={
              item.avatar
                ? {uri: item.avatar}
                : require('../../assets/avatarDefine.jpg')
            }
            style={styles.profileImage}
          />
            <View style={styles.userInfo}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>{item.message}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        {loading ? ( // Hiển thị trạng thái tải
          <Text style={styles.loadingText}>Đang tải...</Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => `${index}`}
            renderItem={renderItem}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Không có kết quả</Text>
            }
          />
        )}
      </View>
    );
  };
  
  export default Notifycation;
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#f5f5f5',
    },
    backIcon: {
      marginRight: 10,
      color: '#000',
    },
    cameraButton: {
      marginLeft: 10,
      padding: 5,
    },
    searchInput: {
      flex: 1,
      color: '#000',
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    tab: {
      color: '#000',
      fontSize: 16,
      marginRight: 15,
    },
    activeTab: {
      color: '#000',
      fontWeight: 'bold',
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    list: {
      flex: 1,
      backgroundColor: '#fff',
    },
    listContent: {
      paddingHorizontal: 15,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingBottom: 10,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    userInfo: {
      flex: 1,
    },
    usernameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    username: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
    },
    name: {
      color: '#333',
    },
    followers: {
      color: '#555',
      fontSize: 12,
    },
    emptyText: {
      color: '#000',
      textAlign: 'center',
      marginTop: 20,
    },
    cameraText: {
      fontSize: 16,
      color: '#000',
      textAlign: 'center',
      marginBottom: 10,
    },
    closeCameraButton: {
      padding: 10,
      backgroundColor: '#000',
      alignItems: 'center',
      borderRadius: 5,
    },
    closeCameraText: {
      color: '#fff',
      fontSize: 14,
    },
  });
