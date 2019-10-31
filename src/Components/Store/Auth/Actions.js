import Api from "../../../Api";
import {
  USER_LOADED,
  USER_LOADING,
  AUTHORIZING,
  AUTHORIZED,
  AUTH_ERROR,
  LOGOUT
} from "./ActionTypes";

const apiUrl = "/auth";

export const authGoogle = gToken => async dispatch => {
  dispatch({
    type: AUTHORIZING
  });

  try {
    const result = await Api.post(`${apiUrl}/google`, {
      token: gToken
    });
    if (result.status === 200) {
      dispatch({
        type: AUTHORIZED,
        payload: {
          token: result.headers.authorization
        }
      });
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const auth = () => async dispatch => {
  dispatch({
    type: USER_LOADING
  });
  let user = null;

  try {
    const result = await Api.post(`${apiUrl}`);
    if (result.status === 200) {
      user = result.data.user;
    }
    dispatch({
      type: USER_LOADED,
      payload: {
        user
      }
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const logout = opts => dispatch => {
  dispatch({
    type: LOGOUT
  });

  opts = opts || {};
  if (typeof opts.reload !== "boolean") opts.reload = true;

  if (opts.reload) {
    window.location.reload();
  }
};
