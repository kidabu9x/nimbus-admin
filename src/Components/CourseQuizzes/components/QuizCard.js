import React, { useState, Fragment, forwardRef } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import ReplayIcon from "@material-ui/icons/Replay";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    marginBottom: theme.spacing(2)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  icon: {
    fontSize: 14
  },
  iconSuccess: {
    color: theme.palette.primary.main
  }
}));

const QuestionsLink = forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Quiz = (props) => {
  const classes = useStyles();
  const { quiz, onDelete, onEdit, location } = props;
  const [anchor, setAnchor] = useState(null);
  const bull = <span className={classes.bullet}>•</span>;

  const openMenu = e => {
    setAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  const confirmDelete = () => {
    onDelete();
    closeMenu();
  };

  const confirmEdit = () => {
    onEdit();
    closeMenu();
  };

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          action={
            <IconButton
              aria-controls="menu"
              aria-label="settings"
              onClick={openMenu}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography variant="h6" component="h2">
              {quiz.title}
            </Typography>
          }
          subheader={
            <Typography variant="body2" component="p" color="textSecondary">
              <AlarmOnIcon
                className={`${classes.icon} ${
                  quiz.time_limit > 0 ? classes.iconSuccess : null
                  }`}
              />
              {bull}
              <ShuffleIcon
                className={`${classes.icon} ${
                  quiz.enable_shuffle_questions ? classes.iconSuccess : null
                  }`}
              />
              {bull}
              <ReplayIcon
                className={`${classes.icon} ${
                  quiz.ask_questions_again_when_returning
                    ? classes.iconSuccess
                    : null
                  }`}
              />
            </Typography>
          }
          disableTypography={true}
        />
        <CardActions>
          <Button
            component={QuestionsLink}
            size="small"
            to={location.pathname + '/' + quiz.slug + '/bo-cau-hoi'}
          >
            Bộ câu hỏi
          </Button>
        </CardActions>
      </Card>
      <Menu
        id="menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={confirmEdit}>Chỉnh sửa</MenuItem>
        <MenuItem onClick={confirmDelete}>Xóa</MenuItem>
      </Menu>
    </Fragment>
  );
}

export default withRouter(Quiz);
