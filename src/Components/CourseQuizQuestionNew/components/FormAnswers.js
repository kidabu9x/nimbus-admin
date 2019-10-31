import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

const styles = makeStyles(theme => ({
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
  answer: {
    marginTop: theme.spacing(1)
  },
  container: {
    marginTop: theme.spacing(1),
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box"
  },
  checkbox: {
    width: "42px"
  },
  deleteButton: {
    width: "44px"
  },
  answerTextarea: {
    flex: 1
  },
  centerText: {
    textAlign: "center"
  }
}));

const MultipleChoices = props => {
  const { answers, updateAnswer, removeAnswer, classes } = props;
  return (
    <Fragment>
      {answers.map((answer, index) => (
        <div className={classes.container} key={index}>
          <Checkbox
            className={classes.checkbox}
            checked={answer.is_correct}
            name="is_correct"
            color="primary"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
            onChange={e =>
              updateAnswer(index, { [e.target.name]: e.target.checked })
            }
          />
          <TextareaAutosize
            className={`${classes.answerTextarea} ${classes.textarea}`}
            aria-label="input question"
            rows={3}
            placeholder="(*) Nhập câu trả lời..."
            value={answer.answer}
            name="answer"
            onChange={e =>
              updateAnswer(index, { [e.target.name]: e.target.value })
            }
          />
          <IconButton
            className={classes.deleteButton}
            aria-label="delete"
            disabled={answers.length === 1}
            onClick={() => removeAnswer(index)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ))}
    </Fragment>
  );
};

const Pairing = props => {
  const {
    classes,
    answers,
    pairingAnswers,
    removeAnswer,
    updateAnswer,
    updatePairingAnswer
  } = props;
  return (
    <Fragment>
      {answers.map((answer, index) => (
        <Grid key={index} container className={classes.answer}>
          <Grid item xs={5}>
            <TextareaAutosize
              className={`${classes.textarea} ${classes.centerText}`}
              aria-label="input answer"
              rows={3}
              placeholder="Ví dụ: 1 + 1 = "
              value={answer.answer}
              name="answer"
              onChange={e =>
                updateAnswer(index, { [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2" align="center">
              -
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextareaAutosize
              className={`${classes.textarea} ${classes.centerText}`}
              aria-label="input answer"
              rows={3}
              placeholder="2"
              value={pairingAnswers[index].answer}
              name="answer"
              onChange={e =>
                updatePairingAnswer(index, { [e.target.name]: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              className={classes.deleteButton}
              aria-label="delete"
              disabled={answers.length === 1}
              onClick={() => removeAnswer(index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Fragment>
  );
};

const Answers = props => {
  const { question, updateAnswer, updatePairingAnswer, removeAnswer } = props;
  const { answers, type, pairing_answers } = question;
  const classes = styles();

  switch (type) {
    case "multiple_choices":
      return (
        <MultipleChoices
          classes={classes}
          answers={answers}
          updateAnswer={updateAnswer}
          removeAnswer={removeAnswer}
        />
      );
    case "pairing":
      return (
        <Pairing
          classes={classes}
          answers={answers}
          pairingAnswers={pairing_answers}
          updateAnswer={updateAnswer}
          updatePairingAnswer={updatePairingAnswer}
          removeAnswer={removeAnswer}
        />
      );
    default:
      return <Pairing />;
  }
};

export default Answers;
