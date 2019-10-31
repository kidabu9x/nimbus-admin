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

const FormSubmitButton = props => {
  const { loading, disabled, onClick } = props;
  const classes = styles();
  return (
    <Fragment>
      {!loading ? (
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={disabled}
          onClick={onClick}
        >
          Lưu câu hỏi
        </Button>
      ) : (
        <CircularProgress className={classes.submitButton} color="primary" />
      )}
    </Fragment>
  );
};

export default FormSubmitButton;
