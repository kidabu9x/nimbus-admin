import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

function Media() {
  return (
    <Grid container>
      {Array.from(new Array(2)).map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Box width="100%" marginRight={0.5} marginBottom={4}>
            <Skeleton variant="rect" width="100%" height={118} />
            <React.Fragment>
              <Skeleton />
              <Skeleton width="60%" />
            </React.Fragment>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default function LoadingSkeleton() {
  return (
    <Box overflow="hidden" clone>
      <Box>
        <Media />
      </Box>
    </Box>
  );
}
