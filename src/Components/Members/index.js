import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import {
  getMembers,
  searchUsers,
  createMember,
  deleteMember
} from "../Store/Members/Actions";
import {
  pushNotification
} from "../Store/Notifications/Actions";

const mapStateToProps = state => ({
  members: state.members.members,
  loading: state.members.loading,
  users: state.members.users,
  searching: state.members.searching,
  creating: state.members.creating,
  deleting: state.members.deleting,
});

const mapDispatchToProps = {
  getMembers,
  searchUsers,
  createMember,
  pushNotification,
  deleteMember
};

class Members extends Component {
  componentDidMount() {
    this.props.getMembers();
  }

  onCreate = async (userId) => {
    const {
      createMember,
      pushNotification,
      searchUsers
    } = this.props;

    await createMember(userId);
    searchUsers();
    pushNotification("Đã thêm thành viên", {
      variant: "success"
    })
  }

  onDelete = async (userId) => {
    const {
      deleteMember,
      pushNotification
    } = this.props;

    await deleteMember(userId);
    pushNotification("Đã xoá thành viên", {
      variant: "success"
    })
  }

  render() {
    const {
      loading,
      members,
      users,
      creating,
      searching,
      searchUsers,
      deleting
    } = this.props;
    return (
      <Fragment>
        <Header />
        <Body
          loading={loading}
          creating={creating}
          deleting={deleting}
          members={members}
          users={users}
          searching={searching}
          searchUsers={searchUsers}
          onCreate={this.onCreate}
          onDelete={this.onDelete}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members);
