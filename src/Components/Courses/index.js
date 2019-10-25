import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { getCourses } from "../Store/Courses/Actions";

const useStyles = theme => ({
  root: {
    position: "relative",
    height: "100%",
    flex: 1
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
});

class Courses extends Component {
  static propTypes = {
    getCourses: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    const { classes, loading, courses } = this.props;
    return (
      <div className={classes.root}>
        <Header />
        <Body loading={loading} courses={courses} />
        <Footer classes={classes} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses.courses,
  loading: state.courses.loading
});

const mapDispatchToProps = {
  getCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Courses));
