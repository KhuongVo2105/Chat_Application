import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { Text, ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get('window');

const backup = [{ id: '1', uri: '' }]

const ImageCarousel = ({ images, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      const uri = images[currentIndex].uri;
      await Image.prefetch(uri);
      setLoading(false);
    };

    loadImage();
  }, [currentIndex]);

  const handleGesture = (event) => {
    const { translationX } = event.nativeEvent;

    if (translationX < -50 && currentIndex < images.length - 1) {
      // Vuốt trái và không phải ảnh cuối
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setLoading(true);
    } else if (translationX > 50 && currentIndex > 0) {
      // Vuốt phải và không phải ảnh đầu
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setLoading(true);
    }
  };

  return (
    <GestureHandlerRootView
      className={`${className}`}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={{ width: '100%', height: (width * 4) / 3, overflow: 'hidden' }}>
          {images.map((item, index) => (
            <View
              key={item.id}
              style={{
                opacity: index === currentIndex ? 1 : 0,
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {loading && index === currentIndex ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="contain"
                />
              )}
            </View>
          ))}
        </View>
      </PanGestureHandler>
      {/* <Text style={{ marginTop: 10, fontSize: 16, textAlign: 'center' }}>
        {images[currentIndex].uri}
      </Text> */}
      <Text className="absolute top-2 right-4 bg-zinc-500 text-white rounded-full px-2 py-1">{currentIndex + 1}/{images.length}</Text>
    </GestureHandlerRootView>
  );
};

export default ImageCarousel;