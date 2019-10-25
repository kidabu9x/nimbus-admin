import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));

export default function Footer(props) {
  const classes = styles();
  const { showNewQuiz, onCreate } = props;
  if (showNewQuiz) return null;
  return (
    <Fab
      color="secondary"
      aria-label="add"
      className={classes.fab}
      onClick={onCreate}
    >
      <AddIcon />
    </Fab>
  );
}
