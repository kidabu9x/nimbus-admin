import {
  GET_COURSE,
  COURSE_LOADING,
  SET_COURSE,
  COURSE_UPDATING,
  COURSE_DELETING
} from "./ActionTypes";

const initState = {
  course: null,
  loading: false,
  updating: false,
  deleting: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_COURSE:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case COURSE_LOADING:
      return {
        ...state,
        loading: true
      };

    case COURSE_UPDATING:
      return {
        ...state,
        updating: true
      };

    case COURSE_DELETING:
      return {
        ...state,
        deleting: true
      };

    case SET_COURSE:
      return {
        ...state,
        ...action.payload,
        loading: false,
        updating: false,
        deleting: false
      };
    default:
      return state;
  }
}
