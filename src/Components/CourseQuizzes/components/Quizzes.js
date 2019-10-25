import React, { Fragment } from "react";
import Quiz from "./Quiz";

export default function Quizzes(props) {
  const { quizzes, updating, deleting, onUpdate, onDelete } = props;

  return (
    <Fragment>
      {quizzes.map(quiz => (
        <Quiz
          key={quiz._id}
          quiz={quiz}
          updating={updating}
          deleting={deleting}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </Fragment>
  );
}
