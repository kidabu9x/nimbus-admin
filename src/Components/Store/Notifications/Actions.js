import {
  PUSH_NOTIFICATION,
  CLOSE_NOTIFICATION
} from "./ActionTypes";

export const pushNotification = (msg, opts) => dispatch => {
  if (!msg) return null;

  opts = opts || {};
  opts.variant = opts.variant || "info";
  opts.duration = !isNaN(opts.duration) ? Number(opts.duration) : 2000;
  dispatch({
    type: PUSH_NOTIFICATION,
    payload: {
      message: msg,
      ...opts
    }
  });
};

export const closeNotification = () => dispatch => {
  dispatch({
    type: CLOSE_NOTIFICATION
  });
}
