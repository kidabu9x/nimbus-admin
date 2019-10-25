import {
  GET_QUIZZES,
  QUIZZES_LOADING,
  QUIZ_CREATING,
  QUIZ_DELETING,
  QUIZ_UPDATING,
  QUIZ_LOADING,
  GET_QUIZ
} from "./ActionTypes";

const initState = {
  quizzes: [],
  count: 0,
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  loadingOne: false,
  quiz: null
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_QUIZZES:
      return {
        ...state,
        ...action.payload,
        loading: false,
        creating: false,
        updating: false,
        deleting: false
      };
    case GET_QUIZ:
      return {
        ...state,
        ...action.payload,
        loadingOne: false
      };
    case QUIZZES_LOADING:
      return {
        ...state,
        loading: true
      };
    case QUIZ_LOADING:
      return {
        ...state,
        loadingOne: true
      };
    case QUIZ_UPDATING:
      return {
        ...state,
        updating: true
      };
    case QUIZ_CREATING:
      return {
        ...state,
        creating: true
      };
    case QUIZ_DELETING:
      return {
        ...state,
        deleting: true
      };
    default:
      return state;
  }
}
