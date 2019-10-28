import React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles(theme => ({
  root: {

  },
  member: {
    marginBottom: theme.spacing(1)
  },
  memberAction: {
    margin: "auto",
    marginTop: theme.spacing(0.8)
  }
}));

function Media() {
  const classes = styles();
  return (
    <div className={classes.root}>
      {Array.from(new Array(2)).map((item, index) => (
        <div key={index} className={classes.member}>
          <Grid container>
            <Grid item xs={9}>
              <Skeleton height={30} />
              <Skeleton width="60%" />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                className={classes.memberAction}
                variant="circle"
                width={30}
                height={30}
              />
            </Grid>
          </Grid>
          <Divider />
        </div>
      ))}
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <Media />
  );
}
