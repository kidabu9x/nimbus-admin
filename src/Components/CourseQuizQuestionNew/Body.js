import React, { Component, Fragment } from "react";
import Form from "./components/Form";

class Body extends Component {
  render() {
    const { course, quiz, creating, onCreate } = this.props;
    if (!course || !quiz) return null;
    return (
      <Fragment>
        <Form creating={creating} onCreate={onCreate} />
      </Fragment>
    );
  }
}

export default Body;
