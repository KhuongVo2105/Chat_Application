// FontLoader.tsx
import React, { useEffect, useState, ReactNode } from 'react';
import * as Font from 'expo-font';
import { Text } from 'react-native';

const loadFonts = async () => {
  await Font.loadAsync({
    'Instagram-Sans-Bold': require('../fonts/Instagram Sans Bold.ttf'),
    'Instagram-Sans-Medium': require('../fonts/Instagram Sans Medium.ttf'),
    'Instagram-Sans-Headline': require('../fonts/Instagram Sans Headline.otf'),
    'Instagram-Sans': require('../fonts/Instagram Sans.ttf'),
    'Instagram-Sans-Light': require('../fonts/Instagram Sans Light.ttf'),
  });
};

interface FontLoaderProps {
  children: ReactNode;
}

const FontLoader: React.FC<FontLoaderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return <>{children}</>; // Trả về children
};

export default FontLoader;
