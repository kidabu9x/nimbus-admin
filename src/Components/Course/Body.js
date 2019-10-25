import React, { Component } from "react";
import Skeleton from "./components/Skeleton";
import Course from "./components/Course";

class Body extends Component {
  render() {
    const { course, loading } = this.props;
    if (loading || !course) {
      return <Skeleton />;
    } else {
      return <Course course={course} />;
    }
  }
}

export default Body;
