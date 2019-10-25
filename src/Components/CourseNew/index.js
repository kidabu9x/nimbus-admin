import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import { createCourse } from "../Store/Courses/Actions";
import { uploadImage } from "../Store/Image/Actions";
import { pushNotification } from "../Store/Notifications/Actions";

const mapStateToProps = state => ({
  creating: state.courses.creating
});

const mapDispatchToProps = {
  createCourse,
  pushNotification
};

class NewCourse extends Component {
  state = {
    course: {
      title: "Khóa học mới",
      price: 350000,
      compare_at_price: 1000000,
      thumbnail:
        "https://res.cloudinary.com/nimbus-education/image/upload/v1542702968/study-skills-assessments.jpg"
    },
    uploadingImg: false,
  };

  onCreate = async () => {
    await this.props.createCourse(this.state.course);
    this.props.pushNotification("Đã tạo khoá học", {
      variant: "success"
    });
    this.props.history.push("/khoa-hoc");
  };

  updateCourseValue = field => e => {
    this.setState({
      course: {
        ...this.state.course,
        [field]: e.target.value
      }
    });
  };

  updateCourseThumbnail = async image => {
    if (!image) return;
    this.toggleUploadingImg();
    const url = await uploadImage(image);
    this.updateCourseValue("thumbnail")({
      target: {
        value: url
      }
    });
    this.toggleUploadingImg();
  };

  toggleUploadingImg = () => {
    this.setState({
      uploadingImg: !this.state.uploadingImg
    });
  };

  render() {
    const { creating } = this.props;
    const { course, uploadingImg } = this.state;
    return (
      <div>
        <Header />
        <Body
          course={course}
          creating={creating}
          uploadingImg={uploadingImg}
          updateCourseThumbnail={this.updateCourseThumbnail}
          updateCourseValue={this.updateCourseValue}
          createCourse={this.onCreate}
        />
        <Footer />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewCourse));
