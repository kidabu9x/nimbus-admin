import React, { forwardRef, Fragment } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import ButtonLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  button: {
    padding: 0,
    paddingBottom: theme.spacing(1),
    opacity: 0.5,
    display: "flex"
  },
  buttonText: {
    lineHeight: "24px"
  },
  title: {
    marginBottom: theme.spacing(2)
  }
}));

const CourseLink = forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

export default function Header() {
  const classes = styles();
  return (
    <Box overflow="hidden" clone>
      <Fragment>
        <ButtonLink
          className={classes.button}
          component={CourseLink}
          color="inherit"
          underline="none"
          to="/ma-trac-nghiem"
        >
          <KeyboardArrowLeft />
          <Typography className={classes.buttonText} variant="subtitle2">
            Mã trắc nghiệm
          </Typography>
        </ButtonLink>
        <Typography className={classes.title} variant="h4">
          Tạo mã
        </Typography>
      </Fragment>
    </Box>
  );
}
