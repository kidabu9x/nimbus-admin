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
      onDelete,
      updateQuestionField,
      addNewAnswer,
      removeAnswer
    } = this.props;
    if (!course || !quiz || !question) return null;
    return (
      <Fragment>
        <Form
          question={question}
          updating={updating}
          onSave={onSave}
          deleting={deleting}
          onDelete={onDelete}
          updateQuestionField={updateQuestionField}
          addNewAnswer={addNewAnswer}
          removeAnswer={removeAnswer}
        />

      </Fragment>
    );
  }
}

export default Body;
