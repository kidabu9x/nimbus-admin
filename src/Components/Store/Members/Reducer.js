import {
  MEMBERS_LOADING,
  GET_MEMBERS,
  MEMBER_CREATING,
  MEMBER_DELETING,
  SEARCH_USERS,
  USERS_SEARCHING
} from "./ActionTypes";

const initState = {
  members: [],
  count: 0,
  loading: false,
  creating: false,
  deleting: false,
  users: [],
  searching: false
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        creating: false,
        deleting: false
      };

    case MEMBERS_LOADING:
      return {
        ...state,
        loading: true
      };

    case MEMBER_CREATING:
      return {
        ...state,
        creating: true
      };

    case MEMBER_DELETING:
      return {
        ...state,
        deleting: true
      };

    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload.users,
        searching: false
      };

    case USERS_SEARCHING:
      return {
        ...state,
        searching: true
      };

    default:
      return state;
  }
}
