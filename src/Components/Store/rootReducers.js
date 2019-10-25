import { combineReducers } from "redux";
import courses from "./Courses/Reducer";
import course from "./Course/Reducer";
import courseQuizzes from "./CourseQuizzes/Reducer";
import courseQuizQuestions from "./CourseQuizQuestions/Reducer";
import notifications from "./Notifications/Reducer";

export default combineReducers({
  courses,
  course,
  courseQuizzes,
  courseQuizQuestions,
  notifications
});
