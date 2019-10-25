import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
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
  }
}));

function LoadingItem(props) {
  const { classes } = props;
  return (
    <Box className={classes.item}>
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton width="100%" />
    </Box>
  );
}

export default function LoadingSkeleton() {
  const classes = styles();
  return (
    <Box overflow="hidden" clone>
      <Box width="100%" marginRight={0.5} marginBottom={4}>
        <Skeleton className={classes.title} width="80%" height={30} />
        <Paper className={classes.items}>
          <Grid container spacing={2}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item xs={4}>
                <LoadingItem classes={classes} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
