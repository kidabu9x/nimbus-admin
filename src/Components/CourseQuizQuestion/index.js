import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { getCourse } from "../Store/Course/Actions";
import { getQuiz } from "../Store/CourseQuizzes/Actions";
import {
  updateQuestion,
  getQuestion,
  deleteQuestion
} from "../Store/CourseQuizQuestions/Actions";
import { pushNotification } from "../Store/Notifications/Actions";

const mapStateToProps = state => ({
  course: state.course.course,
  quiz: state.courseQuizzes.quiz,
  loading: state.courseQuizQuestions.loadingOne,
  question: state.courseQuizQuestions.question,
  updating: state.courseQuizQuestions.updating,
  deleting: state.courseQuizQuestions.deleting
});

const mapDispatchToProps = {
  getCourse,
  getQuiz,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  pushNotification
};

class CourseQuizQuestions extends Component {
  onSave = async question => {
    const {
      course,
      quiz,
      updateQuestion,
      pushNotification,
      history
    } = this.props;
    await updateQuestion(question);
    pushNotification("Đã lưu câu hỏi", {
      variant: "success"
    });
    history.push(
      `/khoa-hoc/${course.slug}/trac-nghiem/${quiz.slug}/bo-cau-hoi`
    );
  };

  onDelete = async () => {
    const {
      course,
      quiz,
      deleteQuestion,
      pushNotification,
      history
    } = this.props;
    await deleteQuestion();
    pushNotification("Đã xoá câu hỏi", {
      variant: "success"
    });
    history.push(
      `/khoa-hoc/${course.slug}/trac-nghiem/${quiz.slug}/bo-cau-hoi`
    );
  };

  async componentDidMount() {
    const { getCourse, getQuiz, getQuestion, match } = this.props;
    await getCourse(match.params.id);
    await getQuiz(match.params.quiz_id);
    await getQuestion(match.params.question_id);
  }

  render() {
    const { course, quiz, question, loading, updating, deleting } = this.props;
    return (
      <Fragment>
        <Header course={course} quiz={quiz} loading={loading} />
        <Body
          course={course}
          quiz={quiz}
          question={question}
          updating={updating}
          onSave={this.onSave}
          deleting={deleting}
          onDelete={this.onDelete}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CourseQuizQuestions));
