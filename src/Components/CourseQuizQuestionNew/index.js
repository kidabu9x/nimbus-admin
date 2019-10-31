import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { getCourse } from "../Store/Course/Actions";
import { getQuiz } from "../Store/CourseQuizzes/Actions";
import { createQuestion } from "../Store/CourseQuizQuestions/Actions";
import { pushNotification } from "../Store/Notifications/Actions";

const mapStateToProps = state => ({
  course: state.course.course,
  quiz: state.courseQuizzes.quiz,
  loading: state.courseQuizzes.loadingOne,
  creating: state.courseQuizQuestions.creating
});

const mapDispatchToProps = {
  getCourse,
  getQuiz,
  createQuestion,
  pushNotification
};

class CourseQuizQuestions extends Component {
  removeAnswer = index => {
    let question = this.state.question;
    question.answers.splice(index, 1);
    this.setState({
      question
    });
  };

  updateQuestionField = data => {
    this.setState({
      question: {
        ...this.state.question,
        ...data
      }
    });
  };

  onCreate = async question => {
    const {
      course,
      quiz,
      createQuestion,
      pushNotification,
      history
    } = this.props;
    await createQuestion(question);
    pushNotification("Đã tạo câu hỏi", {
      variant: "success"
    });
    history.push(
      `/khoa-hoc/${course.slug}/trac-nghiem/${quiz.slug}/bo-cau-hoi`
    );
  };

  async componentDidMount() {
    const { getCourse, getQuiz, match } = this.props;
    await getCourse(match.params.id);
    getQuiz(match.params.quiz_id);
  }

  render() {
    const { course, quiz, loading, creating } = this.props;
    return (
      <Fragment>
        <Header course={course} quiz={quiz} loading={loading} />
        <Body
          course={course}
          quiz={quiz}
          creating={creating}
          onCreate={this.onCreate}
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
