import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Birthday = ({ navigation, route }) => {
  // Khai báo state cho email, password và ngày sinh nhật
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Hàm để xử lý khi component được mount
  useEffect(() => {
    setEmail(route.params.email);
    setPassword(route.params.password);
  }, [route.params]);

  // Hàm để hiển thị DateTimePicker
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  // Hàm để ẩn DateTimePicker
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  // Hàm để xử lý khi người dùng chọn ngày
  const handleConfirm = (event, date) => {
    if (event.type === 'set') {
      setSelectedDate(date);
    }
    hideDatePicker();
  };

  // Hàm để kiểm tra độ tuổi và chuyển trang
  const handleCheckAge = () => {
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let age = today.getFullYear() - birthDate.getFullYear(); // Sử dụng let để có thể thay đổi giá trị
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 16) {
      handleUsername();
    } else {
      Alert.alert('You must be at least 16 years old to register.');
    }
  };

  // Hàm để chuyển tới trang tiếp theo
  const handleUsername = () => {
    const formattedBirthday = selectedDate.toISOString().split('T')[0]; // Định dạng ngày tháng theo chuẩn YYYY-MM-DD
    navigation.navigate('Register_Username', {
      email: email,
      password: password,
      birthday: formattedBirthday,
    });
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-4">
        <Text className="text-3xl font-semibold mb-1">
          What's your birthday?
        </Text>
        <Text className="text-base mb-7">
          Use your own birthday, even if this account is for a business, a pet
          or something else. No one will see this unless you choose to share it.
          Why do I need to provide my birthday?
        </Text>

        <View className="w-96 flex flex-row justify-between items-center py-1 px-3 border rounded-full mb-7">
          <Text className="opacity-80">
            {selectedDate.toLocaleDateString()} {/* Hiển thị ngày hiện tại */}
          </Text>
          <Pressable onPress={showDatePicker}>
            <MaterialIcons name='calendar-month' size={28} />
          </Pressable>
        </View>

        {datePickerVisible && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleConfirm}
          />
        )}

        <Pressable
          className="w-96 bg-blue-600 py-2 rounded-full mb-3"
          onPress={handleCheckAge}>
          <Text className="text-center text-lg font-medium text-white">
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Birthday;