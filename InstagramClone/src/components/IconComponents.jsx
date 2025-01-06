import React from 'react';
import Svg, {Path} from 'react-native-svg';
import images from '../config/images';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native';

// Component IconHome
const IconHome = props => {
  const path_home_default =
    'M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77';
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill={props.fill || 'black'}
        d={props.pathData || path_home_default}
      />
    </Svg>
  );
};

// Component cho Icon Search
const IconSearch = props => {
  const pathData =
    'm19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.402 0-4.066-1.663T3.808 9.503T5.47 5.436t4.064-1.667t4.068 1.664T15.268 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37';

  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path fill={props.fill || 'black'} d={pathData} />
    </Svg>
  );
};

// Component cho Icon Create New Post
const IconCreateNewPost = props => {
  const pathData =
    'M17 0.25C20.7279 0.25 23.75 3.27208 23.75 7V17C23.75 20.7279 20.7279 23.75 17 23.75H7C3.27208 23.75 0.25 20.7279 0.25 17V7C0.25 3.27208 3.27208 0.25 7 0.25H17ZM17 1.75H7C4.10051 1.75 1.75 4.10051 1.75 7V17C1.75 19.8995 4.10051 22.25 7 22.25H17C19.8995 22.25 22.25 19.8995 22.25 17V7C22.25 4.10051 19.8995 1.75 17 1.75ZM12.7432 5.89823C12.6935 5.53215 12.3797 5.25 12 5.25L11.8982 5.25685L11.8006 5.27679C11.4832 5.36411 11.25 5.65482 11.25 6V11.249L6 11.25L5.89823 11.2568C5.53215 11.3065 5.25 11.6203 5.25 12L5.25685 12.1018C5.30651 12.4678 5.6203 12.75 6 12.75L11.25 12.749V18L11.2568 18.1018C11.3065 18.4678 11.6203 18.75 12 18.75L12.1018 18.7432C12.4678 18.6935 12.75 18.3797 12.75 18V12.75H18L18.1018 12.7432C18.4678 12.6935 18.75 12.3797 18.75 12L18.7432 11.8982C18.6935 11.5322 18.3797 11.25 18 11.25H12.75V6L12.7432 5.89823Z';

  return (
    <Svg viewBox="0 0 25 25" {...props}>
      <Path fill={props.fill || '#262626'} d={pathData} />
    </Svg>
  );
};

// Component cho Icon Heart
const IconHeart = props => {
  const pathData =
    'M4.24 12.25a4.2 4.2 0 0 1-1.24-3A4.25 4.25 0 0 1 7.25 5c1.58 0 2.96.86 3.69 2.14h1.12A4.24 4.24 0 0 1 15.75 5A4.25 4.25 0 0 1 20 9.25c0 1.17-.5 2.25-1.24 3L11.5 19.5zm15.22.71C20.41 12 21 10.7 21 9.25A5.25 5.25 0 0 0 15.75 4c-1.75 0-3.3.85-4.25 2.17A5.22 5.22 0 0 0 7.25 4A5.25 5.25 0 0 0 2 9.25c0 1.45.59 2.75 1.54 3.71l7.96 7.96z';

  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path fill={props.fill || 'black'} d={pathData} />
    </Svg>
  );
};

const IconMessage = props => {
  const {width, height, fill} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      class="bi bi-chat"
      viewBox="0 0 16 16">
      <Path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
    </Svg>
  );
};

const IconUserProfile = props => {
  const {width, height, source, seen, containerStyles} = props;

  return (
    <TouchableOpacity
      className={`overflow-hidden flex flex-row justify-center items-center ${containerStyles}`}
      style={{
        width: width,
        height: height,
      }}>
      {/* Hình ảnh chính (phía dưới) */}
      <Image
        className="absolute z-0 rounded-full" // Đặt dưới cùng với z-0
        style={{width: '85%', height: '85%'}}
        resizeMode="cover"
        source={source}
      />

      {/* Khung viền PNG (phía trên) */}
      <Image
        className="w-full h-full justify-center items-center absolute z-10 rounded-full" // Đặt trên cùng với z-10
        source={seen != true ? images.story_unseen : images.story_seen}
      />
    </TouchableOpacity>
  );
};

const IconUserProfileStatic = props => {
  const {width, height, source, seen, containerStyles} = props;

  return (
    <View
      className={`overflow-hidden flex flex-row justify-center items-center ${containerStyles}`}
      style={{
        width: width,
        height: height,
      }}>
      {/* Hình ảnh chính (phía dưới) */}
      <Image
        className="absolute z-0 rounded-full" // Đặt dưới cùng với z-0
        style={{width: '85%', height: '85%'}}
        resizeMode="cover"
        source={source}
      />

      {/* Khung viền PNG (phía trên) */}
      <Image
        className="w-full h-full justify-center items-center absolute z-10 rounded-full" // Đặt trên cùng với z-10
        source={seen != true ? images.story_unseen : images.story_seen}
      />
    </View>
  );
};

// Xuất các component
export { IconHome, IconSearch, IconCreateNewPost, IconHeart, IconMessage, IconUserProfile, IconUserProfileStatic };
