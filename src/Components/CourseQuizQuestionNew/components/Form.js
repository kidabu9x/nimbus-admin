import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

import FormAdvanceDialog from "./FormAdvanceDialog";
import FormAnswers from "./FormAnswers";
import FormSubmitButton from "./FormSubmitButton";

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
  },
  actionContainer: {
    marginTop: theme.spacing(3)
  },
  action: {
    textTransform: "none"
  },
  actionRight: {
    float: "right",
    color: theme.palette.text.hint
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
  const { creating, onCreate } = props;
  const classes = styles();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState({
    ...questionSchema
  });

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

  const handleSubmit = () => {
    onCreate(question);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
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

        <div className={classes.actionContainer}>
          <Button
            className={classes.action}
            color="secondary"
            size="small"
            onClick={addAnswer}
          >
            Thêm câu trả lời
          </Button>
          <Button
            className={`${classes.action} ${classes.actionRight}`}
            color="secondary"
            size="small"
            onClick={openDialog}
          >
            Nâng cao
          </Button>
        </div>
      </div>

      <FormSubmitButton creating={creating} onSubmit={handleSubmit} />

      <FormAdvanceDialog
        open={open}
        question={question}
        updateQuestion={updateQuestion}
        handleClose={closeDialog}
      />
    </Fragment>
  );
};

export default Form;
