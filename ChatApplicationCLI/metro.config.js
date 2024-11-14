const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Thêm các phần mở rộng mà bạn cần hỗ trợ
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'cjs', 'svg', 'json'],  // Thêm 'cjs' và 'svg' nếu sử dụng
    assetExts: ['png', 'jpeg', 'jpg', 'svg'], // Nếu bạn muốn xử lý SVG như là asset
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
