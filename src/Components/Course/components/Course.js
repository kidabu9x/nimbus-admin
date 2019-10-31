import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import QuizIcon from "@material-ui/icons/AssignmentTurnedIn";
import EditIcon from "@material-ui/icons/Edit";

const items = [
  {
    icon: "quiz",
    title: "Trắc nghiệm",
    to: "trac-nghiem"
  },
  {
    icon: "edit",
    title: "Chỉnh sửa",
    to: "chinh-sua"
  }
];

const variantIcon = {
  quiz: QuizIcon,
  edit: EditIcon
};

const styles = makeStyles(theme => {
  return {
    title: {
      marginBottom: theme.spacing(2)
    },
    items: {
      padding: theme.spacing(3, 2)
    },
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    itemIcon: {
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(1)
    },
    itemText: {
      textAlign: "center"
    }
  };
});

function Item(props) {
  const { classes, icon, title, to } = props;
  const Icon = variantIcon[icon];
  return (
    <Link to={to}>
      <Box className={classes.item}>
        <Icon className={classes.itemIcon} />
        <Typography variant="subtitle2" className={classes.itemText}>
          {title}
        </Typography>
      </Box>
    </Link>
  );
}

export default function Course(props) {
  const { course } = props;
  const classes = styles();
  return (
    <Paper className={classes.items}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid key={index} item xs={6}>
            <Item
              classes={classes}
              icon={item.icon}
              title={item.title}
              to={`/khoa-hoc/${course.slug}/${item.to}`}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
