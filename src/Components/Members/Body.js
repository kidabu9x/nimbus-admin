import React, { Component, Fragment } from "react";
import Skeleton from "./components/Skeleton";
import Members from "./components/Members";
import MemberNew from "./components/MemberNew";

class Body extends Component {
  render() {
    const {
      loading,
      members,
      users,
      searching,
      searchUsers,
      creating,
      onCreate,

      deleting,
      onDelete
    } = this.props;
    if (loading) return <Skeleton />;

    return (
      <Fragment>
        <MemberNew
          users={users}
          searching={searching}
          searchUsers={searchUsers}
          creating={creating}
          onCreate={onCreate}
        />
        <Members
          members={members}
          deleting={deleting}
          onDelete={onDelete}
        />
      </Fragment>
    )
  }
}

export default Body;
