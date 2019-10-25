import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { getCourse } from "../Store/Course/Actions";
import { getQuiz } from "../Store/CourseQuizzes/Actions";
import { getQuestions, setPage, setSearch } from "../Store/CourseQuizQuestions/Actions";

const mapStateToProps = state => ({
  course: state.course.course,
  quiz: state.courseQuizzes.quiz,
  loading: state.courseQuizQuestions.loading,
  questions: state.courseQuizQuestions.questions,
  count: state.courseQuizQuestions.count,
  limit: state.courseQuizQuestions.limit,
  page: state.courseQuizQuestions.page,
  search: state.courseQuizQuestions.search,
});

const mapDispatchToProps = {
  getCourse,
  getQuiz,
  getQuestions,
  setPage,
  setSearch
};

class CourseQuizQuestions extends Component {
  state = {
    showSnackbar: false,
    snackbarMsg: "",
    uploadingImg: false,
    newQuiz: false
  };

  async componentDidMount() {
    await this.props.getCourse(this.props.match.params.id);
    await this.props.getQuiz(this.props.match.params.quiz_id);
    this.props.getQuestions();
  }

  handlePageChange = (page) => {
    this.props.setPage(page);
    this.props.getQuestions();
  }

  handleSearchChange = (search) => {
    this.props.setSearch(search);
    this.props.setPage(1);
    this.props.getQuestions();
  }

  render() {
    const {
      course,
      quiz,
      loading,
      questions,
      page,
      limit,
      count,
      search
    } = this.props;
    return (
      <Fragment>
        <Header
          course={course}
          quiz={quiz}
          loading={loading} />
        <Body
          course={course}
          quiz={quiz}
          loading={loading}
          questions={questions}
          page={page}
          limit={limit}
          count={count}
          search={search}
          handleSearchChange={this.handleSearchChange}
          handlePageChange={this.handlePageChange}
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
