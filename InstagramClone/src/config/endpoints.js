// import { REACT_APP_API_BASE_URL } from '@env';
const SERVER_ADDRESS = `192.168.101.7`
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
        GET_USER_PROFILE: `${API_BASE_URL}/users`,
        UPDATE_USER_PROFILE: `${API_BASE_URL}/user/update-profile`,
        DELETE_USER_ACCOUNT: `${API_BASE_URL}/user/delete`
    },

    OTP:{
        SEND_OTP:`${API_BASE_URL}/verification/send-code`,
        VERIFY_OTP:`${API_BASE_URL}/verification/verify`
    },

    GROUP:{
        GET_GROUPS: `${API_BASE_URL}/groups`,   //get method
        CREATE_GROUP: `${API_BASE_URL}/groups`, //post method
    },

    WEBSOCKET: {
        SOCKET_URL :`ws://${SERVER_ADDRESS}:8080/chat-application/socket`
    },

    POST: {
        GET: `${API_BASE_URL}/post/findAll`,
        ADD: `${API_BASE_URL}/post/add`,
        UPDATE: `${API_BASE_URL}/post/update`,
        DELETE:`${API_BASE_URL}/post/delete`,
        FIND_ALL_MULTIPLE_USER: `${API_BASE_URL}/post/findAllByMultipleUser`,
        UPDATE_VISIBLE: `${API_BASE_URL}/post/updateVisible`,
        UPDATE_CAPTION: `${API_BASE_URL}/post/updateCaption`,
    },

    MEDIA: {
        GET: `${API_BASE_URL}/media/findAll`,
        FIND_ALL_MULTIPLE_POST: `${API_BASE_URL}/media/findAllByPost`,
        ADD: `${API_BASE_URL}/media/add`,
        DELETE:`${API_BASE_URL}/media/delete`,
    },

    CLOUDINARY: {
        ADD_ONE: `${API_BASE_URL}/cloudinary/one`,
        ADD_MULTIPLE: `${API_BASE_URL}/cloudinary/multiple`,
        FIND_ALL_MULTIPLE: `${API_BASE_URL}/cloudinary/getAllMultiple`
    },

    FOLLOW: {
        GET_FOLLOWING: `${API_BASE_URL}/follow/findAllByUserId`,
    }
}

export default ENDPOINTS;