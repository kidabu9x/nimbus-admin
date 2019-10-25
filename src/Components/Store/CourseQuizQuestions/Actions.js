import Api from "../../../Api";
import {
  QUESTION_CREATING,
  QUESTIONS_LOADING,
  GET_QUESTIONS,
  GET_QUESTION,
  QUESTION_LOADING,
  QUESTION_UPDATING,
  SET_PAGE,
  SET_SEARCH_TERM,
  QUESTION_DELETING
} from "./ActionTypes";

const apiUrl = "/courses/{course_id}/quizzes/{quiz_id}/questions";

const getEndPoint = (courseId, quizId) => {
  let endPoint = apiUrl.replace("{course_id}", courseId);
  endPoint = endPoint.replace("{quiz_id}", quizId);
  return endPoint;
};

export const getQuestions = () => async (dispatch, getState) => {
  dispatch({
    type: QUESTIONS_LOADING
  });

  const rootState = getState();
  const course = rootState.course.course;
  const quiz = rootState.courseQuizzes.quiz;
  let { questions, count, page, limit, search } = rootState.courseQuizQuestions;
  const endPoint = getEndPoint(course._id, quiz._id);
  const query = {};
  if (page > 1) query.page = page;
  if (search) query.search = search;
  query.limit = limit;

  try {
    const result = await Api.get(`${endPoint}`, {
      params: query
    });
    if (result.status === 200) {
      questions = result.data.questions;
      count = result.data.count;
    } else {
      questions = [];
      count = 0;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_QUESTIONS,
    payload: {
      questions,
      count
    }
  });
};

export const getQuestion = (id) => async (dispatch, getState) => {
  dispatch({
    type: QUESTION_LOADING
  });

  const rootState = getState();
  const course = rootState.course.course;
  const quiz = rootState.courseQuizzes.quiz;
  let { question } = rootState.courseQuizQuestions;
  const endPoint = getEndPoint(course._id, quiz._id);
  try {
    if (!question || [question._id].indexOf(id) === -1) {
      const result = await Api.get(`${endPoint}/${id}`);
      if (result.status === 200) {
        question = result.data.question;
      }
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_QUESTION,
    payload: {
      question
    }
  });
};

export const updateQuestion = editedQuestion => async (dispatch, getState) => {
  dispatch({
    type: QUESTION_UPDATING
  });

  const rootState = getState();
  const course = rootState.course.course;
  const quiz = rootState.courseQuizzes.quiz;
  let { question } = rootState.courseQuizQuestions;
  const endPoint = getEndPoint(course._id, quiz._id);

  try {
    const result = await Api.put(`${endPoint}/${question._id}`, editedQuestion);
    if (result.status === 200) {
      question = result.data.question;
    }
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: GET_QUESTION,
    payload: {
      question
    }
  });
};

export const createQuestion = question => async (dispatch, getState) => {
  dispatch({
    type: QUESTION_CREATING
  });

  const rootState = getState();
  const course = rootState.course.course;
  const quiz = rootState.courseQuizzes.quiz;
  const endPoint = getEndPoint(course._id, quiz._id);

  try {
    await Api.post(`${endPoint}`, question);
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = () => async (dispatch, getState) => {
  const rootState = getState();
  const course = rootState.course.course;
  const quiz = rootState.courseQuizzes.quiz;
  const question = rootState.courseQuizQuestions.question;
  const endPoint = getEndPoint(course._id, quiz._id);
  if (!question) return null;
  dispatch({
    type: QUESTION_DELETING
  });

  try {
    const result = await Api.delete(`${endPoint}/${question._id}`);
    if (result.status === 200) {
      dispatch({
        type: GET_QUESTION,
        payload: {
          question: null
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

};

export const setPage = page => async (dispatch) => {
  dispatch({
    type: SET_PAGE,
    payload: {
      page
    }
  });
};

export const setSearch = search => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TERM,
    payload: {
      search
    }
  });
};