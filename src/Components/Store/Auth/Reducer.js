import {
  USER_LOADING,
  USER_LOADED,
  AUTHORIZING,
  AUTHORIZED,
  AUTH_ERROR
} from "./ActionTypes";

const initState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  authorizing: false,
  token: localStorage.getItem("token")
};

export default function (state = initState, action) {
  switch (action.type) {
    case USER_LOADED:
      const { user } = action.payload;
      return {
        ...state,
        user: user,
        isAuthenticated: user && user.role === "admin",
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
      const { token } = action.payload;
      localStorage.setItem("token", token);
      return {
        ...state,
        token: token,
        authorizing: false
      };
    case AUTH_ERROR:
      // localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        authorizing: false,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
