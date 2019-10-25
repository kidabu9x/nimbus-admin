import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Courses from "./Components/Courses";
import Course from "./Components/Course";
import CourseEdit from "./Components/CourseEdit";
import CourseQuizzes from "./Components/CourseQuizzes";
import CourseQuizQuestions from "./Components/CourseQuizQuestions";
import CourseQuizQuestionNew from "./Components/CourseQuizQuestionNew";
import CourseQuizQuestion from "./Components/CourseQuizQuestion";
import CourseNew from "./Components/CourseNew";

import Notification from "./Components/Common/classes/Notification";

import store from "./Components/Store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" render={() => <div>Trang chủ</div>}></Route>
              <Route exact path="/khoa-hoc">
                <Courses />
              </Route>
              <Route exact path="/khoa-hoc/:id">
                <Course />
              </Route>
              <Route exact path="/khoa-hoc/:id/chinh-sua">
                <CourseEdit />
              </Route>
              <Route exact path="/khoa-hoc/:id/trac-nghiem">
                <CourseQuizzes />
              </Route>
              <Route exact path="/khoa-hoc/:id/trac-nghiem/:quiz_id/bo-cau-hoi">
                <CourseQuizQuestions />
              </Route>
              <Route exact path="/khoa-hoc/:id/trac-nghiem/:quiz_id/bo-cau-hoi/tao-cau-hoi">
                <CourseQuizQuestionNew />
              </Route>
              <Route exact path="/khoa-hoc/:id/trac-nghiem/:quiz_id/bo-cau-hoi/:question_id">
                <CourseQuizQuestion />
              </Route>
              <Route exact path="/khoa-hoc-moi">
                <CourseNew />
              </Route>
            </Switch>
          </Layout>
        </Router>

        <Notification />
      </Provider>
    );
  }
}

export default App;
