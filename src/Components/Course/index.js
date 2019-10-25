import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import { getCourse } from "../Store/Course/Actions";

const mapStateToProps = state => ({
  course: state.course.course,
  loading: state.course.loading
});

const mapDispatchToProps = {
  getCourse
};

class Course extends Component {
  componentDidMount() {
    this.props.getCourse(this.props.match.params.id);
  }
  render() {
    const { course, loading } = this.props;
    return (
      <Fragment>
        <Header course={course} loading={loading} />
        <Body course={course} loading={loading} />
        <Footer />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Course));
