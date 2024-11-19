import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ENDPOINTS from "../../config/endpoints";
import { Formik } from 'formik'
import { verifyEmailSchema } from '../../validations/validation';

const RegisterEmail = ({ navigation }) => {
  const email = ('');
  const [loading, setLoading] = useState(false);

  const handleRegisterEmail = async (validateForm) => {
    try {
      const errors = await validateForm(values);
      const email = values.email;

      if (Object.keys(errors).length > 0) {
        Alert.alert('Error', errors.email || 'Please enter a valid email address');
        return;
      }

      setLoading(true);

      // Gửi yêu cầu OTP tới server
      const endpoint = ENDPOINTS.OTP.SEND_OTP;
      console.log(`Send request to ${endpoint} with ${email}`);
      const response = await axios.post(endpoint, { email });

      setLoading(false);

      if (response.data?.code === 200 && response.data.result) {
        setEmailContext(email);
        Alert.alert('Success', 'OTP sent successfully to your email.');
        navigation.navigate('Register_ConfirmCode');
      } else {
        throw new Error(response.data?.message || 'Unexpected response');
      }
    } catch (error) {
      setLoading(false);

      if (error.response) {
        const errorCode = error.response.data?.code;
        const errorMessage =
          errorCode === 1022
            ? 'Email already exists. Please use a different email.'
            : 'Failed to send OTP. Please try again later.';

        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert('Error', 'Network error. Please check your internet connection.');
      }
    }
  };

  return (
    <View className="w-full h-full flex items-center bg-white">
      <View className="w-96 mt-3">
        <Text className="text-2xl font-bold mb-1 instagram">What's your email?</Text>
        <Text className="text-base mb-7">Enter the email where you can be contacted. No one will see this on your profile.</Text>

        <Formik
          validationSchema={verifyEmailSchema}
          initialValues={email}
        >{({ values, handleChange, validateForm }) => {
          console.log(values)
          const { email } = values

          return (
            <>
              {/* Email field */}
              <TextInput
                className="enabled:hover:border-gray-40 border py-2 px-4 w-96 hover:shadow mb-4 rounded-2xl drop-shadow-2xl"
                onChange={handleChange('email')}
                value={email}
                keyboardType='email-address'
                placeholder="Email"
              />

              {/* Send OTP message button */}
              <TouchableOpacity
                className="w-96 bg-blue-600 py-2 rounded-full"
                onPress={() => handleRegisterEmail(validateForm)}
                disabled={loading}>
                <Text className="text-center text-xl font-medium text-white">
                  {loading ? 'Sending...' : 'Next'}
                </Text>
              </TouchableOpacity>
            </>
          )
        }}
        </Formik>
      </View>
    </View >
  );
};

export default RegisterEmail;
