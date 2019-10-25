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

export default function LoadingSkeleton() {
  const classes = styles();
  return (
    <Box overflow="hidden" clone>
      <Paper className={classes.items}>
        <Box width="100%" marginRight={0.5} marginBottom={4}>
          {[0, 1, 2].map(value => (
            <Skeleton
              key={value}
              className={classes.title}
              width="80%"
              height={30}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
