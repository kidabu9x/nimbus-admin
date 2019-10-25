import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { getCourse } from "../Store/Course/Actions";
import {
  getQuiz
} from "../Store/CourseQuizzes/Actions";
import {
  updateQuestion,
  getQuestion,
  deleteQuestion
} from "../Store/CourseQuizQuestions/Actions";
import {
  pushNotification
} from "../Store/Notifications/Actions";

const mapStateToProps = state => ({
  course: state.course.course,
  quiz: state.courseQuizzes.quiz,
  loading: state.courseQuizQuestions.loadingOne,
  question: state.courseQuizQuestions.question,
  updating: state.courseQuizQuestions.updating,
  deleting: state.courseQuizQuestions.deleting,
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
  state = {
    question: null
  };

  addNewAnswer = () => {
    let question = this.state.question;
    question.answers.push({
      id: null,
      answer: "",
      description: "",
      is_correct: false
    });
    this.setState({
      question
    });
  }

  removeAnswer = (index) => {
    let question = this.state.question;
    question.answers.splice(index, 1);
    this.setState({
      question
    });
  }

  updateQuestionField = (data) => {
    this.setState({
      question: {
        ...this.state.question,
        ...data
      }
    });
  }

  onSave = async () => {
    const {
      course,
      quiz,
      updateQuestion,
      pushNotification
    } = this.props;
    await updateQuestion(this.state.question);
    pushNotification("Đã lưu câu hỏi", {
      variant: "success"
    });
    this.props.history.push(`/khoa-hoc/${course.slug}/trac-nghiem/${quiz.slug}/bo-cau-hoi`);
  }

  onDelete = async () => {
    const {
      course,
      quiz,
      deleteQuestion,
      pushNotification
    } = this.props;
    await deleteQuestion();
    pushNotification("Đã xoá câu hỏi", {
      variant: "success"
    });
    this.props.history.push(`/khoa-hoc/${course.slug}/trac-nghiem/${quiz.slug}/bo-cau-hoi`);
  }

  async componentDidMount() {
    await this.props.getCourse(this.props.match.params.id);
    await this.props.getQuiz(this.props.match.params.quiz_id);
    await this.props.getQuestion(this.props.match.params.question_id);
    this.setState({
      question: this.props.question
    });
  }

  render() {
    const {
      course,
      quiz,
      loading,
      updating,
      deleting
    } = this.props;
    const {
      question
    } = this.state;
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
          updateQuestionField={this.updateQuestionField}
          addNewAnswer={this.addNewAnswer}
          removeAnswer={this.removeAnswer}
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
