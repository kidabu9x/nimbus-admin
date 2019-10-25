import React, { Component, Fragment } from "react";
import Form from "./components/Form";

class Body extends Component {
  render() {
    const {
      course,
      quiz,
      question,
      creating,
      onCreate,
      updateQuestionField,
      addNewAnswer,
      removeAnswer
    } = this.props;
    if (!course || !quiz) return null;
    return (
      <Fragment>
        <Form
          question={question}
          creating={creating}
          onCreate={onCreate}
          updateQuestionField={updateQuestionField}
          addNewAnswer={addNewAnswer}
          removeAnswer={removeAnswer}
        />

      </Fragment>
    );
  }
}

export default Body;
