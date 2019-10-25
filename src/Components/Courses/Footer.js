import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const NewCourseLink = forwardRef((props, ref) => (
  <Link innerRef={ref} to="/khoa-hoc-moi" {...props} />
));

export default function Footer(props) {
  const { classes } = props;
  return (
    <Fab
      color="secondary"
      aria-label="add"
      className={classes.fab}
      href="/khoa-hoc-moi"
      component={NewCourseLink}
    >
      <AddIcon />
    </Fab>
  );
}
