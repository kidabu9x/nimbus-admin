import React, { Component, Fragment } from "react";
import Quizzes from "./components/Quizzes";
import NewQuiz from "./components/NewQuiz";

class Body extends Component {
  render() {
    const {
      quizzes,
      updating,
      deleting,
      onUpdate,
      onDelete
    } = this.props;
    return (
      <Fragment>
        <Quizzes
          quizzes={quizzes}
          updating={updating}
          deleting={deleting}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <NewQuiz {...this.props} />
      </Fragment>
    );
  }
}

export default Body;
