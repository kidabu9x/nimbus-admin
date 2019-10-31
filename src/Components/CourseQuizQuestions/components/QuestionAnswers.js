import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles(theme => ({
  answers: {
    marginTop: theme.spacing(1)
  },
  answerCheckbox: {
    padding: theme.spacing(0, 0.25)
  },
  answerPairing: {
    border: "1px solid rgba(0,0,0, .1)",
    borderRadius: 2,
    padding: theme.spacing(1)
  },
  box: {
    display: "table",
    width: "100%",
    height: "100%"
  },
  boxText: {
    wordBreak: "break-word",
    display: "table-cell",
    verticalAlign: "middle"
  }
}));

const MultipleChoices = props => {
  const { answers, classes } = props;
  return (
    <Fragment>
      {answers.map(answer => (
        <Grid container className={classes.answers} key={answer._id}>
          <Grid item xs={2}>
            <Checkbox
              className={classes.answerCheckbox}
              checked={answer.is_correct}
              inputProps={{
                "aria-label": "primary checkbox"
              }}
              color="primary"
              readOnly
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="body1" gutterBottom>
              {answer.answer}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Fragment>
  );
};

const Pairing = props => {
  const { answers, pairingAnswers, classes } = props;
  return (
    <Fragment>
      {answers.map((answer, index) => (
        <Grid container className={classes.answers} key={answer._id}>
          <Grid item xs={5} className={classes.answerPairing}>
            <div className={classes.box}>
              <Typography
                className={classes.boxText}
                variant="body1"
                align="center"
              >
                {answer.answer}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.box}>
              <Typography
                className={classes.boxText}
                variant="body1"
                align="center"
              >
                -
              </Typography>
            </div>
          </Grid>
          <Grid item xs={5} className={classes.answerPairing}>
            <div className={classes.box}>
              <Typography
                className={classes.boxText}
                variant="body1"
                align="center"
              >
                {pairingAnswers[index].answer}
              </Typography>
            </div>
          </Grid>
        </Grid>
      ))}
    </Fragment>
  );
};

const QuestionAnswers = props => {
  const { question } = props;
  const classes = styles();
  switch (question.type) {
    case "multiple_choices":
      return <MultipleChoices answers={question.answers} classes={classes} />;
    case "pairing":
      return (
        <Pairing
          answers={question.answers}
          pairingAnswers={question.pairing_answers}
          classes={classes}
        />
      );
    default:
      return null;
  }
};

export default QuestionAnswers;
