import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1, 2),
    }
}));

function Media() {
    const classes = styles();
    const answerHeight = 30;
    return (
        <Grid container>
            {Array.from(new Array(2)).map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Box width="100%" marginRight={0.5} marginBottom={2}>
                        <Paper className={classes.paper}>
                            <Skeleton width="100%" height={40} />
                            <Divider />
                            {[0, 1].map((item2, index2) => (
                                <Grid key={index2} container>
                                    <Grid item xs={2}>
                                        <Skeleton width={answerHeight} height={answerHeight} />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Skeleton width="100%" height={answerHeight} />
                                    </Grid>
                                </Grid>
                            ))}

                        </Paper>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default function LoadingSkeleton() {
    return (
        <Media />
    );
}
