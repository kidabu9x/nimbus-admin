import Api from "../../../Api";
import {
  GET_CODES,
  CODES_LOADING,
  CODE_CREATING,
  CODE_CREATED,
  CODE_DELETING,
  CODE_UPDATING,
  SET_SEARCH_TERM,
  SET_PAGE
} from "./ActionTypes";

const apiUrl = "/course-codes";

export const getCodes = () => async (dispatch, getState) => {
  dispatch({
    type: CODES_LOADING
  });
  const rootState = getState();
  const { searchTerm, page, limit } = rootState.courseCodes;
  let query = {};
  if (searchTerm) query.search = searchTerm;
  query.page = page;
  query.limit = limit;

  try {
    const result = await Api.get(apiUrl, {
      params: query
    });
    let codes = [];
    let count = 0;
    if (result.status === 200) {
      codes = result.data.courseCodes;
      count = result.data.count;
    }

    dispatch({
      type: GET_CODES,
      payload: {
        codes,
        count
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const createCode = code => async dispatch => {
  dispatch({
    type: CODE_CREATING
  });

  try {
    await Api.post(apiUrl, code);
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: CODE_CREATED
  });
};

export const updateCode = code => async (dispatch, getState) => {
  dispatch({
    type: CODE_UPDATING
  });
  const rootState = getState();
  let { codes, count } = rootState.courseCodes;
  try {
    const result = await Api.put(`${apiUrl}/${code._id}`, code);
    if (result.status === 200) {
      const index = codes.findIndex(e => e._id === code._id);
      codes.splice(index, 1);
      codes.splice(index, 0, code);
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_CODES,
    payload: {
      codes: [...codes],
      count
    }
  });
};

export const deleteCode = codeId => async (dispatch, getState) => {
  dispatch({
    type: CODE_DELETING
  });
  const rootState = getState();
  let { codes, count } = rootState.courseCodes;
  try {
    const result = await Api.delete(`${apiUrl}/${codeId}`);
    if (result.status === 200) {
      const index = codes.findIndex(code => code._id === codeId);
      codes.splice(index, 1);
      count = count - 1;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_CODES,
    payload: {
      codes,
      count
    }
  });
};

export const setSearchTerm = searchTerm => async dispatch => {
  dispatch({
    type: SET_SEARCH_TERM,
    payload: {
      searchTerm
    }
  });
};

export const setPage = page => async dispatch => {
  dispatch({
    type: SET_PAGE,
    payload: {
      page
    }
  });
};
