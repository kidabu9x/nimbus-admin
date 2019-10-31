import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import FormAnswers from "./FormAnswers";
import FormActions from "./FormActions";
import FormSubmitButton from "./FormSubmitButton";
import FormDeleteButton from "./FormDeleteButton";
import FormAdvanceDialog from "./FormAdvanceDialog";
import FormDeleteDialog from "./FormDeleteDialog";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: "2px"
  },
  textarea: {
    fontSize: "12px",
    width: "100%",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    padding: "5px",
    borderRadius: "2px",
    "&:hover, &:focus": {
      border: "1px solid rgba(0, 0, 0, 0.3)",
      outline: "none"
    }
  }
}));

const answerSchema = {
  id: null,
  answer: "",
  description: "",
  is_correct: false
};

const questionSchema = {
  question: "",
  answers: [answerSchema],
  pairing_answers: [answerSchema],
  description: "",
  appearance: "random",
  type: "multiple_choices",
  enable_shuffle_answers: true
};

const Form = props => {
  const { initValue, updating, deleting, onSave, onDelete } = props;
  const classes = styles();
  const [openAdvance, setOpenAdvance] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [question, setQuestion] = React.useState({
    ...questionSchema
  });

  React.useEffect(() => {
    setQuestion(
      {
        ...initValue
      },
      [initValue]
    );
  }, [initValue]);

  const addAnswer = () => {
    question.answers.push({
      ...answerSchema
    });
    question.pairing_answers.push({
      ...answerSchema
    });
    setQuestion({
      ...question
    });
  };

  const removeAnswer = index => {
    question.answers.splice(index, 1);
    question.pairing_answers.splice(index, 1);
    setQuestion({
      ...question
    });
  };

  const updateQuestion = event => {
    question[event.target.name] = event.target.value;
    setQuestion({
      ...question
    });
  };

  const updateAnswer = (index, answer) => {
    question.answers[index] = {
      ...question.answers[index],
      ...answer
    };
    setQuestion({
      ...question
    });
  };

  const updatePairingAnswer = (index, answer) => {
    question.pairing_answers[index] = {
      ...question.pairing_answers[index],
      ...answer
    };
    setQuestion({
      ...question
    });
  };

  const onSubmit = () => {
    onSave(question);
  };

  const toggleAdvance = () => {
    setOpenAdvance(!openAdvance);
  };
  const toggleDelete = () => {
    setOpenDelete(!openDelete);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <TextareaAutosize
          className={classes.textarea}
          value={question.question}
          aria-label="input question"
          rows={5}
          placeholder="(*) Nhập câu hỏi..."
          name="question"
          onChange={updateQuestion}
        />
        <FormAnswers
          question={question}
          updateAnswer={updateAnswer}
          updatePairingAnswer={updatePairingAnswer}
          removeAnswer={removeAnswer}
        />

        <FormActions
          addAnswer={addAnswer}
          toggleAdvance={toggleAdvance}
          disabled={updating || deleting}
        />
      </div>

      <FormSubmitButton
        loading={updating}
        disabled={deleting}
        onClick={onSubmit}
      />
      <FormDeleteButton
        loading={deleting}
        disabled={updating}
        onClick={toggleDelete}
      />

      <FormAdvanceDialog
        open={openAdvance}
        question={question}
        updateQuestion={updateQuestion}
        handleClose={toggleAdvance}
      />

      <FormDeleteDialog
        loading={deleting}
        open={openDelete}
        handleClose={toggleDelete}
        handleConfirm={onDelete}
      />
    </Fragment>
  );
};

export default Form;
