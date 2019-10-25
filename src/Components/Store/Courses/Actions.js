import Api from "../../../Api";
import {
  GET_COURSES,
  COURSES_LOADING,
  COURSE_CREATING,
  COURSE_CREATED
} from "./ActionTypes";

const apiUrl = "/courses";

export const getCourses = () => async dispatch => {
  dispatch({
    type: COURSES_LOADING
  });

  try {
    const result = await Api.get(apiUrl);
    let courses = [];
    let count = 0;
    if (result.status === 200) {
      courses = result.data.courses;
      count = result.data.count;
    }

    dispatch({
      type: GET_COURSES,
      payload: {
        courses,
        count
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = course => async dispatch => {
  dispatch({
    type: COURSE_CREATING
  });

  try {
    await Api.post(apiUrl, course);
  } catch (error) {
    console.log(error);
  }
  dispatch({
    type: COURSE_CREATED
  });
  return;
};
