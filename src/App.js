import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Layout
import Layout from "./Layout";

// Components
import Homepage from "./Components/Homepage";
import Courses from "./Components/Courses";
import Course from "./Components/Course";
import CourseEdit from "./Components/CourseEdit";
import CourseQuizzes from "./Components/CourseQuizzes";
import CourseQuizQuestions from "./Components/CourseQuizQuestions";
import CourseQuizQuestionNew from "./Components/CourseQuizQuestionNew";
import CourseQuizQuestion from "./Components/CourseQuizQuestion";
import CourseNew from "./Components/CourseNew";
import CourseCodes from "./Components/CourseCodes";
import CourseCodeNew from "./Components/CourseCodeNew";
import Members from "./Components/Members";
import Login from "./Components/Login";
import Forbidden from "./Components/Forbidden";

// Global classes
import Notification from "./Components/Common/classes/Notification";
import Protected from "./Components/Common/classes/Protected";

// Redux
import store from "./Components/Store";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/dang-nhap" render={() => <Login />} />
            <Route exact path="/403" render={() => <Forbidden />} />
          </Switch>

          <Protected>
            <Layout>
              <Switch>
                <Route exact path="/" render={() => <Homepage />} />
                <Route exact path="/khoa-hoc" render={() => <Courses />} />
                <Route
                  exact
                  path="/khoa-hoc/khoa-hoc-moi"
                  render={() => <CourseNew />}
                />
                <Route exact path="/khoa-hoc/:id" render={() => <Course />} />
                <Route
                  exact
                  path="/khoa-hoc/:id/chinh-sua"
                  render={() => <CourseEdit />}
                />
                <Route
                  exact
                  path="/khoa-hoc/:id/trac-nghiem"
                  render={() => <CourseQuizzes />}
                />

                <Route
                  exact
                  path="/khoa-hoc/:id/trac-nghiem/:quiz_id/bo-cau-hoi"
                  render={() => <CourseQuizQuestions />}
                />
                <Route
                  exact
                  path="/khoa-hoc/:id/trac-nghiem/:quiz_id/bo-cau-hoi/tao-cau-hoi"
                  render={() => <CourseQuizQuestionNew />}
                />
                <Route
                  exact
                  path="/khoa-hoc/:id/trac-nghiem/:quiz_id/bo-cau-hoi/:question_id"
                  render={() => <CourseQuizQuestion />}
                />
                <Route exact path="/thanh-vien" render={() => <Members />} />
                <Route
                  exact
                  path="/ma-trac-nghiem"
                  render={() => <CourseCodes />}
                />
                <Route
                  exact
                  path="/ma-trac-nghiem/ma-trac-nghiem-moi"
                  render={() => <CourseCodeNew />}
                />
              </Switch>
            </Layout>
          </Protected>
        </Router>

        <Notification />
      </Fragment>
    );
  }
}

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
