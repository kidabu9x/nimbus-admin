import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { getCourse } from "../Store/Course/Actions";
import {
  createQuiz,
  getQuizzes,
  deleteQuiz,
  updateQuiz
} from "../Store/CourseQuizzes/Actions";
import {
  pushNotification
} from "../Store/Notifications/Actions";

const mapStateToProps = state => ({
  course: state.course.course,
  quizzes: state.courseQuizzes.quizzes,
  creating: state.courseQuizzes.creating,
  loading: state.courseQuizzes.loading,
  deleting: state.courseQuizzes.deleting
});

const mapDispatchToProps = {
  getCourse,
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  pushNotification
};

class Course extends Component {
  state = {
    uploadingImg: false,
    newQuiz: false
  };

  toggleNewQuiz = () => {
    this.setState({
      newQuiz: !this.state.newQuiz
    });
  };

  onCreate = async quiz => {
    await this.props.createQuiz(quiz);
    this.props.pushNotification(`Đã tạo '${quiz.title}'`, {
      variant: "success"
    });
    this.toggleNewQuiz();
  };

  onUpdate = async quiz => {
    await this.props.updateQuiz(quiz);
    this.props.pushNotification(`Đã lưu '${quiz.title}'`, {
      variant: "success"
    });
  };

  onDelete = async quiz => {
    await this.props.deleteQuiz(quiz);
    this.props.pushNotification(`Đã xóa '${quiz.title}'`, {
      variant: "success"
    });
  };

  async componentDidMount() {
    await this.props.getCourse(this.props.match.params.id);
    this.props.getQuizzes();
  }

  render() {
    const {
      course,
      creating,
      loading,
      updating,
      deleting,
      quizzes
    } = this.props;
    const { newQuiz } = this.state;
    return (
      <Fragment>
        <Header course={course} />
        <Body
          showNewQuiz={newQuiz}
          creating={creating}
          loading={loading}
          updating={updating}
          deleting={deleting}
          quizzes={quizzes}
          onCreate={this.onCreate}
          onUpdate={this.onUpdate}
          onCancel={this.toggleNewQuiz}
          onDelete={this.onDelete}
        />
        <Footer showNewQuiz={newQuiz} onCreate={this.toggleNewQuiz} />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Course));
