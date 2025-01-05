// src/utils/errorHandler.js
import { Alert } from 'react-native';

export const handleError = (error) => {
    if (error.response) {
        // Server responded with a status code outside the range of 2xx
        const { status, data, headers } = error.response;
        const { code, message } = data;

        switch (status) {
            case 400:
                if (code === 1040) {
                    Alert.alert('Error', message);
                } else {
                    console.log(`It's not #1040\tCode ${code}, Message: ${message}`);
                }
                break;
            case 401:
                if (code === 1040) {
                    Alert.alert(message);
                } else {
                    console.log(`It's not #1040\tCode ${code}, Message: ${message}`);
                }
                break;
            default:
                console.error("SignIn Error: Server responded with an error", {
                    status: status,
                    data: data,
                    headers: headers,
                });
                break;
        }
    } else if (error.request) {
        // No response received from server
        console.error("SignIn Error: No response received from server", {
            request: error.request,
        });

        Alert.alert(
            "Network Error",
            "No response received from the server. Please check your connection and try again."
        );
    } else {
        // Other errors
        console.error("SignIn Error: An error occurred while setting up the request", {
            message: error.message,
        });

        Alert.alert(
            "Unexpected Error",
            `An unexpected error occurred:\n${error.message}`
        );
    }
};