import React, { Fragment } from "react";

import Form from "./components/Form";

export default function Body(props) {
  const {
    course,
    creating,
    uploadingImg,
    updateCourseValue,
    updateCourseThumbnail,
    createCourse,
  } = props;

  return (
    <Fragment>
      <Form
        course={course}
        creating={creating}
        uploadingImg={uploadingImg}
        updateCourseValue={updateCourseValue}
        updateCourseThumbnail={updateCourseThumbnail}
        createCourse={createCourse}
      />
    </Fragment>
  );
}
