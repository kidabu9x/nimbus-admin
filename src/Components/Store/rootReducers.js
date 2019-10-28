import { combineReducers } from "redux";
import auth from "./Auth/Reducer";
import courses from "./Courses/Reducer";
import course from "./Course/Reducer";
import courseQuizzes from "./CourseQuizzes/Reducer";
import courseQuizQuestions from "./CourseQuizQuestions/Reducer";
import notifications from "./Notifications/Reducer";
import members from "./Members/Reducer";

export default combineReducers({
  auth,
  courses,
  course,
  courseQuizzes,
  courseQuizQuestions,
  notifications,
  members
});
