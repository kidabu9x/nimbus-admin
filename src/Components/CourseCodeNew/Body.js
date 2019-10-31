import React, { Component } from "react";
import Form from "./components/Form";

class Body extends Component {
  render() {
    const { creating, onCreate, members, courses, userId } = this.props;
    return (
      <Form
        members={members}
        courses={courses}
        userId={userId}
        creating={creating}
        onCreate={onCreate}
      />
    );
  }
}

export default Body;
