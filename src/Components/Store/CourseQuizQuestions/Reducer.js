import {
  QUESTION_CREATING,
  QUESTIONS_LOADING,
  GET_QUESTIONS,
  GET_QUESTION,
  QUESTION_LOADING,
  SET_PAGE,
  SET_SEARCH_TERM,
  QUESTION_DELETING,
  QUESTION_UPDATING
} from "./ActionTypes";

const initState = {
  questions: [],
  limit: 5,
  page: 1,
  search: "",
  count: 0,
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  loadingOne: false,
  question: null
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case QUESTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUESTION:
      return {
        ...state,
        ...action.payload,
        loadingOne: false,
        updating: false,
        deleting: false
      };
    case QUESTION_LOADING:
      return {
        ...state,
        loadingOne: true
      };
    case QUESTION_CREATING:
      return {
        ...state,
        creating: true
      };
    case QUESTION_DELETING:
      return {
        ...state,
        deleting: true
      };
    case QUESTION_UPDATING:
      return {
        ...state,
        updating: true
      };
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload.page
      }
    }
    case SET_SEARCH_TERM: {
      return {
        ...state,
        search: action.payload.search
      }
    }
    default:
      return state;
  }
}
