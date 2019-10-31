import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing(1)
  },
  noMarginBottom: {
    marginBottom: 0
  },
  noMargin: {
    margin: 0
  },
  actions: {
    padding: theme.spacing(2)
  }
}));

const LoadingCard = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Skeleton height={30} />
        <Skeleton width="40%" />
        <Skeleton width="60%" className={classes.noMarginBottom} />
      </CardContent>
      <CardActions className={classes.actions}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Skeleton height={22} className={classes.noMargin} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton height={22} className={classes.noMargin} />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Fragment>
      {[1, 2].map(item => (
        <LoadingCard key={item} classes={classes} />
      ))}
    </Fragment>
  );
}
