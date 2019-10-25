import React, { Component } from "react";
import Skeleton from "./components/Skeleton";
import Courses from "./components/Courses";

const View = props => {
  const { loading, courses } = props;
  if (loading) {
    return <Skeleton />;
  }
  return <Courses courses={courses} />;
};

class Body extends Component {
  render() {
    const { loading, courses } = this.props;
    return <View loading={loading} courses={courses} />;
  }
}

export default Body;
