import { StatusBar, StyleSheet, Text, View, FlatList, Dimensions, Image } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ImageGrid = ({ images }) => {

    const Item = ({ quantity, uri }) => {
        return (
            <View className="relative flex-1 m-1 h-32">
                <Image
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                    source={{ uri: uri.startsWith('https') ? uri : 'https://via.placeholder.com/150' }}
                />
                {quantity > 1 && (
                    <View className="absolute top-2 left-2">
                        <MaterialCommunityIcons name="layers" size={20} color="white" />
                    </View>
                )}
            </View>
        );
    };

    return (
        <FlatList
            data={images}
            renderItem={({ item }) => <Item quantity={item.quantity} uri={item.uri} />}
            keyExtractor={item => item.id}
            numColumns={3} // Đặt số cột là 3
            columnWrapperStyle={styles.columnWrapper} // Tùy chỉnh khoảng cách giữa các cột
        />
    );
};

export default ImageGrid;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        flex: 1, // Đảm bảo mỗi ô chiếm không gian đều
        margin: 1, // Khoảng cách giữa các ô
        height: Dimensions.get('window').width / 3, // Đảm bảo chiều cao của ô là hình vuông
    },
    title: {
        fontSize: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Căn giữa các cột
    },
});