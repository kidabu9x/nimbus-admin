import {
  CODES_LOADING,
  GET_CODES,
  CODE_CREATING,
  CODE_UPDATING,
  CODE_DELETING,
  CODE_CREATED,
  SET_SEARCH_TERM,
  SET_PAGE
} from "./ActionTypes";

const initState = {
  codes: [],
  count: 0,
  page: 1,
  limit: 4,
  searchTerm: "",
  loading: false,
  creating: false,
  deleting: false,
  updating: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_CODES:
      return {
        ...state,
        ...action.payload,
        loading: false,
        creating: false,
        deleting: false,
        updating: false
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload.page
      };
    case CODES_LOADING:
      return {
        ...state,
        loading: true
      };

    case CODE_CREATING:
      return {
        ...state,
        creating: true
      };
    case CODE_CREATED:
      return {
        ...state,
        creating: false
      };
    case CODE_DELETING:
      return {
        ...state,
        deleting: true
      };
    case CODE_UPDATING:
      return {
        ...state,
        updating: true
      };
    default:
      return state;
  }
}
