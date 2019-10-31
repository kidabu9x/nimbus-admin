import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import { getCourses } from "../Store/Courses/Actions";
import { getMembers } from "../Store/Members/Actions";
import { createCode } from "../Store/CourseCodes/Actions";
import { pushNotification } from "../Store/Notifications/Actions";

const mapStateToProps = state => ({
  courses: state.courses.courses,
  members: state.members.members,
  creating: state.courseCodes.creating,
  user: state.auth.user
});

const mapDispatchToProps = {
  getCourses,
  getMembers,
  createCode,
  pushNotification
};

class Codes extends Component {
  state = {
    loading: false
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });
    const { getCourses, getMembers } = this.props;
    await getCourses();
    await getMembers();
    this.setState({
      loading: false
    });
  }

  onCreate = async code => {
    const { createCode, pushNotification, history } = this.props;
    await createCode(code);
    pushNotification("Tạo mã thành công", {
      variant: "success"
    });

    history.push("/ma-trac-nghiem");
  };

  render() {
    const { loading } = this.state;
    const { creating, members, courses, user } = this.props;
    return (
      <Fragment>
        <Header />
        <Body
          loading={loading}
          userId={user._id}
          members={members}
          courses={courses}
          creating={creating}
          onCreate={this.onCreate}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Codes));
