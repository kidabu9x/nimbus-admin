import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const styles = makeStyles(theme => ({
  submitButton: {
    margin: "0 auto",
    marginTop: theme.spacing(3)
  }
}));

const Form = props => {
  const { creating, onSubmit } = props;
  const classes = styles();
  return (
    <Fragment>
      {!creating ? (
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={onSubmit}
        >
          Tạo câu hỏi
        </Button>
      ) : (
        <CircularProgress className={classes.submitButton} color="primary" />
      )}
    </Fragment>
  );
};

export default Form;
