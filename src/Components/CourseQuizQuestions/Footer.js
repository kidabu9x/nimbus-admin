import React, { forwardRef } from "react";
import { Link, withRouter } from "react-router-dom";
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

const NewQuestionLink = forwardRef((props, ref) => (
  <Link innerRef={ref}  {...props} />
));

const Footer = (props) => {
  const currentPath = props.location.pathname;
  const nextPath = currentPath + "/tao-cau-hoi"
  const classes = styles();
  return (
    <Fab
      color="secondary"
      aria-label="add"
      className={classes.fab}
      component={NewQuestionLink}
      to={nextPath}
    >
      <AddIcon />
    </Fab>
  );
}

export default withRouter(Footer);
