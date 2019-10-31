import {
  USER_LOADING,
  USER_LOADED,
  AUTHORIZING,
  AUTHORIZED,
  AUTH_ERROR,
  LOGOUT
} from "./ActionTypes";

const initState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  authorizing: false,
  token: localStorage.getItem("token")
};

export default function(state = initState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated:
          action.payload.user && action.payload.user.role === "admin",
        loading: false
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case AUTHORIZING:
      return {
        ...state,
        authorizing: true
      };
    case AUTHORIZED:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        authorizing: false
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        authorizing: false,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        authorizing: false,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    }
    default:
      return state;
  }
}
