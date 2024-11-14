module.exports = function (api) {
    api.cache(true);
    const presets = ['module:@react-native/babel-preset'];
    const plugins = [];
    return {
        presets,
        plugins
    }
};
