import Api from "../../../Api";
import {
  GET_COURSE,
  COURSE_LOADING,
  SET_COURSE,
  COURSE_UPDATING,
  COURSE_DELETING
} from "./ActionTypes";

const apiUrl = "/courses";

export const getCourse = id => async (dispatch, getState) => {
  dispatch({
    type: COURSE_LOADING
  });
  const state = getState().course;
  let course = state.course;

  try {
    if (!course || [course.slug, course._id].indexOf(id) === -1) {
      const result = await Api.get(`${apiUrl}/${id}`);
      if (result.status === 200) {
        course = result.data.course;
      }
    }

    dispatch({
      type: GET_COURSE,
      payload: {
        course
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const setCourse = course => dispatch => {
  dispatch({
    type: SET_COURSE,
    payload: {
      course
    }
  });
};

export const updateCourse = () => async (dispatch, getState) => {
  dispatch({
    type: COURSE_UPDATING
  });

  const state = getState().course;
  let { course } = state;

  try {
    const result = await Api.put(`${apiUrl}/${course._id}`, course);
    course = result.data.course;
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: SET_COURSE,
    course
  });
};

export const deleteCourse = () => async (dispatch, getState) => {
  dispatch({
    type: COURSE_DELETING
  });

  const state = getState().course;
  let { course } = state;

  try {
    const result = await Api.delete(`${apiUrl}/${course._id}`);
    course = result.data.course;
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: SET_COURSE,
    course
  });
};
