// import { REACT_APP_API_BASE_URL } from '@env';
// const SERVER_ADDRESS = `192.168.1.21`;
const SERVER_ADDRESS = `192.168.1.3`;
const REACT_APP_API_BASE_URL = `http://${SERVER_ADDRESS}:8080/chat-application/v1`;

const API_BASE_URL = REACT_APP_API_BASE_URL;
const API_WEBSOCKET = `http:${SERVER_ADDRESS}:8800`;

const ENDPOINTS = {
  AUTH: {
    GET_TOKEN: `${API_BASE_URL}/auth/token`,
    INTROSPECT: `${API_BASE_URL}/auth/introspect`,
  },

  // User management endpoints
  USER: {
    SIGN_IN: `${API_BASE_URL}/users`,
    SIGN_UP: ``,
    MY_INFORMATION: `${API_BASE_URL}/users/my-info`,
    GET_USER_PROFILE: `${API_BASE_URL}/users`,
    UPDATE_USER_PROFILE: `${API_BASE_URL}/users/updateInfo`,
    DELETE_USER_ACCOUNT: `${API_BASE_URL}/user/delete`,
    UPDATE_AVATAR: `${API_BASE_URL}/users/updateAvat`,
    GET_POST_BY_USERNAME: `${API_BASE_URL}/post/postOfUsername`,
  },

  SEARCH: {
    FIND_USERNAME: `${API_BASE_URL}/search/username`,
    FIND_POST: `${API_BASE_URL}/search/caption`,
  },
  OTP: {
    SEND_OTP: `${API_BASE_URL}/verification/send-code`,
    VERIFY_OTP: `${API_BASE_URL}/verification/verify`,
  },

  GROUP: {
    GET_GROUPS: `${API_BASE_URL}/groups`, //get method
    CREATE_GROUP: `${API_BASE_URL}/groups`, //post method
  },

  WEBSOCKET: {
    SOCKET_URL: `ws://${SERVER_ADDRESS}:8080/chat-application/socket`,
  },

  POST: {
    GET: `${API_BASE_URL}/post/findAll`,
    ADD: `${API_BASE_URL}/post/add`,
    UPDATE: `${API_BASE_URL}/post/update`,
    DELETE: `${API_BASE_URL}/post/delete`,
    FIND_ALL_MULTIPLE_USER: `${API_BASE_URL}/post/findAllPost`,
    UPDATE_VISIBLE: `${API_BASE_URL}/post/updateVisible`,
    UPDATE_CAPTION: `${API_BASE_URL}/post/updateCaption`,
  },

  MEDIA: {
    GET: `${API_BASE_URL}/media/findAll`,
    FIND_ALL_MULTIPLE_POST: `${API_BASE_URL}/media/findAllByPost`,
    ADD: `${API_BASE_URL}/media/add`,
    DELETE: `${API_BASE_URL}/media/delete`,
    GET_MEDIA_URL_BY_USERID: `${API_BASE_URL}/media/getAllImageOfUserId`,
  },

  CLOUDINARY: {
    ADD_ONE: `${API_BASE_URL}/cloudinary/one`,
    ADD_MULTIPLE: `${API_BASE_URL}/cloudinary/multiple`,
    FIND_ALL_MULTIPLE: `${API_BASE_URL}/cloudinary/getAllMultiple`,
  },

  FOLLOW: {
    GET_FOLLOWING: `${API_BASE_URL}/follow/findAllByUserId`,
    IS_FOLLOW: `${API_BASE_URL}/follow/isFollowing`,
    FOLLOW: `${API_BASE_URL}/follow`,
    FOLLOWER: `${API_BASE_URL}/follow/followers`,
    FOLOWERING: `${API_BASE_URL}/follow/following`,
    SUGGEST_USER: `${API_BASE_URL}/follow/suggestUser`,
  },
  CHAT: {
    SOCKJS: `${API_WEBSOCKET}/ws`,
    MESSAGE: `${API_WEBSOCKET}/messages`,
    MESSAGE_LIST: `${API_WEBSOCKET}/messages/messageList`,
    FOLLOWING_USERS: `${API_BASE_URL}/follow/followingList`,
    CREATE_GROUP: `${API_WEBSOCKET}/GroupChat/createGroup`,
    USER_CONVERSATION: `${API_WEBSOCKET}/messages/group`,
    FOLLOWING: `${API_WEBSOCKET}/messages/following`
  },

  LIKE: {
    FIND_ALL: `${API_BASE_URL}/like/findAll`,
    ADD: `${API_BASE_URL}/like/add`,
    DELETE: `${API_BASE_URL}/like/delete`,
    IS_LIKE: `${API_BASE_URL}/like/isLike`,
    QUANTITY_LIKE_BY_ONE: `${API_BASE_URL}/like/quantityLikeByOne`,
  },
  NOTIFY: {
    GET: `${API_BASE_URL}/notification`
  }
};

export default ENDPOINTS;
