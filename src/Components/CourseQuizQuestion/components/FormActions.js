import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = makeStyles(theme => ({
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

const FormActions = props => {
  const { addAnswer, toggleAdvance, disabled } = props;
  const classes = styles();
  return (
    <div className={classes.actionContainer}>
      <Button
        className={classes.action}
        color="secondary"
        size="small"
        disabled={disabled}
        onClick={addAnswer}
      >
        Thêm câu trả lời
      </Button>
      <Button
        className={`${classes.action} ${classes.actionRight}`}
        color="secondary"
        size="small"
        disabled={disabled}
        onClick={toggleAdvance}
      >
        Nâng cao
      </Button>
    </div>
  );
};

export default FormActions;
