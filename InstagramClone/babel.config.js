module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: ['nativewind/babel'],
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
    ['nativewind/babel'],
    ['react-native-paper/babel'],
  ],
};
