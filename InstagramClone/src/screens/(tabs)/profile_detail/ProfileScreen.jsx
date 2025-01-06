import React, {useState} from 'react';
import {View, StyleSheet, Text, Modal, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ProfileScreen = ({userId, username}) => {
  const [isQRVisible, setQRVisible] = useState(false);

  const toggleQRModal = () => {
    setQRVisible(!isQRVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{username}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>bài viết</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>người theo dõi</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>đang theo dõi</Text>
        </View>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleQRModal}>
          <Text style={styles.buttonText}>Chia sẻ trang cá nhân</Text>
        </TouchableOpacity>
      </View>

      {/* QR Code Modal */}
      <Modal visible={isQRVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.qrContainer}>
            <QRCode
              value={`https://myapp_instagram.com/profile/${userId}`}
              size={200}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleQRModal}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  username: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    color: '#000',
    fontSize: 18,
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1a73e8',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1a73e8',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default ProfileScreen;
