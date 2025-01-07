import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      Alert.alert('Picture taken!', `Image URI: ${data.uri}`);
      // Bạn có thể xử lý ảnh ở đây, ví dụ: lưu vào thư viện hoặc gửi đến server
    }
  };

  return (
    <View className="flex-1">
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        onCameraReady={handleCameraReady}
        captureAudio={false}
      />
      <TouchableOpacity
        className="absolute top-5 right-5 bg-transparent z-10"
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={40} color={'black'}/>
      </TouchableOpacity>
      <View className="absolute bottom-10 left-0 right-0 flex items-center">
        <TouchableOpacity
          onPress={takePicture}
          disabled={!isCameraReady}
          className="w-20 h-20 rounded-full border-4 border-white bg-transparent flex items-center justify-center"
        >
          <View className="w-14 h-14 rounded-full bg-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;