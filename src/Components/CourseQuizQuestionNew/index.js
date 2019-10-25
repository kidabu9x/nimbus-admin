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
  createQuestion
} from "../Store/CourseQuizQuestions/Actions";
import {
  pushNotification
} from "../Store/Notifications/Actions";

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
  state = {
    question: {
      question: "",
      answers: [],
      description: "",
      appearance: "random",
      type: "multiple_choices",
      enable_shuffle_answers: true,
    }
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

  onCreate = async () => {
    const {
      course,
      quiz,
      createQuestion,
      pushNotification
    } = this.props;
    await createQuestion(this.state.question);
    pushNotification("Tạo khoá học thành công", {
      variant: "success"
    });
    this.props.history.push(`/khoa-hoc/${course.slug}/trac-nghiem/${quiz.slug}/bo-cau-hoi`);
  }


  async componentDidMount() {
    await this.props.getCourse(this.props.match.params.id);
    this.props.getQuiz(this.props.match.params.quiz_id);
    this.addNewAnswer();
  }

  render() {
    const {
      course,
      quiz,
      loading,
      creating
    } = this.props;
    const {
      question,
    } = this.state;
    return (
      <Fragment>
        <Header course={course} quiz={quiz} loading={loading} />
        <Body
          course={course}
          quiz={quiz}
          question={question}
          creating={creating}
          onCreate={this.onCreate}
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
