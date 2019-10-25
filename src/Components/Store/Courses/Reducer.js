import {
  GET_COURSES,
  COURSES_LOADING,
  COURSE_CREATING,
  COURSE_CREATED
} from "./ActionTypes";

const initState = {
  courses: [],
  count: 0,
  loading: false,
  creating: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        ...action.payload,
        loading: false
      };

    case COURSES_LOADING:
      return {
        ...state,
        loading: true
      };
    case COURSE_CREATING:
      return {
        ...state,
        creating: true
      };
    case COURSE_CREATED:
      return {
        ...state,
        creating: false
      };
    default:
      return state;
  }
}
