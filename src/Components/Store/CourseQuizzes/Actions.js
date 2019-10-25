import Api from "../../../Api";
import {
  QUIZ_CREATING,
  QUIZZES_LOADING,
  QUIZ_DELETING,
  QUIZ_UPDATING,
  GET_QUIZZES,
  QUIZ_LOADING,
  GET_QUIZ
} from "./ActionTypes";

const apiUrl = "/courses/{course_id}";

const getEndPoint = courseId => {
  let endPoint = apiUrl.replace("{course_id}", courseId);
  return endPoint;
};

export const getQuizzes = () => async (dispatch, getState) => {
  const rootState = getState();
  const course = rootState.course.course;
  if (!course) return;
  dispatch({
    type: QUIZZES_LOADING
  });
  const courseQuizzes = rootState.courseQuizzes;
  let { quizzes, count } = courseQuizzes;
  const endPoint = getEndPoint(course._id);

  try {
    const result = await Api.get(`${endPoint}/quizzes`);
    if (result.status === 200) {
      quizzes = result.data.quizzes;
      count = result.data.count;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_QUIZZES,
    payload: {
      quizzes,
      count
    }
  });
};

export const getQuiz = (id) => async (dispatch, getState) => {
  const rootState = getState();
  const course = rootState.course.course;
  if (!course) return;
  dispatch({
    type: QUIZ_LOADING
  });
  const courseQuizzes = rootState.courseQuizzes;
  let { quiz } = courseQuizzes;
  const endPoint = getEndPoint(course._id);

  try {
    if (!quiz || [quiz._id, quiz.slug].indexOf(id) === -1) {
      const result = await Api.get(`${endPoint}/quizzes/${id}`);
      quiz = result.data.quiz;
    }

  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_QUIZ,
    payload: {
      quiz
    }
  });
};

export const createQuiz = quiz => async (dispatch, getState) => {
  dispatch({
    type: QUIZ_CREATING
  });

  const rootState = getState();
  const course = rootState.course.course;
  const courseQuizzes = rootState.courseQuizzes;
  let { quizzes, count } = courseQuizzes;
  const endPoint = getEndPoint(course._id);

  try {
    const result = await Api.post(`${endPoint}/quizzes`, quiz);
    const newQuiz = result.data.quiz;
    dispatch({
      type: GET_QUIZZES,
      payload: {
        quizzes: [...quizzes, newQuiz],
        count: count++
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuiz = quiz => async (dispatch, getState) => {
  dispatch({
    type: QUIZ_UPDATING
  });

  const rootState = getState();
  const course = rootState.course.course;
  const courseQuizzes = rootState.courseQuizzes;
  let { quizzes } = courseQuizzes;
  const endPoint = getEndPoint(course._id);

  try {
    const result = await Api.put(`${endPoint}/quizzes/${quiz._id}`, quiz);
    if (result.status === 200) {
      const updatedQuiz = result.data.quiz;
      const quizIndex = quizzes.findIndex(item => item._id === quiz._id);
      quizzes.splice(quizIndex, 1);
      quizzes.splice(quizIndex, 0, updatedQuiz);
      console.log(quizzes);
    }

  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_QUIZZES,
    payload: {
      quizzes: [...quizzes]
    }
  });
};

export const deleteQuiz = quiz => async (dispatch, getState) => {
  dispatch({
    type: QUIZ_DELETING
  });

  const rootState = getState();
  const course = rootState.course.course;
  const courseQuizzes = rootState.courseQuizzes;
  let { quizzes, count } = courseQuizzes;
  const endPoint = getEndPoint(course._id);

  try {
    await Api.delete(`${endPoint}/quizzes/${quiz._id}`);
    quizzes = quizzes.filter(e => e._id !== quiz._id);
    count = count - 1;
  } catch (error) {
    console.log(error);
  }
  dispatch({
    type: GET_QUIZZES,
    payload: {
      quizzes,
      count
    }
  });
};
