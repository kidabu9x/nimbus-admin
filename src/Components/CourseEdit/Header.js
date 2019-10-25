import React, { forwardRef, Fragment } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import ButtonLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  button: {
    maxWidth: 90,
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

const Loading = props => {
  const { classes } = props;
  return (
    <Fragment>
      <Skeleton width="30%" height={20} />
      <Skeleton className={classes.title} width="70%" height={30} />
    </Fragment>
  );
};

const Loaded = props => {
  const { course, classes } = props;
  return (
    <Box overflow="hidden" clone>
      <Fragment>
        <ButtonLink
          className={classes.button}
          component={CourseLink}
          color="inherit"
          underline="none"
          to={`/khoa-hoc/${course.slug}`}
        >
          <KeyboardArrowLeft />
          <Typography className={classes.buttonText} variant="subtitle2">
            {course.title}
          </Typography>
        </ButtonLink>
        <Typography className={classes.title} variant="h4">
          Chỉnh sửa
        </Typography>
      </Fragment>
    </Box>
  );
};

export default function Header(props) {
  const classes = styles();
  const { course, loading } = props;
  if (loading || !course) {
    return <Loading classes={classes} />;
  } else {
    return <Loaded course={course} classes={classes} />;
  }
}
