import Api from "../../../Api";
import {
  MEMBERS_LOADING,
  GET_MEMBERS,
  SEARCH_USERS,
  USERS_SEARCHING,
  MEMBER_CREATING,
  MEMBER_DELETING
} from "./ActionTypes";

const apiUrl = "/roles";

export const getMembers = () => async (dispatch) => {
  dispatch({
    type: MEMBERS_LOADING
  });
  let members = [];
  let count = 0;

  try {
    const result = await Api.get(apiUrl);
    if (result.status === 200) {
      members = result.data.roles;
      count = result.data.count;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_MEMBERS,
    payload: {
      members,
      count
    }
  });
};

export const createMember = (userId) => async (dispatch, getState) => {
  dispatch({
    type: MEMBER_CREATING
  });
  const rootState = getState();
  let { members, count } = rootState.members;

  try {
    const result = await Api.post(apiUrl, {
      user_id: userId
    });
    if (result.status === 201) {
      const role = result.data.role;
      members = [...members, role];
      count = count + 1;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_MEMBERS,
    payload: {
      members,
      count
    }
  });
};

export const deleteMember = (userId) => async (dispatch, getState) => {
  dispatch({
    type: MEMBER_DELETING
  });
  const rootState = getState();
  let { members, count } = rootState.members;

  try {
    const result = await Api.delete(`${apiUrl}/${userId}`);
    if (result.status === 200) {
      members = members.filter(member => member._id !== userId);
      count = count - 1;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_MEMBERS,
    payload: {
      members,
      count
    }
  });
};

export const searchUsers = (search) => async (dispatch, getState) => {
  dispatch({
    type: USERS_SEARCHING
  });

  const rootState = getState();
  const members = rootState.members.members;

  let users = [];
  try {
    const result = await Api.get(`/users`, {
      params: {
        search: search,
        exclude_ids: members.map(member => member.user_id._id),
        limit: 5
      }
    });
    if (result.status === 200) {
      users = result.data.users;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: SEARCH_USERS,
    payload: {
      users
    }
  });
}
