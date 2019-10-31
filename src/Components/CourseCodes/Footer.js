import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
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

const NewCodeLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/ma-trac-nghiem/ma-trac-nghiem-moi" {...props} />
));

export default function Footer() {
  const classes = styles();
  return (
    <Fab
      color="secondary"
      aria-label="add"
      className={classes.fab}
      href="/khoa-hoc-moi"
      component={NewCodeLink}
    >
      <AddIcon />
    </Fab>
  );
}
