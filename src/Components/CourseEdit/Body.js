import React, { Component, Fragment } from "react";
import Skeleton from "./components/Skeleton";
import Course from "./components/Course";

class Body extends Component {
  render() {
    const {
      course,
      loading,
      updating,
      uploadingImg,
      saveCourse,
      updateCourseValue,
      updateCourseThumbnail,
      deleteCourse,
    } = this.props;
    if (loading || !course) {
      return <Skeleton />;
    } else {
      return (
        <Fragment>
          <Course
            course={course}
            updating={updating}
            uploadingImg={uploadingImg}
            saveCourse={saveCourse}
            updateCourseValue={updateCourseValue}
            updateCourseThumbnail={updateCourseThumbnail}
            deleteCourse={deleteCourse}
          />
        </Fragment>
      );
    }
  }
}

export default Body;
