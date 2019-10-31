import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const styles = makeStyles(theme => ({
  deleteButton: {
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
          className={classes.deleteButton}
          variant="text"
          size="small"
          fullWidth
          disabled={disabled}
          onClick={onClick}
        >
          Xoá câu hỏi
        </Button>
      ) : (
        <CircularProgress
          className={classes.deleteButton}
          color="secondary"
          size={20}
        />
      )}
    </Fragment>
  );
};

export default FormSubmitButton;
