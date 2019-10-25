import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import {
  getCourse,
  setCourse,
  updateCourse,
  deleteCourse
} from "../Store/Course/Actions";
import { pushNotification } from "../Store/Notifications/Actions";
import { uploadImage } from "../Store/Image/Actions";

const mapStateToProps = state => ({
  course: state.course.course,
  loading: state.course.loading,
  updating: state.course.updating,
  deleting: state.course.deleting
});

const mapDispatchToProps = {
  getCourse,
  setCourse,
  updateCourse,
  deleteCourse,
  pushNotification
};

class Course extends Component {
  state = {
    uploadingImg: false
  };

  componentDidMount() {
    this.props.getCourse(this.props.match.params.id);
  }

  updateCourseValue = field => e => {
    this.props.setCourse({
      ...this.props.course,
      [field]: e.target.value
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

  saveCourse = async e => {
    e.preventDefault();
    await this.props.updateCourse();
    this.props.pushNotification("Đã lưu khoá học", {
      variant: "success"
    });
  };

  onDelete = async () => {
    await this.props.deleteCourse();
    this.props.pushNotification("Đã xoá khoá học", {
      variant: "success"
    });
    this.props.history.push("/khoa-hoc");
  };

  toggleUploadingImg = () => {
    this.setState({
      uploadingImg: !this.state.uploadingImg
    });
  };

  render() {
    const { course, loading, updating, deleting } = this.props;
    const { uploadingImg } = this.state;
    return (
      <Fragment>
        <Header course={course} />
        <Body
          course={course}
          loading={loading}
          updating={updating}
          deleting={deleting}
          uploadingImg={uploadingImg}
          setCourse={setCourse}
          updateCourseValue={this.updateCourseValue}
          updateCourseThumbnail={this.updateCourseThumbnail}
          deleteCourse={this.onDelete}
          saveCourse={this.saveCourse}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Course));
