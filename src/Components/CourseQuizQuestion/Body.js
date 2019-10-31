import React, { Component, Fragment } from "react";
import Form from "./components/Form";

class Body extends Component {
  render() {
    const {
      course,
      quiz,
      question,
      updating,
      onSave,
      deleting,
      onDelete
    } = this.props;
    if (!course || !quiz || !question) return null;
    return (
      <Fragment>
        <Form
          initValue={question}
          updating={updating}
          onSave={onSave}
          deleting={deleting}
          onDelete={onDelete}
        />
      </Fragment>
    );
  }
}

export default Body;
