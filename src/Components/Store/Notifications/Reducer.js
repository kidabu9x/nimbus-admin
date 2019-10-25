import {
  PUSH_NOTIFICATION,
  CLOSE_NOTIFICATION
} from "./ActionTypes";

const initState = {
  open: false,
  variant: 'info',
  message: null,
  duration: 2000
};

export default function (state = initState, action) {
  switch (action.type) {
    case PUSH_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
        open: true
      };

    case CLOSE_NOTIFICATION:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
