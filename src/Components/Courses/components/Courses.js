import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import FormatMoney from "../../Common/utils/FormatMoney";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 140
  },
  compareAtPrice: {
    textDecoration: "line-through",
    marginLeft: 5
  }
}));

const FormatPrice = props => {
  const { price } = props;
  const money = FormatMoney(price, 0);
  return (
    <span>
      {money} <span>&#8363;</span>
    </span>
  );
};

export default function Courses(props) {
  const { courses } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {courses.map((course, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Link to={`/khoa-hoc/${course.slug}`}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={course.thumbnail}
                  title={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    component="p"
                    display="inline"
                  >
                    <FormatPrice price={course.price} />
                  </Typography>
                  <Typography
                    className={classes.compareAtPrice}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    display="inline"
                  >
                    <FormatPrice price={course.compare_at_price} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
