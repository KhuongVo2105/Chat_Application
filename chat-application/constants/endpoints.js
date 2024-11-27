// import { REACT_APP_API_BASE_URL } from '@env';
const SERVER_ADDRESS = `192.168.197.234`
const REACT_APP_API_BASE_URL = `http://${SERVER_ADDRESS}:8080/chat-application/v1`

const API_BASE_URL  = REACT_APP_API_BASE_URL;

const ENDPOINTS = {
    AUTH: {
        GET_TOKEN: `${API_BASE_URL}/auth/token`,
        INTROSPECT: `${API_BASE_URL}/auth/introspect`,
    },
    
    // User management endpoints
    USER: {
        SIGN_IN: `${API_BASE_URL}/users`,
        SIGN_UP:``,
        MY_INFORMATION:`${API_BASE_URL}/users/my-info`,
        GET_USER_PROFILE: `${API_BASE_URL}/user/profile`,
        UPDATE_USER_PROFILE: `${API_BASE_URL}/user/update-profile`,
        DELETE_USER_ACCOUNT: `${API_BASE_URL}/user/delete`
    },

    OTP:{
        SEND_OTP:`${API_BASE_URL}/verification/send-code`,
        VERIFY_OTP:`${API_BASE_URL}/verification/verify`
    },

    WEBSOCKET: {
        SOCKET_URL :`ws://${SERVER_ADDRESS}:8080/chat-application/socket`
    }
}

export default ENDPOINTS;